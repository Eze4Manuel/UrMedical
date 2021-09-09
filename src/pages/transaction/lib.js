import request from '../../assets/utils/http-request';
import helpers from '../../core/func/Helpers';

const lib = {}

lib.create = async (values, setLoading, setError, setValues, valuesInitialState) => {
    // check the form data

    // send create request

    // add to the list of user
    // () => (values, setLoading, setError, setValues)
}

lib.get = async (page, search, token) => {
    let uri = '';
    try {
        let cfg = helpers.getHeaderConfig(String(token).substr(7))
        if (search) {
            uri = `/transactions/?page=${page}&q=${search}`;
        } else {
            uri = `/transactions/?page=${page}`;
        }
        return await (await request.get(uri, cfg)).data 
    } catch (e) {
        return {status: 'error', msg: e?.response?.data?.msg || e?.message}
    } 
}

lib.delete = async (userID, setLoading, setError, onHide, onDeleted) => {

    // delete user
    // hide the modal
    onHide()
    // remove the deleted data
    onDeleted(userID)
}

export default lib;