import React, { useEffect } from 'react';
import './PartnerUserData.css';
import { Dialog } from 'primereact/dialog';
import config from '../../../assets/utils/config';
import EditPartnerForm, { EditPassword, EditContactPersonForm } from './EditPartnerForm';
import PartnerUserDetail from './PartnerUserDetail';
import Flash from '../../../components/flash/Flash';
import lib from './lib';


const deleteWarning = "Are you sure you want to delete this account. This action is not reversible."

const SupportUserData = ({ data, show, onHide, onDeleted}) => {
    const [values, setValues] = React.useState(config.userData);
    const [loading, setLoading] = React.useState(false);
    const [showPartner, setShowPartner] = React.useState(true);
    const [showProfile, setShowProfile] = React.useState(false);
    const [showPassword, setShowPassword] = React.useState(false);
    const [delWarning, setDelWarning] = React.useState(false);
    const [error, setError] = React.useState(false);

    useEffect(() => {
        setValues(data);
        setDelWarning(false)
    }, [data])

    const onEditPassword = () => {
        setShowPartner(false)
        setShowProfile(false)
        setShowPassword(true)
    }
  
    const onEditProfile = () => {
        setShowPartner(false)
        setShowPassword(false)
        setShowProfile(true)
    }

    const onCancelPasswordEdit = () => {
        setShowPassword(false)
        setShowProfile(false)
        setShowPartner(true)
    }

    const onCancelProfileEdit = () => {
        setShowPassword(false)
        setShowProfile(false)
        setShowPartner(true)
    }

    return (
        <Dialog closeOnEscape header="Partner - (Pharmacy) Profile" visible={show} modal onHide={() => onHide()} style={{width: "70vw"}}>
            <div className="user-info__ctn">
                <div className="user-info__btn-action-wp">
                    <div className="user-info__btn-action">
                        <button onClick={() => onEditPassword()} className="btn btn__edit-ctn btn-action__green">Change password</button>
                        <button onClick={() => onEditProfile()} className="btn btn__edit-ctn btn-action__green">Update Profile</button>
                        <button onClick={() => setDelWarning(true)}  className="btn btn__edit-ctn btn-action__red">Delete</button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-7 mt-5">
                        <Flash title="Warning!" show={delWarning} message={deleteWarning} onCancel={() => setDelWarning(false)} onProceed={() => {
                            lib.delete(data?.id, setLoading, setError, onHide, onDeleted)}
                        } />
                        <PartnerUserDetail data={values} />
                    </div>
                    <div className="col-5">
                        {/* EDIT PROFILE */}
                        <EditContactPersonForm onHide={() => onCancelProfileEdit()} data={values} show={showProfile} />
                        <EditPartnerForm onHide={() => onCancelProfileEdit()} data={values} show={showPartner} />
                        {/* EDIT PASSWORD */}
                        <EditPassword onHide={() => onCancelPasswordEdit()} data={values} show={showPassword} />
                    </div> 
                </div>
            </div>
        </Dialog>
    )
}

export default SupportUserData
