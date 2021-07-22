import React, { useState } from 'react';
import './login.css';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { dispatcher } from '../../core/context/Store';
import Action from '../../core/context/ReducerAction';
import { useAuth } from '../../core/hooks/useAuth';
// import Helpers from '../../core/func/Helpers';

// TODO: Temp Data
import __userData from '../../assets/data/user';

const Login = (props) => {
    const { set } = useAuth();
    const [data, setData] = useState({
        username: '', 
        password: '',
        loading: false,
        error: ''
    });

    const handleSubmit = async (e) => {
        // setLoading(true);
        data.error = "";
        data.loading = true;
        setData({...data});

        // setError(null);
        try {
            // let res = await Helpers.signin({
            //     username: data.usename,
            //     password: data.password
            // });
            // simulate
            let res = __userData[0]; // superadmin
            console.log('res')
            console.log(res)
            dispatcher({type: Action.user.set, payload: {user: res}});
            await set(res); // save to localstorage
            data.loading = false;
            setData({...data});
        } catch (e) {
            let err = e?.response?.data?.msg 
            || e?.response?.data?.err
            || e?.message;
            data.error = err;
            data.loading = false;
            setData({...data});
        }
    };

    return (
        <div className="app_auth">
           <div className="app_auth_left">
               <h3 className="auth_header">Wedidfund Portal</h3>
               {data.error ? <p className="auth_error">{data.error}</p> : null}
               <div className="p-fluid p-formgrid p-grid p-mx-5">
                   {/* USERNAME */}
                    <div className="p-field p-col-12">
                        <span className="p-mt-1">
                            <label htmlFor="title">Username</label>
                            <InputText autoFocus value={data.username} 
                            onChange={e => setData(d => ({...d, username: e.target.value}))} 
                            id="username" name="username" type="text" />
                        </span>
                    </div>
                    {/* PASSWORD */}
                    <div className="p-field p-col-12">
                        <span className="p-mt-1">
                            <label htmlFor="title">Password</label>
                            <Password toggleMask value={data.password} 
                            onChange={e => setData(d => ({...d,password: e.target.value}))} 
                            id="password" name="password" type="text" />
                        </span>
                    </div>
                </div>
               <div className="p-d-flex p-flex-sm-row p-jc-end">
                   <Button onClick={handleSubmit} style={{width: 180}} type="submit" label="Login" 
                   loading={data.loading} className="p-mt-2 p-button-primary" />
               </div>
            </div> 
            {/* Background Image */}
           <div className="app_auth_right">
            </div> 
        </div>
    )
}

export default Login
