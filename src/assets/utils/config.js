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
        pharmacyDashboard: '/pharmacy-dashboard',
        supports: '/supports',
        customers: '/customers',
        dispatchers: '/dispatcher',
        partners: '/partners',
        pharmacies: '/pharmacies',
        products: '/products',
        transactions: '/transactions',
        trips: '/trips',
        settings: '/settings',
    },
    key: {
        user: '___@clsa_user',
        token: '___@clsa_token'
    },
    userData: {
        email: '',
        phone_number: '',
        username: '',
        first_name: '',
        last_name: '',
        gender: '',
        age: '',
        license_id: '',
        vehicle_id: '',
        vehicle_type: '',
        occupation: '',
        home_address: '',
        city: '',
        home_area: '',
        cords: {
            longitude: '',
            latatitude: ''
        },
        user_type: '', // superadmin, admin, pharmacy, customer, dispatcher, pharmacist, assistant
        privilege: 1, // 1 = admin, 2 = non_admin
        billing: {},
        pin: '',
        password: '',
        otp: '',
        auth_id: '',
        pharmacy_name: '',
        registration_id: '',
        pharmacy_phone_number: '',
        pharmacy_email: '',
        pharmacy_area: '',
        pharmacy_address: '',
        contact_name: '',
        contact_email: '',
        contact_phone_number: '',
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
    ],
    city: [
        'bamburu','mararaba','nyanya','gwarinpa','life camp','gudu','area i', 'wuse',
        'zone 2','zone 4','zone 5','zone 6','gwagwalada','garki','asokoro','kurunduma',
        'jikwoyi','masaka','dawaki','dustse alaji','kubwa','utako','jabi','katampe','katampe extension',
        'karshi','zuba','yoba',
    ],
    gender: [
        'male', 'female', 'other'
    ]
};


export default config;