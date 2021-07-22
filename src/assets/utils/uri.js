const URI = {};

URI.login = '/';

URI.dashboard = '/dashboard';

// Users
URI.users = {}

URI.User = '/user';
URI.CreateSupport = '/user/create-support';
URI.CreatePharmacy = '/user/create-pharmacy';
URI.Support = '/users/support';
URI.Dispatcher = '/users/dispatcher';
URI.Customer = '/users/customer';

// Pharmacy
URI.Pharmacy = '/pharmacies/shop';
URI.Pharmacist = '/pharmacies/pharmacist';
URI.Drug = '/pharmacies/drug';

// Transactions
URI.Payments = '/transactions/payment';
URI.Disputes = '/transactions/dispute';

// Dispatches
URI.CompletedDispatch = '/dispatch/completed';
URI.CancelledDispatch = '/dispatch/cancelled';

export default URI;