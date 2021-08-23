const formValidator = {}

// validate user form
formValidator.validateNewPartner = (form, builder, setError) => {
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

     //check pharmacy name
     if (!form.pharmacy_name) {
        return setError("Pharmacy name is required")
     }
     if (form.pharmacy_name.length < 5) {
        return setError("Pharmacy name is too short")
     }
     if (form.pharmacy_name.length > 100) {
        return setError("Pharmacy name is too long")
     }
     builder.pharmacy_name = form.pharmacy_name
     
     
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

     // if city
     if (form.city) {
        if (form.city.length > 20) {
           return setError("City name to long")
        }
        builder.city = form.city
     }
     // if state
     if (form.state) {
        builder.state = form.state
     }

    // set user type
     builder.user_type = "dispatcher"
     // return payload
    return builder
}

export default formValidator