import URI from "../assets/utils/uri";
import User from '../pages/user';
import CreateSupportUser from '../pages/user/CreateSupportUser';
import UserSupport from './user/UserSupport';
import UserPartner from './user/UserPartner';
import UserBenefactor from './user/UserBenefactor';
import Pharmacy from "./pharmacy";

import Navbar from "../components/navigation/Navbar";


// Access 1 - super admin, 2 - support staff

export const routes = [
    {link: URI.Pharmacy, Component: Pharmacy, access: 2, NavigationBar: Navbar},
    {link: URI.Patient, Component: UserBenefactor, access: 2, NavigationBar: Navbar},
    {link: URI.Dispatcher, Component: UserPartner, access: 2, NavigationBar: Navbar},
    {link: URI.Support, Component: UserSupport, access: 1, NavigationBar: Navbar},
    {link: URI.CreateSupport, Component: CreateSupportUser, access: 1, NavigationBar: Navbar},
    {link: URI.CreatePharmacy, Component: CreateSupportUser, access: 1, NavigationBar: Navbar},
    {link: `${URI.User}/:id`, Component: User, access: 2, dynamic: true, NavigationBar: Navbar},
]