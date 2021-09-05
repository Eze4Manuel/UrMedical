import React, { useEffect, useState } from 'react';
import './Product.css';
import { useAuth } from '../../core/hooks/useAuth';
import NoData from '../../components/widgets/NoData';
import SubNavbar from '../../components/subnavbar/index';
import lib from './lib';
import Table from '../../components/table';
import { useNotifications } from '@mantine/notifications';
import { getPageCount, getPages, goTo, onSetPage } from '../../core/func/utility';
// import NewCustomerForm from './NewCustomerForm';
import helpers from '../../core/func/Helpers';
import { ContainerLoader } from '../../components/loading/Loading';
import ProductSummary from './ProductSummary'
import Alert from '../../components/flash/Alert';

const noDataTitle = "No pharmacy have added to their product yet.";
const noDataParagraph = "You can create a product yourself by clicking on the add product button.";

const Product = (props) => {
    const { set, user } = useAuth();
    const notify = useNotifications();
    const [searchInput, setSearchInput] = useState('');
    const NavigationBar = props.NavigationBar;
    const [openForm, setOpenForm] = useState(false);
    const [openData, setOpenData] = useState(false);
    const [data, setData] = useState([]);
    const [notFound, setNotFound] = useState(false);
    const [selected, setSelected] = useState(null);
    const [option, setOption] = useState('name');
    const [page, setPage] = useState(1);
    const [activePage, setActivePages] = useState(1);
    const [loader, setLoader] = useState(false);

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
            console.log(reqData);
            if (reqData.status === "error") {
                helpers.sessionHasExpired(set, reqData.msg)
            }
            if (reqData.status === 'ok') {
                setData(fQeury(reqData.data))
            }
            setLoader(false)
        })()

        // setData(pharmacyData)
    }, [])

    // setup table data
    const perPage = getPageCount(10);
    const paginate = getPages(data.length, perPage); 
    const start = (activePage === 1) ? 0 : (activePage*perPage)  - perPage;
    const stop = start+perPage;
    const viewData = data.slice(start, stop);

    const onSearch = () => {}

    const onCreate = (values, setLoading, setError, setValues) => {
        lib.create()
    }

    const fetchMore = (page, key, set) => {
       onSetPage(page, key, set)
        // fetch the next page from the service and update the state
    }

    const onSelected = async (value) => {
        setLoader(true)
        console.log(value);
        console.log(user);
        let reqData = await lib.getOne(value?._id, user?.token)
        if (reqData.status === 'ok' && reqData?.data) {
            setSelected(reqData.data)
        } 
        console.log(reqData.data);
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

    return (
        <div className='main-content'>
            <NavigationBar {...props} />
            <main>
                {loader ? <ContainerLoader /> : null}
                <Alert onCancel={() => setNotFound(false)} show={notFound} title="Notification" message="No match found" />
                {/* <NewProductForm show={openForm} onHide={() => setOpenForm(false)} onSubmit={onCreate} /> */}
                <SubNavbar  
                    showFilter
                    showSearch
                    showButton = {false}
                    filterName="product"
                    filterList={['name', 'location','phone']}
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
                {data.length === 0 ? <NoData title={noDataTitle} paragraph={noDataParagraph} /> : 
                <div className="user-table__container">
                <div className="conatainer overflow-hidden">
                <div className="product-table__container">
                    <ProductSummary onDeleted={(id) => onDeleted(id)} data={selected} show={openData} onHide={() => setOpenData(false)} />
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
                        tableHeader={['#','Pharmacy', '','', 'Email']}
                        dataFields={['name', '', '', 'email']}
                    />
            </div>
                </div>
            </div>
            }
                
            </main>

        </div>
    );
}

export default Product;