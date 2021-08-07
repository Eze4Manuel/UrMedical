import React, { useEffect } from 'react';
import './SupportUserData.css';
import { Dialog } from 'primereact/dialog';
import config from '../../../assets/utils/config';
import EditSupportForm, { EditPassword } from './EditSupportForm';
import SupportUserDetail from './SupportUserDetail';
import Flash from '../../../components/flash/Flash';
import lib from './lib';


const deleteWarning = "Are you sure you want to delete this account. This action is not reversible."

const SupportUserData = ({ data, show, onHide, onDeleted}) => {
    const [values, setValues] = React.useState(config.userData);
    const [loading, setLoading] = React.useState(false);
    const [showPassword, setShowPassword] = React.useState(false);
    const [delWarning, setDelWarning] = React.useState(false);
    const [error, setError] = React.useState(false);

    useEffect(() => {
        setValues(data);
        setDelWarning(false)
    }, [data])
  
    return (
        <Dialog closeOnEscape header="User Profile" visible={show} modal onHide={() => onHide()} style={{width: "70vw"}}>
            <div className="user-info__ctn">
                <div className="user-info__btn-action-wp">
                    <div className="user-info__btn-action">
                        <button onClick={() => setShowPassword(true)} className="btn btn__edit-ctn btn-action__green">Change password</button>
                        <button onClick={() => setDelWarning(true)}  className="btn btn__edit-ctn btn-action__red">Delete</button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-7 mt-5">
                        <Flash title="Warning!" show={delWarning} message={deleteWarning} onCancel={() => setDelWarning(false)} onProceed={() => {
                            lib.delete(data?.id, setLoading, setError, onHide, onDeleted)}
                        } />
                        <SupportUserDetail data={values} />
                    </div>
                    <div className="col-5">
                        {/* EDIT PROFILE */}
                        <EditSupportForm onHide={onHide} data={values} show={!showPassword} />
                        {/* EDIT PASSWORD */}
                        <EditPassword onHide={() => setShowPassword(false)} data={values} show={showPassword} />
                    </div> 
                </div>
            </div>
        </Dialog>
    )
}

export default SupportUserData
