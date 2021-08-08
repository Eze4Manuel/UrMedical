export const pharmacyProductAnalytics = {
    
}

export const pharmacyData = [
    {
        _id: '60AEF253C7CC333B9E88ADC1', 
        pharmacy_id: '60AEF253C7CC333B9E88ADC1',
        name: 'jodeg pharmacy',
        products: 300,
        categories: 25,
        ratings: 3.4
    },
    {
        _id: '60AEF253C7CC333B9E88ADC2', 
        pharmacy_id: '60AEF253C7CC333B9E88ADC2',
        name: 'H-Medix',
        products: 120000,
        categories: 820,
        ratings: 4.4
    },
    {
        _id: '60AEF253C7CC333B9E88ADC3', 
        pharmacy_id: '60AEF253C7CC333B9E88ADC3',
        name: 'yankari',
        products: 1200,
        categories: 285,
        ratings: 2.9
    },
    {
        _id: '60AEF253C7CC333B9E88ADC4', 
        pharmacy_id: '60AEF253C7CC333B9E88ADC4',
        name: 'alhaji hassan medix',
        products: 3000,
        categories: 425,
        ratings: 3.1
    },
    {
        _id: '60AEF253C7CC333B9E88ADC1', 
        pharmacy_id: '60AEF253C7CC333B9E88ADC4',
        name: 'Hellem Pharmacy',
        products: 100,
        categories: 25,
        ratings: 4.8
    },
]



const product = [
    {
        _id: '60AEF253C7CC333B9E88ADC1', 
        auth_id: '60AEF253C7CC333B9E88ADC1',
        email: 'jane@gmail.com',
        phone: '08122012470',
        username: 'superadmin',
        first_name: 'jane',
        last_name: 'doe',
        sex: 'female',
        age: '23',
        occupation: '',
        address: {
            street: '',
            city: '',
        },
        coods: {
            long: 0.90909,
            lat: 12.90900
        },
        user_type: 'superadmin', // superadmin, admin, pharmacy, customer, dispatcher, pharmacist, assistant
        privilege: 1, // 1 = admin, 2 = non_admin
        billing: {},
        pin: '',
        password: '',
        otp: '',
    },
]

export default product;