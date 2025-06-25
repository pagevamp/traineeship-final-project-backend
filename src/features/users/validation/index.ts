import * as yup from "yup";
import { countryCodesWithLength } from "../constant";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const userCreationValidationSchema = yup.object({
  firstName: yup
    .string()
    .required("First Name is required")
    .max(50, "First Name must be at most 50 characters"),
  lastName: yup
    .string()
    .required("Last Name is required")
    .max(50, "Last Name must be at most 50 characters"),

  password: yup
    .string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-])[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]+$/,
      "Password must be combination of lowercase, uppercase , number and special character "
    )
    .min(8, "Password must be at least 8 characters long")
    .max(50, "Password must be at most 50 characters long"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
  email: yup
    .string()
    .trim()
    .test("email-format", "Invalid email format", (value) => {
      if (!value) return true;
      return emailRegex.test(value);
    })
    .max(100, "Email should not exceed 100 characters")
    .required("Email is required"),
  employeeId: yup
    .string()
    .required("Employee ID is required")
    .max(50, "Employee ID must be at most 50 characters"),

  countryCode: yup.string().required("Country code is required"),
  phoneNumber: yup
    .string()
    .required("Contact Number is required")

    .test("is-valid-number", "Invalid contact number format", function (value) {
      const countryCode: string = this.parent.countryCode; // Assuming countryCode is present in the form values
      const expectedLength: number | undefined =
        countryCodesWithLength[countryCode];
      if (
        !value ||
        expectedLength === undefined ||
        value.length !== expectedLength
      ) {
        return this.createError({
          path: "phoneNumber",
          message: `Contact Number must be ${expectedLength} digits long.`,
        });
      }
      return true;
    }),

  department: yup
    .object({
      label: yup.string().required("Department label is required"),
      value: yup.string().required("Department is required"),
    })
    .required("Department is required"),
  designationId: yup.string().required("Designation is required"),
});

export const userUpdateValidationSchema = yup.object({
  firstName: yup
    .string()
    .required("First Name is required")
    .max(50, "First Name must be at most 50 characters"),
  lastName: yup
    .string()
    .required("Last Name is required")
    .max(50, "Last Name must be at most 50 characters"),

  employeeId: yup
    .string()
    .required("Employee ID is required")
    .max(50, "Employee ID must be at most 50 characters"),

  countryCode: yup.string().required("Country code is required"),
  phoneNumber: yup
    .string()
    .required("Contact Number is required")

    .test("is-valid-number", "Invalid contact number format", function (value) {
      const countryCode: string = this.parent.countryCode; // Assuming countryCode is present in the form values
      const expectedLength: number | undefined =
        countryCodesWithLength[countryCode];
      if (
        !value ||
        expectedLength === undefined ||
        value.length !== expectedLength
      ) {
        return this.createError({
          path: "phoneNumber",
          message: `Contact Number must be ${expectedLength} digits long.`,
        });
      }
      return true;
    }),

  department: yup
    .object({
      label: yup.string().required("Department label is required"),
      value: yup.string().required("Department is required"),
    })
    .required("Department is required"),
  designationId: yup.string().required("Designation is required"),

  // modules: yup
  //   .array()
  //   .of(
  //     yup.object({
  //       permissionId: yup.string().nullable().optional(),
  //       moduleId: yup.string().required(),
  //       isGroup: yup.boolean().required(),
  //       children: yup.array().of(yup.string()).required(),
  //       permission: yup.object({
  //         view: yup.boolean().required(),
  //         create: yup.boolean().required(),
  //         update: yup.boolean().required(),
  //         delete: yup.boolean().required(),
  //       }),
  //     })
  //   )
  //   .optional(),
});
