import React, { useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Divider } from 'primereact/divider';
import { Button } from 'primereact/button';
import config from '../../../assets/utils/config';
import ErrorMessage from '../../../components/error/ErrorMessage';
import Spinner from 'react-loader-spinner';
import { Password } from 'primereact/password';
import './EditSupportForm.css';
import { useAuth } from '../../../core/hooks/useAuth';
import { useNotifications } from '@mantine/notifications';
import lib from './lib';
import helpers from '../../../core/func/Helpers';

export const EditPassword = ({ data, show, onHide }) => {
    const { set, user } = useAuth();
    const notify = useNotifications();
    const [values, setValues] = React.useState({new_password: '', confirm_password: ''});
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState('');

    useEffect(() => {
        setValues(data);
    }, [data])

    const onSubmit = async () => {
        // validate password
        setError('')
        //check if its above minimum number
        if (!values.new_password) {
            setError("New password is required")
            return
        }
        if (values.new_password.length < 6) {
            setError("New password must be 6 characters or more")
            return
        }
        //check if its above minimum number
        if (values.new_password.length > 15) {
            setError("New assword must be less than 15 characters")
            return
        }
        //check if there's capital letter
        if (!/[A-Z]/.test(values.new_password)) {
            setError("New assword must have atleast one capital letter")
            return
        }
        //check if there's small letter
        if (!/[a-z]/.test(values.new_password)) {
            setError("New assword must have atleast one small letter")
            return
        }
        //check if there's number
        if (!/[0-9]/.test(values.new_password)) {
            setError("New assword must have atleast one number")
            return
        }

        if (!values.confirm_password) {
            setError('Confirm password is required')
            return
        }
        if (values.new_password !== values.confirm_password) {
            setError('Passwords do not match')
            return
        }
        // submit the password
        setLoading(true)
        let payload = {
            password: values.new_password,
            auth_id: data?.auth_id
        }
        let reqData = await lib.updatePassword(payload, user?.token)
        setLoading(false)
        // error
        if (reqData.status === 'error') {
            helpers.sessionHasExpired(set, reqData?.msg, setError)
        }
        if (reqData.status === 'ok') {
            helpers.alert({notifications: notify, icon: 'success', color:'green', message: 'password updated'})
        }
    }

    const onCancel = () => {
        setError('')
        setLoading(false)
        onHide()
    }

    const footer = (
        <React.Fragment>
            <Divider />
            <p className="p-mt-2">Suggestions</p>
            <ul className="p-pl-2 p-ml-2 p-mt-0" style={{lineHeight: '1.5'}}>
                <li>At least one lowercase</li>
                <li>At least one uppercase</li>
                <li>At least one numeric</li>
                <li>Minimum 6 characters</li>
            </ul>
        </React.Fragment>
    );
  
    return show ? (
        <div className="container px-5">
        <h6 className="mb-1 mt-3">Update Password</h6>
        <div className="user-form__button-wp">
            {loading ? <Spinner type="TailSpin" color="green" height={30} width={30} /> : null}
        </div> 
        {error ? <ErrorMessage message={error} /> : null}
        <div className="row mt-5">
            <div className="col-lg-12">
                <div className="p-field mb-1">
                    <label htmlFor="new_password">New Password</label><br />
                    <Password footer={footer} minLength={6} maxLength={24} id="new_password" name="new_password" type="text" onChange={e => setValues(d => ({...d, new_password: e.target.value}))} value={values?.new_password} className="p-inputtext-sm" placeholder="********" toggleMask />
                </div>
            </div>
            <div className="col-lg-12">
                <div className="p-field mb-1">
                    <label htmlFor="confirm_password">Comfirm Password</label><br />
                    <Password footer={footer} minLength={6} maxLength={24} id="password" name="password" type="text" onChange={e => setValues(d => ({...d, confirm_password: e.target.value}))} value={values?.confirm_password} className="p-inputtext-sm" placeholder="********" toggleMask />
                </div>
            </div>
        </div> 
        <div className="password-update__btn-ctn">
            <button onClick={() => onCancel()} style={{width: 100, height: 30}} class="p-button p-component p-button-outlined"><span class="p-button-label p-c">Cancel</span></button>
            <Button onClick={() => onSubmit()} style={{width: 100, height: 30}} loading={loading} color="#fff" label="Save"/>
        </div> 
    </div>
    ) : null
}

const EditSupportForm = ({ data, show, onHide, onUpdate }) => {
    const { set, user } = useAuth();
    const notify = useNotifications();
    const [values, setValues] = React.useState(config.userData);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(false);

    useEffect(() => {
        setValues(data);
    }, [data])

    const onSubmit = async () => {
        setError("")
        let builder = {}
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

        // update
        setLoading(true)
        let reqData = await lib.update(data?.auth_id, builder, user?.token)
        setLoading(false)
        // error
        if (reqData.status === 'error') {
            helpers.sessionHasExpired(set, reqData?.msg, setError)
        }
        if (reqData.status === 'ok') {
            helpers.alert({notifications: notify, icon: 'success', color:'green', message: 'update successful'})
            setValues(reqData.data)
            onUpdate(reqData.data)
            onHide()
        }
    }
  
    return show ? (
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
                        <InputText style={{width: '100%'}} id="first_name" name="first_name" onChange={e => setValues(d => ({...d, first_name: e.target.value}))} autoFocus value={values?.first_name} type="text" className="p-inputtext-sm p-d-block p-mb-2" placeholder="fist name" />
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
    ): null
}

export default EditSupportForm
