import { Icon } from "@iconify/react/dist/iconify.js";

export const LINKS = [
  {
    title: "Terms & Conditions",
    href: "/termsandconditions",
  },
  {
    title: "Privacy Policy",
    href: "/privacypolicy",
  },
];

// Define navigation items with role-based access
export const navigationItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: (props: any) => (
      <Icon
        icon="lineicons:dashboard-square-1"
        width="25"
        height="24"
        {...props}
      />
    ),
    roles: ["admin", "manager", "user"],
  },
  {
    title: "Sales",
    href: "/sales",
    icon: (props: any) => (
      <Icon icon="carbon:sales-ops" width="32" height="32" {...props} />
    ),
    roles: ["admin", "manager"],
  },
  {
    title: "Staffs",
    href: "/staff",
    icon: (props: any) => (
      <Icon icon="mingcute:department-fill" width="24" height="24" {...props} />
    ),
    roles: ["admin", "manager"],
  },
  {
    title: "Teams",
    href: "/teams",
    icon: (props: any) => (
      <Icon icon="material-symbols:groups" width="24" height="24" {...props} />
    ),
    roles: ["admin", "manager"],
  },
  {
    title: "Customers",
    href: "/customer",
    icon: (props: any) => (
      <Icon icon="ix:customer-filled" width="24" height="24" {...props} />
    ),
    roles: ["admin", "manager"],
  },
  {
    title: "Shipments",
    href: "/shipment",
    icon: (props: any) => (
      <Icon icon="mdi:truck-check" width="24" height="24" {...props} />
    ),
    roles: ["admin", "manager"],
  },
  {
    title: "Routes",
    href: "/routes",
    icon: (props: any) => (
      <Icon icon="gis:route" width="24" height="24" {...props} />
    ),
    roles: ["admin", "manager"],
  },
  {
    title: "Users",
    href: "/users",
    icon: (props: any) => (
      <Icon icon="mdi:users" width="24" height="24" {...props} />
    ),
    roles: ["admin", "manager"],
  },
  {
    title: "Importer",
    href: "/consumer",
    icon: (props: any) => (
      <Icon icon="ix:customer-filled" width="24" height="24" {...props} />
    ),
    roles: ["admin", "manager"],
  },
  {
    title: "Departments",
    href: "/department",
    icon: (props: any) => (
      <Icon icon="mingcute:department-fill" width="24" height="24" {...props} />
    ),
    roles: ["admin", "manager"],
  },
  {
    title: "Inventory",
    href: "/inventory",
    icon: (props: any) => (
      <Icon icon="ic:outline-inventory-2" width="24" height="24" {...props} />
    ),
    roles: ["admin", "manager"],
  },
  {
    title: "Orders",
    href: "/orders",
    icon: (props: any) => (
      <Icon
        icon="fluent-mdl2:activate-orders"
        width="24"
        height="24"
        {...props}
      />
    ),
    roles: ["admin", "manager"],
  },
  {
    title: "Products",
    href: "/products",
    icon: (props: any) => (
      <Icon icon="mdi:cart" width="24" height="24" {...props} />
    ),
    roles: ["admin", "manager"],
  },
  {
    title: "Vehicle",
    href: "/vehicle",
    icon: (props: any) => (
      <Icon icon="tdesign:vehicle-filled" width="24" height="24" {...props} />
    ),
    roles: ["admin", "manager"],
  },
  {
    title: "Vendor",
    href: "/vendor",
    icon: (props: any) => (
      <Icon icon="mage:shop" width="24" height="24" {...props} />
    ),
    roles: ["admin", "manager"],
  },
  {
    title: "Driver",
    href: "/driver",
    icon: (props: any) => (
      <Icon icon="ant-design:car-outlined" width="24" height="24" {...props} />
    ),
    roles: ["admin", "manager"],
  },
  {
    title: "Settings",
    href: "/settings",
    icon: (props: any) => (
      <Icon icon="ic:baseline-settings" width="24" height="24" {...props} />
    ),
    roles: ["admin", "manager"],
  },
  // {
  //   title: "User Management",
  //   icon: Users,
  //   roles: ["admin"],
  //   subItems: [
  //     {
  //       title: "All Users",
  //       href: "/dashboard/users",
  //       roles: ["admin"],
  //     },
  //     {
  //       title: "Roles",
  //       href: "/dashboard/users/roles",
  //       roles: ["admin"],
  //     },
  //     {
  //       title: "Permissions",
  //       href: "/dashboard/users/permissions",
  //       roles: ["admin"],
  //     },
  //   ],
  // },
];
