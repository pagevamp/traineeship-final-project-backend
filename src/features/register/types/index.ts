import {
  Control,
  FieldErrors,
  SubmitHandler,
  UseFormRegister,
  UseFormSetValue,
  UseFormTrigger,
  UseFormWatch,
  UseFormSetError,
  UseFormClearErrors,
} from "react-hook-form";

export type FieldName =
  | "shipmentFtl.equipmentCapacity"
  | "shipmentFtl.noOfTrips"
  | "shipmentFtl.serviceNeeded"
  | "shipmentFtl.typeOfEquipments"
  | "shipmentLtl.noOfShipmentsPerLane"
  | "shipmentLtl.weightPerShipmentPerLane";

export interface CustomerRegisterBaseProps {
  register: UseFormRegister<UserPayload>;
  watch: UseFormWatch<UserPayload>;
  setValue: UseFormSetValue<UserPayload>;
  trigger: UseFormTrigger<UserPayload>;
  errors: FieldErrors<UserPayload>;
  handleSubmit: (
    onSubmit: SubmitHandler<UserPayload>
  ) => (e?: React.BaseSyntheticEvent) => Promise<void>;
  // onSubmit: SubmitHandler<UserPayload>;
  control: Control<UserPayload>;
  defaultValues: UserPayload;
}

export interface CustomerRegister1Props extends CustomerRegisterBaseProps {
  setError: UseFormSetError<UserPayload>;
  clearErrors: UseFormClearErrors<UserPayload>;
}

export interface CustomerRegister2Props extends CustomerRegisterBaseProps {
  getVehicleType: any;
  isVehicleTypeLoading: boolean;
}

export interface CustomerRegister3Props extends CustomerRegisterBaseProps {
  directorFields: any;
  appendDirector: any;
  removeDirector: any;
  financeFields: any;
  appendFinance: any;
  removeFinance: any;
}

export interface CustomerRegister4Props extends CustomerRegisterBaseProps {
  tradeReferenceFields: any;
  appendTradeReference: any;
  removeTradeReference: any;
}
export interface CustomerRegister5Props extends CustomerRegisterBaseProps {}

export interface CustomerRegister6Props extends CustomerRegisterBaseProps {}

export interface CustomerRegister7Props extends CustomerRegisterBaseProps {
  productFields: any;
  appendProduct: any;
  removeProduct: any;
}
export interface UserPayload {
  vehicleType: {
    id: string;
  };
  products: Product[];
  creditAccountNumber: string;
  companyName: string;
  companyEmail: string;
  companyType: string;
  yearOfEstablishment: string;
  employeeSize?: string | null;
  natureOfBusiness: string;
  shipmentType: string;
  destinationCountry: string[];
  directorDetails?: Director[];
  financialDirectorDetails?: Director[];
  tradeReferenceDetails?: TradeReference[];
  bankDetails: BankDetail[];
  documents: Document[];
  shipmentFtl?: shipmentFtl;
  shipmentLtl?: shipmentLtl;
  user?: { id?: string };
  transfers?: any;
}

interface shipmentLtl {
  noOfShipmentsPerLane?: number;
  weightPerShipmentPerLane?: number;
}
interface shipmentFtl {
  noOfTrips?: number;
  typeOfEquipments?: string;
  serviceNeeded?: string;
  equipmentCapacity?: string;
}

export interface Product {
  createdBy: {
    id: string;
  };
  hsCode: string;
  commodityName: string;
}

export interface Director {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export interface TradeReference {
  id: string;
  referenceName: string;
  businessAssociation: string;
  phone: string;
  email: string;
}

export interface BankDetail {
  id: string;
  accountHolderName: string;
  bankName: string;
  bankBranchNameAndLocation: string;
  accountNumber: string;
  iban: string;
  swiftBicCode: string;
  currency: string;
  bankCountry: string;
  beneficiaryAddress: string;
  bankAddress: string;
  vatTrnNumber: string;
  referenceFromBank: string;
  uploadCancelledCheque: string;
}

export interface Document {
  id?: string;
  tradeLicense: string;
  vatCertificate: string;
  passport: string;
  emiratesId: string;
  securityCheque?: string;
  contract: string;
  other?: string;
}
