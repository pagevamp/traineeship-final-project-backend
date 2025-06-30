import { useMemo } from "react";
import { useProfileInformation } from "@/features/dashboard/hooks/useProfileInformation";
import { usePathname } from "next/navigation";
import { moduleRoutes } from "@/routes"; // Updated route map

function pathMatchesPattern(path: string, pattern: string) {
  if (pattern.endsWith("/*")) {
    const base = pattern.replace("/*", "");
    return path === base || path.startsWith(`${base}/`);
  }
  return path === pattern;
}

export function usePermissions() {
  const pathname = usePathname();
  const { data: profile } = useProfileInformation();

  return useMemo(() => {
    let matchedKey: string | null = null;
    const permissionData = profile?.data?.data?.modules ?? [];

    // Match pathname against moduleRoutes
    for (const [key, paths] of Object.entries(moduleRoutes)) {
      if (paths.some((pattern) => pathMatchesPattern(pathname, pattern))) {
        matchedKey = key;
        break;
      }
    }

    if (!matchedKey) {
      return {
        isView: false,
        isCreate: false,
        isUpdate: false,
        isDelete: false,
      };
    }

    // Recursively find permission by key
    function findPermission(data: any[]): any | null {
      for (const item of data) {
        if (item.key === matchedKey && item.permission) {
          return item.permission;
        }
        if (item.children) {
          const found = findPermission(item.children);
          if (found) return found;
        }
      }
      return null;
    }

    const permission = findPermission(permissionData);

    return {
      isView: permission?.view ?? false,
      isCreate: permission?.create ?? false,
      isUpdate: permission?.update ?? false,
      isDelete: permission?.delete ?? false,
    };
  }, [pathname, profile]);
}
