import * as yup from "yup";

export const AddInventorySchema = yup.object().shape({
  title: yup
    .string()
    .trim()
    .transform((value) => (value === "" ? null : value))
    .max(50, "Idea Title must be at most 50 characters")
    .required("Idea Title is required"),
});
