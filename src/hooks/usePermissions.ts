import { useMemo } from "react";
import { useProfileInformation } from "@/features/dashboard/hooks/useProfileInformation";
import { usePathname } from "next/navigation";
import { MODULE_LINK } from "@/routes";

export function usePermissions() {
  const pathname = usePathname();
  const { data: profile } = useProfileInformation();
  return useMemo(() => {
    let matchedKey: string | null = null;
    const permissionData = profile?.data?.data?.modules ?? [];

    // Find the matching key from MODULE_LINK based on current pathname
    for (const [key, value] of Object.entries(MODULE_LINK)) {
      if (value.href === pathname) {
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

    // Search recursively in permissionData
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
