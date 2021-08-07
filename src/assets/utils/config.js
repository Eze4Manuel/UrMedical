// 
const pages = {}

pages.login = '/';
pages.dashboard = '/dashboard';
pages.user = '/user';

pages.CreateSupport = '/user/create-support';
pages.CreatePharmacy = '/user/create-pharmacy';
pages.Support = '/users/support';
pages.Dispatcher = '/users/dispatcher';
pages.Customer = '/users/customer';

// Pharmacy
pages.Pharmacy = '/pharmacies/shop';
pages.Pharmacist = '/pharmacies/pharmacist';
pages.Drug = '/pharmacies/drug';

// Transactions
pages.Payments = '/transactions/payment';
pages.Disputes = '/transactions/dispute';

// Dispatches
pages.CompletedDispatch = '/dispatch/completed';
pages.CancelledDispatch = '/dispatch/cancelled';

const config = {
    api: {
        login: '/auth/login',
        logout: '/auth/logout'
    },
    pages: {
        login: '/',
        dashboard: '/dashboard',
        support: '/support',
        customer: '/customer',
        dispatcher: '/dispatcher',
        product: '/product',
        pharmacy: '/pharmacy',
        settings: '/settings',
        messages: '/messages'
    },
    key: {
        user: '___@clsa_user',
        token: '___@clsa_token'
    },
    userData: {
        email: '',
        phone: '',
        username: '',
        first_name: '',
        last_name: '',
        sex: '',
        age: '',
        occupation: '',
        address: {
            street: '',
            city: '',
        },
        coods: {
            long: '',
            lat: ''
        },
        user_type: '', // superadmin, admin, pharmacy, customer, dispatcher, pharmacist, assistant
        privilege: 2, // 1 = admin, 2 = non_admin
        billing: {},
        pin: '',
        password: '',
        otp: '',
    },
    product_category: [
        ''
    ],
    product_sub_category: [
        ''
    ],
    states: [
        "Abia","Adamawa","Akwa Ibom","Anambra","Bauchi","Bayelsa","Benue","Borno","Cross River","Delta","Ebonyi","Edo","Ekiti","Enugu",
        "Gombe","Imo","Jigawa","Kaduna","Kano","Katsina","Kebbi","Kogi","Kwara","Lagos","Nasarawa","Niger","Ogun","Ondo","Osun",
        "Oyo","Plateau","Pivers","Sokoto","Taraba","Yobe","Zamfara","FCT"
    ]
};


export default config;