import {
  Control,
  FieldErrors,
  SubmitHandler,
  UseFormRegister,
  UseFormSetValue,
  UseFormTrigger,
  UseFormWatch,
} from "react-hook-form";

export interface Module {
  id?: string;
  moduleId?: string;
  isGroup: boolean;
  key: string;
  name: string;
  permission?: Permission;
  children?: Module[];
}

export interface ModuleGroupProps {
  module: Module;
  onPermissionChange: (
    moduleKey: string,
    permissions: any,
    parentKey?: string
  ) => void;
}

export interface CreateUserPayload {
  firstName: string;
  lastName: string;
  employeeId: string;
  email?: string;
  countryCode: string;
  phoneNumber: string;
  modules?: any;
  department?: any;
  designationId?: any;
  password?: string;
  confirmPassword?: string;
}

export interface Permission {
  view: boolean;
  create: boolean;
  update: boolean;
  delete: boolean;
}
export interface PersonalInformationProps {
  register: UseFormRegister<CreateUserPayload>;
  watch: UseFormWatch<CreateUserPayload>;
  setValue: UseFormSetValue<CreateUserPayload>;
  trigger: UseFormTrigger<CreateUserPayload>;
  errors: FieldErrors<CreateUserPayload>;
  handleSubmit: (
    onSubmit: SubmitHandler<CreateUserPayload>
  ) => (e?: React.BaseSyntheticEvent) => Promise<void>;
  onSubmit: SubmitHandler<CreateUserPayload>;
  control: Control<CreateUserPayload>;
  allDepartments?: any;
  isDepartmentLoading?: boolean;
  defaultValues?: CreateUserPayload;
  allDesignations?: any;
  modules: Module[];
  isPending?: boolean;
  isModuleLoading: boolean;
  isEdit?: boolean;
  handleUpdateModal?: any;
  localModules?: any;
  setLocalModules?: any;
}

export interface PermissionManagerProps {
  isLoading: boolean;
  modules: Module[];
  setValue: any;
  localModules?: any;
  setLocalModules?: any;
}
export interface userListParams {
  id?: string;
  search?: string;
  limit?: number;
  offset?: number;
  sortBy?: string;
  order?: "ASC" | "DESC";
}

export interface UserDetail {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  firstName: string;
  lastName: string;
  username: string | null;
  employeeId: string;
  email: string;
  countryCode: string;
  phoneNumber: string;
  isAdmin: boolean;
  userType: string;
  departments: DepartmentAssignment[];
  modules: Module[];
}

export interface DepartmentAssignment {
  id: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  department: Department;
  designation: Designation;
}

export interface Department {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  name: string;
  contactPerson: string;
  contactEmail: string;
  contactPhone: string;
}

export interface Designation {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  name: string;
}
