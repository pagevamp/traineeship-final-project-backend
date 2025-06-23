import { NextResponse, type NextRequest } from "next/server";
import { moduleRoutes, PUBLIC_PATH } from "./routes";

const userModuleCache = new Map<string, string[]>();

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("accessToken")?.value;

  const publicPaths = PUBLIC_PATH;
  // Allow public paths without token
  if (publicPaths.includes(pathname)) {
    if (!token) return NextResponse.next();
    // If token exists and user tries to access login/register, redirect to dashboard
    if (pathname === "/login" || pathname === "/register") {
      return NextResponse.redirect(new URL("/customer", request.url));
    }
    return NextResponse.next();
  }

  // If no token, redirect to login
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Extract userId from token
  const userId = await getUserFromSession(token);
  if (!userId) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Get user modules from cache or fetch
  let userModules: string[] = [];
  if (userModuleCache.has(userId)) {
    userModules = userModuleCache.get(userId)!;
  } else {
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
      if (!res.ok) throw new Error("Failed to fetch modules");

      const data = await res.json();
      userModules =
        data.data.modules?.flatMap((mod: any) => {
          if (mod.isGroup && Array.isArray(mod.children)) {
            return mod.children.map((child: any) => child.key);
          } else {
            return mod.key;
          }
        }) || [];

      userModuleCache.set(userId, userModules);
    } catch (err) {
      console.error("Error fetching modules:", err);
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
  }

  // Determine if current route matches any module route
  const requiredModuleEntry = Object.entries(moduleRoutes).find(
    ([moduleName, paths]) =>
      paths.some((path) => {
        if (path.endsWith("/*")) {
          const basePath = path.replace("/*", "");
          return pathname.startsWith(basePath);
        }
        return pathname === path;
      })
  );

  if (requiredModuleEntry) {
    const [requiredModule] = requiredModuleEntry;

    // If user does NOT have the required module, redirect unauthorized
    if (!userModules.includes(requiredModule)) {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
  } else {
    // If route is NOT in publicPaths and NOT matched by moduleRoutes keys, block access
    // You can choose either to redirect to unauthorized or login here
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  // All checks passed — allow access
  return NextResponse.next();
}

// export const config = {
//   matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
// };
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};

async function getUserFromSession(token: string) {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload?.id || null;
  } catch {
    return null;
  }
}
