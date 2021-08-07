import React, { useEffect } from 'react';
import './SupportUserData.css';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Divider } from 'primereact/divider';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import config from '../../../assets/utils/config';
import ErrorMessage from '../../../components/error/ErrorMessage';
import Spinner from 'react-loader-spinner';
import EditSupportForm, { EditPassword } from './EditSupportForm';

const SupportUserData = ({ data, show, onHide}) => {
    const [values, setValues] = React.useState(config.userData);
    const [loading, setLoading] = React.useState(false);
    const [showPassword, setShowPassword] = React.useState(false);
    const [error, setError] = React.useState(false);

    useEffect(() => {
        setValues(data);
    }, [data])

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
  
    return (
        <Dialog closeOnEscape header="User Profile" visible={show} modal onHide={() => onHide()} style={{width: "65vw"}}>
            <div className="user-info__ctn">
                <div className="user-info__btn-action-wp">
                    <div className="user-info__btn-action">
                        <button onClick={() => setShowPassword(true)} className="btn btn__edit-ctn btn-action__green">Change password</button>
                        <button className="btn btn__edit-ctn btn-action__red">Delete</button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-7 mt-5">
                        <div className="my-3">
                            <h6 className="mb-3">Personal Information</h6>
                            <p className="user-info__detail"><span>First Name</span> <span>{data?.first_name}</span></p>
                            <p className="user-info__detail"><span>Last Name</span> <span>{data?.last_name}</span></p>
                            <p className="user-info__detail"><span>Gender</span> <span>{data?.gender}</span></p>
                            <p className="user-info__detail"><span>DOB</span> <span>{data?.dob}</span></p>
                        </div>
                        <div className="my-3">
                            <h6 className="mb-3">Contact Information</h6>
                            <p className="user-info__detail"><span>Email</span> <span>{data?.email}</span></p>
                            <p className="user-info__detail"><span>Phone</span> <span>{data?.phone_number}</span></p>
                            <p className="user-info__detail"><span>Address</span> <span>{data?.home_address}</span></p>
                            <p className="user-info__detail"><span>Area</span> <span>{data?.home_area}</span></p>
                        </div>
                        <div className="my-3">
                            <h6 className="mb-3">Account Information</h6>
                            <p className="user-info__detail"><span>Username</span> <span>{data?.email}</span></p>
                            <p className="user-info__detail"><span>Account</span> <span>{data?.user_type}</span></p>
                        </div>
                    </div>
                    <div className="col-5">
                        {/* EDIT PROFILE */}
                        <EditSupportForm data={values} show={!showPassword} />
                        {/* EDIT PASSWORD */}
                        <EditPassword onHide={() => setShowPassword(false)} data={values} show={showPassword} />
                    </div> 
                </div>
            </div>
        </Dialog>
    )
}

export default SupportUserData
