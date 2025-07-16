import { countryCodesWithLength } from "@/features/users/constant";
import * as yup from "yup";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const idRefSchema = yup.object({
  id: yup.string().required("Net Term is required"),
});

const addressSchema = yup.object({
  street1: yup
    .string()
    .required("Street 1 is required")
    .max(50, "Street 1 must be at most 50 characters"),

  street2: yup
    .string()
    .max(50, "Street 2 must be at most 50 characters")
    .nullable(),
  // Optional
  country: yup.string().required("Country is required"),
  state: yup.string().required("State is required"),
  city: yup.string().required("City is required"),
  zipCode: yup
    .string()
    .required("Zip Code is required")
    .max(12, "Zip Code must be at most 12 characters"),
});

const userSchema = yup.object({
  firstName: yup
    .string()
    .required("First Name is required")
    .max(50, "First Name must be at most 50 characters"),
  lastName: yup
    .string()
    .required("Last Name is required")
    .max(50, "Last Name must be at most 50 characters"),
  email: yup
    .string()
    .trim()
    .test("email-format", "Invalid email format", (value) => {
      if (!value) return true;
      return emailRegex.test(value);
    })
    .max(100, "Email must be at most 100 characters")
    .required("Email is required"),
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
          path: "user.phoneNumber",
          message: `Contact Number must be ${expectedLength} digits long.`,
        });
      }
      return true;
    }),
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
});

const updateUserSchema = yup.object({
  firstName: yup
    .string()
    .required("First Name is required")
    .max(50, "First Name must be at most 50 characters"),
  lastName: yup
    .string()
    .required("Last Name is required")
    .max(50, "Last Name must be at most 50 characters"),
});

export const importerPayloadSchema = yup.object({
  netTerm: idRefSchema.required(),
  // leadAssigned: idRefSchema.required(),
  // customer: idRefSchema.required(),
  user: userSchema.required(),
  name: yup
    .string()
    .required("Organization Name is required")
    .max(50, "Organization Name must be at most 50 characters"),

  email: yup
    .string()
    .trim()
    .test("email-format", "Invalid email format", (value) => {
      if (!value) return true;
      return emailRegex.test(value);
    })
    .max(100, "Organization Email must be at most 100 characters")
    .required("Organization Email is required"),

  countryCode: yup.string().required("Country code is required"),
  phoneNumber: yup
    .string()
    .required("Organization Phone is required")

    .test("is-valid-number", "Invalid organization number format", function (value) {
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
          message: `Organization Number must be ${expectedLength} digits long.`,
        });
      }
      return true;
    }),
  taxId: yup
    .string()
    .required("Tax ID is required")
    .max(50, "Tax ID must be at most 50 characters"),

  billingAddress: yup
    .array()
    .of(addressSchema)
    .min(1, "At least one billing address is required")
    .required("Billing address is required"),
  shippingAddress: yup
    .array()
    .of(addressSchema)
    .min(1, "At least one shipping address is required")
    .required("Shipping address is required"),
});

export const updateImporterPayloadSchema = yup.object({
  netTerm: idRefSchema.required(),
  // leadAssigned: idRefSchema.required(),
  // customer: idRefSchema.required(),
  user: updateUserSchema.required(),
  name: yup
    .string()
    .required("Organization Name is required")
    .max(50, "Organization Name must be at most 50 characters"),

  countryCode: yup.string().required("Country code is required"),

  taxId: yup
    .string()
    .required("Tax ID is required")
    .max(50, "Tax ID must be at most 50 characters"),

  billingAddress: yup
    .array()
    .of(addressSchema)
    .min(1, "At least one billing address is required")
    .required("Billing address is required"),
  shippingAddress: yup
    .array()
    .of(addressSchema)
    .min(1, "At least one shipping address is required")
    .required("Shipping address is required"),
});
