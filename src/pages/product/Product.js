import React, { useEffect, useState } from 'react';
import './Product.css';
import NoData from '../../components/widgets/NoData';
import SubNavbar from '../../components/subnavbar/index';
import lib from './lib';
import Table from '../../components/table';
import { getPageCount, getPages, goTo, onSetPage } from '../../core/func/utility';
import { pharmacyData } from '../../assets/data/product';
// import NewCustomerForm from './NewCustomerForm';
import { ContainerLoader } from '../../components/loading/Loading';
import ProductSummary from './ProductSummary'

const noDataTitle = "No pharmacy have added to their product yet.";
const noDataParagraph = "You can create a partner (pharmacy) yourself by clicking on the partner section of the sidebar.";

const Product = (props) => {
    const NavigationBar = props.NavigationBar;
    const [searchInput, setSearchInput] = useState('');
    const [openForm, setOpenForm] = useState(false);
    const [openData, setOpenData] = useState(false);
    const [data, setData] = useState([]);
    const [selected, setSelected] = useState(null);
    const [option, setOption] = useState('name');
    const [page, setPage] = useState(1);
    const [activePage, setActivePages] = useState(1);
    const [loader, setLoader] = useState(false);

    // data 
    useEffect(() => {
        setData(pharmacyData)
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

    const onSelected = (value) => {
        setLoader(true)
        setTimeout(() => {
            setSelected(value)
            setOpenData(true)
            setLoader(false)
        }, 3000)
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
                {/* <NewCustomerForm show={openForm} onHide={() => setOpenForm(false)} onSubmit={onCreate} /> */}
                <SubNavbar  
                    showFilter
                    showSearch
                    showButton={false}
                    filterName="product"
                    filterList={['name', 'location','phone']}
                    searchPlaceholder="Search for product summary..."
                    ariaLabel="product"
                    ariaDescription="product"
                    onSearch={() => onSearch()}
                    searchInput={searchInput}
                    onChangeInput={setSearchInput}
                    searchID="product"
                    buttonTitle="Add pharmacy"
                    onSelectChange={setOption}
                    option={option}
                    onAddItem={() => setOpenForm(true)}
                />
                {data.length === 0 ? <NoData title={noDataTitle} paragraph={noDataParagraph} /> : null}
                <ProductSummary onDeleted={(id) => onDeleted(id)} data={selected} show={openData} onHide={() => setOpenData(false)} />
                <div className="product-table__container">
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
                        tableHeader={['#','Pharmacy', 'Products', 'Categories', 'Ratings']}
                        dataFields={['name', 'products', 'categories', 'ratings']}
                    />
                </div>
            </main>
        </div>
    );
}

export default Product;