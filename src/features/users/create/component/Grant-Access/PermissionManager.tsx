"use client";
import React from "react";
import ModuleGroup from "./ModuleGroup";
import ModuleItem from "./ModuleItem";
import ModuleLoader from "@/features/users/loading/ModuleLoader";
import { Permission, PermissionManagerProps } from "@/features/users/types";

const PermissionManager: React.FC<PermissionManagerProps> = ({
  isLoading,
  setValue,
  localModules,
  setLocalModules,
}) => {
  const updatePermissions = (
    moduleKey: string,
    changes: Partial<Permission>,
    parentKey?: string
  ) => {
    const updatedModules = localModules?.map((module: any) => {
      const updatePerm = (perm: Permission): Permission => {
        const newPerm = { ...perm, ...changes };

        if (newPerm.create || newPerm.update || newPerm.delete) {
          newPerm.view = true;
        }

        // Optionally disable view if all others are false
        if (!newPerm.create && !newPerm.update && !newPerm.delete) {
          newPerm.view = newPerm.view && changes.view !== false; // Keep if explicitly true
        }

        return newPerm;
      };

      // Child module inside group
      if (
        parentKey &&
        module.key === parentKey &&
        module.isGroup &&
        module.children
      ) {
        return {
          ...module,
          children: module.children.map((child: any) =>
            child.key === moduleKey
              ? { ...child, permission: updatePerm(child.permission!) }
              : child
          ),
        };
      }

      // Top-level module (non-group or group bulk)
      if (module.key === moduleKey) {
        if (module.isGroup && module.children) {
          return {
            ...module,
            children: module.children.map((child: any) => ({
              ...child,
              permission: updatePerm(child.permission!),
            })),
          };
        }

        return {
          ...module,
          permission: updatePerm(module.permission!),
        };
      }

      return module;
    });

    setLocalModules(updatedModules);
    setValue("modules", updatedModules);
  };

  if (isLoading) return <ModuleLoader />;

  return (
    <div className="w-full">
      <h2 className="font-primary text-lg sm:text-xl text-[#111D35] mb-4 text-start sm:text-left">
        Grant Access
        {<span className="text-red-600 ml-1">*</span>}
      </h2>
      <div className="hover:shadow-md border rounded bg-white/80 backdrop-blur-sm max-h-[90vh] overflow-hidden">
        <div className="p-2 sm:p-4 rounded">
          <div className="hidden md:block mb-6 sticky top-0 bg-white z-10 w-full">
            <div className="grid grid-cols-5 gap-4 items-center justify-center px-3 sm:px-4 text-sm">
              <div className="font-medium text-gray-800 font-secondary">
                Module
              </div>
              <div className="text-center text-orange-600 font-medium font-secondary">
                View
              </div>
              <div className="text-center text-blue-600 font-medium font-secondary">
                Edit
              </div>
              <div className="text-center text-green-600 font-medium font-secondary">
                Create
              </div>
              <div className="text-center text-purple-600 font-medium font-secondary">
                Delete
              </div>
            </div>
          </div>

          <div className="space-y-3 sm:space-y-4 rounded overflow-y-auto max-h-[80vh]">
            {localModules?.length === 0 ? (
              <div className="flex flex-col items-center m-4 justify-center h-60 border border-dashed border-orange-300 rounded-lg shadow-inner text-center p-6 animate-fadeIn">
                <svg
                  className="w-12 h-12 text-orange-400 mb-3"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.75 9.75h.008v.008H9.75V9.75zM14.25 9.75h.008v.008h-.008V9.75zM12 14.25v.008h.008V14.25H12zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="text-sm font-secondary font-semibold text-orange-500">
                  No Modules Found
                </p>
                <p className="text-xs text-gray-500 mt-1 font-secondary font-[300]">
                  Please check back later or add new modules.
                </p>
              </div>
            ) : (
              localModules.map((module: any) => (
                <div key={module.key} className="rounded">
                  {module.isGroup ? (
                    <ModuleGroup
                      module={module}
                      onSinglePermissionChange={(
                        moduleKey,
                        permissionType,
                        value
                      ) =>
                        updatePermissions(
                          moduleKey,
                          { [permissionType]: value },
                          module.key
                        )
                      }
                      onBulkPermissionChange={(
                        moduleKey,
                        permissions,
                        parentKey
                      ) => updatePermissions(moduleKey, permissions, parentKey)}
                    />
                  ) : (
                    <ModuleItem
                      module={module}
                      onSinglePermissionChange={(
                        moduleKey,
                        permissionType,
                        value
                      ) =>
                        updatePermissions(moduleKey, {
                          [permissionType]: value,
                        })
                      }
                      onBulkPermissionChange={(moduleKey, permissions) =>
                        updatePermissions(moduleKey, permissions)
                      }
                    />
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PermissionManager;
