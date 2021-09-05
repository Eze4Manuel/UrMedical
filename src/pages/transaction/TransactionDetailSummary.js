import React, { Fragment } from 'react';
import { toNumber } from '../../core/func/format';
import './TransactionDetailSummary.css';
import DashbaordTable from '../../components/dashboardhelps/DashbaordTable';

const Detail = ({name, value}) => value ? (<p className="transaction-info__detail"><span>{name}</span> <span>{value}</span></p>) : null

export const Customer = ({ data }) => {
    return (
        <Fragment>
            <div className="mb-3">
                <h6 className="mb-3">Customer Detail</h6>
                <Detail name="Name" value={data?.customer?.name} />
                <Detail name="Phone" value={data?.customer?.phone_number} />
            </div>
        </Fragment>
    )
}

export const Dispatcher = ({ data }) => {
    return (
        <Fragment>
            <div className="mb-3">
                <h6 className="mb-3">Dispatcher Detail</h6>
                <Detail name="Name" value={data?.dispatcher?.name} />
                <Detail name="Phone" value={data?.dispatcher?.phone_number} />
            </div>
        </Fragment>
    )
}
const ProductDetailSummary = ({ data }) => {
    let amount = data?.products?.map(item => item.amount)?.reduce((total, value) => total+value);
    let quantity = data?.products?.map(item => item.quantity)?.reduce((total, value) => total+value);
    return (
        <Fragment>
            <div className="mb-3">
                <h6 className="mb-3 ml-3">#Transactions</h6>
                <DashbaordTable col={12} dataRow={['name', 'quantity', 'amount']} data={data?.products || []} header= {"19th June 2021 -- 06:24"} headerRow={['Item', 'Quanity', 'Amount']} />
                <div className="row ml-1 mt-3">
                    <div className="col-6">
                        <h5>Quantity</h5>
                    </div>
                    <div className="col-6">
                        <h5 className="transaction-detail__left mr-3">{quantity}</h5>
                    </div>
                    <div className="col-6">
                        <h5>Amount</h5>
                    </div>
                    <div className="col-6">
                        <h5 className="transaction-detail__left mr-3">₦{toNumber(amount)}</h5>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default ProductDetailSummary
