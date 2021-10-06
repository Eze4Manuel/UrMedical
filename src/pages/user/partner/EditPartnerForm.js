import React, { useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Divider } from 'primereact/divider';
import { Button } from 'primereact/button';
import config from '../../../assets/utils/config';
import ErrorMessage from '../../../components/error/ErrorMessage';
import Spinner from 'react-loader-spinner';
import { Password } from 'primereact/password';
import './EditPartnerForm.css';
import formValidator from './formvalidation';
import lib from './lib';
import { useAuth } from '../../../core/hooks/useAuth';
import { useNotifications } from '@mantine/notifications';
import helpers from '../../../core/func/Helpers';

export const EditPassword = ({ data, show, onHide }) => {
    const [values, setValues] = React.useState({new_password: '', confirm_password: ''});
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(false);
    const { set, user } = useAuth();
    const notify = useNotifications();

    useEffect(() => {
        setValues(data);
    }, [data])

    const onSubmit = async () => {
        let builder = {}

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
        builder.password = values.new_password;
        builder.auth_id = data?.auth_id
        setLoading(true);

        let reqData = await lib.updatePassword(builder, user?.token)
        // error
        if (reqData.status === 'error') {
            helpers.sessionHasExpired(set, reqData?.msg, setError)
        }
        if (reqData.status === 'ok') {
            helpers.alert({ notifications: notify, icon: 'success', color: 'green', message: 'password updated' })
        }
        setLoading(false);

        // update
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

export const EditContactPersonForm = ({ data, show, onHide, onUpdated }) => {
    const { set, user } = useAuth();
    const notify = useNotifications();
    const [values, setValues] = React.useState(config.userData);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(false);

    const getFormData = (data) => {   
        return {
            contact_email: data?.contact_email || '',
            contact_phone_number: data?.contact_phone_number || ''
        }
    }

    useEffect(() => {
        setValues({ email: data?.contact_email || '', phone_number: data?.contact_phone_number || ''});
    }, [data])

    const onSubmit = async () => {
        let builder = formValidator.validateContactPersonDetails(values, getFormData(data), {}, setError)
        if (!builder) {
            return
        }
        // update
        setLoading(true)
        let reqData = await lib.updatePharmacy(data?._id, builder, user?.token)
        setLoading(false)
        // error
        if (reqData.status === 'error') {
            helpers.sessionHasExpired(set, reqData?.msg, setError)
        }
        if (reqData.status === 'ok') {
            helpers.alert({notifications: notify, icon: 'success', color:'green', message: 'update successful'})
            setValues({email: reqData.data.contact_email, phone_number: reqData.data.contact_phone_number})
            onUpdated({...data, contact_email: reqData.data.contact_email, contact_phone_number: reqData.data.contact_phone_number})
            // onUpdated({...data, ...reqData.data})
        }
    }

    const onCancel = () => {
        setError('')
        setLoading(false)
        onHide()
    }
  
    return show ? (
        <div className="container px-5 mt-5">
            <h6 className="mb-1 mt-4">Update Contact Person Details</h6>
            <div className="user-form__button-wp">
                {loading ? <Spinner type="TailSpin" color="green" height={30} width={30} /> : null}
            </div> 
            {error ? <ErrorMessage message={error} /> : null}
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
            <div className="password-update__btn-ctn">
                <button onClick={() => onCancel()} style={{width: 100, height: 30}} class="p-button p-component p-button-outlined"><span class="p-button-label p-c">Cancel</span></button>
                <Button onClick={() => onSubmit()} style={{width: 100, height: 30}} loading={loading} color="#fff" label="Update"/>
            </div> 
        </div>
    ): null
}

const EditPharmacyForm = ({ data, show, onHide }) => {
    const [values, setValues] = React.useState(config.userData);
    const [loading, ] = React.useState(false);
    const [error, ] = React.useState(false);

    useEffect(() => {
        setValues(data);
    }, [data])

    const onSubmit = () => {
        // update
        onHide()
    }
  
    return show ? (
        <div className="container px-5 mt-5 pb-2 pt-1">
            <h6 className="mb-1 mt-3">Update Pharmacy Profile</h6>
            <div className="user-form__button-wp">
                {loading ? <Spinner type="TailSpin" color="green" height={30} width={30} /> : null}
            </div> 
            {error ? <ErrorMessage message={error} /> : null}
            <div className="row mt-3">
                <div className="col-lg-12">
                    <div className="p-field mb-1">
                        <label htmlFor="name">Pharmacy</label><br />
                        <InputText disabled style={{width: '100%'}} id="name" name="name" onChange={e => setValues(d => ({...d, name: e.target.value}))} autoFocus value={values?.nama} type="text" className="p-inputtext-sm p-d-block p-mb-2" placeholder="name" />
                    </div>
                </div>
            </div> 
            <div className="row">
                    {/* FIRST NAME */}
                    <div className="col-lg-12">
                        <div className="p-field mb-2">
                            <label htmlFor="reg_id">CAC Registration No</label><br />
                            <InputText style={{width: '100%'}} id="reg_id" name="reg_id" onChange={e => setValues(d => ({...d, reg_id: e.target.value}))} value={values?.reg_id} type="text" className="p-inputtext-sm p-d-block p-mb-2" placeholder="RC-1002424" />
                        </div>
                    </div>
                    {/* LAST NAME */}
                    <div className="col-lg-12">
                        <div className="p-field mb-2">
                            <label htmlFor="pharmacy_phone_number">Phone</label><br />
                            <InputText style={{width: '100%'}} id="pharmacy_phone_number" name="pharmacy_phone_number" type="text" onChange={e => setValues(d => ({...d, pharmacy_phone_number: e.target.value}))} value={values?.pharmacy_phone_number} className="p-inputtext-sm p-d-block p-mb-2" placeholder="080********90" />
                        </div>
                    </div>
                </div> 
            <div className="row">
                <div className="col-sm-12">
                    <div className="p-field mb-2">
                        <label htmlFor="city">City</label><br />
                        <InputText style={{width: '100%'}} id="city" name="city" onChange={e => setValues(d => ({...d, city: e.target.value}))} value={values?.city} type="text" className="p-inputtext-sm p-d-block p-mb-2" placeholder="city" />
                    </div>
                </div>
                <div className="col-sm-12">
                    <div className="p-field mb-2">
                        <label htmlFor="home_area">Area</label><br />
                        <InputText style={{width: '100%'}} id="home_area" name="home_area" onChange={e => setValues(d => ({...d, home_area: e.target.value}))} value={values?.home_area} type="text" className="p-inputtext-sm p-d-block p-mb-2" placeholder="home area" />
                    </div>
                </div>
            </div> 
            <div className="row">
                    <div className="col-lg-12">
                        <div className="p-field mb-1">
                        <label htmlFor="home_address">Address</label><br />
                        <InputTextarea style={{width: '100%', height: '100px'}} id="home_address" name="home_address" onChange={e => setValues(d => ({...d, home_address: e.target.value}))} value={values?.home_address} type="text" className="p-inputtext-sm p-d-block p-mb-2" placeholder="Address" />
                    </div>
                </div>
            </div> 
            <div className="user-form__button-wp">
                <Button onClick={() => onSubmit()} style={{width: 100, height: 30}} loading={loading} color="#fff" label="Update"/>
            </div> 
        </div>
    ): null
}

export default EditPharmacyForm
