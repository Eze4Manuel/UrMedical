import React, {useState, useRef} from 'react';
import './NewPartnerForm.css';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import config from '../../../assets/utils/config';
import ErrorMessage from '../../../components/error/ErrorMessage';
import Spinner from 'react-loader-spinner';
import formValidator from './formvalidation';
import { useAuth } from '../../../core/hooks/useAuth';
import { useNotifications } from '@mantine/notifications';
import lib from './lib';
import helpers from '../../../core/func/Helpers';
import { Dropdown } from 'primereact/dropdown';
import { Skeleton } from 'primereact/skeleton';

const EditPharmacy = ({ data, show, onUpdated }) => {
    const { set, user } = useAuth();
    const notify = useNotifications();
    const [values, setValues] = React.useState(config.userData);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [selectedItem2, setSelectedItem2] = useState(null);
    const [lazyItems, setLazyItems] = useState([]);
    const [lazyLoading, setLazyLoading] = useState(false);

    const getFormData = (data) => {
        let pharm = data?.users_data[0] || {}
        return {
            name: data?.name,
            registration_id: data?.registration_id,
            phone_number: pharm?.phone_number || '',
            email: pharm?.email || '',
            area: data?.area,
            city: data?.city,
            address: data?.address
        }
    }
    let loadLazyTimeout = useRef(null);

    const onLazyItemChange = (e) => {
        setSelectedItem2(e.value);
        setValues({ ...values,  area: e.value});
    }

    const onLazyLoad = (event) => {
        setLazyLoading(true);

        if (loadLazyTimeout) {
            clearTimeout(loadLazyTimeout);
        }
        //imitate delay of a backend call
        loadLazyTimeout =  setTimeout(async () => {
            const _lazyItems = [...lazyItems];
            let reqData = await lib.getAreas(user?.token)
            if (reqData.status === "ok") {
                console.log(reqData);
                reqData.data.forEach((element, ind) => {
                    _lazyItems[ind] = { label: `${element.display_name}`, value: `${element.display_name}` } 
                });
            }
            setLazyItems(_lazyItems);
            setLazyLoading(false);
        }, Math.random() * 1000 + 250);
    }
    React.useEffect(() => {
        setValues(getFormData(data))
        // setValues(data)
    }, [data])

    const handleSubmit = async () => {
        let builder = formValidator.validatePharmacyUpdate(values, getFormData(data), {}, data, setError)
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
            setValues({...data, ...reqData.data})
            onUpdated({...data, ...reqData.data})
        }

    }



    return show ? (
        <div className="container px-5">
                <div className="mb-4 mt-4"><h6>Update Pharmacy</h6></div>
                <div className="user-form__button-wp">
                    {loading ? <Spinner type="TailSpin" color="green" height={30} width={30} /> : null}
                </div> 
                {error ? <ErrorMessage message={error} /> : null}
                <div className="row">
                    <div className="col-sm-12">
                        <div className="p-field mb-2">
                            <label htmlFor="name">Pharmacy name*</label><br />
                            <InputTextarea  style={{width: '100%', height: '60px'}} id="name" name="name" onChange={e => setValues(d => ({...d, name: e.target.value}))} autoFocus value={values?.name} type="text" className="p-inputtext-sm p-d-block p-mb-2" placeholder="pharmacy name" />
                        </div>
                    </div>
                </div>
                <div className="row">
                    {/* FIRST NAME */}
                    <div className="col-lg-12">
                        <div className="p-field mb-2">
                            <label htmlFor="registration_id">CAC Reg No</label><br />
                            <InputText style={{width: '100%'}} id="registration_id" name="registration_id" onChange={e => setValues(d => ({...d, registration_id: e.target.value}))} value={values?.registration_id} type="text" className="p-inputtext-sm p-d-block p-mb-2" placeholder="RC-1002424" />
                        </div>
                    </div>
                    {/* LAST NAME */}
                    <div className="col-lg-12">
                        <div className="p-field mb-2">
                            <label htmlFor="phone_number">Phone*</label><br />
                            <InputText style={{width: '100%'}} id="phone_number" name="phone_number" type="text" onChange={e => setValues(d => ({...d, phone_number: e.target.value}))} value={values?.phone_number} className="p-inputtext-sm p-d-block p-mb-2" placeholder="080********90" />
                        </div>
                    </div>
                </div> 
                {/* EMAIL */}
                <div className="row">
                    <div className="col-sm-12">
                        <div className="p-field mb-2">
                            <label htmlFor="email">Email</label><br />
                            <InputText style={{width: '100%'}} id="email" name="email" onChange={e => setValues(d => ({...d, email: e.target.value}))} value={values?.email} type="text" className="p-inputtext-sm p-d-block p-mb-2" placeholder="email" />
                        </div>
                    </div>
                </div>
                <div className="row">
                    {/* CITY */}
                    <div className="col-lg-12">
                        <div className="p-field mb-2">
                            <label htmlFor="city">City</label><br />
                            <InputText style={{width: '100%'}} id="city" name="city" onChange={e => setValues(d => ({...d, city: e.target.value}))} value={values?.city} type="text" className="p-inputtext-sm p-d-block p-mb-2" placeholder="city" />
                        </div>
                    </div>
                    {/* AREA */}
                    <div className="col-lg-12">
                        <div className="p-field mb-2">
                            <label htmlFor="area">Area</label><br />
                             <Dropdown  id="pharmacy_area" name="pharmacy_area" style={{ width: '100%', height: '40px', lineHeight: '40px' }} value={selectedItem2} options={lazyItems} onChange={onLazyItemChange} virtualScrollerOptions={{
                                lazy: true, onLazyLoad: onLazyLoad, itemSize: 38, showLoader: true, loading: lazyLoading, delay: 250, loadingTemplate: (options) => {
                                    return (
                                        <div className="flex align-items-center p-2" style={{ height: '38px' }}>
                                            <Skeleton width={options.even ? '60%' : '50%'} height="1rem" />
                                        </div>
                                    )
                                }
                            }} placeholder="Select Area" />
                        </div>
                    </div>
                </div> 
                <div className="row">
                    <div className="col-sm-12">
                        <div className="p-field mb-2">
                            <label htmlFor="address">Address</label><br />
                            <InputTextarea  style={{width: '100%', height: '80px'}} id="address" name="address" onChange={e => setValues(d => ({...d, address: e.target.value}))} value={values?.address} type="text" className="p-inputtext-sm p-d-block p-mb-2" placeholder="address" />
                        </div>
                    </div>
                </div>
                <div className="partner-form__button-wp">
                    <Button onClick={() => handleSubmit()} style={{width: 100, height: 30}} loading={loading} color="#fff" label="Save"/>
                </div>  
            </div>
    ): null
}

export default EditPharmacy;
