const users = [
    {
        _id: '60AEF253C7CC333B9E88ADC1', 
        auth_id: '60AEF253C7CC333B9E88ADC1',
        email: 'jane@gmail.com',
        phone_number: '08122012470',
        username: 'superadmin',
        first_name: 'jane',
        last_name: 'doe',
        gender: 'female',
        age: '23',
        occupation: '',
        home_address: 'palm street',
        home_area: 'gwarinpa',
        middle_name: '',
        coods: {
            long: 0.90909,
            lat: 12.90900
        },
        user_type: 'superadmin', // superadmin, admin, pharmacy, customer, dispatcher, pharmacist, assistant
        access_level: 1, // 1 = admin, 2 = non_admin
        billing: {},
        pin: '',
        password: '',
        otp: '',
    },
    {
        _id: '60AEF253C7CC333B9E88ADC2', 
        auth_id: '60AEF253C7CC333B9E88ADC2',
        email: 'john@gmail.com',
        username: 'admin',
        phone_number: '08122012471',
        first_name: 'john',
        last_name: 'doe',
        gender: 'male',
        age: '23',
        occupation: 'support',
        home_address: 'palm street',
        home_area: 'gwarinpa',
        middle_name: '',
        coods: {
            long: 0.90909,
            lat: 12.90900
        },
        user_type: 'admin', // superadmin, admin, pharmacy, customer, dispatcher, pharmacist, assistant
        access_level: 2, // 1 = admin, 2 = non_admin
        billing: {},
        pin: '',
        password: '',
        otp: '',
    },
    {
        _id: '60AEF253C7CC333B9E88ADC3', 
        auth_id: '60AEF253C7CC333B9E88ADC3',
        email: 'kenbilly@gmail.com',
        username: 'ken237',
        phone_number: '08122012472',
        first_name: 'ken',
        last_name: 'billy',
        gender: 'male',
        age: '53',
        occupation: 'business man',
        home_address: '',
        home_area: '',
        middle_name: '',
        coods: {
            long: 0.90909,
            lat: 12.90900
        },
        user_type: 'pharmacy', // superadmin, admin, pharmacy, customer, dispatcher, pharmacist, assistant
        access_level: 1, // 1 = admin, 2 = non_admin
        billing: {
            bui: '60AEF253C7CC333B9E88ADA2',
            no_transactions: 0 
        },
        pin: '1234',
        password: '12345678',
        otp: '',
    },
    {
        _id: '60AEF253C7CC333B9E88ADC4', 
        auth_id: '60AEF253C7CC333B9E88ADC4',
        email: 'farouk@gmail.com',
        username: 'fm390_kehiinde',
        phone_number: '08122012474',
        first_name: 'farouk',
        last_name: 'kehinde',
        gender: 'male',
        age: '40',
        occupation: 'pharmacist',
        home_address: '',
        home_area: '',
        middle_name: '',
        coods: {
            long: 0.90900,
            lat: 2.90900
        },
        billing: {
            bui: '60AEF253C7CC333B9E88ADB1',
            no_transactions: 0 
        },
        user_type: 'pharmacist', // superadmin, admin, pharmacy, customer, dispatcher, pharmacist, assistant
        access_level: 2, // 1 = admin, 2 = non_admin
        pin: '',
        password: '',
        otp: '',
    },
    {
        _id: '60AEF253C7CC333B9E88ADC5', 
        auth_id: '60AEF253C7CC333B9E88ADC5',
        username: 'kunle90',
        email: 'kunle.afolabi@gmail.com',
        phone_number: '08122012475',
        first_name: 'kunle',
        last_name: 'afolabi',
        gender: 'male',
        age: '20',
        occupation: 'dispatcher',
        home_address: 'citec villas',
        home_area: 'gwarinpa',
        middle_name: '',
        coods: {
            long: 0.90909,
            lat: 12.90900
        },
        user_type: 'dispatcher', // superadmin, admin, pharmacy, customer, dispatcher, pharmacist, assistant
        access_level: 1, // 1 = admin, 2 = non_admin
        billing: {
            bui: '60AEF253C7CC333B9E88ADC1',
            no_transactions: 0 
        },
        pin: '',
        password: '',
        otp: '',
    },
    {
        _id: '60AEF253C7CC333B9E88ADC6', 
        auth_id: '60AEF253C7CC333B9E88ADC6',
        username: 'Fatima780',
        email: 'fatima.kajo@gmail.com',
        phone_number: '08122012476',
        first_name: 'fatima',
        last_name: 'kajo',
        gender: 'female',
        age: '28',
        occupation: 'assistant',
        home_address: '',
        home_area: '',
        middle_name: '',
        coods: {
            long: 0.90909,
            lat: 12.90900
        },
        user_type: 'assistant', // superadmin, admin, pharmacy, customer, dispatcher, pharmacist, assistant
        access_level: 1, // 1 = admin, 2 = non_admin
        billing: {
            bui: '60AEF253C7CC333B9E88ADD1',
            no_transactions: 0 
        },
        pin: '',
        password: '',
        otp: '',
    },
    {
        _id: '60AEF253C7CC333B9E88ADC7', 
        auth_id: '60AEF253C7CC333B9E88ADC7',
        username: 'runo111',
        email: 'runor.odeghe@gmail.com',
        phone_number: '08122012477',
        first_name: 'kunle',
        last_name: 'afolabi',
        gender: 'male',
        age: '24',
        occupation: 'doctor',
        home_address: '',
        home_area: '',
        middle_name: '',
        coods: {
            long: 0.90909,
            lat: 12.90900
        },
        user_type: 'customer', // superadmin, admin, pharmacy, customer, dispatcher, pharmacist, assistant
        access_level: 1, // 1 = admin, 2 = non_admin
        billing: {
            bui: '60AEF253C7CC333B9E88ADE1',
            no_transactions: 8 
        },
        pin: '',
        password: '',
        otp: '',
    },
    {
        _id: '60AEF253C7CC333B9E88ADC8', 
        auth_id: '60AEF253C7CC333B9E88ADC8',
        username: 'runo111',
        email: 'chichi.adugo@yahoo.com',
        phone_number: '08122012478',
        first_name: 'chichi',
        last_name: 'chukwuma',
        gender: 'female',
        age: '25',
        occupation: 'lawyer',
        home_address: '',
        home_area: '',
        middle_name: '',
        coods: {
            long: 0.90909,
            lat: 12.90900
        },
        user_type: 'customer', // superadmin, admin, pharmacy, customer, dispatcher, pharmacist, assistant
        access_level: 1, // 1 = admin, 2 = non_admin
        billing: {
            bui: '60AEF253C7CC333B9E88ADF2',
            no_transactions: 19 
        },
        pin: '',
        password: '',
        otp: '',
    },
    {
        _id: '60AEF253C7CC333B9E88AD001', 
        auth_id: '60AEF253C7CC333B9E88001',
        username: 'runo111',
        email: 'chichi.adugo@yahoo.com',
        phone_number: '08122012478',
        first_name: 'chichi',
        last_name: 'chukwuma',
        gender: 'female',
        age: '25',
        occupation: 'lawyer',
        home_address: '',
        home_area: '',
        middle_name: '',
        coods: {
            long: 0.90909,
            lat: 12.90900
        },
        user_type: 'customer', // superadmin, admin, pharmacy, customer, dispatcher, pharmacist, assistant
        access_level: 1, // 1 = admin, 2 = non_admin
        billing: {
            bui: '60AEF253C7CC333B9E88001',
            no_transactions: 19 
        },
        pin: '',
        password: '',
        otp: '',
    },
    {
        _id: '60AEF253C7CC333B9E88A002', 
        auth_id: '60AEF253C7CC333B9E88A002',
        username: 'runo111',
        email: 'chichi.adugo@yahoo.com',
        phone_number: '08122012478',
        first_name: 'chichi',
        last_name: 'chukwuma',
        gender: 'female',
        age: '25',
        occupation: 'lawyer',
        home_address: '',
        home_area: 'dede',
        middle_name: '',
        coods: {
            long: 0.90909,
            lat: 12.90900
        },
        user_type: 'customer', // superadmin, admin, pharmacy, customer, dispatcher, pharmacist, assistant
        access_level: 1, // 1 = admin, 2 = non_admin
        billing: {
            bui: '60AEF253C7CC333B9E88A002',
            no_transactions: 19 
        },
        pin: '',
        password: '',
        otp: '',
    },
    {
        _id: '60AEF253C7CC333B9E88A004', 
        auth_id: '60AEF253C7CC333B9E88A004',
        username: 'runo111',
        email: 'chichi.adugo@yahoo.com',
        phone_number: '08122012478',
        first_name: 'chichi',
        last_name: 'chukwuma',
        gender: 'female',
        age: '25',
        occupation: 'lawyer',
        home_address: '',
        home_area: '',
        middle_name: '',
        coods: {
            long: 0.90909,
            lat: 12.90900
        },
        user_type: 'customer', // superadmin, admin, pharmacy, customer, dispatcher, pharmacist, assistant
        access_level: 1, // 1 = admin, 2 = non_admin
        billing: {
            bui: '60AEF253C7CC333B9E88A004',
            no_transactions: 19 
        },
        pin: '',
        password: '',
        otp: '',
    },
    {
        _id: '60AEF253C7CC333B9E88A005', 
        auth_id: '60AEF253C7CC333B9E88A005',
        username: 'runo111',
        email: 'chichi.adugo@yahoo.com',
        phone_number: '08122012478',
        first_name: 'chichi',
        last_name: 'chukwuma',
        gender: 'female',
        age: '25',
        occupation: 'lawyer',
        home_address: 'palm street',
        home_area: 'gwarinpa',
        middle_name: '',
        coods: {
            long: 0.90909,
            lat: 12.90900
        },
        user_type: 'customer', // superadmin, admin, pharmacy, customer, dispatcher, pharmacist, assistant
        access_level: 1, // 1 = admin, 2 = non_admin
        billing: {
            bui: '60AEF253C7CC333B9E88A005',
            no_transactions: 19 
        },
        pin: '',
        password: '',
        otp: '',
    },
    {
        _id: '60AEF253C7CC333B9E88A006', 
        auth_id: '60AEF253C7CC333B9E88A006',
        username: 'runo111',
        email: 'chichi.adugo@yahoo.com',
        phone_number: '08122012478',
        first_name: 'chichi',
        last_name: 'chukwuma',
        gender: 'female',
        age: '25',
        occupation: 'lawyer',
        home_address: '',
        home_area: '',
        middle_name: '',
        coods: {
            long: 0.90909,
            lat: 12.90900
        },
        user_type: 'customer', // superadmin, admin, pharmacy, customer, dispatcher, pharmacist, assistant
        access_level: 1, // 1 = admin, 2 = non_admin
        billing: {
            bui: '60AEF253C7CC333B9E88A006',
            no_transactions: 19 
        },
        pin: '',
        password: '',
        otp: '',
    },
]

export default users;