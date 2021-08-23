const formValidator = {}

// validate pharmacy form
formValidator.validatePharmacyUpdate = (form, values, builder, setError) => {
    setError("")
    
    //check pharmacy name
     if (form.name !== values.name) {
        if (!form.name) {
            return setError("Pharmacy name is required")
         }
         if (form.name.length < 5) {
            return setError("Pharmacy name is too short")
         }
         if (form.name.length > 100) {
            return setError("Pharmacy name is too long")
         }
         builder.name = form.name
     }
     
     // CAC REG
     if (form.registration_id !== values.registration_id) {
        if (form.registration_id) {
            if (form.registration_id.length < 6) {
                return setError("CAC registration number is too short")
            }
            if (form.registration_id.length > 15) {
                return setError("CAC registration number is too long")
            }
            builder.registration_id = form.registration_id
        }   
    }

    //validate the phone
     if (form.phone !== values.phone) {
        if (!form.phone) {
            return setError("Pharmacy phone number is required")
         }
         if (!/^[0-9]+$/.test(form.phone)) {
            return setError("Pharmacy Phone number should be digits only")
         }
         if (!/^0/.test(form.phone)) {
            return setError("Pharmacy Phone number must start with zero. e.g (070........)")
         }
         if (form.phone.length !== 11) {
            return setError("Invalid pharmacy phone number. Pharmacy phone number expects 11 digits")
         }
         builder.phone = form.phone
     }

     //validate the email
     if (form.email !== values.email) {
        if (!form.pharmacy_email) {
            return setError("Pharmacy email is required")
         }
         builder.email = form.email    
    }
    
    // if city
    if (form.city !== values.city) {
        if (!form.city) {
            return setError("City name is required")
        }
        if (form.city.length > 20) {
            return setError("City name to long")
        }
        builder.city = form.city
    }

    //check if home area
    if (form.area !== values.area) {
        if (!form.area) {
            return setError("Pharmacy area is required")
        }
        if (!/^[\w\s\-',]+$/i.test(form.area)) {
            return setError("No special character allowed for home area")
        }
        builder.area = form.area
    }
    
    // check if home address
    if (form.address !== values.address) {
        if (!form.address) {
            return setError("Pharmacy address is required")
        }
        if (!/^[\w\s\-\\]+$/i.test(form.address)) {
            return setError("No special character allowed for pharmacy address")
        }
        builder.address = form.address
    }

    if (Object.keys(builder).length === 0) {
        return setError("No changes to update") 
    }
    
    // return payload
    return builder
}

// validate pharmacy form
formValidator.validateNewPartner = (form, builder, setError) => {
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
     
     // CAC REG
    if (form.registration_id) {
        if (form.registration_id.length < 6) {
            return setError("CAC registration number is too short")
        }
        if (form.registration_id.length > 15) {
            return setError("CAC registration number is too long")
        }
        builder.registration_id = form.registration_id
    }

    //validate the phone
     if (!form.pharmacy_phone) {
        return setError("Pharmacy phone number is required")
     }
     if (!/^[0-9]+$/.test(form.pharmacy_phone)) {
        return setError("Pharmacy Phone number should be digits only")
     }
     if (!/^0/.test(form.pharmacy_phone)) {
        return setError("Pharmacy Phone number must start with zero. e.g (070........)")
     }
     if (form.pharmacy_phone.length !== 11) {
        return setError("Invalid pharmacy phone number. Pharmacy phone number expects 11 digits")
     }
     builder.pharmacy_phone_number = form.pharmacy_phone

     //validate the email
     if (!form.pharmacy_email) {
        return setError("Pharmacy email is required")
     }
     builder.pharmacy_email = form.pharmacy_email

    // if city
    if (!form.city) {
        return setError("City name is required")
    }
    if (form.city.length > 20) {
        return setError("City name to long")
    }
    builder.city = form.city

    //check if home area
    if (!form.pharmacy_area) {
        return setError("Pharmacy area is required")
    }
    if (!/^[\w\s\-',]+$/i.test(form.pharmacy_area)) {
        return setError("No special character allowed for home area")
    }
    builder.pharmacy_area = form.pharmacy_area
    
    // check if home address
    if (!form.pharmacy_address) {
        return setError("Pharmacy address is required")
    }
    if (!/^[\w\s\-\\]+$/i.test(form.pharmacy_address)) {
        return setError("No special character allowed for pharmacy address")
    }
    builder.pharmacy_address = form.pharmacy_address
    
    // set user type
    builder.user_type = "pharmacy"
    
    // return payload
    return builder
}

export default formValidator