import React, { Fragment } from 'react';
import './DispatcherUserData.css';

const DispatcherUserDetail = ({ data }) => {
    console.log(data);
    return (
        <Fragment>
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
                <p className="user-info__detail"><span>Vehicle ID</span> <span>{data?.dispatcher_data?.vehicle_id}</span></p>
                <p className="user-info__detail"><span>License ID</span> <span>{data?.dispatcher_data?.license_id}</span></p>
                <p className="user-info__detail"><span>Vehicle</span> <span>{data?.dispatcher_data?.vehicle_type}</span></p>
            </div>
        </Fragment>
    )
}
export default DispatcherUserDetail
