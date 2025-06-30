export const departmentFormField = [
  "name",
  "contactPerson",
  "contactEmail",
  "contactPhone",
];

export const designationFormField = [
  "name",
];


export const info = [
  {
    id: 1,
    department: "It Department",
    name: "Rohan Kulkarni",
    email: "rahul@gmail.com",
    phone: "9824356541",
  },
  {
    id: 2,
    department: "Marketing",
    name: "Sandesh Mehra",
    email: "San@gmail.com",
    phone: "8197765113",
  },
];

export const details = [
  { label: "Department Name ", value: "IT Department " },
  { label: "Contact Person Name", value: "Rahul Sah" },
  { label: "Email Id ", value: "rahul@gmail.com" },
  { label: "Phone Number ", value: "+91 - 7196674113" },
];

type FieldType = {
  name: string;
  label: string;
  type: string;
  placeholder: string;
};

export const fields: FieldType[] = [
  {
    name: "departmentName",
    label: "Department Name",
    type: "text",
    placeholder: "Enter department name",
  },
  {
    name: "contactPerson",
    label: "Contact Person",
    type: "text",
    placeholder: "Enter contact person",
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "Enter email address",
  },
  {
    name: "phoneNumber",
    label: "Phone Number",
    type: "tel",
    placeholder: "Enter phone number",
  },
];

type StatusType = "Approved" | "Pending" | "Rejected" | "Department";

export const statusColors: Record<StatusType, string> = {
  Approved: "text-[#007a6d] bg-[#b2f0e7]",
  Pending: "text-[#9a1a14] bg-[#f8d5d2]",
  Rejected: "text-[#3e1a99] bg-[#d7c7f7]",
  Department: "text-[#664600] bg-[#fff0cc]",
};

type DepartmentStatusItem = {
  id: number;
  name: string;
  contactPerson: string;
  contactEmail: string;
  contactPhone: string;
  status: StatusType;
  designation?: string;
};

type DesignationStatusItem = {
  id: number;
  name: string;
  departmentId: string;
};

export const department: DepartmentStatusItem[] = [
  {
    id: 1,
    name: "Finance",
    contactPerson: "Rohan Kulkarni",
    contactEmail: "rahul@gmail.com",
    contactPhone: "9824356541",
    status: "Approved",
    designation: "HR Manager",
  },
  {
    id: 2,
    name: "Finance",
    contactPerson: "Sandesh Mehra",
    contactEmail: "San@gmail.com",
    contactPhone: "8197765113",
    status: "Pending",
    designation: "Tech Lead",
  },
];

export const USER_COLUMN = [
  { key: "employeeId", label: "Employee Id" },
  { key: "firstName", label: "Employee Name" },
  { key: "email", label: "Email" },
  { key: "phoneNumber", label: "Phone" },
  // { key: "status", label: "Status", type: "status" },
];

export const DEPARTMENT_COLUMN = [
  { key: "name", label: "Department Name" },
  { key: "contactPerson", label: "Contact Person" },
  { key: "contactEmail", label: "Email" },
  { key: "contactPhone", label: "Phone" },
];

export const DESIGNATION_COLUMN = [{ key: "name", label: "Designation" }];

export const designationInfo: DesignationStatusItem[] = [
  {
    id: 1,
    name: "HOD ",
    departmentId: "Dep01",
  },
  {
    id: 2,
    name: "Manager ",
    departmentId: "Dep01",
  },
  {
    id: 3,
    name: "General Manager ",
    departmentId: "Dep01",
  },
  {
    id: 4,
    name: "Director ",
    departmentId: "Dep01",
  },
];

export type DepartmentTab = "Users" | "Designation";

export const countryCodesWithLength: Record<string, number> = {
  "93": 9, // Afghanistan
  "355": 9, // Albania
  "213": 9, // Algeria
  "376": 6, // Andorra
  "244": 9, // Angola
  "672": 6, // Antarctica
  "54": 8, // Argentina
  "374": 6, // Armenia
  "297": 7, // Aruba
  "1684": 10, // American Samoa
  "1268": 10, // Antigua and Barbuda
  "1264": 10, // Anguilla
  "61": 9, // Australia
  "43": 10, // Austria
  "994": 9, // Azerbaijan
  "973": 8, // Bahrain
  "1242": 10, // Bahamas
  "880": 10, // Bangladesh
  "1246": 10, // Barbados
  "375": 9, // Belarus
  "32": 9, // Belgium
  "501": 7, // Belize
  "229": 8, // Benin
  "975": 8, // Bhutan
  "591": 8, // Bolivia
  "387": 8, // Bosnia and Herzegovina
  "267": 8, // Botswana
  "55": 11, // Brazil
  "246": 8, // British Indian Ocean Territory
  "673": 7, // Brunei
  "359": 9, // Bulgaria
  "226": 8, // Burkina Faso
  "257": 8, // Burundi
  "855": 9, // Cambodia
  "237": 8, // Cameroon
  "238": 7, // Cape Verde
  "236": 8, // Central African Republic
  "235": 8, // Chad
  "56": 9, // Chile
  "86": 11, // China
  "57": 10, // Colombia
  "269": 7, // Comoros
  "243": 9, // Congo (Kinshasa)
  "242": 8, // Congo (Brazzaville)
  "506": 8, // Costa Rica
  "225": 8, // Côte d'Ivoire
  "385": 9, // Croatia
  "53": 8, // Cuba
  "357": 8, // Cyprus
  "420": 9, // Czech Republic
  "45": 8, // Denmark
  "1767": 9, // Dominica
  "253": 8, // Djibouti
  "670": 8, // East Timor
  "593": 9, // Ecuador
  "20": 10, // Egypt
  "503": 8, // El Salvador
  "240": 9, // Equatorial Guinea
  "291": 7, // Eritrea
  "372": 8, // Estonia
  "251": 9, // Ethiopia
  "298": 7, // Faroe Islands
  "679": 7, // Fiji
  "358": 9, // Finland and Alland Islands
  "33": 9, // France
  "689": 8, // French Polynesia
  "594": 7, // French Guiana
  "241": 8, // Gabon
  "220": 7, // Gambia
  "995": 9, // Georgia
  "49": 11, // Germany
  "233": 9, // Ghana
  "350": 8, // Gibraltar
  "30": 10, // Greece
  "1473": 10, // Grenada
  "590": 7, // Guadeloupe
  "1671": 10, // Guam
  "299": 7, // Greenland
  "502": 8, // Guatemala
  "224": 8, // Guinea
  "245": 7, // Guinea-Bissau
  "592": 7, // Guyana
  "509": 8, // Haiti
  "504": 8, // Honduras
  "852": 8, // Hong Kong SAR China
  "36": 9, // Hungary
  "354": 7, // Iceland
  "91": 10, // India
  "62": 10, // Indonesia
  "98": 10, // Iran
  "964": 10, // Iraq
  "353": 9, // Ireland
  "972": 9, // Israel
  "39": 10, // Italy and Vatican City
  "1876": 10, // Jamaica
  "81": 11, // Japan
  "962": 9, // Jordan
  "77": 9, // Kazakhstan
  "254": 9, // Kenya
  "686": 5, // Kiribati
  "383": 8, // Kosovo
  "850": 8, // Korea, North
  "82": 10, // Korea, South
  "965": 8, // Kuwait
  "996": 9, // Kyrgyzstan
  "856": 8, // Laos
  "371": 8, // Latvia
  "961": 8, // Lebanon
  "266": 8, // Lesotho
  "231": 7, // Liberia
  "218": 8, // Libya
  "423": 8, // Liechtenstein
  "370": 8, // Lithuania
  "352": 8, // Luxembourg
  "853": 8, // Macau SAR China
  "389": 8, // Macedonia
  "261": 9, // Madagascar
  "265": 7, // Malawi
  "60": 9, // Malaysia
  "960": 7, // Maldives
  "223": 8, // Mali
  "356": 8, // Malta
  "692": 7, // Marshall Islands
  "596": 8, // Martinique
  "222": 8, // Mauritania
  "230": 7, // Mauritius
  "262": 9, // Mayotte
  "52": 10, // Mexico
  "691": 7, // Micronesia
  "373": 8, // Moldova
  "377": 9, // Monaco
  "976": 8, // Mongolia
  "382": 8, // Montenegro
  "212": 9, // Morocco
  "258": 8, // Mozambique
  "95": 10, // Myanmar
  "264": 8, // Namibia
  "674": 7, // Nauru
  "977": 10, // Nepal
  "31": 10, // Netherlands
  "599": 8, // Netherlands Antilles and Caribean Netherlands and Curacao
  "687": 6, // New Caledonia
  "64": 10, // New Zealand
  "505": 8, // Nicaragua
  "227": 8, // Niger
  "234": 10, // Nigeria
  "683": 5, // Niue
  "47": 8, // Norway
  "968": 8, // Oman
  "92": 10, // Pakistan
  "680": 7, // Palau
  "970": 9, // Palestinian Territories
  "507": 8, // Panama
  "675": 7, // Papua New Guinea
  "595": 9, // Paraguay
  "51": 9, // Peru
  "63": 10, // Philippines
  "48": 9, // Poland
  "351": 9, // Portugal
  "974": 8, // Qatar
  "40": 9, // Romania
  "7": 10, // Russia
  "250": 9, // Rwanda
  "1869": 8, // Saint Kitts and Nevis
  "1758": 8, // Saint Lucia
  "1784": 8, // Saint Vincent and the Grenadines
  "685": 7, // Samoa
  "378": 8, // San Marino
  "239": 7, // São Tomé and Príncipe
  "966": 9, // Saudi Arabia
  "221": 9, // Senegal
  "381": 8, // Serbia
  "248": 7, // Seychelles
  "232": 8, // Sierra Leone
  "65": 8, // Singapore
  "421": 9, // Slovakia
  "386": 8, // Slovenia
  "677": 7, // Solomon Islands
  "252": 8, // Somalia
  "27": 9, // South Africa
  "211": 8, // South Sudan
  "34": 9, // Spain
  "94": 10, // Sri Lanka
  "249": 9, // Sudan
  "597": 7, // Suriname
  "268": 8, // Swaziland
  "46": 9, // Sweden
  "41": 9, // Switzerland
  "963": 9, // Syria
  "886": 9, // Taiwan
  "992": 9, // Tajikistan
  "255": 9, // Tanzania
  "66": 9, // Thailand
  "228": 8, // Togo
  "690": 4, // Tokelau
  "676": 5, // Tonga
  "1868": 8, // Trinidad and Tobago
  "216": 8, // Tunisia
  "90": 10, // Turkey
  "993": 8, // Turkmenistan
  "688": 5, // Tuvalu
  "256": 9, // Uganda
  "380": 9, // Ukraine
  "971": 9, // United Arab Emirates
  "44": 10, // United Kingdom
  "1": 10, // United States and Canada
  "598": 8, // Uruguay
  "998": 9, // Uzbekistan
  "678": 7, // Vanuatu
  "58": 10, // Venezuela
  "84": 10, // Vietnam
  "681": 6, // Wallis and Futuna
  "967": 8, // Yemen
  "260": 9, // Zambia
  "263": 9, // Zimbabwe

  // Add more country codes with their corresponding phone number length
};
