import * as Yup from "yup";
import { emailRegex } from "@/constant";

const directorSchema = Yup.array()
  .of(
    Yup.object()
      .shape({
        name: Yup.string().nullable(),
        email: Yup.string().nullable(),
        phone: Yup.string().nullable(),
      })
      .test(
        "all-or-none",
        "If one field is filled, all fields (name, email, phone) are required",
        (value) => {
          const { name, email, phone } = value || {};
          const anyFilled = !!name || !!email || !!phone;
          const allFilled = !!name && !!email && !!phone;
          return !anyFilled || allFilled;
        }
      )
  )
  .test(
    "at-least-one-director",
    "At least one director must be provided",
    (arr) =>
      Array.isArray(arr) &&
      arr.some((item) => item?.name && item?.email && item?.phone)
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

    shipmentFtl: Yup.object({
      noOfTrips: Yup.number()
        .typeError("Number of trips must be a number")
        .min(1, "Number of trips must be at least 1")
        .required("Number of trips is required"),
      typeOfEquipments: Yup.string().required("Type of equipment is required"),
      serviceNeeded: Yup.string().required("Service needed is required"),
      equipmentCapacity: Yup.string().required(
        "Equipment capacity is required"
      ),
    }).when("shipmentType", {
      is: (val: string) => val === "FTL" || val === "BOTH",
      then: (schema) => schema.required("FTL shipment details are required"),
      otherwise: (schema) => schema.notRequired(),
    }),

    shipmentLtl: Yup.object({
      noOfShipmentsPerLane: Yup.number()
        .typeError("Shipments per lane must be a number")
        .min(1, "Must be at least 1")
        .required("Number of shipments per lane is required"),
      weightPerShipmentPerLane: Yup.number()
        .typeError("Weight per shipment must be a number")
        .min(1, "Weight must be at least 1")
        .required("Weight per shipment per lane is required"),
    }).when("shipmentType", {
      is: (val: string) => val === "LTL" || val === "BOTH",
      then: (schema) => schema.required("LTL shipment details are required"),
      otherwise: (schema) => schema.notRequired(),
    }),
  }),

  Yup.object().shape({
    directorDetails: directorSchema,
  }),
];
