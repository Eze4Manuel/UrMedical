import React, { useEffect, useState } from 'react';
import './ProductSummary.css';
import { Dialog } from 'primereact/dialog';
import config from '../../assets/utils/config';
import lib from './lib';
import { TabView, TabPanel } from 'primereact/tabview';
import Table from '../../components/table';
import { useAuth } from '../../core/hooks/useAuth';
import { getPageCount, getPages, goTo, onSetPage } from '../../core/func/utility';
import Tabs from "../../components/tabs/Tabs";
import NoData from '../../components/widgets/NoData';
import ProductSelectedSummary from './ProductSelectedSummary';
import helpers from '../../core/func/Helpers';
import ProgressBar from '../../components/progressbar/ProgressBar';


const noDataTitle = "No product available yet.";
const noDataParagraph = "Pharmacy currently has not created a product yet";

const salesData = [
    { month: 'APR', amount: 19000 },
    { month: 'MAY', amount: 20000 },
    { month: 'JUN', amount: 34950 },
    { month: 'JUL', amount: 18000 },
    { month: 'AUG', amount: 10000 },
]

const SupportUserData = ({ data, show, onHide, onDeleted }) => {
    const { set, user } = useAuth();
    const [values, setValues] = React.useState(config.userData);
    const [loading, setLoading] = React.useState(false);
    const [showProfile, setShowProfile] = React.useState(true);
    const [revenue, setRevenue] = useState([]);
    const [delWarning, setDelWarning] = React.useState(false);
    const [pharmData, setPharmData] = React.useState(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [loader, setLoader] = useState(false);
    const [selected, setSelected] = useState(null);
    const [page, setPage] = useState(1);
    const [openData, setOpenData] = useState(false);
    const [activePage, setActivePages] = useState(1);
    const [order, setOrder] = useState("Products");
    const [category, setCategories] = useState(0);
    const [count, setCount] = useState(0);
    const [summary, setSummary] = useState(0);

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
        setPharmData(fQeury(data));
        setDelWarning(false)
    }, [data])


    const perPageA = getPageCount(10);
    const paginateA = getPages(pharmData?.length, perPageA);
    const startA = (activePage === 1) ? 0 : (activePage * perPageA) - perPageA;
    const stopA = startA + perPageA;
    const viewData = pharmData?.slice(startA, stopA);

    const onProdSelected = async (value) => {
        setLoader(true)
        // console.log(value);
        let reqData = await lib.getOne(value?._id, user?.token)
        if (reqData.status === 'ok' && reqData?.data) {
            setSelected(reqData.data)
        }
        setLoader(false)
        setOpenData(true)
    }

    const fetchMoreProd = (page, key, set) => {
        onSetPage(page, key, set)
        // fetch the next page from the service and update the state
    }

    const updateIndex = async (id) => {
        setLoader(true)
        let reqDataCategory = await lib.getSpecificCategory(data[0].px_id, user?.token, 'category');
        if (reqDataCategory.status === "error") {
            helpers.sessionHasExpired(set, reqDataCategory.msg)
        }
        if ((reqDataCategory.status === 'ok' && reqDataCategory?.data)) {
            setCategories(reqDataCategory.data.length);
        }

        let reqDataCount = await lib.getSpecificCount(data[0].px_id, user?.token, 'count');
        if (reqDataCount.status === "error") {
            helpers.sessionHasExpired(set, reqDataCount.msg)
        }
        if ((reqDataCount.status === 'ok' && reqDataCount?.data)) {
            setCount(reqDataCount.data[0].total);
        }

        console.log(reqDataCount);
        setLoader(false)
        setActiveIndex(id)
    }

    const changeTab = (val) => {
        switch (val) {
            case 'Products':
                updateIndex(0)
                setOrder(val);
                break;
            case 'Analytics':
                updateIndex(1)
                setOrder(val)
                break;
        }
    }


    return (
        <Dialog closeOnEscape header="Pharmacy Product Summary" visible={show} modal onHide={() => onHide()} style={{ width: "70vw" }}>
            <Tabs onChangeTab={(val) => changeTab(val)} activeTab={order} tabs={["Products", "Analytics"]} />
            {activeIndex == 0 ?
                <>
                    {(data?.length === 0) ? <NoData title={noDataTitle} paragraph={noDataParagraph} /> :
                        <>
                            <Table
                                onSelectData={onProdSelected}
                                prev={() => fetchMoreProd(page, 'prev', setPage)}
                                next={() => fetchMoreProd(page, 'next', setPage)}
                                goTo={(id) => goTo(id, setActivePages)}
                                activePage={activePage}
                                pages={paginateA}
                                data={viewData}
                                perPage={perPageA}
                                route="" // {config.pages.user}
                                tableTitle=""
                                tableHeader={['#', 'Pharmacy', 'category', 'price', 'unit', 'quantity']}
                                dataFields={['name', 'category', 'price', 'unit', 'quantity']}
                            />
                            <ProductSelectedSummary onDeleted={(id) => onDeleted(id)} data={selected} show={openData} onHide={() => setOpenData(false)} />
                        </>
                    }
                </>
                :
                <div className="product-summary__ctn mt-5">
                    <div className="row">
                        <div className="col-3">
                            <div className="card p-2 pl-3">
                                <h5><span>Pharmacy Revenue</span></h5>
                                <h2><span>230K</span></h2>
                                <p className="small"><span>July 12, 2021 - </span></p>
                            </div>
                        </div>
                        <div className="col-3">
                            <div className="card p-2 pl-3">
                                <h5><span>August</span></h5>
                                <h2 className="text-success"><span>285.6K</span></h2>
                                <p className="small"><span>August 12, 2021</span></p>
                            </div>
                        </div>
                        <div className="col-3">
                            <div className="card p-2 pl-3">
                                <h5><span>All Products</span></h5>
                                <h2 className="text-primary"><span>{count}</span></h2>
                                <p className="small"><span>Listed products</span></p>
                            </div>
                        </div>
                        <div className="col-3">
                            <div className="card p-2 pl-3">
                                <h5><span>All Categories</span></h5>
                                <h2 className="text-warning"><span>{category}</span></h2>
                                <p className="small"><span>Products categories</span></p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6 mt-4">
                            <div className="shadow-sm card border-light">
                                <div className="d-flex flex-row align-items-center flex-0 border-bottom card-body">
                                    <div className="d-block">
                                        <h5>Sales Revenue</h5>
                                        <div className="small mt-2 mb-3">
                                            <span><i class="las la-book-open"></i> 6 month sales</span>
                                        </div>
                                        <div className="d-flex">
                                            <div className="d-flex align-items-center mr-3 pc-line">
                                                <span class="shape-xs rounded-circle bg-secondary mr-2"></span>
                                                <small class="fw-normal">April - August</small>
                                            </div>
                                        </div>
                                        <div className="p-2 card-body">
                                            <ProgressBar format={true} data={salesData} barValue="amount" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-6">
                            <div>
                                <div className="px-5 pt-3 table-responsive table-height card mt-4 overflow-scroll">
                                    <h6>Sale Location Hubs (City Area)</h6>
                                    <table class="table table-hover table-sm">
                                        <thead>
                                            <tr className="small fw-bold">
                                                <td>Area</td>
                                                <td>Orders</td>
                                                <td>Products</td>
                                                <td>Amount</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="small">
                                                <td>Maitama</td>
                                                <td>76</td>
                                                <td>600</td>
                                                <td>₦120,000</td>
                                            </tr>
                                            <tr className="small">
                                                <td>Maitama</td>
                                                <td>76</td>
                                                <td>600</td>
                                                <td>₦120,000</td>
                                            </tr>
                                            <tr className="small">
                                                <td>Maitama</td>
                                                <td>76</td>
                                                <td>600</td>
                                                <td>₦120,000</td>
                                            </tr>
                                            <tr className="small">
                                                <td>Maitama</td>
                                                <td>76</td>
                                                <td>600</td>
                                                <td>₦120,000</td>
                                            </tr>
                                            <tr className="small">
                                                <td>Maitama</td>
                                                <td>76</td>
                                                <td>600</td>
                                                <td>₦120,000</td>
                                            </tr>
                                            <tr className="small">
                                                <td>Maitama</td>
                                                <td>76</td>
                                                <td>600</td>
                                                <td>₦120,000</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }

        </Dialog>
    )
}

export default SupportUserData
