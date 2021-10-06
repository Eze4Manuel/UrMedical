import React from 'react';
import './NewPartnerForm.css';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Divider } from 'primereact/divider';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import config from '../../../assets/utils/config';
import ErrorMessage from '../../../components/error/ErrorMessage';
import Spinner from 'react-loader-spinner';
import formValidator from './formvalidation';

const NewPartnerForm = (props = { onSubmit: null, onHide: null, show: false}) => {
    const [values, setValues] = React.useState(config.userData);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(false);

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

    const handleSubmit = () => {
        let builder = formValidator.validateNewPartner(values, {}, setError)
        if (!builder) {
            return
        }
        // submit
        props.onSubmit(builder, setLoading, setError, setValues, config.userData)
    }

    return (
        <Dialog header="Partner New Acccount" visible={props.show} modal onHide={() => props.onHide()} style={{width: "45vw"}}>
            <div>
                <div className="mb-4"><h6>Partner Information</h6></div>
                <div className="user-form__button-wp">
                    {loading ? <Spinner type="TailSpin" color="green" height={30} width={30} /> : null}
                </div> 
                {error ? <ErrorMessage message={error} /> : null}
                <div className="row">
                    <div className="col-lg-6">
                        <div className="p-field mb-2">
                            <label htmlFor="first_name">First Name*</label><br />
                            <InputText style={{width: '100%'}} id="first_name" name="first_name" onChange={e => setValues(d => ({...d, first_name: e.target.value}))} autoFocus value={values?.first_name} type="text" className="p-inputtext-sm p-d-block p-mb-2" placeholder="first name" />
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="p-field mb-2">
                            <label htmlFor="last_name">Last Name*</label><br />
                            <InputText style={{width: '100%'}} id="last_name" name="last_name" type="text" onChange={e => setValues(d => ({...d, last_name: e.target.value}))} value={values?.last_name} className="p-inputtext-sm p-d-block p-mb-2" placeholder="last name" />
                        </div>
                    </div>
                </div> 
                <div className="row">
                    <div className="col-sm-12">
                        <div className="p-field mb-2">
                            <label htmlFor="email">Pharmacy Email*</label><br />
                            <InputText style={{width: '100%'}} id="email" name="email" onChange={e => setValues(d => ({...d, email: e.target.value}))} autoFocus value={values?.email} type="text" className="p-inputtext-sm p-d-block p-mb-2" placeholder="email" />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6">
                        <div className="p-field mb-1">
                            <label htmlFor="phone_number">Pharmacy Phone number*</label><br />
                            <InputText style={{width: '100%'}} id="phone_number" name="phone_number" onChange={e => setValues(d => ({...d, phone_number: e.target.value}))} value={values?.phone_number} type="text" className="p-inputtext-sm p-d-block p-mb-2" placeholder="080*********" />
                        </div>
                    </div>
                    <div className="col-lg-6">
                    <div className="p-field mb-1">
                        <label htmlFor="last_name">New Password*</label><br />
                        <Password footer={footer} minLength={6} maxLength={24} id="password" name="password" type="text" onChange={e => setValues(d => ({...d, password: e.target.value}))} value={values?.password} className="p-inputtext-sm" placeholder="new password" toggleMask />
                    </div>
                    </div>
                </div> 
                {/* PHARMACY INFORMATION */}
                <div className="mb-4 mt-4"><h6>Pharmacy Information</h6></div>
                <div className="row">
                    <div className="col-sm-12">
                        <div className="p-field mb-2">
                            <label htmlFor="pharmacy_name">Pharmacy name*</label><br />
                            <InputTextarea  style={{width: '100%', height: '60px'}} id="pharmacy_name" name="pharmacy_name" onChange={e => setValues(d => ({...d, pharmacy_name: e.target.value}))} autoFocus value={values?.pharmacy_name} type="text" className="p-inputtext-sm p-d-block p-mb-2" placeholder="pharmacy name" />
                        </div>
                    </div>
                </div>
                <div className="row">
                    {/* FIRST NAME */}
                    <div className="col-lg-6">
                        <div className="p-field mb-2">
                            <label htmlFor="registration_id">CAC Registration No</label><br />
                            <InputText style={{width: '100%'}} id="registration_id" name="registration_id" onChange={e => setValues(d => ({...d, registration_id: e.target.value}))} value={values?.registration_id} type="text" className="p-inputtext-sm p-d-block p-mb-2" placeholder="RC-1002424" />
                        </div>
                    </div>
                    {/* LAST NAME */}
                    <div className="col-lg-6">
                        <div className="p-field mb-2">
                            <label htmlFor="pharmacy_phone">Contact Phone*</label><br />
                            <InputText style={{width: '100%'}} id="pharmacy_phone" name="pharmacy_phone" type="text" onChange={e => setValues(d => ({...d, pharmacy_phone: e.target.value}))} value={values?.pharmacy_phone} className="p-inputtext-sm p-d-block p-mb-2" placeholder="080********90" />
                        </div>
                    </div>
                </div> 
                {/* EMAIL */}
                <div className="row">
                    <div className="col-sm-12">
                        <div className="p-field mb-2">
                            <label htmlFor="pharmacy_email">Contact Email*</label><br />
                            <InputText style={{width: '100%'}} id="pharmacy_email" name="pharmacy_email" onChange={e => setValues(d => ({...d, pharmacy_email: e.target.value}))} value={values?.pharmacy_email} type="text" className="p-inputtext-sm p-d-block p-mb-2" placeholder="email" />
                        </div>
                    </div>
                </div>
                <div className="row">
                    {/* CITY */}
                    <div className="col-lg-6">
                        <div className="p-field mb-2">
                            <label htmlFor="city">City*</label><br />
                            <InputText style={{width: '100%'}} id="city" name="city" onChange={e => setValues(d => ({...d, city: e.target.value}))} value={values?.city} type="text" className="p-inputtext-sm p-d-block p-mb-2" placeholder="city" />
                        </div>
                    </div>
                    {/* AREA */}
                    <div className="col-lg-6">
                        <div className="p-field mb-2">
                            <label htmlFor="pharmacy_area">Area*</label><br />
                            <InputText style={{width: '100%'}} id="pharmacy_area" name="pharmacy_area" type="text" onChange={e => setValues(d => ({...d, pharmacy_area: e.target.value}))} value={values?.pharmacy_area} className="p-inputtext-sm p-d-block p-mb-2" placeholder="area" />
                        </div>
                    </div>
                </div> 
                <div className="row">
                    <div className="col-sm-12">
                        <div className="p-field mb-2">
                            <label htmlFor="pharmacy_address">Address*</label><br />
                            <InputTextarea  style={{width: '100%', height: '80px'}} id="pharmacy_address" name="pharmacy_address" onChange={e => setValues(d => ({...d, pharmacy_address: e.target.value}))} value={values?.pharmacy_address} type="text" className="p-inputtext-sm p-d-block p-mb-2" placeholder="address" />
                        </div>
                    </div>
                </div>
                <div className="partner-form__button-wp">
                    <Button onClick={() => handleSubmit()} style={{width: 100, height: 30}} loading={loading} color="#fff" label="Create"/>
                </div>  
            </div>
        </Dialog>
    )
}

export default NewPartnerForm;
