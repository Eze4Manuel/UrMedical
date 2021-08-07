// import request from '../../../assets/utils/http-request';
// import conf from '../../../assets/utils/config';
// import helpers from '../../../core/func/Helpers';

const lib = {}

lib.create = async (values, setLoading, setError, setValues, valuesInitialState) => {
    // check the form data

    // send create request

    // add to the list of user
    // () => (values, setLoading, setError, setValues)
}

lib.delete = async (userID, setLoading, setError, onHide, onDeleted) => {

    // delete user
    // hide the modal
    onHide()
    // remove the deleted data
    onDeleted(userID)
}

export default lib;