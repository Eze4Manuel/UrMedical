// valid the update data
export const validateProductUpdate = (builder, values, data, setError) => {
    setError("")

    // check name
    if (!values.name) {
        return setError("Product name is required")
    }
    if (values.name !== data.name) {
        if (values.name.length < 3) {
            return setError("Product name is too short")
        }
        if (values.name.length > 150) {
            return setError("Product name is too long. It should not be more than 150 characters")
        }
        builder.name = values.name
    }

    // check price
    if (!values.price) {
        return setError("price is required")
    }
    if (values.price !== data.price) {
        if (!/[+-]?([0-9]*[.])?[0-9]+$/.test(values.price)) {
            return setError("Price should be digits only")
        }
        if (parseFloat(values.price) <= 0) {
            return setError("Price should not be less than 1")
        }
        builder.price = values.price
    }

    // check category
    if (!values.category) {
        return setError("category is required")
    }
    if (values.category !== data.category) {
        if (values.category.length < 3) {
            return setError("Category name is too short")
        }
        if (values.category.length > 100) {
            return setError("Category name is too long. It should not be more than 100 characters")
        }
        builder.category = values.category
    }

    
    // check discount
    if (values.discount_type !== data.discount_type) {
        if (["percentage", "amount"].indexOf(values.discount_type) === -1) {
            return setError("Discount type is should be percentage or amount")
        }
        builder.discount_type = values.discount_type
    }
  
    // check discount amount
    if (values.discount_amount !== data.discount_amount) {
        if (!/[+-]?([0-9]*[.])?[0-9]+$/.test(values.discount_amount)) {
            return setError("Discount amount is should be digits only")
        }
        if (parseFloat(values.discount_amount) < 0) {
            return setError("Discount amount should not be less than 0")
        }
        builder.discount_amount = values.discount_amount
    }

    // check description
    if (values.description !== data.description) {
        if (values.description.length < 5) {
            return setError("Description is too short")
        }
        if (values.description.length > 300) {
            return setError("Description is too long. Should not be more than 300 characters")
        }
        builder.description = values.description
    }

    // check quantity
    if (values.quantity !== data.quantity) {
        if (!/[+-]?([0-9]*[.])?[0-9]+$/.test(values.quantity)) {
            return setError("Quantity should be digits only")
        }
        if (parseFloat(values.quantity) < 0) {
            return setError("Quantity should not be less than 0")
        }
        builder.quantity = values.quantity
    }

    // check unit
    if (values.unit !== data.unit) {
        if (values.unit.length > 20) {
            return setError("Unit is too long. Should not be more than 20 characters")
        }
        builder.unit = values.unit
    }

    // check unit value
    if (values.unit_value !== data.unit_value) {
        if (!/[+-]?([0-9]*[.])?[0-9]+$/.test(values.unit_value)) {
            return setError("Unit value should be digits only")
        }
        if (parseFloat(values.unit_value) < 0) {
            return setError("Unit value should not be less than 0")
        }
        builder.unit_value = values.unit_value
    }
    
     // check ingredients
    if (values.ingredients !== data.ingredients) {
        if (values.ingredients.length > 500) {
            return setError("Ingredients is too long. It should not be more than 500 charctars")
        }
        builder.ingredients = values.ingredients
    }

    // check precautions
    if (values.precautions !== data.precautions) {
        if (values.precautions.length < 5) {
            return setError("precautions is too short. It should not be less than 5 charctars")
        }
        if (values.precautions.length > 500) {
            return setError("precautions is too long. It should not be more than 500 charctars")
        }
        builder.precautions = values.precautions
    }

    // check precautions
    if (values.availability_status !== data.availability_status) {
        if (typeof values.availability_status !== 'boolean') {
            return setError("Availability status should be true or false")
        }
        if (parseInt(values.availability_status) === 0) {
            return setError("Availability status should be true or false")
        }
        builder.availability_status = values.availability_status
    }

    if (Object.keys(builder).length === 0) {
        return setError("No changes to update")
    }
    return builder;
}

// validate new product data
export const validateNewProduct = (builder, values, setError) => {
    setError("")

    // check name
    if (!values.name) {
        return setError("Product name is required")
    }
    if (values.name.length < 3) {
        return setError("Product name is too short")
    }
    if (values.name.length > 150) {
        return setError("Product name is too long. It should not be more than 150 characters")
    }
    builder.name = values.name

    // check category
    if (!values.category) {
        return setError("category is required")
    }
    if (values.category.length < 3) {
        return setError("Category name is too short")
    }
    if (values.category.length > 100) {
        return setError("Category name is too long. It should not be more than 100 characters")
    }
    builder.category = values.category

    
    // check discount
    if (values.discount_type) {
        if (["percentage", "amount"].indexOf(values.discount_type) === -1) {
            return setError("Discount type is should be percentage or amount")
        }
        builder.discount_type = values.discount_type
    }
  
    // check discount amount
    if (values.discount_amount) {
        if (!/[+-]?([0-9]*[.])?[0-9]+$/.test(values.discount_amount)) {
            return setError("Discount amount is should be digits only")
        }
        if (parseFloat(values.discount_amount) < 0) {
            return setError("Discount amount should not be less than 0")
        }
        builder.discount_amount = values.discount_amount
    }

    // check description
    if (values.description) {
        if (values.description.length < 5) {
            return setError("Description is too short")
        }
        if (values.description.length > 300) {
            return setError("Description is too long. Should not be more than 300 characters")
        }
        builder.description = values.description
    }

    // check price
    if (!values.price) {
        return setError("price is required")
    }
    if (!/[+-]?([0-9]*[.])?[0-9]+$/.test(values.price)) {
        return setError("Price should be digits only")
    }
    if (parseFloat(values.price) <= 0) {
        return setError("Price should not be less than 1")
    }
    builder.price = values.price

    // check quantity
    if (values.quantity) {
        if (!/[+-]?([0-9]*[.])?[0-9]+$/.test(values.quantity)) {
            return setError("Quantity should be digits only")
        }
        if (parseFloat(values.quantity) < 0) {
            return setError("Quantity should not be less than 0")
        }
        builder.quantity = values.quantity
    }

    // check unit
    if (values.unit) {
        if (values.unit.length > 20) {
            return setError("Unit is too long. Should not be more than 20 characters")
        }
        builder.unit = values.unit
    }

    // check unit value
    if (values.unit_value) {
        if (!/[+-]?([0-9]*[.])?[0-9]+$/.test(values.unit_value)) {
            return setError("Unit value should be digits only")
        }
        if (parseFloat(values.unit_value) < 0) {
            return setError("Unit value should not be less than 0")
        }
        builder.unit_value = values.unit_value
    }
    
     // check ingredients
    if (values.ingredients) {
        if (values.ingredients.length > 500) {
            return setError("Ingredients is too long. It should not be more than 500 charctars")
        }
        builder.ingredients = values.ingredients
    }

    // check precautions
    if (values.precautions) {
        if (values.precautions.length < 5) {
            return setError("precautions is too short. It should not be less than 5 charctars")
        }
        if (values.precautions.length > 500) {
            return setError("precautions is too long. It should not be more than 500 charctars")
        }
        builder.precautions = values.precautions
    }

    // check precautions
    if (values.availability_status) {
        if (typeof values.availability_status !== 'boolean') {
            return setError("Availability status should be true or false")
        }
        if (parseInt(values.availability_status) === 0) {
            return setError("Availability status should be true or false")
        }
        builder.availability_status = values.availability_status
    }
    return builder;
}