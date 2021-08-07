import Pharmacy from "./pharmacy";
import Customer from "./user/customer/Customer";
import Dispatcher from "./user/dispatcher/index";
import Dashboard from "./dashboard";
import Support from '../pages/user/support/index';
import config from '../assets/utils/config';
import Navbar from "../components/navigation/Navbar";
import Trip from "../pages/trips/Trip";
import Setting from "../pages/settings/Setting";
import Transaction from "../pages/transaction/Transaction";
import Message from "../pages/message/Message";
import Partner from "../pages/user/partner/Partner";

// Access 1 - super admin, 2 - admin staff
const pages = config.pages;
export const routes = [
    {link: pages.dashboard, Component: Dashboard, access: 1, NavigationBar: Navbar},
    {link: pages.supports, Component: Support, access: 1, NavigationBar: Navbar},
    {link: pages.dispatchers, Component: Dispatcher, access: 2, NavigationBar: Navbar},
    {link: pages.customers, Component: Customer, access: 2, NavigationBar: Navbar},
    {link: pages.partners, Component: Partner, access: 2, NavigationBar: Navbar},
    {link: pages.pharmacies, Component: Pharmacy, access: 2, NavigationBar: Navbar},
    {link: pages.transactions, Component: Transaction, access: 2, NavigationBar: Navbar},
    {link: pages.trips, Component: Trip, access: 2, NavigationBar: Navbar},
    {link: pages.settings, Component: Setting, access: 2, NavigationBar: Navbar},
    {link: pages.messages, Component: Message, access: 2, NavigationBar: Navbar},
]