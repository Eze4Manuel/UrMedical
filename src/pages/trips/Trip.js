import React, { useEffect, useState } from 'react';
import './Trip.css';
import SubNavbar from '../../components/subnavbar/index';
import { useAuth } from '../../core/hooks/useAuth';
import lib from './lib';
import Table from '../../components/table';
import { getPageCount, getPages, goTo, onSetPage } from '../../core/func/utility';
import { ContainerLoader } from '../../components/loading/Loading';
import Tabs from "../../components/tabs/Tabs";
import helpers from '../../core/func/Helpers';
import TripDetail from './TripDetail';
import Alert from '../../components/flash/Alert';

import { getMessaging, getToken, } from "firebase/messaging";
require('dotenv').config();

// const noDataTitle = "No Order yet.";
// const noDataParagraph = "All Orders made will appear here.";

const Trip = (props) => {
    const { set, user } = useAuth();
    const [searchInput, setSearchInput] = useState('');
    const [, setOpenForm] = useState(false);
    const [openData, setOpenData] = useState(false);
    const [order, setOrder] = useState("All");
    const [data, setData] = useState([]);
    const [, setNotFound] = useState(false);
    const [processedData, setProcessedData] = useState([]);
    const [selected, setSelected] = useState(null);
    const [option, setOption] = useState('name');
    const [page, setPage] = useState(1);
    const [activePage, setActivePages] = useState(1);
    const [loader, setLoader] = useState(false);
    const [noDataAlert, setNoDataAlert] = useState(false);

    // setup table data
    const perPage = getPageCount(10);
    const paginate = getPages(data?.length, perPage);
    const start = (activePage === 1) ? 0 : (activePage * perPage) - perPage;
    const stop = start + perPage;
    const viewData = processedData.slice(start, stop);

    const fQeury = (data) => {
        return data.map(d => {
            let px = d || []
            return {
                email: px?.email || d?.contact_email,
                phone_number: px?.phone_number || d?.contact_phone_nnumber,
                ...d
            }
        })
    }

    useEffect(() => {
        (async () => {
            // Handling firebase Dispatch
            const messaging = getMessaging();
            getToken(messaging, { vapidKey: process.env.REACT_APP_VAPID_KEY }).then(async (currentToken) => {
                if (currentToken) {
                    // Send the token to your server and update the UI if necessary
                    let reqData = await lib.registerApp(currentToken, user?.phone_number);

                    if (reqData.status === "error") {
                        console.log('error registering token');
                    }
                    if (reqData.status === 'ok') {
                        console.log('success');
                    }
                } else {
                    // Show permission request UI
                    console.log('No registration token available. Request permission to generate one.');
                }
            }).catch((err) => {
                console.log('An error occurred while retrieving token. ', err);
            });
        })()
    }, [user?.phone_number])

    useEffect(() => {
        fetchData('All');
    }, [page, set, user?.token])


    const fetchData = async (val) => {
        setLoader(true)
        let reqData = await lib.get(page, null, user?.token);
        if (reqData.status === "error") {
            helpers.sessionHasExpired(set, reqData.msg)
        }
        if (reqData.status === 'ok') {
            switch (val) {
                case 'All':
                    (reqData.data?.length === 0) ?
                        setNoDataAlert(true)
                        :
                        setData(fQeury(reqData.data));
                    setProcessedData(fQeury(reqData.data));
                    break;
                case 'pending':
                    (reqData.data?.length === 0) ?
                        setNoDataAlert(true)
                        :
                        setData(fQeury(reqData.data));
                    setProcessedData(data.filter(e => {
                        return e.order_status === val
                    }));
                    break;
                case 'active':
                    (reqData.data?.length === 0) ?
                        setNoDataAlert(true)
                        :
                        setData(fQeury(reqData.data));
                    setProcessedData(data.filter(e => {
                        return e.order_status === val
                    }));
                    break;
                case 'cancelled':
                    (reqData.data?.length === 0) ?
                        setNoDataAlert(true)
                        :
                        setData(fQeury(reqData.data));
                    setProcessedData(data.filter(e => {
                        return e.order_status === val
                    }));
                    break;
                case 'fulfilled':
                    (reqData.data?.length === 0) ?
                        setNoDataAlert(true)
                        :
                        setData(fQeury(reqData.data));
                    setProcessedData(data.filter(e => {
                        return e.order_status === val
                    }));
                    break;
                default:
                    break
            }
        }
        setLoader(false);
    }



    const onSearch = async () => {
        setLoader(true)
        let reqData = await lib.get(1, searchInput, user?.token, user?.px_id)
        setLoader(false)
        if (reqData.status === 'ok' && reqData?.data?.length > 0) {
            setData(fQeury(reqData.data))
        } else {
            setNotFound(true)
            setTimeout(() => {
                setNotFound(false)
            }, 3000)
        }
    }



    const fetchMore = (page, key, set) => {
        onSetPage(page, key, set)
        // fetch the next page from the service and update the state
    }

    const onSelected = (value) => {
        setLoader(true)
        setTimeout(() => {
            setSelected(value)
            setOpenData(true)
            setLoader(false)
        }, 3000)
    }


    const changeTab = (val) => {
        switch (val) {
            case 'All':
                fetchData('All');
                setProcessedData(data)
                setOrder(val);
                break;
            case 'pending':
                fetchData('pending');
                setProcessedData(data.filter(e => {
                    return e.order_status === val
                }));
                setOrder(val)
                break;
            case 'active':
                fetchData('active');
                setProcessedData(data.filter(e => {
                    return e.order_status === val
                }));
                setOrder(val)
                break;
            case 'cancelled':
                fetchData('cancelled');
                setProcessedData(data.filter(e => {
                    return e.order_status === val
                }));
                setOrder(val)
                break;
            case 'fulfilled':
                fetchData('fulfilled');
                setProcessedData(data.filter(e => {
                    return e.order_status === val
                }));
                setOrder(val)
                break;
            default:
                break
        }
    }

    const updateAllData = (updateData) => {
        //update data is data returned from child prop after update
    }



    const onDeleted = (id) => {
        // remove from selected
        setSelected(null)
        // close modal
        setOpenData(false)
        // remove from data list
        let d = data?.filter(val => (String(val?.auth_id) !== String(id)) || (String(val?._id) !== String(id)))
        setData(s => (d))
    }

    return (
        <div className='main-content'>
            <main>
                {loader ? <ContainerLoader /> : null}

                <Alert onCancel={() => setNoDataAlert(false)} show={noDataAlert} title="Notification" message="You have no more data" />

                <SubNavbar
                    showFilter
                    showSearch
                    showButton={false}
                    filterName="order"
                    filterList={['name', 'location', 'phone']}
                    searchPlaceholder="Search for orders..."
                    ariaLabel="order"
                    ariaDescription="order"
                    onSearch={() => onSearch()}
                    searchInput={searchInput}
                    onChangeInput={setSearchInput}
                    searchID="order"
                    onSelectChange={setOption}
                    option={option}
                    onAddItem={() => setOpenForm(true)}
                />
                <div className="trip-table__container">
                    <Tabs onChangeTab={(val) => changeTab(val)} activeTab={order} tabs={["All", "pending", "active", "cancelled", "fulfilled"]} />

                        <>
                            <TripDetail onDeleted={(id) => onDeleted(id)} data={selected} updateAllData={updateAllData} show={openData} onHide={() => setOpenData(false)} />
                            <Table
                                onSelectData={onSelected}
                                prev={() => fetchMore(page, 'prev', setPage)}
                                next={() => fetchMore(page, 'next', setPage)}
                                goTo={(id) => goTo(id, setActivePages)}
                                activePage={activePage}
                                pages={paginate}
                                data={viewData}
                                perPage={perPage}
                                route="" // {config.pages.user}
                                tableTitle="Orders"
                                tableHeader={['#', 'Pharmacy', 'Dispatcher', 'No of product', 'Fee', 'Date', 'Status']}
                                dataFields={['pharmacy.name', 'dispatcher.name', 'products.length', 'total', 'order_date', 'order_status']}
                            />
                        </>
                </div>
            </main>
        </div>
    );
}

export default Trip;