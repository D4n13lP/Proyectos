import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './layouts/Layout'
import { ROUTES } from "./routes";

import AccountDisplay_Page from './views/AccountDisplay_Page'
import AddProducts_Page from './views/AddProducts_Page'
import AddProduct_Page from './views/AddProduct_Page'
import Clients_Page from './views/Clients_Page'
import DashboardPage from './views/DashboardPage'
import Deliverymen_Page from './views/Deliverymen_Page'
import Discounts_Page from './views/Discounts_Page'
import PromotionSetupPage from './views/PromotionSetupPage'
import ClientsDiscountPage from './views/ClientsDiscountPage'
import DiscountAdjustmentPage from './views/DiscountAdjustmentPage'

import LoginDisplay_Page from './views/LoginDisplay_Page'
import ManageAccount_Page from './views/ManageAccount_Page'
import Orders_Page from './views/Orders_Page'
import OrdersReports_Page from './views/OrdersReports_Page'
import Products_Page from './views/Products_Page'
import RegisterDestinationAccount_Page from './views/RegisterDestinationAccount_Page'
import RegisterOrder_Page from './views/RegisterOrder_Page'
import RegisterProducts_Page from './views/RegisterProducts_Page'
import RegisterSale_Page from './views/RegisterSale_Page'
import Sales_and_orders_Page from './views/Sales_and_orders_Page'
import SalesReport_Page from './views/SalesReport_Page'
import Suppliers_Page from './views/Suppliers_Page'
import SupplierDetail_Page from './views/SupplierDetail_Page';
import UpdateOrder_Page from './views/UpdateOrder_Page'
import WatchProducts_Page from './views/WatchProducts_Page'
import Inventory_Page from './views/Inventory_Page';
import ProductCatalog_Page from './views/ProductCatalog_Page';




export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Login fuera del layout */}
        <Route path="/login" element={<LoginDisplay_Page />} />

        {/* App principal */}
        <Route element={<Layout />}>
          <Route index element={<DashboardPage />} />

          <Route path="account" element={<AccountDisplay_Page />} />
          <Route path={ROUTES.PRODUCTS.ADD_PRODUCTS} element={<AddProducts_Page />} />
          <Route path={ROUTES.CLIENTS} element={<Clients_Page />} />
          <Route path="deliverymen" element={<Deliverymen_Page />} />
          <Route path={ROUTES.DISCOUNTS.ROOT} element={<Discounts_Page />} />
          <Route path={ROUTES.DISCOUNTS.PROMOTION} element={<PromotionSetupPage />} />
          <Route path={ROUTES.DISCOUNTS.CLIENT_DISCOUNT} element={<ClientsDiscountPage />} />
          <Route path={ROUTES.DISCOUNTS.DISCOUNT_ADJUSTMENT} element={<DiscountAdjustmentPage />} />
          <Route path={ROUTES.INVENTORY} element={<Inventory_Page />} />
          <Route path="account/manage" element={<ManageAccount_Page />} />
          <Route path={ROUTES.ORDERS.ROOT} element={<Orders_Page />} />
          <Route path={ROUTES.ORDERS.REPORT} element={<OrdersReports_Page />} />
          <Route path={ROUTES.PRODUCTS.ROOT} element={<Products_Page />} />
          <Route path={ROUTES.PRODUCTS.PRODUCT_CATALOG} element={<ProductCatalog_Page />}/>
          <Route path={ROUTES.PRODUCTS.ADD_PRODUCT} element={<AddProduct_Page />} />
          <Route path="orders/register" element={<RegisterOrder_Page />} />
          <Route path="products/register" element={<RegisterProducts_Page />} />
          <Route path="sales/register" element={<RegisterSale_Page />} />
          <Route path="sales" element={<Sales_and_orders_Page />} />
          <Route path={ROUTES.SALES.REPORT} element={<SalesReport_Page />} />
          <Route path="suppliers" element={<Suppliers_Page />} />
          <Route path={ROUTES.SUPPLIERS.SUPPLIER_DETAIL} element={<SupplierDetail_Page />} />
          <Route path="orders/update" element={<UpdateOrder_Page />} />
          <Route path="products/watch" element={<WatchProducts_Page />} />
          <Route path='destinationAccount/register' element={<RegisterDestinationAccount_Page/>} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

