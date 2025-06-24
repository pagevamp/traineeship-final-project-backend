import * as yup from "yup";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
import { countryCodesWithLength } from "../constant";

export const departmentCreationValidationSchema = yup.object({
  name: yup
    .string()
    .required("Department Name is required")
    .max(50, "Department Name must be at most 50 characters"),
  contactPerson: yup
    .string()
    .required("Contact Person Name is required")
    .max(100, "Contact Person Name must be at most 100 characters"),
  contactEmail: yup
    .string()
    .trim()
    .test("email-format", "Invalid email format", (value) => {
      if (!value) return true;
      return emailRegex.test(value);
    })
    .max(100, "Email should not exceed 100 characters")
    .required("Email is required"),
  countryCode: yup.string().required("Country code is required"),
  contactPhone: yup
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
});
