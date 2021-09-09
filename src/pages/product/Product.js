import React, { useEffect, useState } from 'react';
import './Product.css';
import { useAuth } from '../../core/hooks/useAuth';
import NoData from '../../components/widgets/NoData';
import SubNavbar from '../../components/subnavbar/index';
import lib from './lib';
import Table from '../../components/table';
import { useNotifications } from '@mantine/notifications';
import { getPageCount, getPages, goTo, onSetPage } from '../../core/func/utility';
import Tabs from "../../components/tabs/Tabs";
import helpers from '../../core/func/Helpers';
import { ContainerLoader } from '../../components/loading/Loading';
import ProductSummary from './ProductSummary'
import Alert from '../../components/flash/Alert'; 
import ProgressBar from '../../components/progressbar/ProgressBar';

const noDataTitle = "No pharmacy have added to their product yet.";
const noDataParagraph = "You can create a product yourself by clicking on the add product button.";


const salesData = [
    { month: 'APR', amount: 19000 },
    { month: 'MAY', amount: 20000 },
    { month: 'JUN', amount: 34950 },
    { month: 'JUL', amount: 18000 },
    { month: 'AUG', amount: 10000 }
]

const Product = (props) => {
    const { set, user } = useAuth();
    const notify = useNotifications();
    const [searchInput, setSearchInput] = useState('');
    const NavigationBar = props.NavigationBar;
    const [openForm, setOpenForm] = useState(false);
    const [openData, setOpenData] = useState(false);
    const [data, setData] = useState([]);
    const [revenue, setRevenue] = useState([]);
    const [pharmData, setPharmData] = useState([]);
    const [notFound, setNotFound] = useState(false);
    const [selected, setSelected] = useState(null);
    const [option, setOption] = useState('name');
    const [page, setPage] = useState(1);
    const [activePage, setActivePages] = useState(1);
    const [loader, setLoader] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const [category, setCategories] = useState(0);
    const [count, setCount] = useState(0);
    const [order, setOrder] = useState("Pharmacy");

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
            let reqData = await lib.get(page, null, user?.token);
            if (reqData.status === "error") {
                helpers.sessionHasExpired(set, reqData.msg)
            }
            if (reqData.status === 'ok') {
                setData(fQeury(reqData.data))
            }
            setLoader(false)
        })()
    }, [])

    useEffect(() => {
        (async () => {
            setLoader(true)
            let reqData = await lib.getRevenue(user?.px_id, user?.token, 'summary');
            if (reqData.status === "error") {
                helpers.sessionHasExpired(set, reqData.msg)
            }
            if (reqData.status === 'ok') {
                setRevenue(fQeury(reqData.data))
            }
            setLoader(false);
        })()
    }, [])

    // setup table data
    const perPage = getPageCount(10);
    const paginate = getPages(data.length, perPage);
    const start = (activePage === 1) ? 0 : (activePage * perPage) - perPage;
    const stop = start + perPage;
    const viewData = data.slice(start, stop);


    const onSearch = async () => {
        setLoader(true)
        let reqData = await lib.get(1, searchInput, user?.token)
        setLoader(false)
        if (reqData.status === 'ok' && reqData?.data?.length > 0) {
            setPharmData(fQeury(reqData.data));
            setOpenData(true)
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

    const onSelected = async (value) => {
        setLoader(true)
        let reqData = await lib.getAll(page, null, user?.token, value.users_data[0].px_id);
        if (reqData.status === "error") {
            helpers.sessionHasExpired(set, reqData.msg)
        }
        if (reqData.status === 'ok' && reqData?.data) {
            setPharmData(fQeury(reqData.data))
        }
        setLoader(false)
        setOpenData(true)
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

    const updateIndex = async (id) => {
        setLoader(true)
        let reqDataCategory = await lib.getCategory(user?.token, 'category');
        if (reqDataCategory.status === "error") {
            helpers.sessionHasExpired(set, reqDataCategory.msg)
        }
        if ((reqDataCategory.status === 'ok' && reqDataCategory?.data)) {
            setCategories(reqDataCategory.data.length);
        }

        let reqDataCount = await lib.getCount( user?.token, 'count');
        if (reqDataCount.status === "error") {
            helpers.sessionHasExpired(set, reqDataCount.msg)
        }
        if ((reqDataCount.status === 'ok' && reqDataCount?.data)) {
            setCount(reqDataCount.data[0].total);
        }
        setLoader(false)
        setActiveIndex(id)
    }

    const changeTab = (val) => {
        switch (val) {
            case 'Pharmacy':
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
        <div className='main-content'>
            <main>
                {loader ? <ContainerLoader /> : null}
                <Alert onCancel={() => setNotFound(false)} show={notFound} title="Notification" message="No match found" />
                <SubNavbar
                    showFilter
                    showSearch
                    showButton={false}
                    filterName="product"
                    filterList={['name', 'location', 'phone']}
                    searchPlaceholder="Search for product summary..."
                    ariaLabel="product"
                    ariaDescription="product"
                    onSearch={() => onSearch()}
                    searchInput={searchInput}
                    onChangeInput={setSearchInput}
                    searchID="product"
                    buttonTitle="Add Product"
                    onSelectChange={setOption}
                    option={option}
                    onAddItem={() => setOpenForm(true)}
                />
                {openData ?
                    <ProductSummary onDeleted={(id) => onDeleted(id)} data={pharmData} show={openData} onHide={() => setOpenData(false)} />
                    : null
                }

                {data.length === 0 ? <NoData title={noDataTitle} paragraph={noDataParagraph} /> :
                    <div className="user-table__container">

                        <div className="conatainer overflow-hidden">
                            <div className="product-table__container">
                                <Tabs onChangeTab={(val) => changeTab(val)} activeTab={order} tabs={["Pharmacy", "Analytics"]} />
                                {activeIndex == 0 ?
                                    <>
                                        {(data?.length === 0) ? <NoData title={noDataTitle} paragraph={noDataParagraph} /> :
                                            <>
                                                <Table
                                                    onSelectData={onSelected}
                                                    prev={() => fetchMore(page, 'prev', setPage)}
                                                    next={() => fetchMore(page, 'next', setPage)}
                                                    goTo={(id) => goTo(id, setActivePages)}
                                                    activePage={activePage}
                                                    pages={paginate}
                                                    data={data}
                                                    perPage={perPage}
                                                    route="" // {config.pages.user}
                                                    tableTitle="Products summary"
                                                    tableHeader={['#', 'Pharmacy', 'Email', 'City', 'Area',]}
                                                    dataFields={['name', 'email', 'city', 'area',]}
                                                />
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
                            </div>
                        </div>
                    </div>
                }
            </main>
        </div>
    );
}

export default Product;