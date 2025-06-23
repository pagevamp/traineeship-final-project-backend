import React, { useState } from "react";
import { ChevronDown, ChevronRight, FolderOpen, Folder } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import ModuleItem from "./ModuleItem";
import { ModuleGroupProps, Permission } from "@/features/users/types";

const ModuleGroup: React.FC<ModuleGroupProps> = ({
  module,
  onPermissionChange,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <Card className="border border-gray-200 rounded hover:shadow-md transition-all duration-200">
      <CardContent className="p-0 rounded">
        {/* Desktop Header */}
        <div
          className={`hidden md:grid md:grid-cols-5 gap-4 items-center p-3 sm:p-4 ${
            isExpanded ? "rounded-t" : "rounded"
          }  bg-gradient-to-r from-gray-50 to-gray-100 cursor-pointer hover:from-gray-100 hover:to-gray-200 transition-all duration-200`}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              {isExpanded ? (
                <ChevronDown className="h-5 w-5 text-gray-600" />
              ) : (
                <ChevronRight className="h-5 w-5 text-gray-600" />
              )}
            </div>

            <h3
              className="text-sm sm:text-md font-secondary cursor-pointer font-medium text-gray-800 break-words"
              onClick={(e) => {
                e.stopPropagation();

                // Check if any permission in any child is false
                const shouldEnable = module.children?.some((child) => {
                  const perms = child.permission;
                  return (
                    !perms?.view ||
                    !perms?.update ||
                    !perms?.create ||
                    !perms?.delete
                  );
                });

                module.children?.forEach((child) => {
                  ["view", "create", "update", "delete"].forEach((perm) => {
                    onPermissionChange(
                      child.key,
                      perm as keyof Permission,
                      !!shouldEnable, // enable if any were false, else disable all
                      module.key
                    );
                  });
                });
              }}
            >
              {module.name}
            </h3>
          </div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>

        {/* Mobile Header */}
        <div
          className="block md:hidden p-3 bg-gradient-to-r from-gray-50 to-gray-100 cursor-pointer hover:from-gray-100 hover:to-gray-200 transition-all duration-200"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              {isExpanded ? (
                <ChevronDown className="h-5 w-5 text-gray-600" />
              ) : (
                <ChevronRight className="h-5 w-5 text-gray-600" />
              )}
            </div>
            <div className="flex-shrink-0">
              {isExpanded ? (
                <FolderOpen className="h-5 w-5 text-blue-600" />
              ) : (
                <Folder className="h-5 w-5 text-blue-600" />
              )}
            </div>
            <h3 className="text-base font-semibold text-gray-800 break-words">
              {module.name}
            </h3>
          </div>
        </div>

        {isExpanded && module.children && (
          <div className="p-2 sm:p-3 lg:p-4 bg-gray-50/50 rounded">
            <div className="space-y-2 sm:space-y-3">
              {module.children.map((child) => (
                <div key={child.key}>
                  <ModuleItem
                    module={child}
                    onPermissionChange={(moduleKey, permissionType, value) =>
                      onPermissionChange(
                        moduleKey,
                        permissionType,
                        value,
                        module.key
                      )
                    }
                    isChild={true}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ModuleGroup;
