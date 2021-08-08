import React, { Fragment } from 'react';
import './PartnerUserData.css';

const CustomerUserDetail = ({ data }) => {
  
    return (
        <Fragment>
            <div className="my-3">
                <h6 className="mb-3">Contact Person Information</h6>
                <p className="user-info__detail"><span>First Name</span> <span>{data?.first_name}</span></p>
                <p className="user-info__detail"><span>Last Name</span> <span>{data?.last_name}</span></p>
                <p className="user-info__detail"><span>Gender</span> <span>{data?.gender}</span></p>
                <p className="user-info__detail"><span>Email</span> <span>{data?.email}</span></p>
                <p className="user-info__detail"><span>Phone</span> <span>{data?.phone_number}</span></p>
            </div>
            <div className="my-3">
                <h6 className="mb-3">Pharmacy Information</h6>
                <p className="user-info__detail"><span>Name</span> <span>{data?.partner?.name}</span></p>
                <p className="user-info__detail"><span>CAC No</span> <span>{data?.partner?.reg_id}</span></p>
                <p className="user-info__detail"><span>Phone</span> <span>{data?.partner?.phone_number}</span></p>
                <p className="user-info__detail"><span>Email</span> <span>{data?.partner?.email}</span></p>
                <p className="user-info__detail"><span>City</span> <span>{data?.partner?.city}</span></p>
                <p className="user-info__detail"><span>Area</span> <span>{data?.partner?.home_area}</span></p>
                <p className="user-info__detail"><span>Address</span> <span>{data?.partner?.home_address}</span></p>
            </div>
        </Fragment>
    )
}

export default CustomerUserDetail
