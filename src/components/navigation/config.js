import URI from "../../assets/utils/uri";

const config = {
    sidebar: [
        {
            divider: 'dashboard',
            sub: [{name: 'Analytics', icon: 'las la-tachometer-alt', link: URI.dashboard}]
        },
        {
            divider: 'users',
            sub: [
                {name: 'support', icon: 'las la-users', link: URI.Support},
                {name: 'dispatchers', icon: 'las la-users', link: URI.Dispatcher},
                {name: 'customers', icon: 'las la-users', link: URI.Patient},
            ]
        },
        {
            divider: 'pharmacy',
            sub: [
                {name: 'pharmacies', icon: 'las la-store-alt', link: URI.Pharmacy},
                {name: 'pharmcists', icon: 'las la-prescription', link: URI.Pharmacist},
                {name: 'drugs', icon: 'las la-mortar-pestle', link: URI.Drug},
            ]
        },
        {
            divider: 'Transactions',
            sub: [
                {name: 'payments', icon: 'las la-money-bill', link: URI.Payments},
                {name: 'disputes', icon: 'las la-book', link: URI.Disputes},
            ]
        },
        {
            divider: 'dispatches',
            sub: [
                {name: 'completed', icon: 'las la-check-double', link: URI.CompletedDispatch},
                {name: 'cancelled', icon: 'las la-ban', link: URI.CancelledDispatch},
            ]
        }
    ],
    navbar: [

    ]
}

export default config;