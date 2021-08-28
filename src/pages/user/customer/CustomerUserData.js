import React, { useEffect } from 'react';
import './CustomerUserData.css';
import { Dialog } from 'primereact/dialog';
import config from '../../../assets/utils/config';
import EditCustomerForm, { EditPassword } from './EditCustomerForm';
import CustomerUserDetail from './CustomerUserDetail';
import Flash from '../../../components/flash/Flash';
import lib from './lib';
import { useAuth } from '../../../core/hooks/useAuth';
import { useNotifications } from '@mantine/notifications';
import helpers from '../../../core/func/Helpers';

const deleteWarning = "Are you sure you want to delete this account. This action is not reversible."

const CustomerData = ({ data, show, onHide, onDeleted}) => {
    const { set, user } = useAuth();
    const notify = useNotifications();
    const [values, setValues] = React.useState(config.userData);
    const [, setLoading] = React.useState(false);
    const [showProfile, setShowProfile] = React.useState(true);
    const [showPassword, setShowPassword] = React.useState(false);
    const [delWarning, setDelWarning] = React.useState(false);
    const [, setError] = React.useState(false);

    useEffect(() => {
        setValues(data);
        setDelWarning(false)
    }, [data])

    const onEditPassword = () => {
        setShowProfile(false)
        setShowPassword(true)
    }
  
    const onCancelPasswordEdit = () => {
        setShowPassword(false)
        setShowProfile(true)
    }


    const deleteAccount = async () => {
        setError('')
        setDelWarning(false)
        setLoading(true)
        let reqData = await lib.delete(values?.auth_id, user?.token)
        setLoading(false)
        // error
        if (reqData.status === 'error') {
            helpers.sessionHasExpired(set, reqData?.msg, setError)
        }
        if (reqData.status === 'ok') {
            onDeleted(data?.auth_id)
            onHide()
            helpers.alert({notifications: notify, icon: 'success', color:'green', message: 'user deleted'})
        }
        
    }

    return (
        <Dialog closeOnEscape header="User Profile" visible={show} modal onHide={() => onHide()} style={{width: "70vw"}}>
            <div className="user-info__ctn">
                <div className="user-info__btn-action-wp">
                    <div className="user-info__btn-action">
                        <button onClick={() => onEditPassword()} className="btn btn__edit-ctn btn-action__green">Change password</button>
                        <button onClick={() => setDelWarning(true)}  className="btn btn__edit-ctn btn-action__red">Delete</button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-7 mt-5">
                        <Flash title="Warning!" show={delWarning} message={deleteWarning} onCancel={() => setDelWarning(false)} onProceed={() => deleteAccount()} />
                        <CustomerUserDetail data={values} />
                    </div>
                    <div className="col-5">
                        {/* EDIT PROFILE */}
                        <EditCustomerForm onUpdate={(data) => setValues(data)} onHide={onHide} data={values} show={showProfile} />
                        {/* EDIT PASSWORD */}
                        <EditPassword onHide={() => onCancelPasswordEdit()} data={values} show={showPassword} />
                    </div> 
                </div>
            </div>
        </Dialog>
    )
}

export default CustomerData
