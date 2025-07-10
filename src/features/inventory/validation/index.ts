import * as Yup from "yup";

export const AddInventorySchema = Yup.object().shape({
  commodityName: Yup.string()
    .matches(
      /^(?![!@#$%^&*()\-+=<>?/,.;:"'[\]{}_\\|~\s]+$)[a-zA-Z0-9!@#$%^&*()\-+=<>?/,.;:"'[\]{}_\\|~\s]+$/,
      "Please provide a valid Product Name"
    )
    .required("Product Name is required")
    .max(100, "Product Name cannot exceed 100 characters"),
  isUnit: Yup.boolean(),
  hsCode: Yup.string()
    .required("HS Code is required")
    .max(50, "HS Code cannot exceed 50 characters"),

  unitOfMeasure: Yup.string().required("Units of Measure is required"),

  productVariations: Yup.array().of(
    Yup.object().shape({
      // stockKeepingUnit: Yup.array().nullable(),
      productSizeName: Yup.string().required("Size is required"),
      price: Yup.string().required("Price is required"),
      inStock: Yup.string().required("Quantity in Stock is required"),
      reOrderPoint: Yup.string().required(
        "Re-order Point is required for Low Stock Alert"
      ),
    })
  ),
  shortDescription: Yup.string().required("Short Description is required"),
  longDescription: Yup.string().required("Long Description is required"),
  productImage: Yup.mixed()
    .required("Product image is required field")
    .test("file", "File is too large", function (file: any) {
      if (!file || file?.length === 0) {
        return this.createError({
          message: "Please upload a product image.",
        });
      }
      if (file) {
        const maxSizeInBytes = 10 * 1024 * 1024; // 10 MB in bytes
        const fileSize = file[0]?.size || 0; // Get the size of the first file

        if (fileSize > maxSizeInBytes) {
          return this.createError({
            message: "Please upload a file smaller than 10 MB.",
          });
        }

        return true; // Validation passes
      }
    }),
  coverImageList: Yup.mixed()
    .test("file", "File is too large", function (files: any) {
      if (!files || files?.length === 0) {
        return true;
      }

      const maxSizeInBytes = 10 * 1024 * 1024; // 10 MB in bytes

      for (const file of files) {
        const fileSize = file?.size || 0; // Get the size of the current file

        if (fileSize > maxSizeInBytes) {
          return this.createError({
            message: "Please upload a file smaller than 10 MB.",
          });
        }
      }

      return true; // Validation passes
    })
    .test(
      "maxFiles",
      "Too many files (Only 5 images can be added)",
      function (value: any) {
        if (!value) {
          return true;
        }

        const maxFiles = 5;
        return value.length <= maxFiles;
      }
    ),

  salesFlyer: Yup.mixed()
    .nullable()
    .test("file", "File is too large", function (file: any) {
      if (!file || file?.length === 0) {
        return true;
      }

      if (file) {
        const maxSizeInBytes = 10 * 1024 * 1024; // 10 MB in bytes
        const fileSize = file[0]?.size || 0; // Get the size of the first file

        if (fileSize > maxSizeInBytes) {
          return this.createError({
            message: "Please upload a sales flyer file smaller than 10 MB.",
          });
        }

        return true;
      }
    }),
});
