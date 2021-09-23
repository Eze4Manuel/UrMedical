import React, { useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Divider } from 'primereact/divider';
import { Button } from 'primereact/button';
import config from '../../../assets/utils/config';
import ErrorMessage from '../../../components/error/ErrorMessage';
import Spinner from 'react-loader-spinner';
import { Calendar } from 'primereact/calendar';
import { RadioButton } from 'primereact/radiobutton';
import { Password } from 'primereact/password';
import './EditDispatcherForm.css';
import { useAuth } from '../../../core/hooks/useAuth';
import { useNotifications } from '@mantine/notifications';
import lib from './lib';
import helpers from '../../../core/func/Helpers';
import formValidator from './formvalidator';

export const EditLicense = ({ data, show, onHide, onUpdate }) => {
    const { set, user } = useAuth();
    const notify = useNotifications();
    const [values, setValues] = React.useState({ vehicle_id: '', license_id: '' });
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(false);

    useEffect(() => {
        setValues(data?.dispatcher_data);
    }, [data])

    const onCancel = () => {
        setError('')
        setLoading(false)
        onHide()
    }

    const onSubmit = async () => {
        let builder = formValidator.validateLicenseUpdate(values, data, {}, setError)

        if (!builder) {
            return
        }
        // update
        let reqData = await lib.updateLicense(data?._id, builder, user?.token)
        setLoading(false)
        // error
        if (reqData.status === 'error') {
            helpers.sessionHasExpired(set, reqData?.msg, setError)
        }
        if (reqData.status === 'ok') {
            helpers.alert({ notifications: notify, icon: 'success', color: 'green', message: 'update successful' })
            setValues(reqData.data)
            onUpdate(reqData.data)
        }
    }

    return show ? (
        <div className="container px-5">
            <h6 className="mb-1 mt-3">Update Licenses</h6>
            <div className="user-form__button-wp">
                {loading ? <Spinner type="TailSpin" color="green" height={30} width={30} /> : null}
            </div>
            {error ? <ErrorMessage message={error} /> : null}
            <div className="row mt-3">
                <div className="col-lg-12">
                    <div className="p-field mb-1">
                        <label htmlFor="vehicle_id">Vehicle ID</label><br />
                        <InputText style={{ width: '100%' }} id="vehicle_id" name="vehicle_id" onChange={e => setValues(d => ({ ...d, vehicle_id: e.target.value }))} autoFocus value={values?.vehicle_id} type="text" className="p-inputtext-sm p-d-block p-mb-2" placeholder="FKJ-254XA" />
                    </div>
                </div>
                <div className="col-lg-12">
                    <div className="p-field mb-2">
                        <label htmlFor="license_id">License ID</label><br />
                        <InputText style={{ width: '100%' }} id="license_id" name="license_id" type="text" onChange={e => setValues(d => ({ ...d, license_id: e.target.value }))} value={values?.license_id} className="p-inputtext-sm p-d-block p-mb-2" placeholder="AKW06968AA2" />
                    </div>
                </div>
                <div className="col-sm-12">
                    <div className="p-field mb-2">
                        <label className="small" htmlFor="vehicle_type">Type of vehicle* <span className="small font-weight-bold">Options are motorbike, car, bus or truck</span></label>

                        <br />
                        <InputText style={{ width: '100%' }} id="vehicle_type" name="vehicle_type" onChange={e => setValues(d => ({ ...d, vehicle_type: e.target.value }))} autoFocus value={values.vehicle_type} type="text" className="p-inputtext-sm p-d-block p-mb-2" placeholder="vehicle type" />
                    </div>
                </div>
            </div>
            <div className="password-update__btn-ctn">
                <button onClick={() => onCancel()} style={{ width: 100, height: 30 }} class="p-button p-component p-button-outlined"><span class="p-button-label p-c">Cancel</span></button>
                <Button onClick={() => onSubmit()} style={{ width: 100, height: 30 }} loading={loading} color="#fff" label="Save" />
            </div>
        </div>
    ) : null
}

export const EditPassword = ({ data, show, onHide }) => {
    const { set, user } = useAuth();
    const notify = useNotifications();
    const [values, setValues] = React.useState({ new_password: '', confirm_password: '' });
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(false);

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
        builder.password = values.new_password;
        builder.auth_id = data?.auth_id

        let reqData = await lib.updatePassword(builder, user?.token)
        setLoading(false)
        // error
        if (reqData.status === 'error') {
            helpers.sessionHasExpired(set, reqData?.msg, setError)
        }
        if (reqData.status === 'ok') {
            helpers.alert({ notifications: notify, icon: 'success', color: 'green', message: 'password updated' })
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
            <ul className="p-pl-2 p-ml-2 p-mt-0" style={{ lineHeight: '1.5' }}>
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
                        <Password footer={footer} minLength={6} maxLength={24} id="new_password" name="new_password" type="text" onChange={e => setValues(d => ({ ...d, new_password: e.target.value }))} value={values?.new_password} className="p-inputtext-sm" placeholder="********" toggleMask />
                    </div>
                </div>
                <div className="col-lg-12">
                    <div className="p-field mb-1">
                        <label htmlFor="confirm_password">Comfirm Password</label><br />
                        <Password footer={footer} minLength={6} maxLength={24} id="password" name="password" type="text" onChange={e => setValues(d => ({ ...d, confirm_password: e.target.value }))} value={values?.confirm_password} className="p-inputtext-sm" placeholder="********" toggleMask />
                    </div>
                </div>
            </div>
            <div className="password-update__btn-ctn">
                <button onClick={() => onCancel()} style={{ width: 100, height: 30 }} class="p-button p-component p-button-outlined"><span class="p-button-label p-c">Cancel</span></button>
                <Button onClick={() => onSubmit()} style={{ width: 100, height: 30 }} loading={loading} color="#fff" label="Save" />
            </div>
        </div>
    ) : null
}

const EditDispatcherForm = ({ data, show, onHide, onUpdate }) => {
    const { set, user } = useAuth();
    const notify = useNotifications();
    const [values, setValues] = React.useState(config.userData);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(false);

    useEffect(() => {
        setValues(data);
    }, [data])

    const onSubmit = async () => {
        // update
        let builder = formValidator.validateDataUpdate(values, data, {}, setError)
        if (!builder) {
            return
        }

        // update
        setLoading(true)
        let reqData = await lib.update(data?._id, builder, user?.token)
        setLoading(false);
        // error
        if (reqData.status === 'error') {
            helpers.sessionHasExpired(set, reqData?.msg, setError)
        }
        if (reqData.status === 'ok') {
            helpers.alert({ notifications: notify, icon: 'success', color: 'green', message: 'update successful' })
            setValues(reqData.data)
            onUpdate(reqData.data)
            // onHide()
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
                        <InputText style={{ width: '100%' }} id="first_name" name="first_name" onChange={e => setValues(d => ({ ...d, first_name: e.target.value }))} autoFocus value={values?.first_name} type="text" className="p-inputtext-sm p-d-block p-mb-2" placeholder="fist name" />
                    </div>
                </div>
                <div className="col-lg-12">
                    <div className="p-field mb-2">
                        <label htmlFor="last_name">Last Name</label><br />
                        <InputText style={{ width: '100%' }} id="last_name" name="last_name" type="text" onChange={e => setValues(d => ({ ...d, last_name: e.target.value }))} value={values?.last_name} className="p-inputtext-sm p-d-block p-mb-2" placeholder="last name" />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-12">
                    <div className="p-field mb-2">
                        <label htmlFor="email">Email</label><br />
                        <InputText style={{ width: '100%' }} id="email" name="email" onChange={e => setValues(d => ({ ...d, email: e.target.value }))} autoFocus value={values?.email} type="text" className="p-inputtext-sm p-d-block p-mb-2" placeholder="email" />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-12">
                    <div className="p-field mb-1">
                        <label htmlFor="phone_number">Phone number</label><br />
                        <InputText style={{ width: '100%' }} id="phone_number" name="phone_number" onChange={e => setValues(d => ({ ...d, phone_number: e.target.value }))} value={values?.phone_number} type="text" className="p-inputtext-sm p-d-block p-mb-2" placeholder="080*********" />
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="p-field mb-2">
                        <label htmlFor="dob">DOB</label><br />
                        <Calendar id="dob" name="dob" onChange={(e) => setValues(d => ({ ...d, dob: e.target.value.toLocaleDateString('en-SE') }))} monthNavigator yearNavigator yearRange="1960:2030" value={values?.dob} className="p-inputtext-sm p-mb-2" placeholder={values.dob ?? 'mm/dd/yy'} />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-6 mt-2" >
                    <label htmlFor="gender">Gender</label><br />
                    <div style={{ "display": "flex" }}>
                        <span className="p-field-radiobutton ml-3">
                            <label htmlFor="gender">{config.gender[0]}</label>
                            <RadioButton id={config.gender[0]} name="gender" onChange={(e) => setValues(d => ({ ...d, gender: 'male' }))} value={values.gender} checked={values.gender === 'male'} className="p-inputtext-sm p-d-block p-mb-0 ml-1" />
                        </span>
                        <span className="p-field-radiobutton ml-3">
                            <label htmlFor="gender">{config.gender[1]}</label>
                            <RadioButton id={config.gender[1]} name="gender" onChange={(e) => setValues(d => ({ ...d, gender: 'female' }))} value={values.gender} checked={values.gender === 'female'} className="p-inputtext-sm p-d-block p-mb-0 ml-1" />
                        </span>
                    </div>
                </div>
              
            </div>
            <div className="row">
                <div className="col-lg-12">
                    <div className="p-field mb-1">
                        <label htmlFor="home_address">Home Address</label><br />
                        <InputTextarea style={{ width: '100%', height: '100px' }} id="home_address" name="home_address" onChange={e => setValues(d => ({ ...d, home_address: e.target.value }))} value={values?.home_address} type="text" className="p-inputtext-sm p-d-block p-mb-2" placeholder="Home address" />
                    </div>
                </div>
            </div>
            <div className="user-form__button-wp">
                <Button onClick={() => onSubmit()} style={{ width: 100, height: 30 }} loading={loading} color="#fff" label="Update" />
            </div>
        </div>
    ) : null
}

export default EditDispatcherForm
