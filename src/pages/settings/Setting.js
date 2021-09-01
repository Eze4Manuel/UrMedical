import React from 'react';
import './Setting.css';
import { useAuth } from '../../core/hooks/useAuth';
import request from '../../assets/utils/http-request';
import helpers from '../../core/func/Helpers';
import { ContainerLoader } from '../../components/loading/Loading';
import ErrorMessage from '../../components/error/ErrorMessage';
import Spinner from 'react-loader-spinner'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import { Button } from 'primereact/button'
import formValidation from './formvalidator';
import { useNotifications } from '@mantine/notifications';

const Setting = (props) => {
    const { user, set } = useAuth()
    const notify = useNotifications();
    const [values, setValues] = React.useState(null);
    const [profile, setProfile] = React.useState(null);
    const [error, setError] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [loader, setLoader] = React.useState(false);

    React.useEffect(() => {
        const getData = (id) => {
            setLoading(true)
            setError("")
            let cfg = helpers.getHeaderConfig(String(user?.token).substr(7))
            request.get(`auth/user/${id}`, cfg)
                .then(res => {
                    setLoading(false)
                    let reqData = res.data
                    if (reqData.status === 'error') {
                        helpers.sessionHasExpired(set, reqData.msg)
                    }
                    if (reqData.status === 'ok') {
                        setValues(reqData.data)
                        setProfile(reqData.data)
                        helpers.alert({notifications: notify, icon: 'success', color:'green', message: 'user profile updated'})
                    }
                })
                .catch(e => {
                    setLoading(false)
                    let msg = e?.response?.data?.msg || e?.message
                    helpers.sessionHasExpired(set, msg)
                    // setValues(user)
                })
        }

        getData(user?.auth_id)
        // eslint-disable-next-line
    }, [user?.auth_id])

    const onSubmit = () => {
        let builder = formValidation.validatProfileUpdate(values, profile, {}, setError)
        if (!builder) {
            return
        }
        setLoader(true)
        request.post(`/auth/update-user/${profile.auth_id}`)
            .then(res => {
                setLoader(false)
                let reqData = res.data
                if (reqData.status === 'error') {
                    helpers.sessionHasExpired(set, reqData.msg)
                }
                if (reqData.status === 'ok') {
                    setValues(reqData.data)
                    setProfile(reqData.data)
                }
            })
            .catch(e => {
                setLoader(false)
                let msg = e?.response?.data?.msg || e?.message
                helpers.sessionHasExpired(set, msg)
            })

    }

    return (
        <div className='main-content'>
            <main style={{background: '#fff'}}>
                <div className="profile__container">
                    <h6 className="font-weight-bold mt-3 ml-3">USER SETTINGS &amp; PROFILE</h6>
                <div className="container mt-5">
                    {loading ? <ContainerLoader /> : null}
                    <div className="user-form__button-wp">
                        {loader ? <Spinner type="TailSpin" color="green" height={30} width={30} /> : null}
                    </div> 
                    <div className="row">
                        <div className="col-6">
                            <div className="my-3">
                                <h6 className="mb-3">Personal Information</h6>
                                <p className="user-info__detail"><span>First Name</span> <span>{values?.first_name}</span></p>
                                <p className="user-info__detail"><span>Last Name</span> <span>{values?.last_name}</span></p>
                                <p className="user-info__detail"><span>Gender</span> <span>{values?.gender}</span></p>
                                <p className="user-info__detail"><span>DOB</span> <span>{values?.dob}</span></p>
                            </div>
                            <div className="my-3">
                                <h6 className="mb-3">Contact Information</h6>
                                <p className="user-info__detail"><span>Email</span> <span>{values?.email}</span></p>
                                <p className="user-info__detail"><span>Phone</span> <span>{values?.phone_number}</span></p>
                                <p className="user-info__detail"><span>Address</span> <span>{values?.home_address}</span></p>
                                <p className="user-info__detail"><span>Area</span> <span>{values?.home_area}</span></p>
                            </div>
                            <div className="my-3">
                                <h6 className="mb-3">Account Information</h6>
                                <p className="user-info__detail"><span>Username</span> <span>{values?.email}</span></p>
                                <p className="user-info__detail"><span>Account</span> <span>{values?.user_type}</span></p>
                            </div>
                        </div>
                        <div className="col-5">
                        <div className="container px-5">
                                <h6 className="mb-1 mt-3">Update Profile</h6>
                                <div className="user-form__button-wp">
                                    {loading ? <Spinner type="TailSpin" color="green" height={30} width={30} /> : null}
                                </div> 
                                {error ? <ErrorMessage message={error} /> : null}
                                <div className="row mt-3">
                                    <div className="col-lg-12">
                                        <div className="p-field mb-1">
                                            <label htmlFor="first_name">First Name</label><br />
                                            <InputText style={{width: '100%'}} id="first_name" name="first_name" onChange={e => setValues(d => ({...d, first_name: e.target.value}))} value={values?.first_name} type="text" className="p-inputtext-sm p-d-block p-mb-2" placeholder="fist name" />
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="p-field mb-2">
                                            <label htmlFor="last_name">Last Name</label><br />
                                            <InputText style={{width: '100%'}} id="last_name" name="last_name" type="text" onChange={e => setValues(d => ({...d, last_name: e.target.value}))} value={values?.last_name} className="p-inputtext-sm p-d-block p-mb-2" placeholder="last name" />
                                        </div>
                                    </div>
                                </div> 
                                <div className="row">
                                    <div className="col-sm-12">
                                        <div className="p-field mb-2">
                                            <label htmlFor="email">Email</label><br />
                                            <InputText style={{width: '100%'}} id="email" name="email" onChange={e => setValues(d => ({...d, email: e.target.value}))} autoFocus value={values?.email} type="text" className="p-inputtext-sm p-d-block p-mb-2" placeholder="email" />
                                        </div>
                                    </div>
                                    </div> 
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="p-field mb-1">
                                            <label htmlFor="phone_number">Phone number</label><br />
                                            <InputText style={{width: '100%'}} id="phone_number" name="phone_number" onChange={e => setValues(d => ({...d, phone_number: e.target.value}))} value={values?.phone_number} type="text" className="p-inputtext-sm p-d-block p-mb-2" placeholder="080*********" />
                                        </div>
                                    </div>
                                </div> 
                                <div className="row">
                                    <div className="col-sm-12">
                                        <div className="p-field mb-2">
                                            <label htmlFor="home_area">Home Area</label><br />
                                            <InputText style={{width: '100%'}} id="home_area" name="home_area" onChange={e => setValues(d => ({...d, home_area: e.target.value}))} value={values?.home_area} type="text" className="p-inputtext-sm p-d-block p-mb-2" placeholder="home area" />
                                        </div>
                                    </div>
                                    </div> 
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="p-field mb-1">
                                            <label htmlFor="home_address">Home Address</label><br />
                                            <InputTextarea style={{width: '100%', height: '100px'}} id="home_address" name="home_address" onChange={e => setValues(d => ({...d, home_address: e.target.value}))} value={values?.home_address} type="text" className="p-inputtext-sm p-d-block p-mb-2" placeholder="Home address" />
                                        </div>
                                    </div>
                                </div> 
                                <div className="user-form__button-wp">
                                    <Button onClick={() => onSubmit()} style={{width: 100, height: 30}} loading={loading} color="#fff" label="Update"/>
                                </div> 
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Setting;