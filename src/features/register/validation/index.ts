import * as Yup from "yup";
import { emailRegex } from "@/constant";

const directorSchema = Yup.array().of(
  Yup.object().shape({
    name: Yup.string()
      .nullable()
      .max(100, "Director Name must be at most 100 characters")
      .test("name-required", "Name is required", function (value, context) {
        const { email, phone } = this.parent;
        const index = context.path?.split("[")[1]?.split("]")[0]; // Extract index from path
        const isFirst = index === "0";
        const isAnyFilled = !!value || !!email || !!phone;

        if (isFirst) {
          // For the first director, always require name
          return !!value;
        }
        // For others: if any filled, require name
        return isAnyFilled ? !!value : true;
      }),

    email: Yup.string()
      .nullable()
      .email("Invalid email format")
      .test("email-required", "Email is required", function (value, context) {
        const { name, phone } = this.parent;
        const index = context.path?.split("[")[1]?.split("]")[0];
        const isFirst = index === "0";
        const isAnyFilled = !!name || !!value || !!phone;

        if (isFirst) {
          return !!value;
        }
        return isAnyFilled ? !!value : true;
      }),

    phone: Yup.string()
      .nullable()
      .test("phone-required", "Phone is required", function (value, context) {
        const { name, email } = this.parent;
        const index = context.path?.split("[")[1]?.split("]")[0];
        const isFirst = index === "0";
        const isAnyFilled = !!name || !!email;

        if (isFirst) {
          return !!value;
        }
        return isAnyFilled ? !!value : true;
      })
      .test(
        "phone-length",
        "Phone number must be between 9 and 15 digits",
        function (value) {
          if (!value) return true; // Skip validation if no value
          return value.length >= 9 && value.length <= 15;
        }
      ),
  })
);

const financialDirectorSchema = Yup.array().of(
  Yup.object().shape({
    name: Yup.string()
      .nullable()
      .max(100, "Finance Manager Name must be at most 100 characters")
      .test("name-required", "Name is required", function (value, context) {
        const { email, phone } = this.parent;
        const index = context.path?.split("[")[1]?.split("]")[0]; // Extract index from path
        const isFirst = index === "0";
        const isAnyFilled = !!value || !!email || !!phone;

        if (isFirst) {
          // For the first director, always require name
          return !!value;
        }
        // For others: if any filled, require name
        return isAnyFilled ? !!value : true;
      }),

    email: Yup.string()
      .nullable()
      .email("Invalid email format")
      .test("email-required", "Email is required", function (value, context) {
        const { name, phone } = this.parent;
        const index = context.path?.split("[")[1]?.split("]")[0];
        const isFirst = index === "0";
        const isAnyFilled = !!name || !!value || !!phone;

        if (isFirst) {
          return !!value;
        }
        return isAnyFilled ? !!value : true;
      }),

    phone: Yup.string()
      .nullable()
      .test("phone-required", "Phone is required", function (value, context) {
        const { name, email } = this.parent;
        const index = context.path?.split("[")[1]?.split("]")[0];
        const isFirst = index === "0";
        const isAnyFilled = !!name || !!email;

        if (isFirst) {
          return !!value;
        }
        return isAnyFilled ? !!value : true;
      })
      .test(
        "phone-length",
        "Phone number must be between 9 and 15 digits",
        function (value) {
          if (!value) return true; // Skip validation if no value
          return value.length >= 9 && value.length <= 15;
        }
      ),
  })
);

const tradeReferenceSchema = Yup.array().of(
  Yup.object().shape({
    referenceName: Yup.string()
      .nullable()
      .max(100, "Reference Name must be at most 100 characters")
      .test(
        "referenceName-required",
        "Reference Name is required",
        function (value, context) {
          const { email, phone, businessAssociation } = this.parent;
          const index = context.path?.split("[")[1]?.split("]")[0]; // Extract index from path
          const isFirst = index === "0";
          const isAnyFilled =
            !!value || !!email || !!phone || !!businessAssociation;

          if (isFirst) {
            return !!value;
          }
          return isAnyFilled ? !!value : true;
        }
      ),
    businessAssociation: Yup.string()
      .nullable()
      .max(100, "Business Association must be at most 100 characters")
      .test(
        "businessAssociation-required",
        "Business Association is required",
        function (value, context) {
          const { email, phone, referenceName } = this.parent;
          const index = context.path?.split("[")[1]?.split("]")[0]; // Extract index from path
          const isFirst = index === "0";
          const isAnyFilled = !!value || !!email || !!phone || !!referenceName;

          if (isFirst) {
            return !!value;
          }
          return isAnyFilled ? !!value : true;
        }
      ),

    email: Yup.string()
      .nullable()
      .email("Invalid email format")
      .test("email-required", "Email is required", function (value, context) {
        const { referenceName, phone, businessAssociation } = this.parent;
        const index = context.path?.split("[")[1]?.split("]")[0];
        const isFirst = index === "0";
        const isAnyFilled =
          !!referenceName || !!value || !!phone || !!businessAssociation;

        if (isFirst) {
          return !!value;
        }
        return isAnyFilled ? !!value : true;
      }),

    phone: Yup.string()
      .nullable()
      .test("phone-required", "Phone is required", function (value, context) {
        const { referenceName, email, businessAssociation } = this.parent;
        const index = context.path?.split("[")[1]?.split("]")[0];
        const isFirst = index === "0";
        const isAnyFilled = !!referenceName || !!email || !!businessAssociation;

        if (isFirst) {
          return !!value;
        }
        return isAnyFilled ? !!value : true;
      })
      .test(
        "phone-length",
        "Phone number must be between 9 and 15 digits",
        function (value) {
          if (!value) return true; // Skip validation if no value
          return value.length >= 9 && value.length <= 15;
        }
      ),
  })
);

const documentsSchema = Yup.array().of(
  Yup.object().shape({
    tradeLicense: Yup.string().required("Trade license is required"),

    vatCertificate: Yup.string().required("VAT certificate is required"),

    passport: Yup.string().required("Passport is required"),

    emiratesId: Yup.string().required("Emirates ID is required"),

    contract: Yup.string().required("Contract is required"),

    // Optional fields
    secuirtyCheck: Yup.string().nullable(), // optional, can be empty or null
    other: Yup.string().nullable(), // optional, can be empty or null
  })
);

const bankSchema = Yup.array().of(
  Yup.object().shape({
    referenceFromBank: Yup.string()
      .required("Reference From Bank is required")
      .max(100, "Reference From Bank must be at most 100 characters"),
    accountHolderName: Yup.string()
      .required("Account Holder Name is required")
      .max(50, "Account Holder Name must be at most 50 characters"),
    bankName: Yup.string()
      .required("Bank Name is required")
      .max(100, "Bank Name must be at most 100 characters"),
    bankBranchNameAndLocation: Yup.string()
      .required("Bank Branch Name And Location is required")
      .max(100, "Bank Branch Name And Location must be at most 100 characters"),
    accountNumber: Yup.string()
      .required("Account Number is required")
      .max(50, "Account Number must be at most 50 characters"),
    iban: Yup.string()
      .required("IBAN is required")
      .test(
        "iban-length-validation",
        "IBAN length must be valid for GCC countries (UAE: 23, KSA: 24, Qatar: 29, Oman: 23, Bahrain: 22, Kuwait: 30)",
        function (value) {
          if (!value) return true; // Skip validation if no value

          const countryIbanLengths = {
            UAE: 23,
            KSA: 24,
            Qatar: 29,
            Oman: 23,
            Bahrain: 22,
            Kuwait: 30,
          };

          const bankCountry = this.parent.bankCountry;

          let expectedLength: number | undefined = undefined;
          if (
            bankCountry &&
            Object.prototype.hasOwnProperty.call(
              countryIbanLengths,
              bankCountry
            )
          ) {
            expectedLength =
              countryIbanLengths[
                bankCountry as keyof typeof countryIbanLengths
              ];
          }

          if (expectedLength) {
            if (value.length !== expectedLength) {
              return this.createError({
                message: `IBAN must be exactly ${expectedLength} characters for ${bankCountry}`,
              });
            }
          } else {
            // Fallback validation for other countries or when destination country is not available
            const length = value.length;
            const validLengths = [22, 23, 24, 29, 30];
            if (!validLengths.includes(length)) {
              return this.createError({
                message:
                  "IBAN length must be valid for GCC countries (UAE: 23, KSA: 24, Qatar: 29, Oman: 23, Bahrain: 22, Kuwait: 30)",
              });
            }
          }

          return true;
        }
      ),
    swiftBicCode: Yup.string()
      .required("Swift Bic Code is required")
      .max(50, "Swift Bic Code must be at most 50 characters"),
    currency: Yup.string().required("Currency is required"),
    bankCountry: Yup.string().required("Bank Country is required"),
    beneficiaryAddress: Yup.string()
      .required("Beneficiary Address is required")
      .max(50, "Beneficiary Address must be at most 50 characters"),
    bankAddress: Yup.string()
      .required("Bank Address is required")
      .max(50, "Bank Address must be at most 50 characters"),
    vatTrnNumber: Yup.string()
      .required("Vat Trn Number is required")
      .max(50, "Vat Trn Number must be at most 50 characters"),
  })
);

const productsSchema = Yup.array().of(
  Yup.object().shape({
    hsCode: Yup.string()
      .nullable()
      .max(100, "HS Code must be at most 100 characters")
      .test(
        "hsCode-required",
        "HS Code is required",
        function (value, context) {
          const { commodityName } = this.parent;
          const index = context.path?.split("[")[1]?.split("]")[0]; // Extract index from path
          const isFirst = index === "0";
          const isAnyFilled = !!value || !!commodityName;

          // if (isFirst) {
          //   return !!value;
          // }
          // For others: if any filled, require name
          return isAnyFilled ? !!value : true;
        }
      ),

    commodityName: Yup.string()
      .nullable()
      .max(100, "Commodity Name must be at most 100 characters")
      .test(
        "commodityName-required",
        "Commodity Name is required",
        function (value, context) {
          const { hsCode } = this.parent;
          const index = context.path?.split("[")[1]?.split("]")[0]; // Extract index from path
          const isFirst = index === "0";
          const isAnyFilled = !!value || !!hsCode;

          // if (isFirst) {
          //   return !!value;
          // }
          // For others: if any filled, require name
          return isAnyFilled ? !!value : true;
        }
      ),
  })
);

export const customerRegisterValidationSchemas: any = [
  Yup.object().shape({
    companyName: Yup.string()
      .required("Company Name is required")
      .max(100, "Company Name must be at most 100 characters"),
    companyEmail: Yup.string()
      .trim()
      .test("email-format", "Invalid email format", (value) => {
        if (!value) return true;
        return emailRegex.test(value);
      })
      .max(100, "Company Email should not exceed 100 characters")
      .required("Company Email is required"),
    companyType: Yup.string().required("Company Type is required"),
    yearOfEstablishment: Yup.string()
      .required("Year Of Establishment is required")
      .min(4, "Year Of Establishment must be minimun 4 digits")
      .max(4, "Year Of Establishment must be at most 4 digits"),
  }),
  Yup.object().shape({
    natureOfBusiness: Yup.string().required("Nature Of Business is required"),
    vehicleType: Yup.object({
      id: Yup.string().required("Vehicle type is required"),
    }),
    destinationCountry: Yup.string().required(
      "Destination Country is required"
    ),
    shipmentType: Yup.string()
      .oneOf(["LTL", "FTL", "BOTH"])
      .required("Shipment Type is required"),

    shipmentFtl: Yup.object()
      .shape({
        noOfTrips: Yup.number()
          .typeError("Number of trips must be a number")
          .min(1, "Number of trips must be at least 1")
          .required("Number of trips is required"),
        typeOfEquipments: Yup.string().required(
          "Type of equipment is required"
        ),
        serviceNeeded: Yup.string().required("Service needed is required"),
        equipmentCapacity: Yup.string().required(
          "Equipment capacity is required"
        ),
      })
      .when("shipmentType", {
        is: (val: string) => val === "FTL" || val === "BOTH",
        then: (schema) => schema.required("FTL shipment details are required"),
        otherwise: (schema) => schema.notRequired().strip(), // strips it from output
      }),

    shipmentLtl: Yup.object()
      .shape({
        noOfShipmentsPerLane: Yup.number()
          .typeError("Shipments per lane must be a number")
          .min(1, "Must be at least 1")
          .required("Number of shipments per lane is required"),
        weightPerShipmentPerLane: Yup.number()
          .typeError("Weight per shipment must be a number")
          .min(1, "Weight must be at least 1")
          .required("Weight per shipment per lane is required"),
      })
      .when("shipmentType", {
        is: (val: string) => val === "LTL" || val === "BOTH",
        then: (schema) => schema.required("LTL shipment details are required"),
        otherwise: (schema) => schema.notRequired().strip(),
      }),
  }),

  Yup.object().shape({
    directorDetails: directorSchema,
    financialDirectorDetails: financialDirectorSchema,
  }),
  Yup.object().shape({
    tradeReferenceDetails: tradeReferenceSchema,
  }),
  Yup.object().shape({
    bankDetails: bankSchema,
  }),
  Yup.object().shape({
    documents: documentsSchema,
  }),
  Yup.object().shape({
    products: productsSchema,
  }),
];
