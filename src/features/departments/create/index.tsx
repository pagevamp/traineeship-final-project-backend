"use client";
import Child from "@/features/departments/create/form";
import { Resolver, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { departmentCreationValidationSchema } from "../validation";
import { CreateDepartmentPayload } from "../types";
import { useCreateDepartment } from "../hooks";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const Index = () => {
  const router = useRouter();

  const {
    register,
    watch,
    setValue,
    trigger,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateDepartmentPayload>({
    defaultValues: {
      countryCode: "91",
    },
    resolver: yupResolver(
      departmentCreationValidationSchema
    ) as Resolver<CreateDepartmentPayload>,
  });
  const defaultValues = watch();

  const { mutateAsync: createDepartment, isPending } = useCreateDepartment({
    onError: (error, variables, context) => {
      toast.error(error?.response?.data?.message || "Something went wrong!");
    },
    onSuccess: (data) => {
      toast.success("Department Successfully Created!!");
      router.push("/departments");
    },
  });

  const onSubmit = async (formData: CreateDepartmentPayload) => {
    let requestObject: any = {
      ...formData,
    };

    try {
      const {
        name,
        contactPerson,
        contactEmail,
        countryCode,
        contactPhone,
      } = requestObject;

      const reqBody = {
        name: name?.trim(),
        contactPerson: contactPerson,
        contactEmail,
        countryCode: `+${countryCode}`,
        contactPhone,
      };

      await createDepartment(reqBody);
    } catch (error) {
    } finally {
    }
  };

  const createDepartmentProps = {
    register,
    watch,
    setValue,
    trigger,
    control,
    errors,
    defaultValues,
    handleSubmit,
    onSubmit,
    isPending,
  };

  return <Child {...createDepartmentProps} />;
};

export default Index;
