import React, { useEffect, useState } from 'react';
import './Product.css';
import { useAuth } from '../../core/hooks/useAuth';
import NoData from '../../components/widgets/NoData';
import SubNavbar from '../../components/subnavbar/index';
import lib from './lib';
import Table from '../../components/table';
import { getPageCount, getPages, goTo, onSetPage } from '../../core/func/utility';
import Tabs from "../../components/tabs/Tabs";
import helpers from '../../core/func/Helpers';
import { ContainerLoader } from '../../components/loading/Loading';
import ProductSummary from './ProductSummary'
import Alert from '../../components/flash/Alert';

const noDataTitle = "No pharmacy have added to their product yet.";
const noDataParagraph = "You can create a product yourself by clicking on the add product button.";



const Product = (props) => {
    const { set, user } = useAuth();
    const [searchInput, setSearchInput] = useState('');
    const [, setOpenForm] = useState(false);
    const [openData, setOpenData] = useState(false);
    const [data, setData] = useState([]);
    const [, setRevenue] = useState([]);
    const [pharmData, setPharmData] = useState([]);
    const [notFound, setNotFound] = useState(false);
    const [, setSelected] = useState(null);
    const [option, setOption] = useState('name');
    const [page, setPage] = useState(1);
    const [activePage, setActivePages] = useState(1);
    const [loader, setLoader] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const [category, setCategories] = useState(0);
    const [count, setCount] = useState(0);
    const [order, setOrder] = useState("Pharmacy");
    const [noDataAlert, setNoDataAlert] = useState(false);

    const fQeury = (data) => {
        return data?.map(d => {
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
                (reqData.data?.length === 0) ?
                    setNoDataAlert(true)
                    :
                    setData(fQeury(reqData.data))
            }
            setLoader(false)
        })()
    }, [page, set, user?.token])

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
    }, [page, set, user?.px_id, user?.token])

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
        let d = data?.filter(val => (String(val?.auth_id) !== String(id)) || (String(val?._id) !== String(id)))
        setData(s => (d))
    }
    const updateIndex = async (id) => {
        setLoader(true)
        let reqDataCategory = await lib.getCategory(user?.token, 'category');
        if (reqDataCategory.status === "error") {
            helpers.sessionHasExpired(set, reqDataCategory.msg)
        }
        if ((reqDataCategory.status === 'ok' && reqDataCategory?.data)) {
            setCategories(reqDataCategory?.data?.length);
        }

        let reqDataCount = await lib.getCount(user?.token, 'count');
        if (reqDataCount.status === "error") {
            helpers.sessionHasExpired(set, reqDataCount.msg)
        }
        if ((reqDataCount.status === 'ok' && reqDataCount?.data)) {
            setCount(reqDataCount?.data[0]?.total);
        }
        setLoader(false)
        setActiveIndex(id)
    }

    const changeTab = (val) => {
        if (user?.user_type === 'superadmin') {
            switch (val) {
                case 'Pharmacy':
                    updateIndex(0)
                    setOrder(val);
                    break;
                case 'Analytics':
                    updateIndex(1)
                    setOrder(val)
                    break;
                default:
                    break;
            }
        }
        else {
            switch (val) {
                case 'Pharmacy':
                    updateIndex(0)
                    setOrder(val);
                    break;
                default:
                    break;
            }
        }

    }

    return (
        <div className='main-content'>
            <main>
                {loader ? <ContainerLoader /> : null}
                <Alert onCancel={() => setNoDataAlert(false)} show={noDataAlert} title="Notification" message="You have no more data" />

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

                <div className="user-table__container">

                    <div className="conatainer overflow-hidden">
                        <div className="product-table__container">
                            <Tabs onChangeTab={(val) => changeTab(val)} activeTab={order} tabs={(user?.user_type === 'superadmin') ? ["Pharmacy", "Analytics"] : ["Pharmacy"]} />
                            {activeIndex === 0 ?
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
                                                data={viewData}
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

                                </div>
                            }
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Product;