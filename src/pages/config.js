import Customer from "./user/customer/Customer";
import Dispatcher from "./user/dispatcher/index";
import Dashboard from "./dashboard";
import PharamcyDashboard from "./dashboard/PharmacyDashboard";
import Support from '../pages/user/support/index';
import config from '../assets/utils/config';
import Navbar from "../components/navigation/Navbar";
import Setting from "../pages/settings/Setting";
import Transaction from "../pages/transaction/Transaction";
import Partner from "../pages/user/partner/Partner";
import Product from "./product/Product";
import Trip from "./trips/Trip";

// Access 1 - super admin, 2 - admin staff
const pages = config.pages;
export const routes = [
    {link: pages.dashboard, Component: Dashboard, access: 1, NavigationBar: Navbar},
    {link: pages.pharmacyDashboard, Component: PharamcyDashboard, access: 1, NavigationBar: Navbar},
    {link: pages.supports, Component: Support, access: 1, NavigationBar: Navbar},
    {link: pages.dispatchers, Component: Dispatcher, access: 2, NavigationBar: Navbar},
    {link: pages.customers, Component: Customer, access: 2, NavigationBar: Navbar},
    {link: pages.partners, Component: Partner, access: 2, NavigationBar: Navbar},
    {link: pages.products, Component: Product, access: 2, NavigationBar: Navbar},
    {link: pages.transactions, Component: Transaction, access: 2, NavigationBar: Navbar},
    {link: pages.trips, Component: Trip, access: 2, NavigationBar: Navbar},
    {link: pages.settings, Component: Setting, access: 2, NavigationBar: Navbar},
]