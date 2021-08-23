import request from '../../../assets/utils/http-request';
import helpers from '../../../core/func/Helpers';

const lib = {}

lib.get = async (page, search, token) => {
    let uri = '';
    try {
        let cfg = helpers.getHeaderConfig(String(token).substr(7))
        if (search) {
            uri = `/auth/pharmacy?page=${page}&q=${search}`;
        } else {
            uri = `/auth/pharmacy?page=${page}`;
        }
        return await (await request.get(uri, cfg)).data 
    } catch (e) {
        return {status: 'error', msg: e?.response?.data?.msg || e?.message}
    }
}

lib.getOne = async (id, token) => {
    let uri = `/auth/pharmacy/${id}`;
    try {
        let cfg = helpers.getHeaderConfig(String(token).substr(7))
        return await (await request.get(uri, cfg)).data 
    } catch (e) {
        return {status: 'error', msg: e?.response?.data?.msg || e?.message}
    }
}

lib.create = async (values, token) => {
    try {
        let cfg = helpers.getHeaderConfig(String(token).substr(7))
        return await (await request.post('/auth/admin', values, cfg)).data 
    } catch (e) {
        return {status: 'error', msg: e?.response?.data?.msg || e?.message}
    }
}

lib.updatePassword = async (data, token) => {
    try {
        let cfg = helpers.getHeaderConfig(String(token).substr(7))
        return await (await request.post('/auth/admin-password-reset', data, cfg)).data 
    } catch (e) {
        return {status: 'error', msg: e?.response?.data?.msg || e?.message}
    }
}

lib.update = async (id, data, token) => {
    try {
        let cfg = helpers.getHeaderConfig(String(token).substr(7))
        return await (await request.put(`/auth/update-user/${id}`, data, cfg)).data 
    } catch (e) {
        return {status: 'error', msg: e?.response?.data?.msg || e?.message}
    }
}

lib.updatePharmacy = async (id, data, token) => {
    try {
        let cfg = helpers.getHeaderConfig(String(token).substr(7))
        return await (await request.put(`/auth/update-pharmacy/${id}`, data, cfg)).data 
    } catch (e) {
        return {status: 'error', msg: e?.response?.data?.msg || e?.message}
    }
}

lib.delete = async (id, token) => {
    try {
        let cfg = helpers.getHeaderConfig(String(token).substr(7))
        return await (await request.delete(`/auth/pharmacy/${id}`, cfg)).data 
    } catch (e) {
        return {status: 'error', msg: e?.response?.data?.msg || e?.message}
    }
}

export default lib;