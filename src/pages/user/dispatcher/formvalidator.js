const formValidator = {}

formValidator.validateLicenseUpdate = (values, data, builder, setError) => {
    setError("")
    // check vehicle ID
    if (values.vehicle_id !== data.vehicle_id) {
        if (values.vehicle_id.length === 0) {
            return setError("Vehicle ID is required")
        }
        if (values.vehicle_id.length < 6) {
            return setError("Vehicle ID is too short")
        }
        if (values.vehicle_id.length > 15) {
            return setError("Vehicle ID is too long")
        }
        builder.vehicle_id = values.vehicle_id
    }
    // check dispatcher license ID
    if (values.license_id !== data.license_id) {
        if (values.license_id.length === 0) {
            return setError("License ID is required")
        }
        if (values.license_id.length < 4) {
            return setError("Licence ID is too short")
        }
        if (values.license_id.length > 15) {
            return setError("Vehicle ID is too long")
        }
        builder.license_id = values.license_id
    }
    if (values.vehicle_type !== data.vehicle_type) {
        // check vehicle type 
        if (!values.vehicle_type) {
           return setError("Vehicle type is required")
        }
        if (["motorbike", "car", "bus", "truck"].indexOf(values.vehicle_type) === -1) {
           return setError("Vehicle type should be motobike, car, bus or truck")
        }
        builder.vehicle_type = values.vehicle_type
    }
    
    if (Object.keys(builder).length === 0) {
        return setError("No data changed")
    }
    return builder
}

// validate data update
formValidator.validateDataUpdate = (values, data, builder, setError) => {
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
        // check home area
        if (values.home_area !== data.home_area) {
            if (values.home_address) {
                if (!/^[\w\s\-',]+$/i.test(values.home_area)) {
                    return setError("No special character allowed for home area")
                }
                builder.home_area = values.home_area
            }
        }

        if (Object.keys(builder).length === 0) {
            return setError("No changes to update")
        }
    return builder
}

// validate user form
formValidator.validateNewDispatcher = (form, builder, setError) => {
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

    // optional middle name
    if (form.middle_name) {
        if (form.middle_name.length < 2) {
            return setError("Middle name is too short")
        }
        if (form.middle_name.length > 45) {
            return setError("Middle name is too long")
        }
        //if middle name is not alphabets
        if (!/^[a-z-]+$/i.test(form.middle_name)) {
            return setError("Middle name should be alphabets only")
        }
        builder.middle_name = form.middle_name
    }

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

     if (!form.license_id) {
        return setError("License ID is required")
     }
     if (form.license_id.length < 6) {
        return setError("License ID is too short")
     }
     if (form.license_id.length > 18) {
        return setError("License ID is too long")
     }
     builder.license_id = form.license_id

     // check vehicle ID 
     if (!form.vehicle_id) {
        return setError("Vehicle ID is required")
     }
     if (form.vehicle_id.length < 6) {
        return setError("Vehicle ID is too short")
     }
     if (form.vehicle_id.length > 14) {
        return setError("Vehicle ID is too long")
     }
     builder.vehicle_id = form.vehicle_id
     
     // check vehicle type 
     if (!form.vehicle_type) {
        return setError("Vehicle type is required")
     }
     if (["motorbike", "car", "bus", "truck"].indexOf(form.vehicle_type) === -1) {
        return setError("Vehicle type should be motobike, car, bus or truck")
     }
     builder.vehicle_type = form.vehicle_type

     //if dob
     if (form.dob) {
        if (!/^\d{4}-\d{2}-\d{2}/.test(form.dob)) {
           return setError("Invalid dob. must be in the formate YYYY-MM-DD")
        }
        let sd = form.dob.split("-")
        //check the day
        if (1 > parseInt(sd[2])) {
           return setError("Day of birth must be greater than zero")
        }
        //check the day
        if (parseInt(sd[2]) > 31) {
           return setError("Date of birth can not be greater than 31")
        }
        //check the day
        if (1 > parseInt(sd[1])) {
           return setError("Month of birth must be greater than zero")
        }
        //check the day
        if (parseInt(sd[1]) > 12) {
           return setError("Month of birth can not be greater than 12")
        }
        //check the day
        if ((new Date().getFullYear() - parseInt(sd[0])) < 18) {
           return setError("Year of birth must be more than 18yrs")
        }
        builder.dob = form.dob
     }
     //check if gender comes
     if (form.gender) {
        if (["male", "female"].indexOf(form.gender) === -1) {
           return setError("Invalid gender. must be male or female")
        }
        builder.gender = form.gender
     }
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

export default formValidator