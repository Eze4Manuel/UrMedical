import React, { Fragment, useEffect, useRef, useState } from 'react';
import { toNumber } from '../../core/func/format';
import './TripSummary.css';
import DashbaordTable from '../../components/dashboardhelps/DashbaordTable';
import { ContainerLoader } from '../../components/loading/Loading';
import lib from './lib';
import { SplitButton } from 'primereact/splitbutton';
import { useAuth } from '../../core/hooks/useAuth';
import { useNotifications } from '@mantine/notifications';
import helpers from '../../core/func/Helpers';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { ListBox } from 'primereact/listbox';
import { dispatcher } from '../../core/context/Store';

const Detail = ({ name, value }) => value ? (<p className="order-info__detail"><span>{name}</span> <span>{value}</span></p>) : null

export const Details = ({ data }) => {
    const { set, user } = useAuth();
    const [allow, setAllow] = useState(true);
    const [, setData] = useState([]);
    const [loader, setLoader] = useState(false);
    const notify = useNotifications();
    const [displayPosition, setDisplayPosition] = useState(false);
    const [position, setPosition] = useState('left');
    const [selectedDispatch, setSelectedDispatch] = useState(null);
    const [dispatchers, setDispatchers] = useState([]);


    useEffect(() => {
        setAllow((data.order_status === 'pending' || data.order_status === 'active') ? true : false)
    }, [])


    const updateStatus = async (val) => {
        setLoader(true);
        let reqData = await lib.updateStauts(user?.token, data?._id, val)
        setLoader(false)
        if (reqData.status === 'ok') {
            data.order_status = val;
            setData(data);
            helpers.alert({ notifications: notify, icon: 'success', color: 'green', message: 'Order Updated' })
            setTimeout(() => window.location.reload(), 3000)
        } else {
            helpers.alert({ notifications: notify, icon: 'danger', color: 'red', message: reqData.msg })
        }
    }

    const assignDispatch = async () => {
        setLoader(true);

        // Fetches all available dispatchers
        let reqData = await lib.getDispatchers(user?.token, 'dispatcher');
        if (reqData.status === "error") {
            helpers.sessionHasExpired(set, reqData.msg)
        }
        if (reqData.status === 'ok') {
            if (reqData.data.length > 0) {
                setDispatchers(reqData.data);
                setDisplayPosition(true)
                setPosition('left');
            } else {
                helpers.alert({ notifications: notify, icon: 'warning', color: 'yellow', message: 'No available Dispatcher' })
            }
        }
        setLoader(false);
    }




    const items = [
        {
            label: 'active',
            icon: 'pi pi-check',
            command: () => {
                updateStatus('active')
            }
        },
        {
            label: 'cancelled',
            icon: 'pi pi-times',
            command: () => {
                updateStatus('cancelled')
            }
        },
        {
            label: 'fulfilled',
            icon: 'pi pi-external-link',
            command: () => {
                updateStatus('fulfilled')
            }
        },

    ];



    const onHide = (name) => {
        setDisplayPosition(false);

    }


    const dispatchSelected = async (val) => {
        setLoader(true);
        console.log(data);

        // Fetches all available dispatchers
        let reqData = await lib.updateDispatcher(user?.token, data?.order_id, val?.auth_id);
        if (reqData.status === "error") {
            helpers.alert({ notifications: notify, icon: 'warning', color: 'yellow', message: 'Failed to Assign Dispatcher' })
        }
        if (reqData.status === 'ok') {
            helpers.alert({ notifications: notify, icon: 'success', color: 'green', message: 'Dispatcher Assigned' })
            // Updating current selected data
            data.dispatcher = val;
            onHide();
            setAllow(true);

        }
        setLoader(false);
        console.log(reqData);


    }



    return (
        <>
            <Dialog header="Header" visible={displayPosition} style={{ width: '30rem' }} onHide={() => onHide()}>
                <ListBox value={selectedDispatch} options={dispatchers} onChange={(e) => dispatchSelected(e.value)} optionLabel="email" style={{ width: '30vw' }} />
            </Dialog>


            <Fragment>
                <div className="mb-3">
                    <h6 className="mb-3"> Pharmacy Detail</h6>
                    <Detail name="Name" value={data?.pharmacy?.name} />
                    <Detail name="Phone" value={data?.pharmacy?.phone_number} />
                    <Detail name="Email" value={data?.pharmacy?.email} />
                    <Detail name="Attendant" value={data?.pharmacy?.attendant} />
                </div>
            </Fragment>
            <Fragment>


                <div className="mb-3">
                    {(data?.dispatcher?.name == '') ?
                        <>
                            <h6 className="mb-3"> Dispatcher Detail</h6>
                            <p style={{ 'color': 'red' }}>No Dispatcher Assigned</p>
                        </>
                        :
                        <>
                            <h6 className="mb-3"> Dispatcher Detail</h6>
                            <Detail name="Name" value={data?.dispatcher?.name} />
                            <Detail name="Phone" value={data?.dispatcher?.phone_number} />
                            <Detail name="Email" value={data?.dispatcher?.email} />
                            <Detail name="License ID" value={data?.dispatcher?.license_id} />
                            <Detail name="Vehicle ID" value={data?.dispatcher?.vehicle_id} />
                        </>

                    }
                </div>


            </Fragment>

            <Fragment>
                <div className="mb-5">
                    <h6 className="mb-3">Customer Detail</h6>
                    <Detail name="Name" value={data?.customer?.name} />
                    <Detail name="Phone" value={data?.customer?.phone_number} />
                    <Detail name="email" value={data?.customer?.email} />
                </div>
            </Fragment>
            <Fragment>

                <div className="mt-3" >
                    <div className="mb-2">
                        <Button onClick={() => assignDispatch()} icon="pi pi-bookmark" disabled={!allow} label="Assign Dispatch" className="p-button-sm" />
                    </div>
                    {(data?.dispatcher?.name != '') ?
                        <div>
                            <SplitButton style={{ "font-size": "10px" }} label="update status" model={items} disabled={!allow} className="p-button-sm p-button-warning p-mr-1"></SplitButton>
                        </div>
                        :
                        null
                    }

                </div>
            </Fragment>
            {loader ? <ContainerLoader /> : null}

        </>
    )
}

const TripDetailSummary = ({ data }) => {
    let amount = data?.products?.map(item => item.amount)?.reduce((total, value) => total + value);
    let quantity = data?.products?.map(item => item.quantity)?.reduce((total, value) => total + value);
    return (
        <>
            <Fragment>
                <div className="mb-3">
                    <h6 style={{ "display": "flex", "justify-content": "space-between" }}>
                        <span className="mb-3 ml-3">#Order</span>
                        <span className="mb-3 ml-3">{data?.order_date}</span>
                    </h6>
                    <DashbaordTable col={12} dataRow={['name', 'quantity', 'unit_value', 'amount']} data={data?.products || []} header="Products" headerRow={['Item', 'Quanity', 'Unit', 'Amount']} />
                    <div className="row ml-1 mt-3">
                        <div className="col-6">
                            <h5>Total quantity</h5>
                        </div>
                        <div className="col-6">
                            <h5 className="order-detail__left mr-3">{quantity}</h5>
                        </div>
                        <div className="col-6">
                            <h5>Total amount</h5>
                        </div>
                        <div className="col-6">
                            <h5 className="order-detail__left mr-3">₦{toNumber(amount)}</h5>
                        </div>
                    </div>
                </div>
            </Fragment>
            <Fragment>
                <div className="mb-3">
                    <h6 className="mb-3">Order Detail</h6>
                    <Detail name="Name" value={data?.name} />
                    <Detail name="Order quantity" value={data?.order_quantity} />
                    <Detail name="Dispatch fee" value={data?.dispatch_fee} />
                    <Detail name="Delivery area" value={data?.delivery_area} />
                    <Detail name="Delivery address" value={data?.delivery_address} />
                    <Detail name="Order amount" value={data?.order_amount} />
                    <Detail name="Order status" value={data?.order_status} />
                    <Detail name="Pharmacy area" value={data?.pharmacy_area} />
                    <Detail name="Month" value={data?.month} />
                    <Detail name="Year" value={data?.year} />
                    <Detail name="Total Fee" value={data?.total} />

                </div>
            </Fragment>
        </>

    )
}

export default TripDetailSummary


