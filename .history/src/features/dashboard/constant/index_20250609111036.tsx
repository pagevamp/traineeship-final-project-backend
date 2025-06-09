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
      <Icon icon="garden:home-fill-16" width="12" height="12" {...props} />
    ),
    roles: ["admin", "manager", "user"],
  },
  {
    title: "Sales",
    href: "/sales",
    icon: (props: any) => (
      <Icon
        icon="icon-park-solid:sales-report"
        width="48"
        height="48"
        {...props}
      />
    ),
    roles: ["admin", "manager"],
  },
  {
    title: "Customer",
    href: "/customer",
    icon: (props: any) => (
      <Icon
        icon="icon-park-solid:sales-report"
        width="48"
        height="48"
        {...props}
      />
    ),
    roles: ["admin", "manager"],
  },
  {
    title: "User",
    href: "/user",
    icon: (props: any) => (
      <Icon
        icon="icon-park-solid:sales-report"
        width="48"
        height="48"
        {...props}
      />
    ),
    roles: ["admin", "manager"],
  },
  {
    title: "Department",
    href: "/department",
    icon: (props: any) => (
      <Icon
        icon="icon-park-solid:sales-report"
        width="48"
        height="48"
        {...props}
      />
    ),
    roles: ["admin", "manager"],
  },
  {
    title: "Inventory",
    href: "/inventory",
    icon: (props: any) => (
      <Icon
        icon="icon-park-solid:sales-report"
        width="48"
        height="48"
        {...props}
      />
    ),
    roles: ["admin", "manager"],
  },
  {
    title: "Orders",
    href: "/orders",
    icon: (props: any) => (
      <Icon
        icon="icon-park-solid:sales-report"
        width="48"
        height="48"
        {...props}
      />
    ),
    roles: ["admin", "manager"],
  },
  {
    title: "Products",
    href: "/products",
    icon: (props: any) => (
      <Icon
        icon="icon-park-solid:sales-report"
        width="48"
        height="48"
        {...props}
      />
    ),
    roles: ["admin", "manager"],
  },
  {
    title: "Settings",
    href: "/settings",
    icon: (props: any) => (
      <Icon
        icon="icon-park-solid:sales-report"
        width="48"
        height="48"
        {...props}
      />
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
