import React, { useEffect, useState } from 'react';
import './Trip.css';
import NoData from '../../components/widgets/NoData';
import SubNavbar from '../../components/subnavbar/index';
import { useAuth } from '../../core/hooks/useAuth';
import lib from './lib';
import Table from '../../components/table';
import { getPageCount, getPages, goTo, onSetPage } from '../../core/func/utility';
import { ContainerLoader } from '../../components/loading/Loading';
import Tabs from "../../components/tabs/Tabs";
import helpers from '../../core/func/Helpers';
import TripDetail from './TripDetail'

const noDataTitle = "No Order yet.";
const noDataParagraph = "All Orders made will appear here.";

const Trip = (props) => {
    const { set, user } = useAuth();
    const [searchInput, setSearchInput] = useState('');
    const [openForm, setOpenForm] = useState(false);
    const [openData, setOpenData] = useState(false);
    const [order, setOrder] = useState("All");
    const [data, setData] = useState([]);
    const [notFound, setNotFound] = useState(false);
    const [processedData, setProcessedData] = useState([]);
    const [selected, setSelected] = useState(null);
    const [option, setOption] = useState('name');
    const [page, setPage] = useState(1);
    const [activePage, setActivePages] = useState(1);
    const [loader, setLoader] = useState(false);


    // setup table data
    const perPage = getPageCount(10);
    const paginate = getPages(data.length, perPage);
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
    // data 
    useEffect(() => {
        (async () => {
            setLoader(true)
            // let reqData = await lib.get(page, null, user?.token, user?.auth_id, user?.user_type);
            let reqData = await lib.get(page, null, user?.token);
            if (reqData.status === "error") {
                helpers.sessionHasExpired(set, reqData.msg)
            }
            if (reqData.status === 'ok') {
                setData(fQeury(reqData.data));
                setProcessedData(fQeury(reqData.data));
            }
            setLoader(false);
        })()
    }, [])





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

    const onCreate = (values, setLoading, setError, setValues) => {
        lib.create()
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
                setProcessedData(data)
                setOrder(val);
                break;
            case 'pending':
                setProcessedData(data.filter(e => {
                    return e.order_status == val
                }));
                setOrder(val)
                break;
            case 'active':
                setProcessedData(data.filter(e => {
                    return e.order_status == val
                }));
                setOrder(val)
                break;
            case 'cancelled':
                setProcessedData(data.filter(e => {
                    return e.order_status == val
                }));
                setOrder(val)
                break;
            case 'fulfilled':
                setProcessedData(data.filter(e => {
                    return e.order_status == val
                }));
                setOrder(val)
                break;
        }

    }


    const onDeleted = (id) => {
        // remove from selected
        setSelected(null)
        // close modal
        setOpenData(false)
        // remove from data list
        let d = data.filter(val => (String(val?.auth_id) !== String(id)) || (String(val?._id) !== String(id)))
        setData(s => (d))
    }

    return (
        <div className='main-content'>
            <main>
                {loader ? <ContainerLoader /> : null}
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
                    {data.length === 0 ? <NoData title={noDataTitle} paragraph={noDataParagraph} /> :
                        <>  
                            <TripDetail onDeleted={(id) => onDeleted(id)} data={selected} show={openData} onHide={() => setOpenData(false)} />
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
                    }


                </div>
            </main>
        </div>
    );
}

export default Trip;