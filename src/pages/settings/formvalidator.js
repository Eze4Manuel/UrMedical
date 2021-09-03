
const formValidation = {}

formValidation.validatProfileUpdate = (values, data, builder, setError) => {
    setError("")
    // check first name
    if (values.first_name !== data.first_name) {
        if (values.first_name.length < 2) {
            return setError("First name is too short")
        }
        if (values.first_name.length > 45) {
            return setError("First name is too long")
        }
        builder.first_name = values.first_name
    }
    // check last name
    if (values.last_name !== data.last_name) {
        if (values.last_name.length < 2) {
            return setError("Last name is too short")
        }
        if (values.last_name.length > 45) {
            return setError("Last name is too long")
        }
        builder.last_name = values.last_name
    }
    // check phone
    if (values.phone_number !== data.phone_number) {
        if (!values.phone_number) {
            return setError("Phone number empty")
        }
        if (!/^[0-9]+$/.test(values.phone_number)) {
            setError("Phone number should be digits only")
        }
        if (!/^0/.test(values.phone_number)) {
            setError("Phone number must start with zero. e.g (070........)")
        }
        if (values.phone_number.length !== 11) {
            setError("Invalid phone number. Phone number expects 11 digits")
        }
        builder.phone_number = values.phone_number
    }
    // check email
    if (values.email !== data.email) {
        if (!values.email) {
            return setError("Email is empty")
        }
        builder.email = values.email
    }
    // check home address
    if (values.home_address !== data.home_address) {
        if (values.home_address) {
            if (!/^[\w\s\-',]+$/i.test(values.home_address)) {
                return setError("No special character allowed for home address")
            }
            builder.home_address = values.home_address
        }
    }
    

    // check gender
    if (values.gender !== data.gender) {
        builder.gender = values.gender
    }
    // check dob
    if (values.dob !== data.dob) {
        builder.dob = values.dob
    } 

    if (Object.keys(builder).length === 0) {
        return setError("No changes to update")
    }
    return builder
}

export default formValidation