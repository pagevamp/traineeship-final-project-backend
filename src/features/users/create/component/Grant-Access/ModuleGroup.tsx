import React, { useState } from "react";
import { ChevronDown, ChevronRight, FolderOpen, Folder } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import ModuleItem from "./ModuleItem";
import { Module, Permission } from "@/features/users/types";

interface ModuleGroupProps {
  module: Module;
  onSinglePermissionChange: (
    moduleKey: string,
    permissionType: keyof Permission,
    value: boolean
  ) => void;
  onBulkPermissionChange: (
    moduleKey: string,
    permissions: Partial<Permission>,
    parentKey?: string
  ) => void;
}

const ModuleGroup: React.FC<ModuleGroupProps> = ({
  module,
  onSinglePermissionChange,
  onBulkPermissionChange,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const { name, key, children } = module;

  const handleToggleGroupPermissions = (
    e: React.MouseEvent<HTMLHeadingElement>
  ) => {
    e.stopPropagation();

    const shouldEnable = children?.some((child) => {
      const perms = child.permission;
      return !perms?.view || !perms?.create || !perms?.update || !perms?.delete;
    });

    onBulkPermissionChange(key, {
      view: !!shouldEnable,
      create: !!shouldEnable,
      update: !!shouldEnable,
      delete: !!shouldEnable,
    });
  };

  const renderHeaderIcon = (
    IconExpanded: React.ReactNode,
    IconCollapsed: React.ReactNode
  ) => (isExpanded ? IconExpanded : IconCollapsed);

  return (
    <Card className="border border-gray-200 rounded hover:shadow-md transition-all duration-200">
      <CardContent className="p-0 rounded">
        {/* Desktop Header */}
        <div
          className={`hidden md:grid grid-cols-5 gap-4 items-center p-3 sm:p-4 ${
            isExpanded ? "rounded-t" : "rounded"
          } bg-gradient-to-r from-gray-50 to-gray-100 cursor-pointer hover:from-gray-100 hover:to-gray-200`}
          onClick={() => setIsExpanded((prev) => !prev)}
        >
          <div className="flex items-center space-x-3">
            {renderHeaderIcon(
              <ChevronDown className="h-5 w-5 text-gray-600" />,
              <ChevronRight className="h-5 w-5 text-gray-600" />
            )}
            <h3
              className="text-sm sm:text-md font-secondary font-medium text-gray-800 break-words"
              onClick={handleToggleGroupPermissions}
            >
              {name}
            </h3>
          </div>
          {/* Empty columns for View, Edit, Create, Delete */}
          {[...Array(4)].map((_, i) => (
            <div key={i} />
          ))}
        </div>

        {/* Mobile Header */}
        <div
          className="block md:hidden p-3 bg-gradient-to-r from-gray-50 to-gray-100 cursor-pointer hover:from-gray-100 hover:to-gray-200"
          onClick={() => setIsExpanded((prev) => !prev)}
        >
          <div className="flex items-center space-x-3">
            {renderHeaderIcon(
              <ChevronDown className="h-5 w-5 text-gray-600" />,
              <ChevronRight className="h-5 w-5 text-gray-600" />
            )}
            {renderHeaderIcon(
              <FolderOpen className="h-5 w-5 text-blue-600" />,
              <Folder className="h-5 w-5 text-blue-600" />
            )}
            <h3 className="text-base font-semibold text-gray-800 break-words">
              {name}
            </h3>
          </div>
        </div>

        {/* Children Modules */}
        {isExpanded && Array.isArray(children) && children.length > 0 && (
          <div className="p-2 sm:p-3 lg:p-4 bg-gray-50/50 rounded">
            <div className="space-y-2 sm:space-y-3">
              {children?.map((child) => (
                <ModuleItem
                  key={child.key}
                  module={child}
                  isChild
                  onSinglePermissionChange={onSinglePermissionChange}
                  onBulkPermissionChange={(childKey, permissions) =>
                    onBulkPermissionChange(childKey, permissions, key)
                  }
                />
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ModuleGroup;
