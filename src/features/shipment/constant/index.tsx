export const infoData = [
  {
    imgSrc: "/Group 299.svg",
    title: "Total Shipments ",
    number: 5750,
  },
  {
    imgSrc: "/Group 292.svg",
    title: "Pending",
    number: 130,
  },
  {
    imgSrc: "/Group 293.svg",
    title: "Delivered",
    number: 750,
  },
  {
    imgSrc: "/Group 296.svg",
    title: "Cancelled",
    number: 5000,
  },
];

export const SHIPMENT_COLUMN = [
  { key: "date", label: "Date" },
  { key: "job_id", label: "Job ID" },
  { key: "name", label: "Company Name" },
  { key: "email", label: "Email" },
  { key: "phone", label: "Phone" },
  { key: "contact_person", label: "Contact Person" },
  { key: "address", label: "Address" },
];

export const shipmentData = [
  {
    id: 1,
    date: "12/03/2025",
    job_id: "ARCS23456",
    name: "Everestwalk Groups",
    email: "rahul@gmail.com",
    phone: "9824356541",
    contact_person: "Rahul Sen",
    address: "Nepal,Kathmandu",
  },
  {
    id: 2,
    date: "17/04/2025",
    job_id: "ARCS23457",
    name: "SmartSync Solutions",
    email: "San@gmail.com",
    phone: "8197765113",
    contact_person: "Sudip Bannerjee",
    address: "India,Bangalore",
  },
  {
    id: 3,
    date: "12/03/2025",
    job_id: "ARCS23458",
    name: "SmartNagar Pvt. Ltd.",
    email: "rahul@gmail.com",
    phone: "9824356541",
    contact_person: "Sandesh Mehra",
    address: "Dubai",
  },
  {
    id: 4,
    date: "17/04/2025",
    job_id: "ARCS23457",
    name: "SmartLearn Academics",
    email: "San@gmail.com",
    phone: "8197765113",
    contact_person: "Oman",
    address: "Nirmal Kumar",
  },
];

export const DETAIL_COLUMN = [
  { key: "detail_list", label: "Detail List" },
  { key: "shopper_Information", label: "Shopper Information" },
  { key: "consignee_Information", label: "Consignee Information" },
];

export const shipmentDetail = [
  {
    detail_list: "Company Name",
    shopper_Information: "Everestwalk Groups",
    consignee_Information: "Everestwalk Groups",
  },
  {
    detail_list: "Contact Person",
    shopper_Information: "Rahul Sah",
    consignee_Information: "Rahul",
  },
  {
    detail_list: "Contact Number",
    shopper_Information: "+91 9824356541",
    consignee_Information: "+91 9824356541",
  },
  {
    detail_list: "Email ID",
    shopper_Information: "rahul@everestwalk.com",
    consignee_Information: "rahul@everestwalk.com",
  },
  {
    detail_list: "Vat/ TRN Number",
    shopper_Information: "977974423",
    consignee_Information: "67856544676",
  },
  {
    detail_list: "Street 1",
    shopper_Information: "GSR Homes",
    consignee_Information: "GRS Homes",
  },
  {
    detail_list: "Street 2",
    shopper_Information: "Marathalli",
    consignee_Information: "Marathalli",
  },
  {
    detail_list: "City",
    shopper_Information: "Banglore",
    consignee_Information: "Banglore",
  },
  {
    detail_list: "State",
    shopper_Information: "Karnataka",
    consignee_Information: "Karnataka",
  },
  {
    detail_list: "Country",
    shopper_Information: "India",
    consignee_Information: "India",
  },
  {
    detail_list: "Pin Code",
    shopper_Information: "460067",
    consignee_Information: "460067",
  },
];

export const addDetails = [
  {
    bill_no: "Auto098765412233",
    date: "25/05/2025",
    job_id: "ARCS23456",
  },
];

export const pickupDetails = [
  {
    preferred_date: "25/05/2025",
    street_1: "GRS Homies, 7th Cross Road",
    street_2: "Marathalli Colony",
    city: "Bangalore",
    state: "Karnataka",
    country: "India",
    pin_code: "460037",
  },
];

type document = {
  title: string | React.ReactElement;
};

export const documentDetails = [
  {
    id: 1,
    title: "Upload Commercial Invoice",
  },
  {
    id: 2,
    title: "Upload Packaging List",
  },
  {
    id: 3,
    title: "Upload Freight Class",
  },
  {
    id: 4,
    title: (
      <p>
        Certificate of Origin <span className="text-[10px]">(Optional)</span>
      </p>
    ),
  },
  {
    id: 5,
    title: "SABER/COC Certificate",
  },
];

export const shipmentItemDetails = [
  {
    label: "Commodity Name:",
    value: "Shaan Roy",
  },
  {
    label: "",
    value: "",
  },
  { label: "H.S Code:", value: "12345678" },
  { label: "No. of Units / Pallets:", value: "123" },
  { label: "Package Type:", value: "Cartoons" },
  { label: "Gross Weight (kg):", value: "1000" },
  { label: "Net Weight (kg):", value: "800" },
  { label: "Volume (CBM):", value: "40cm x 30cm x 20cm" },
  { label: "Declared Value:", value: "AED 500,000" },
];

export const po_commodity = [
  {
    id: 1,

    po: "09876544321234",
    commodity:
      "20 units of EcoSmart ES-500X air purifiers, packed in 4 shrink-wrapped pallets (5 units each). Each pallet measures 120×100×110 cm with a total gross weight of 800 kg. Non-hazardous consumer electronics. Fragile handle with care. Requires climate-controlled transport. Pickup: Pune. Delivery: Noida.",
  },
];
