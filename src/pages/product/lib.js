import request from '../../assets/utils/http-request';
import conf from '../../assets/utils/config';
import helpers from '../../core/func/Helpers';

const lib = {}


lib.get = async (page, search, token) => {
    let uri = '';
    try {
        let cfg = helpers.getHeaderConfig(String(token).substr(7))
        if (search) {
            uri = `products?page=${page}&q=${search}`;
        } else {
            uri = `auth/pharmacy?page=${page}`;
        }
        return await (await request.get(uri, cfg)).data 
    } catch (e) {
        return {status: 'error', msg: e?.response?.data?.msg || e?.message}
    } 
}

lib.getRevenue = async (id, token, component) => {
    let uri = `/products?px_id=${id}&component=${component}`;
    try {
        let cfg = helpers.getHeaderConfig(String(token).substr(7))
        console.log(uri);
        return await (await request.get(uri, cfg)).data 
    } catch (e) {
        return {status: 'error', msg: e?.response?.data?.msg || e?.message}
    }
}




lib.getOne = async (id, token) => {
    let uri = `/products/${id}`;
    try {
        let cfg = helpers.getHeaderConfig(String(token).substr(7))
        return await (await request.get(uri, cfg)).data 
    } catch (e) {
        return {status: 'error', msg: e?.response?.data?.msg || e?.message}
    }
}

lib.getAll = async (page, search, token, pID) => {
    let uri = `/products?px_id=${pID}&page=${page}`;
    try {
        let cfg = helpers.getHeaderConfig(String(token).substr(7))
        if (search) {
            uri = `/products?px_id=${pID}&page=${page}&q=${search}`;
        }
        return await (await request.get(uri, cfg)).data 
    } catch (e) {
        return {status: 'error', msg: e?.response?.data?.msg || e?.message}
    } 
}

lib.getCategory = async (token, category) => {
    let uri = `/products?component=${category}`;
    try {
        let cfg = helpers.getHeaderConfig(String(token).substr(7))
        return await (await request.get(uri, cfg)).data 
    } catch (e) {
        return {status: 'error', msg: e?.response?.data?.msg || e?.message}
    } 
}


lib.getSpecificCategory = async (id, token, category) => {
    let uri = `/products?component=${category}&px_id=${id}`;
    try {
        let cfg = helpers.getHeaderConfig(String(token).substr(7))
        return await (await request.get(uri, cfg)).data 
    } catch (e) {
        return {status: 'error', msg: e?.response?.data?.msg || e?.message}
    }
}


lib.getSpecificCount = async (id, token, count) => {
    let uri = `/products?px_id=${id}&component=${count}`;
    try {
        let cfg = helpers.getHeaderConfig(String(token).substr(7));
        console.log(uri);
        return await (await request.get(uri, cfg)).data 
    } catch (e) {
        return {status: 'error', msg: e?.response?.data?.msg || e?.message}
    } 
}


lib.getCount = async (token, count) => {
    let uri = `/products?component=${count}`;
    try {
        let cfg = helpers.getHeaderConfig(String(token).substr(7))
        
        return await (await request.get(uri, cfg)).data 
    } catch (e) {
        return {status: 'error', msg: e?.response?.data?.msg || e?.message}
    } 
}

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