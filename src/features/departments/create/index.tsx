"use client";
import Child from "@/features/departments/create/form";
import { Resolver, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { departmentCreationValidationSchema } from "../validation";
import { CreateDepartmentPayload } from "../types";
import { useCreateDepartment, useUpdateDepartment } from "../hooks";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/useModal";

const Index = () => {
  const { closeModal } = useModal();
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
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Something went wrong!");
      closeModal();
    },
    onSuccess: () => {
      toast.success("Department Successfully Created!!");
      router.push("/departments");
      closeModal();
    },
  });

  const { mutateAsync: handleUpdate, isPending: isUpdateLoading } =
      useUpdateDepartment({
        onError: (error) => {
          toast.error(error?.response?.data?.message || "Something went wrong!");
        },
        onSuccess: (data) => {
          router.push("/users");
          toast.success("User Updated Successfully!!");
        },
      });
  
    const buildRequestBody = (
      formData: CreateUserPayload,
      existingDepartmentId?: string | null
    ) => {
      const {
        firstName,
        lastName,
        employeeId,
        email,
        countryCode,
        phoneNumber,
        password,
        department,
        designationId,
        modules,
      } = formData;
  
      const departments = [
        {
          ...(existingDepartmentId && { id: existingDepartmentId }),
          department: { id: department?.value },
          designation: { id: designationId },
        },
      ];
  
      return {
        firstName: firstName?.trim(),
        lastName: lastName?.trim(),
        employeeId,
        email,
        countryCode: `+${countryCode}`,
        phoneNumber,
        ...(password && { password }),
        departments,
        modules,
      };
    };
  

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
        designation,
      } = requestObject;

      const reqBody = {
        name: name?.trim(),
        contactPerson: contactPerson,
        contactEmail: contactEmail,
        countryCode: `+${countryCode}`,
        contactPhone: contactPhone,
      };

      await createDepartment(reqBody);
    } catch (error) {
    } finally {
      closeModal();
    }
  };



 
   // Create user handler
   const onSubmit = async (formData: CreateDepartmentPayload) => {
     
       try {
         const reqBody = buildRequestBody(formData);
         await createInternalUser(reqBody);
       } catch (error) {}
    
   };
 
   // Update user handler
   const onUpdate = async (formData: CreateUserPayload) => {
     validateAndProceed(formData.modules, async () => {
       try {
         const existingId = getUserDetail?.departments?.[0]?.id ?? null;
         const reqBody = buildRequestBody(formData, existingId);
         await handleUpdate({ id, body: reqBody });
       } catch (error) {}
     });
   };
 
   // Update confirmation modal
   const handleUpdateModal = (formData: CreateUserPayload) => {
     validateAndProceed(formData.modules, () => {
       showConfirmation({
         title: "Update User?",
         description: "Are you sure you want to update the user details?",
         confirmText: "Yes",
         confirmClassName:
           "font-secondary bg-gradient-to-r from-[#E06518] to-[#E3802A] hover:from-[#E06518] hover:to-[#E06518] transition-all duration-300",
         cancelText: "Cancel",
         isDisabled: isUpdateLoading,
         onConfirm: () => onUpdate(formData),
       });
     });
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
    handleUpdateModal
    onSubmit,
    isPending,
  };

  return <Child {...createDepartmentProps} />;
};

export default Index;
