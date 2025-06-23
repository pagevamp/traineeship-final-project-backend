import {
  FieldErrors,
  SubmitHandler,
  UseFormRegister,
  UseFormSetValue,
  UseFormTrigger,
  UseFormWatch,
} from "react-hook-form";
export type LoginPropsInterface = {
  register: UseFormRegister<{ username: string; password: string }>;
  watch: UseFormWatch<{ username: string; password: string }>;
  setValue: UseFormSetValue<{ username: string; password: string }>;
  trigger: UseFormTrigger<{ username: string; password: string }>;
  errors: FieldErrors<{ username: string; password: string }>;
  handleSubmit: (
    onSubmit: SubmitHandler<{ username: string; password: string }>
  ) => (e?: React.BaseSyntheticEvent) => Promise<void>;
  onSubmit: SubmitHandler<{ username: string; password: string }>;
  isPending: boolean;
};
