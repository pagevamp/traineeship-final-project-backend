import { department } from "./../constant/index";
import {
  Control,
  FieldErrors,
  SubmitHandler,
  UseFormRegister,
  UseFormSetValue,
  UseFormTrigger,
  UseFormWatch,
} from "react-hook-form";

export interface departmentListParams {
  id?: string;
  search?: string;
  limit?: number;
  offset?: number;
  sortBy?: string;
  order?: "ASC" | "DESC";
}

export interface CreateDepartmentPayload {
  name: string;
  contactPerson: string;
  contactEmail: string;
  countryCode: string;
  contactPhone: string;
}

export interface DepartmentInformationProps {
  register: UseFormRegister<CreateDepartmentPayload>;
  watch?: UseFormWatch<CreateDepartmentPayload>;
  setValue: UseFormSetValue<CreateDepartmentPayload>;
  trigger: UseFormTrigger<CreateDepartmentPayload>;
  errors: FieldErrors<CreateDepartmentPayload>;
  handleSubmit: (
    onSubmit: SubmitHandler<CreateDepartmentPayload>
  ) => (e?: React.BaseSyntheticEvent) => Promise<void>;
  onSubmit: SubmitHandler<CreateDepartmentPayload>;
  control: Control<CreateDepartmentPayload>;
  isDepartmentLoading?: boolean;
  defaultValues?: CreateDepartmentPayload;
  isPending?: boolean;
  isEdit?: boolean;
  handleUpdateModal?: any;
  id?: string;
}

export interface CreateDesignationPayload {
  name: string;
  departmentId: string;
}

export interface DesignationInformationProps {
  register: UseFormRegister<CreateDesignationPayload>;
  watch?: UseFormWatch<CreateDesignationPayload>;
  setValue: UseFormSetValue<CreateDesignationPayload>;
  trigger: UseFormTrigger<CreateDesignationPayload>;
  errors: FieldErrors<CreateDesignationPayload>;
  handleSubmit: (
    onSubmit: SubmitHandler<CreateDesignationPayload>
  ) => (e?: React.BaseSyntheticEvent) => Promise<void>;
  onSubmit: SubmitHandler<CreateDesignationPayload>;
  control: Control<CreateDesignationPayload>;
  isDesignationLoading?: boolean;
  defaultValues?: Partial<CreateDesignationPayload>;
  isPending?: boolean;
  isEdit?: boolean;
  handleUpdateModal?: any;
  handleDeleteModal?: any;
}
