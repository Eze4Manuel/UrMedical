import URI from "../assets/utils/uri";
import User from './user';
import CreateSupportUser from './user/CreateSupportUser';
import UserSupport from './user/UserSupport';
import UserPartner from './user/UserPartner';
import Pharmacy from "./pharmacy";

import Customer from "./user/customer/Customer";
import Dashboard from "./dashboard";

import Navbar from "../components/navigation/Navbar";


// Access 1 - super admin, 2 - support staff

export const routes = [
    {link: URI.dashboard, Component: Dashboard, access: 1, NavigationBar: Navbar},
    {link: URI.Pharmacy, Component: Pharmacy, access: 2, NavigationBar: Navbar},
    {link: URI.Customer, Component: Customer, access: 2, NavigationBar: Navbar},
    {link: URI.Dispatcher, Component: UserPartner, access: 2, NavigationBar: Navbar},
    {link: URI.Support, Component: UserSupport, access: 1, NavigationBar: Navbar},
    {link: URI.CreateSupport, Component: CreateSupportUser, access: 1, NavigationBar: Navbar},
    {link: URI.CreatePharmacy, Component: CreateSupportUser, access: 1, NavigationBar: Navbar},
    {link: `${URI.User}/:id`, Component: User, access: 2, dynamic: true, NavigationBar: Navbar},
]