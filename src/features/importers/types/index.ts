import {
  Control,
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormTrigger,
  UseFormWatch,
} from "react-hook-form";

export interface Address {
  street1: string;
  street2: string;
  country: string;
  state: string;
  city: string;
  zipCode: string;
}

export interface NestedIdObject {
  id: string;
}

export interface User {
  firstName: string;
  lastName: string;
  email?: string;
  countryCode?: string;
  phoneNumber?: string;
  password?: string;
  confirmPassword?: string;
}

export interface ImporterPayload {
  netTerm: NestedIdObject;
  leadAssigned?: NestedIdObject;
  customer?: NestedIdObject;
  user: User;
  name: string;
  email?: string;
  countryCode: string;
  phoneNumber?: string;
  taxId: string;
  billingAddress: Address[];
  shippingAddress: Address[];
}

export interface ImporterChildPropsInterface {
  register: UseFormRegister<ImporterPayload>;
  watch: UseFormWatch<ImporterPayload>;
  setValue: UseFormSetValue<ImporterPayload>;
  trigger: UseFormTrigger<ImporterPayload>;
  errors: FieldErrors<ImporterPayload>;
  // handleSubmit: (
  //   onSubmit: SubmitHandler<ImporterPayload>
  // ) => (e?: React.BaseSyntheticEvent) => Promise<void>;
  // onSubmit: SubmitHandler<ImporterPayload>;
  control: Control<ImporterPayload>;
  defaultValues?: ImporterPayload;
  isEdit?: boolean;
  countriesList?: any;
}
