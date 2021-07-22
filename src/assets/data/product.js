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