export const steps = [
  { id: 1, title: "Company Details" },
  { id: 2, title: "Business Activity" },
  { id: 3, title: "Directors" },
  { id: 4, title: "Referrals" },
  { id: 5, title: "Bank Details" },
  { id: 6, title: "Documents" },
  { id: 7, title: "Products" },
];

export const customerFormField = [
  "companyName",
  "companyEmail",
  "companyType",
  "yearOfEstablishment",
  "employeeSize",
  "natureOfBusiness",
  "shipmentType",
  "destinationCountry",
  "directorDetails",
  "financialDirectorDetails",
  "tradeReferenceDetails",
  "bankDetails",
  // "documents",
  "shipmentFtl",
  "shipmentLtl",
  "vehicleType.id",
];

type HeadingsType = {
  id: number;
  title: string | React.ReactElement;
  description: string;
};
export const headings: HeadingsType[] = [
  {
    id: 1,
    title: "Enter your Organization Details",
    description: "Enter accurate details to verify your company.",
  },
  {
    id: 2,
    title: "Enter your Business Activity Details",
    description: "Enter business activity details to verify your company.",
  },

  {
    id: 3,
    title: "Enter your Directors Details",
    description: "Enter accurate details to verify your company.",
  },
  {
    id: 4,
    title: "Enter your Trade References Details",
    description: "Enter accurate details to verify your company.",
  },
  {
    id: 5,
    title: "Enter your Bank Details",
    description: "Enter accurate details to verify your company.",
  },
  {
    id: 6,
    title: "Upload your Documents",
    description: "Upload Valid Documents to verify your company ",
  },
  {
    id: 7,
    title: (
      <span>
        Enter your Products -{" "}
        <span className="text-[#FF811A] text-[22px]"> (Optional)</span>
      </span>
    ),
    description: "Add product details now or skip for later.",
  },
];
export const companyType = [
  { label: "Company", value: "Company" },
  { label: "Company 1", value: "Company 1" },
  { label: "Company 2", value: "Company 2" },
];
export const SHIPMENT_TYPE = [
  {
    label: "LTL",
    value: "LTL",
  },
  {
    label: "FTL",
    value: "FTL",
  },
  {
    label: "Both",
    value: "BOTH",
  },
];
export const TypeOfEquipment = [
  {
    label: "TIR",
    value: "TIR",
  },
  {
    label: "Non TIR",
    value: "Non_TIR",
  },
];
export const ServiceNeeded = [
  {
    label: "All Inclusive",
    value: "ALL_INCLUSIVE",
  },
  {
    label: "Only Freight with Origin Bayan",
    value: "ONLY_FREIGHT_WITH_ORIGIN_BAYAN",
  },
];
export const TRUCK_TYPE = [
  {
    label: "3 Ton",
    value: "3 Ton",
  },
  {
    label: "7 Ton",
    value: "7 Ton",
  },
  {
    label: "10 Ton",
    value: "10 Ton",
  },
  {
    label: "13.5M Box",
    value: "13.5M Box",
  },
  {
    label: "15M Flatbed",
    value: "15M Flatbed",
  },
  {
    label: "Reefer",
    value: "Reefer",
  },
  {
    label: "Low Bed",
    value: "Low Bed",
  },
];
export const CURRENCY = [
  {
    label: "AED",
    value: "AED",
  },
  {
    label: "SAR",
    value: "SAR",
  },
  {
    label: "QAR",
    value: "QAR",
  },
  {
    label: "OMR",
    value: "OMR",
  },
  {
    label: "BHD",
    value: "BHD",
  },
  {
    label: "KWD",
    value: "KWD",
  },
  {
    label: "USD",
    value: "USD",
  },
];

export const BANK_COUNTRY = [
  {
    label: "UAE",
    value: "UAE",
  },
  {
    label: "KSA",
    value: "KSA",
  },
  {
    label: "Qatar",
    value: "Qatar",
  },
  {
    label: "Oman",
    value: "Oman",
  },
  {
    label: "Bahrain",
    value: "Bahrain",
  },
  {
    label: "Kuwait",
    value: "Kuwait",
  },
];
// export const TRUCK_TYPE = [
//   { label: "Dry", value: "Dry" },
//   { label: "Temperature Controlled", value: "Temperature Controlled" },
//   {
//     label: "Temperature Specs (+2 to +8°C, -20°C)",
//     value: "Temperature Specs (+2 to +8°C, -20°C)",
//   },
// ];
export const DESTINATION_COUNTRY = [
  {
    label: "United Arab Emirates",
    value: "United Arab Emirates",
  },
  {
    label: "Oman",
    value: "Oman",
  },
  {
    label: "State of Kuwait",
    value: "State of Kuwait",
  },
  {
    label: "Bahrain",
    value: "Bahrain",
  },
  {
    label: "Qatar",
    value: "Qatar",
  },
  { label: "Saudi Arabia", value: "Saudi Arabia" },
];
export const EMPLOYEE_SIZE = [
  {
    label: "1-10",
    value: "1-10",
  },
  {
    label: "11-50",
    value: "11-50",
  },
  {
    label: "50-100",
    value: "50-100",
  },
  {
    label: "100-500",
    value: "100-500",
  },
  {
    label: "500+",
    value: "500+",
  },
];
export enum CompanyTypeEnum {
  LLC = "LLC",
  SOLE_PROPRIETORSHIP = "SOLE_PROPRIETORSHIP",
  JOINT_VENTURE = "JOINT_VENTURE",
  BRANCH_FOREIGN_COMPANY = "BRANCH_FOREIGN_COMPANY",
  REPRESENTATIVE_OFFICE = "REPRESENTATIVE_OFFICE",
  PJSC = "PJSC",
  PRJSC = "PRJSC",
  LIMITED_PARTNERSHIP = "LIMITED_PARTNERSHIP",
  FZC = "FZC",
  FZE = "FZE",
  OFFSHORE = "OFFSHORE",
  HOLDING = "HOLDING",
  COOPERATIVE_SOCIETY = "COOPERATIVE_SOCIETY",
  NPO_NGO = "NPO_NGO",
  GOV_ENTITY = "GOV_ENTITY",
  SPC = "SPC",
  CIVIL_COMPANY = "CIVIL_COMPANY",
}

export enum NatureOfBusinessEnum {
  MANUFACTURING = "Manufacturing",
  TRADING = "Trading (Import/Export)",
  WHOLESALE_DISTRIBUTION = "Wholesale & Distribution",
  RETAIL = "Retail (E-Commerce & Physical Stores)",
  CONSTRUCTION_CONTRACTING = "Construction & Contracting",
  REAL_ESTATE = "Real Estate & Property Management",
  LOGISTICS_TRANSPORTATION = "Logistics & Transportation",
  WAREHOUSING_STORAGE = "Warehousing & Storage",
  FREIGHT_FORWARDING = "Freight Forwarding & Customs Brokerage",
  IT_SOFTWARE = "Information Technology & Software Services",
  TELECOMMUNICATIONS = "Telecommunications",
  FINANCIAL_INSURANCE = "Financial Services & Insurance",
  BANKING_INVESTMENT = "Banking & Investment",
  LEGAL_CONSULTANCY = "Legal & Consultancy Services",
  ENGINEERING_ARCHITECTURE = "Engineering & Architecture Services",
  HEALTHCARE_MEDICAL = "Healthcare & Medical Services",
  PHARMACEUTICAL_SUPPLIES = "Pharmaceutical & Medical Supplies",
  EDUCATION_TRAINING = "Education & Training",
  FOOD_BEVERAGE = "Food & Beverage Production",
  HOSPITALITY_TOURISM = "Hospitality & Tourism",
  AGRICULTURE_FARMING = "Agriculture & Farming",
  MINING_RESOURCES = "Mining & Natural Resources",
  OIL_GAS_ENERGY = "Oil & Gas / Energy",
  AUTOMOTIVE = "Automotive (Sales, Service & Parts)",
  MEDIA_ADVERTISING = "Media & Advertising",
  TEXTILE_GARMENTS = "Textile & Garments",
  COSMETICS_PERSONAL_CARE = "Cosmetics & Personal Care",
  ENVIRONMENTAL_WASTE = "Environmental & Waste Management",
  SECURITY_SAFETY = "Security & Safety Services",
  NON_PROFIT_NGO = "Non-Profit / NGO / Governmental Organization",
  EVENT_ENTERTAINMENT = "Event Management & Entertainment",
  CHEMICAL_INDUSTRIAL = "Chemical & Industrial Supplies",
  PRINTING_PUBLISHING = "Printing & Publishing",
  MARINE_OFFSHORE = "Marine & Offshore Services",
}

export const CompanyTypeLabelMap: Record<CompanyTypeEnum, string> = {
  [CompanyTypeEnum.LLC]: "LLC – Limited Liability Company",
  [CompanyTypeEnum.SOLE_PROPRIETORSHIP]: "Sole Proprietorship (Establishment)",
  [CompanyTypeEnum.JOINT_VENTURE]: "Joint Venture",
  [CompanyTypeEnum.BRANCH_FOREIGN_COMPANY]: "Branch of a Foreign Company",
  [CompanyTypeEnum.REPRESENTATIVE_OFFICE]: "Representative Office",
  [CompanyTypeEnum.PJSC]: "Public Joint Stock Company (PJSC)",
  [CompanyTypeEnum.PRJSC]: "Private Joint Stock Company (PrJSC)",
  [CompanyTypeEnum.LIMITED_PARTNERSHIP]: "Limited Partnership",
  [CompanyTypeEnum.FZC]: "Free Zone Company (FZC)",
  [CompanyTypeEnum.FZE]: "Free Zone Establishment (FZE)",
  [CompanyTypeEnum.OFFSHORE]: "Offshore Company",
  [CompanyTypeEnum.HOLDING]: "Holding Company",
  [CompanyTypeEnum.COOPERATIVE_SOCIETY]: "Cooperative Society",
  [CompanyTypeEnum.NPO_NGO]: "Non-Profit Organization (NPO/NGO)",
  [CompanyTypeEnum.GOV_ENTITY]: "Government Entity / Semi-Government Entity",
  [CompanyTypeEnum.SPC]: "Single Person Company (SPC)",
  [CompanyTypeEnum.CIVIL_COMPANY]: "Civil Company (Professional Services)",
};

export const NatureOfBusinessLabelMap: Record<NatureOfBusinessEnum, string> = {
  [NatureOfBusinessEnum.MANUFACTURING]: "Manufacturing",
  [NatureOfBusinessEnum.TRADING]: "Trading (Import/Export)",
  [NatureOfBusinessEnum.WHOLESALE_DISTRIBUTION]: "Wholesale & Distribution",
  [NatureOfBusinessEnum.RETAIL]: "Retail (E-Commerce & Physical Stores)",
  [NatureOfBusinessEnum.CONSTRUCTION_CONTRACTING]: "Construction & Contracting",
  [NatureOfBusinessEnum.REAL_ESTATE]: "Real Estate & Property Management",
  [NatureOfBusinessEnum.LOGISTICS_TRANSPORTATION]: "Logistics & Transportation",
  [NatureOfBusinessEnum.WAREHOUSING_STORAGE]: "Warehousing & Storage",
  [NatureOfBusinessEnum.FREIGHT_FORWARDING]:
    "Freight Forwarding & Customs Brokerage",
  [NatureOfBusinessEnum.IT_SOFTWARE]:
    "Information Technology & Software Services",
  [NatureOfBusinessEnum.TELECOMMUNICATIONS]: "Telecommunications",
  [NatureOfBusinessEnum.FINANCIAL_INSURANCE]: "Financial Services & Insurance",
  [NatureOfBusinessEnum.BANKING_INVESTMENT]: "Banking & Investment",
  [NatureOfBusinessEnum.LEGAL_CONSULTANCY]: "Legal & Consultancy Services",
  [NatureOfBusinessEnum.ENGINEERING_ARCHITECTURE]:
    "Engineering & Architecture Services",
  [NatureOfBusinessEnum.HEALTHCARE_MEDICAL]: "Healthcare & Medical Services",
  [NatureOfBusinessEnum.PHARMACEUTICAL_SUPPLIES]:
    "Pharmaceutical & Medical Supplies",
  [NatureOfBusinessEnum.EDUCATION_TRAINING]: "Education & Training",
  [NatureOfBusinessEnum.FOOD_BEVERAGE]: "Food & Beverage Production",
  [NatureOfBusinessEnum.HOSPITALITY_TOURISM]: "Hospitality & Tourism",
  [NatureOfBusinessEnum.AGRICULTURE_FARMING]: "Agriculture & Farming",
  [NatureOfBusinessEnum.MINING_RESOURCES]: "Mining & Natural Resources",
  [NatureOfBusinessEnum.OIL_GAS_ENERGY]: "Oil & Gas / Energy",
  [NatureOfBusinessEnum.AUTOMOTIVE]: "Automotive (Sales, Service & Parts)",
  [NatureOfBusinessEnum.MEDIA_ADVERTISING]: "Media & Advertising",
  [NatureOfBusinessEnum.TEXTILE_GARMENTS]: "Textile & Garments",
  [NatureOfBusinessEnum.COSMETICS_PERSONAL_CARE]: "Cosmetics & Personal Care",
  [NatureOfBusinessEnum.ENVIRONMENTAL_WASTE]:
    "Environmental & Waste Management",
  [NatureOfBusinessEnum.SECURITY_SAFETY]: "Security & Safety Services",
  [NatureOfBusinessEnum.NON_PROFIT_NGO]:
    "Non-Profit / NGO / Governmental Organization",
  [NatureOfBusinessEnum.EVENT_ENTERTAINMENT]:
    "Event Management & Entertainment",
  [NatureOfBusinessEnum.CHEMICAL_INDUSTRIAL]: "Chemical & Industrial Supplies",
  [NatureOfBusinessEnum.PRINTING_PUBLISHING]: "Printing & Publishing",
  [NatureOfBusinessEnum.MARINE_OFFSHORE]: "Marine & Offshore Services",
};

export const getCompanyTypeOptions = () => {
  return Object.entries(CompanyTypeLabelMap).map(([value, label]) => ({
    value,
    label,
  }));
};

export const getNatureOfBusinessOptions = () => {
  return Object.entries(NatureOfBusinessLabelMap).map(([value, label]) => ({
    value,
    label,
  }));
};
