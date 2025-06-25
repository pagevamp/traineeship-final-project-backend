import { NextResponse, type NextRequest } from "next/server";
import { MODULE_LINK, moduleRoutes, PUBLIC_PATH } from "./routes";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("accessToken")?.value;
  // Early returns for special cases
  if (PUBLIC_PATH.includes(pathname)) {
    return handlePublicPath(request, pathname, token);
  }

  if (pathname === "/unauthorized") {
    return NextResponse.next();
  }

  // Authentication check
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const userId = await getUserFromSession(token);
  if (!userId) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Get user modules
  const userModules = await getUserModules(userId, token);
  if (!userModules) {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  // Handle root path redirect
  if (pathname === "/") {
    return redirectToFirstModule(request, userModules);
  }

  // Authorization check
  if (!isPathAuthorized(pathname, userModules)) {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  return NextResponse.next();
}

// Helper functions
async function handlePublicPath(
  request: NextRequest,
  pathname: string,
  token?: string
) {
  // Redirect authenticated users away from login/register
  if (token && (pathname === "/login" || pathname === "/register")) {
    const userId = await getUserFromSession(token);
    if (userId) {
      const userModules = await getUserModules(userId, token);
      if (userModules) {
        return redirectToFirstModule(request, userModules);
      }
    }
  }
  return NextResponse.next();
}

async function getUserModules(
  userId: string,
  token: string
): Promise<string[] | null> {
  // Fetch from API
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/profile`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) {
      throw new Error(`API responded with status: ${res.status}`);
    }

    const data = await res.json();
    const modules = extractModules(data.data.modules || []);

    return modules;
  } catch (err) {
    console.error("Error fetching user modules:", err);
    return null;
  }
}

function extractModules(modules: any[]): string[] {
  return modules.flatMap((mod: any) => {
    if (mod.isGroup && Array.isArray(mod.children)) {
      return mod.children.map((child: any) => child.key);
    }
    return mod.key;
  });
}

function redirectToFirstModule(request: NextRequest, userModules: string[]) {
  const firstAvailableModule = userModules.find((moduleKey) =>
    MODULE_LINK.hasOwnProperty(moduleKey)
  );

  if (firstAvailableModule) {
    const redirectPath = MODULE_LINK[firstAvailableModule].href;
    return NextResponse.redirect(new URL(redirectPath, request.url));
  }
  return NextResponse.redirect(new URL("/unauthorized", request.url));
}

function isPathAuthorized(pathname: string, userModules: string[]): boolean {
  return userModules.some((moduleKey) => {
    const paths = moduleRoutes[moduleKey];
    if (!paths) return false;

    return paths.some((path) => {
      if (path.endsWith("/*")) {
        const basePath = path.slice(0, -2); // Remove "/*"
        return pathname.startsWith(basePath);
      }
      return pathname === path;
    });
  });
}

async function getUserFromSession(token: string): Promise<string | null> {
  try {
    const [, payload] = token.split(".");
    const decoded = JSON.parse(atob(payload));
    return decoded?.id || null;
  } catch {
    return null;
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
