import URI from "../assets/utils/uri";
import User from './user';
import CreateSupportUser from './user/CreateSupportUser';
import UserSupport from './user/UserSupport';
import Pharmacy from "./pharmacy";
import Customer from "./user/customer/Customer";
import Dispatcher from "./user/dispatcher/index";
import Dashboard from "./dashboard";
import Support from '../pages/user/support/index';
import config from '../assets/utils/config';
import Navbar from "../components/navigation/Navbar";



// Access 1 - super admin, 2 - admin staff
const pages = config.pages;
export const routes = [
    {link: pages.dashboard, Component: Dashboard, access: 1, NavigationBar: Navbar},
    // USERS
    {link: pages.support, Component: Support, access: 1, NavigationBar: Navbar},
    {link: pages.dispatcher, Component: Dispatcher, access: 2, NavigationBar: Navbar},
    {link: URI.Support, Component: UserSupport, access: 1, NavigationBar: Navbar},
    {link: URI.Customer, Component: Customer, access: 2, NavigationBar: Navbar},
    
    {link: URI.Pharmacy, Component: Pharmacy, access: 2, NavigationBar: Navbar},
    {link: URI.CreateSupport, Component: CreateSupportUser, access: 1, NavigationBar: Navbar},
    {link: URI.CreatePharmacy, Component: CreateSupportUser, access: 1, NavigationBar: Navbar},
    {link: `${URI.User}/:id`, Component: User, access: 2, dynamic: true, NavigationBar: Navbar},
]