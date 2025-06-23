"use client";
import React, { useEffect } from "react";
import ModuleGroup from "./ModuleGroup";
import ModuleItem from "./ModuleItem";
import ModuleLoader from "@/features/users/loading/ModuleLoader";
import { Permission, PermissionManagerProps } from "@/features/users/types";

const PermissionManager: React.FC<PermissionManagerProps> = ({
  allModuleLists,
  isLoading,
  modules,
  setModules,
}) => {
  useEffect(() => {
    if (allModuleLists) {
      setModules(allModuleLists);
    }
  }, [allModuleLists, setModules]);

  // const updatePermission = (
  //   moduleKey: string,
  //   permissionType: keyof Permission | "all",
  //   value: boolean,
  //   parentKey?: string
  // ) => {
  //   setModules((prevModules) => {
  //     return prevModules.map((module) => {
  //       if (module.isGroup && module.children) {
  //         if (module.key === parentKey) {
  //           return {
  //             ...module,
  //             children: module.children.map((child) => {
  //               if (child.key === moduleKey) {
  //                 return {
  //                   ...child,
  //                   permission: {
  //                     ...child.permission!,
  //                     ...(permissionType === "all"
  //                       ? {
  //                           view: value,
  //                           create: value,
  //                           update: value,
  //                           delete: value,
  //                         }
  //                       : {
  //                           [permissionType]: value,
  //                         }),
  //                   },
  //                 };
  //               }
  //               return child;
  //             }),
  //           };
  //         }
  //         return module;
  //       } else if (module.key === moduleKey) {
  //         return {
  //           ...module,
  //           permission: {
  //             ...module.permission!,
  //             ...(permissionType === "all"
  //               ? {
  //                   view: value,
  //                   create: value,
  //                   update: value,
  //                   delete: value,
  //                 }
  //               : {
  //                   [permissionType]: value,
  //                 }),
  //           },
  //         };
  //       }
  //       return module;
  //     });
  //   });
  // };

  const updatePermission = (
    moduleKey: string,
    permissionType: keyof Permission,
    value: boolean,
    parentKey?: string
  ) => {
    setModules((prevModules) => {
      return prevModules.map((module) => {
        if (module.isGroup && module.children) {
          if (module.key === parentKey) {
            return {
              ...module,
              children: module.children.map((child) => {
                if (child.key === moduleKey) {
                  return {
                    ...child,
                    permission: {
                      ...child.permission!,
                      [permissionType]: value,
                    },
                  };
                }
                return child;
              }),
            };
          }
          return module;
        } else if (module.key === moduleKey) {
          return {
            ...module,
            permission: {
              ...module.permission!,
              [permissionType]: value,
            },
          };
        }
        return module;
      });
    });
  };

  const toggleAllPermissions = (
    permissionType: keyof Permission,
    value: boolean
  ) => {
    setModules((prevModules) => {
      return prevModules.map((module) => {
        if (module.isGroup && module.children) {
          return {
            ...module,
            children: module.children.map((child) => ({
              ...child,
              permission: {
                ...child.permission!,
                [permissionType]: value,
              },
            })),
          };
        } else if (module.permission) {
          return {
            ...module,
            permission: {
              ...module.permission,
              [permissionType]: value,
            },
          };
        }
        return module;
      });
    });
  };

  if (isLoading) {
    return <ModuleLoader />;
  }

  return (
    <div className="w-full">
      <h2 className="font-primary text-lg sm:text-xl text-[#111D35] mb-4 text-start sm:text-left">
        Grant Access
      </h2>
      <div className="hover:shadow-md border rounded bg-white/80 backdrop-blur-sm max-h-[80vh] overflow-hidden">
        <div className="p-2 sm:p-4 rounded">
          {/* Desktop Header - Hidden on mobile */}
          <div className="hidden md:block mb-6 sticky top-0  bg-white z-10 w-full">
            <div className="grid grid-cols-5 gap-4 items-center justify-center px-3 sm:px-4 text-sm">
              <div className="font-medium text-gray-800 font-secondary">
                Module
              </div>
              <div className="text-center">
                <div className="text-orange-600 font-medium font-secondary">
                  View
                </div>
                {/* <Button
                  onClick={() => toggleAllPermissions("view", true)}
                  className="bg-orange-500 hover:bg-orange-600 text-white text-xs px-2 py-1 h-6"
                  size="sm"
                >
                  All
                </Button> */}
              </div>
              <div className="text-center">
                <div className="text-blue-600 font-medium font-secondary">
                  Edit
                </div>
              </div>
              <div className="text-center">
                <div className="text-green-600 font-medium font-secondary">
                  Create
                </div>
              </div>
              <div className="text-center">
                <div className="text-purple-600 font-medium font-secondary">
                  Delete
                </div>
              </div>
            </div>
          </div>

          {/* Modules */}
          <div className="space-y-3 sm:space-y-4 rounded overflow-y-auto max-h-[65vh]">
            {modules?.length === 0 ? (
              <div className="flex flex-col items-center m-2 sm:m-4  justify-center h-60 bg-white border border-dashed border-orange-300 rounded-lg shadow-inner text-center p-6 animate-fadeIn">
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
                <p className="text-sm sm:text-base font-secondary font-semibold text-orange-500">
                  No Modules Found
                </p>
                <p className="text-xs text-gray-500 mt-1 font-secondary font-[300]">
                  Please check back later or add new modules.
                </p>
              </div>
            ) : (
              modules.map((module) => (
                <div key={module.key} className="rounded">
                  {module.isGroup ? (
                    <ModuleGroup
                      module={module}
                      onPermissionChange={updatePermission}
                    />
                  ) : (
                    <ModuleItem
                      module={module}
                      onPermissionChange={updatePermission}
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
