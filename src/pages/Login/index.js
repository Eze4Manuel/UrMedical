import React, { useState } from 'react';
import './login.css';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { dispatcher } from '../../core/context/Store';
import Action from '../../core/context/ReducerAction';
import { useAuth } from '../../core/hooks/useAuth';
import request from '../../assets/utils/http-request';
import ErrorMessage from '../../components/error/ErrorMessage'
import config from '../../assets/utils/config';
import userData from '../../assets/data/user';

const Login = (props) => {
    const { set } = useAuth();
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [values, setValues] = useState({ username: '', password: ''})

    const onSubmit = async (e) => {
        // check username
        if (!values.username) {
            setError('username is required')
            return
        }
        // check password
        if (!values.password) {
            setError('password is required')
            return
        }

        // let userData = {
        //     email: values.username,
        //     password: values.password,
        //     user_type: 'admin'
        // }

        setError('')
        setLoading(true) 
        try {
            // TODO: ENBLED IN PRODUCTION
            const delayPromise = ms => new Promise(res => setTimeout(res, ms))
            await delayPromise(4000)
            let _data = userData[0]
            _data.access_level = 4
            _data.user_type = 'superadmin'
            _data.first_name = "Camelsback";
            _data.last_name = "Logistics";
            _data.name = "Camelsback Logistics";
            _data.email = "superadmin@camelogserve.com";
            _data.phone_number = "08111111111";
            dispatcher({type: Action.user.set, payload: {user: _data}});
            await set(_data); // save to localstorage
            setLoading(false) 
             // TODO: ENBLED IN PRODUCTION
            // let reqData = (await request.post(config.api.login,userData)).data;
            setLoading(false) 
            // // check error
            // if (reqData?.status === 'error') {
            //     setError(reqData?.msg)
            //     return
            // }
            // // check success
            // if (reqData?.status === 'ok') {
            //     dispatcher({type: Action.user.set, payload: {user: reqData.data}});
            //     await set(reqData.data); // save to localstorage
            // }
        } catch(err) {
            setLoading(false)
            setError(err?.response?.data?.msg || err?.message)
        }
    };

    return (
        <div className="app-login">
            <div className="app-login__container">
                <div className="app-login__content">
                    <h3 className="text-center">Login</h3>
                    <div className="app-login__error">
                        {error ? <ErrorMessage message={error} /> : null}
                    </div>
                    <div className="p-fluid p-formgrid p-grid p-mx-5">
                            <div style={{width: '350px'}} className="container">
                            <div className="row">
                                    <div className="col-lg-12">
                                        <div className="p-field mb-2">
                                            <label htmlFor="username">Username</label><br />
                                            <InputText style={{width: '100%'}} id="username" name="username" onChange={e => setValues(d => ({...d, username: e.target.value}))} autoFocus value={values.username} type="text" className="p-inputtext-sm p-d-block p-mb-2" placeholder="johndoe@cls.com" />
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="p-field mb-2">
                                            <label htmlFor="password">Password</label><br />
                                            <Password style={{ width: '100%' }} id="password" name="password" type="text" toggleMask value={values.password} onChange={e => setValues(d => ({...d, password: e.target.value}))} placeholder="**********" />
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="mt-2">
                                            <Button onClick={() => onSubmit()} style={{width: '100%'}} loading={loading} color="#fff" label="Login"/>
                                        </div>
                                    </div>
                            </div> 
                            </div>
                    </div>
                </div>
            </div> 
        </div>
    )
}

export default Login
