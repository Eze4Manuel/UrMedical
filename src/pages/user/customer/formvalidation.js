const formValidation = {}

formValidation.validatCustomerForm = (form, builder, setError) => {
    setError("")
    // validate first name
    if (!form.first_name) {
        return setError("First name is required")
    }
    if (form.first_name < 2) {
        return setError("First name is too short")
    }
    if (form.first_name.length > 45) {
        return setError("First name is too long")
    }
    builder.first_name = form.first_name

    //if last name is not alphabets
    if (!/^[a-z-]+$/i.test(form.last_name)) {
        return setError("Last name should be alphabets only")
    }

    if (!form.last_name) {
        return setError("Last name is required")
    }
    if (form.last_name.length < 2) {
        return setError("Last name is too short")
    }
    if (form.last_name.length > 45) {
        return setError("Last name is too long")
    }
    builder.last_name = form.last_name

    //validate the email
    if (!form.email) {
        return setError("email is required")
    }
    builder.email = form.email

    //validate the phone
    if (!form.phone_number) {
        return setError("phone number is required")
    }
    if (!/^[0-9]+$/.test(form.phone_number)) {
        return setError("Phone number should be digits only")
    }
    if (!/^0/.test(form.phone_number)) {
        return setError("Phone number must start with zero. e.g (070........)")
    }
    if (form.phone_number.length !== 11) {
        return setError("Invalid phone number. Phone number expects 11 digits")
    }
    builder.phone_number = form.phone_number

    // check if home address
    if (form.home_address) {
        if (!/^[\w\s\-\\]+$/i.test(form.home_address)) {
            return setError("No special character allowed for home address")
        }
        builder.home_address = form.home_address
    }
    //check if home area
    if (form.home_area) {
        if (!/^[\w\s\-',]+$/i.test(form.home_area)) {
            return setError("No special character allowed for home area")
        }
        builder.home_area = form.home_area
    }

    //check the password
    if (!form.password) {
        return setError("password is required")
    }
    //check if its above minimum number
    if (form.password.length < 6) {
        return setError("Password must be 6 characters or more")
    }
    //check if its above minimum number
    if (form.password.length > 15) {
        return setError("Password must be less than 15 characters")
    }
    //check if there's capital letter
    if (!/[A-Z]/.test(form.password)) {
        return setError("Password must have atleast one capital letter, one small letter and one number")
    }
    //check if there's small letter
    if (!/[a-z]/.test(form.password)) {
        return setError("Password must have atleast one capital letter, one small letter and one number")
    }
    //check if there's number
    if (!/[0-9]/.test(form.password)) {
        return setError("Password must have atleast one capital letter, one small letter and one number")
    }
    builder.password = form.password

    // set user type
    builder.user_type = "dispatcher"
    // return payload
    return builder
}

formValidation.validatCustomerEditForm = (values, data, builder, setError) => {
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
    // if dob
    if (values.dob !== data.dob) {
        if (!values.dob) {
            return setError("DOB name is unset")
        }
        builder.dob = values.dob
    }
    // check if Gender
    if (values.gender !== data.gender) {
        if (!values.gender) {
            return setError("Gender is unset")
        }
        builder.gender = values.gender
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
    if (Object.keys(builder).length === 0) {
        return setError("No changes to update")
    }
    return builder
}

formValidation.validatePassword = (values, builder, setError) => {
    // validate password
    setError('')
    //check if its above minimum number
    if (!values.new_password) {
        setError("New password is required")
        return
    }
    if (values.new_password.length < 6) {
        setError("New password must be 6 characters or more")
        return
    }
    //check if its above minimum number
    if (values.new_password.length > 15) {
        setError("New assword must be less than 15 characters")
        return
    }
    //check if there's capital letter
    if (!/[A-Z]/.test(values.new_password)) {
        setError("New assword must have atleast one capital letter")
        return
    }
    //check if there's small letter
    if (!/[a-z]/.test(values.new_password)) {
        setError("New assword must have atleast one small letter")
        return
    }
    //check if there's number
    if (!/[0-9]/.test(values.new_password)) {
        setError("New assword must have atleast one number")
        return
    }
    builder.password = values.new_password

    if (!values.confirm_password) {
        setError('Confirm password is required')
        return
    }
    if (values.new_password !== values.confirm_password) {
        setError('Passwords do not match')
        return
    }

    if (Object.keys(builder).length === 0) {
        return setError("No data to update")
    }
    return builder
}

export default formValidation