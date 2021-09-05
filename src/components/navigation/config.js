import conf from '../../assets/utils/config';

const config = {
    sidebar: [
        {
            divider: 'dashboard',
            sub: [
                {name: 'Analytics', icon: 'las la-tachometer-alt', link: conf.pages.dashboard},
                // {name: 'Pharmacies', icon: 'las la-tachometer-alt', link: conf.pages.pharmacyDashboard},
            ]
        },
        {
            divider: 'users',
            sub: [
                {name: 'support', icon: 'las la-user-lock', link: conf.pages.supports},
                {name: 'dispatchers', icon: 'las la-truck', link: conf.pages.dispatchers},
                {name: 'customers', icon: 'las la-users', link: conf.pages.customers},
                {name: 'partners', icon: 'las la-store-alt', link: conf.pages.partners},
            ]
        },
        {
            divider: 'services',
            sub: [
                {name: 'products', icon: 'las la-store-alt', link: conf.pages.products},
                {name: 'transactions', icon: 'las la-book', link: conf.pages.transactions},
                {name: 'trips', icon: 'las la-map-signs', link: conf.pages.trips},
                {name: 'messages', icon: 'lab la-rocketchat', link: conf.pages.messages},

            ]
        },
        {
            divider: 'others',
            sub: [
                {name: 'settings', icon: 'las la-user-cog', link: conf.pages.settings},
                {name: 'logout', icon: 'las la-sign-out-alt', link: conf.pages.login},
            ]
        }
    ],
    navbar: [

    ]
}

export default config;