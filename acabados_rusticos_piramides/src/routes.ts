export const ROUTES = {
  LOGIN: "/login",
  DASHBOARD: "/",
  INVENTORY: "/inventory",
  PRODUCTS: "/products",
  SUPPLIERS: "/suppliers",
  CLIENTS: "/clients",
  DISCOUNTS: "/discounts",

  SALES: {
    ROOT: "/sales",
    REGISTER: "/sales/register",
    REPORT: "/sales/report",
  },

  ORDERS: {
    ROOT: "/orders",
    REGISTER: "/orders/register",
    REPORT: "/orders/report",
  },

  ACCOUNT: "/account",
} as const;
