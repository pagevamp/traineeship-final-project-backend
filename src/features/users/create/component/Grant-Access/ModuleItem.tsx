import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

interface Permission {
  view: boolean;
  create: boolean;
  update: boolean;
  delete: boolean;
}

interface Module {
  moduleId?: string;
  isGroup: boolean;
  key: string;
  name: string;
  permission?: Permission;
  children?: Module[];
}

interface ModuleItemProps {
  module: Module;
  onPermissionChange: (
    moduleKey: string,
    permissionType: keyof Permission,
    value: boolean
  ) => void;
  isChild?: boolean;
}

const ModuleItem: React.FC<ModuleItemProps> = ({
  module,
  onPermissionChange,
  isChild = false,
}) => {
  if (!module.permission) return null;

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
              onClick={() => {
                const perms = module.permission;
                const shouldEnableAll =
                  !perms?.view ||
                  !perms?.update ||
                  !perms?.create ||
                  !perms?.delete;

                ["view", "update", "create", "delete"].forEach((perm) => {
                  onPermissionChange(
                    module.key,
                    perm as keyof Permission,
                    shouldEnableAll
                  );
                });
              }}
            >
              {module.name}
            </h4>
          </div>

          <div className="flex justify-center">
            <Switch
              checked={module.permission.view}
              onCheckedChange={(value) =>
                onPermissionChange(module.key, "view", value)
              }
              className="scale-75"
            />
          </div>

          <div className="flex justify-center">
            <Switch
              checked={module.permission.update}
              onCheckedChange={(value) =>
                onPermissionChange(module.key, "update", value)
              }
              className="scale-75"
            />
          </div>

          <div className="flex justify-center">
            <Switch
              checked={module.permission.create}
              onCheckedChange={(value) =>
                onPermissionChange(module.key, "create", value)
              }
              className="scale-75"
            />
          </div>

          <div className="flex justify-center">
            <Switch
              checked={module.permission.delete}
              onCheckedChange={(value) =>
                onPermissionChange(module.key, "delete", value)
              }
              className="scale-75"
            />
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="block md:hidden">
          <div className="flex items-center space-x-3 mb-4">
            {/* <FileText
              className={`h-5 w-5 flex-shrink-0 ${
                isChild ? "text-green-600" : "text-blue-600"
              }`}
            /> */}
            <h4 className="text-base font-medium text-gray-800 break-words">
              {module.name}
            </h4>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center justify-between p-2 bg-orange-50 rounded-lg border border-orange-200">
              <span className="text-sm font-medium text-orange-800">View</span>
              <Switch
                checked={module.permission.view}
                onCheckedChange={(value) =>
                  onPermissionChange(module.key, "view", value)
                }
                className="scale-75"
              />
            </div>

            <div className="flex items-center justify-between p-2 bg-blue-50 rounded-lg border border-blue-200">
              <span className="text-sm font-medium text-blue-800">Edit</span>
              <Switch
                checked={module.permission.update}
                onCheckedChange={(value) =>
                  onPermissionChange(module.key, "update", value)
                }
                className="scale-75"
              />
            </div>

            <div className="flex items-center justify-between p-2 bg-green-50 rounded-lg border border-green-200">
              <span className="text-sm font-medium text-green-800">Create</span>
              <Switch
                checked={module.permission.create}
                onCheckedChange={(value) =>
                  onPermissionChange(module.key, "create", value)
                }
                className="scale-75"
              />
            </div>

            <div className="flex items-center justify-between p-2 bg-purple-50 rounded-lg border border-purple-200">
              <span className="text-sm font-medium text-purple-800">
                Delete
              </span>
              <Switch
                checked={module.permission.delete}
                onCheckedChange={(value) =>
                  onPermissionChange(module.key, "delete", value)
                }
                className="scale-75"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ModuleItem;
