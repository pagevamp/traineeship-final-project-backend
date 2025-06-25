import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Permission, Module } from "@/features/users/types";

interface ModuleItemProps {
  module: Module;
  onSinglePermissionChange: (
    moduleKey: string,
    permissionType: keyof Permission,
    value: boolean
  ) => void;
  onBulkPermissionChange: (
    moduleKey: string,
    permissions: Partial<Permission>,
    key?: string
  ) => void;
  isChild?: boolean;
}

const PERMISSIONS: (keyof Permission)[] = [
  "view",
  "update",
  "create",
  "delete",
];

const PERMISSION_STYLES: Record<keyof Permission, string> = {
  view: "bg-orange-50 border-orange-200 text-orange-800",
  update: "bg-blue-50 border-blue-200 text-blue-800",
  create: "bg-green-50 border-green-200 text-green-800",
  delete: "bg-purple-50 border-purple-200 text-purple-800",
};

const ModuleItem: React.FC<ModuleItemProps> = ({
  module,
  onSinglePermissionChange,
  onBulkPermissionChange,
  isChild = false,
}) => {
  if (!module.permission) return null;

  const { key, name, permission } = module;

  const handleBulkToggle = () => {
    const shouldEnableAll = PERMISSIONS.some((p) => !permission[p]);

    const newPermissions: Partial<Permission> = {
      view: shouldEnableAll,
      update: shouldEnableAll,
      create: shouldEnableAll,
      delete: shouldEnableAll,
    };

    onBulkPermissionChange(key, newPermissions);
  };

  const isViewDisabled = permission.create || permission.delete;

  const renderSwitch = (perm: keyof Permission, isMobile: boolean = false) => (
    <div
      key={perm}
      className={
        isMobile
          ? `flex items-center justify-between p-2 rounded-lg border ${PERMISSION_STYLES[perm]}`
          : "flex justify-center"
      }
    >
      {isMobile && (
        <span className="text-sm font-medium capitalize">{perm}</span>
      )}
      <Switch
        checked={permission[perm]}
        disabled={perm === "view" && isViewDisabled}
        onCheckedChange={(value) => onSinglePermissionChange(key, perm, value)}
        className="scale-75"
      />
    </div>
  );

  return (
    <Card
      className={`border hover:shadow-md rounded transition-all duration-200 ${
        isChild ? "border-gray-300" : "border-gray-200"
      }`}
    >
      <CardContent className="p-3 sm:p-4">
        {/* Desktop Layout */}
        <div className="hidden md:grid md:grid-cols-5 gap-4 items-center justify-center">
          <div className="flex items-center space-x-3">
            <h4
              className="text-sm font-secondary text-gray-800 break-words cursor-pointer"
              onClick={handleBulkToggle}
            >
              {name}
            </h4>
          </div>
          {PERMISSIONS.map((perm) => renderSwitch(perm))}
        </div>

        {/* Mobile Layout */}
        <div className="block md:hidden">
          <div className="flex items-center space-x-3 mb-4">
            <h4 className="text-base font-medium text-gray-800 break-words">
              {name}
            </h4>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {PERMISSIONS.map((perm) => renderSwitch(perm, true))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ModuleItem;
