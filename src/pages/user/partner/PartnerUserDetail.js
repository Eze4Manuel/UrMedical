import React, { Fragment } from 'react';
import './PartnerUserData.css';

const CustomerUserDetail = ({ data }) => {
    let contactPerson = data?.users_data?.filter(d => d.type === 'pharmacy')[0]
    return (
        <Fragment>
            <div className="my-3">
                <h6 className="mb-3">Pharmacy Information</h6>
                <p className="user-info__detail"><span>Name</span> <span>{data?.name}</span></p>
                <p className="user-info__detail"><span>CAC No</span> <span>{data?.registration_id}</span></p>
                <p className="user-info__detail"><span>Phone</span> <span>{data?.phone_number}</span></p>
                <p className="user-info__detail"><span>Email</span> <span>{data?.email}</span></p>
                <p className="user-info__detail"><span>City</span> <span>{data?.city}</span></p>
                <p className="user-info__detail"><span>Area</span> <span>{data?.area}</span></p>
                <p className="user-info__detail"><span>Address</span> <span>{data?.address}</span></p>
            </div>
            <div className="my-3">
                <h6 className="mb-3">Contact Person Information</h6>
                <p className="user-info__detail"><span>First Name</span> <span>{contactPerson?.first_name}</span></p>
                <p className="user-info__detail"><span>Last Name</span> <span>{contactPerson?.last_name}</span></p>
                <p className="user-info__detail"><span>Gender</span> <span>{contactPerson?.gender}</span></p>
                <p className="user-info__detail"><span>Email</span> <span>{contactPerson?.email}</span></p>
                <p className="user-info__detail"><span>Phone</span> <span>{contactPerson?.phone_number}</span></p>
            </div>
        </Fragment>
    )
}

export default CustomerUserDetail
