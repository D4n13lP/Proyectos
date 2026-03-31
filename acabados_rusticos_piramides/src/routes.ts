  
export const ROUTES = {
  LOGIN: "/login",
  DASHBOARD: "/",
  INVENTORY: "/inventory",
  // PRODUCTS: "/products",
  //SUPPLIERS: "/suppliers",
  CLIENTS: "/clients",
  // DISCOUNTS: "/discounts",

  PRODUCTS: {
    ROOT: "/products",
    ADD_PRODUCTS: "/products/add",
    PRODUCT_CATALOG: "/products/catalog",
    ADD_PRODUCT: "/products/add-product",
  },

  SUPPLIERS: {
    ROOT: "/suppliers",
    SUPPLIER_DETAIL: "/suppliers/detail",
  },

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

  DISCOUNTS: {
    ROOT: "/discounts",
    PROMOTION: "/discounts/promotions",
    CLIENT_DISCOUNT: "/discounts/clients",
    DISCOUNT_ADJUSTMENT: "/discounts/adjustments",
  },

  ACCOUNT: "/account",
} as const;

  