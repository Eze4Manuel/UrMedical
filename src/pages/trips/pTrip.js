import React, { useEffect, useState } from 'react';
import './Trip.css';
import NoData from '../../components/widgets/NoData';
import SubNavbar from '../../components/subnavbar/index';
import lib from './lib';
import Table from '../../components/table';
import { getPageCount, getPages, goTo, onSetPage } from '../../core/func/utility';
import { ContainerLoader } from '../../components/loading/Loading';
import Tabs from "../../components/tabs/Tabs";

const noDataTitle = "No trips yet.";
const noDataParagraph = "All dispatch trips will appear here.";

const Trip = (props) => {
    const [searchInput, setSearchInput] = useState('');
    const [openForm, setOpenForm] = useState(false);
    const [openData, setOpenData] = useState(false);
    const [trips, setTrips] = useState("All");
    const [data, setData] = useState([]);
    const [selected, setSelected] = useState(null);
    const [option, setOption] = useState('name');
    const [page, setPage] = useState(1);
    const [activePage, setActivePages] = useState(1);
    const [loader, setLoader] = useState(false);

    // data 
    useEffect(() => {
        setData([])
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
            <main>
                {loader ? <ContainerLoader /> : null}
                <SubNavbar  
                    showFilter
                    showSearch
                    showButton={false}
                    filterName="trips"
                    filterList={['name', 'location','phone']}
                    searchPlaceholder="Search for trips..."
                    ariaLabel="trips"
                    ariaDescription="trips"
                    onSearch={() => onSearch()}
                    searchInput={searchInput}
                    onChangeInput={setSearchInput}
                    searchID="trips"
                    onSelectChange={setOption}
                    option={option}
                    onAddItem={() => setOpenForm(true)}
                />
                <div className="trip-table__container">
                    <Tabs onChangeTab={(val) => setTrips(val)} activeTab={trips} tabs={["All", "pending", "cancelled","fulfilled"]} />
                    {data.length === 0 ? <NoData title={noDataTitle} paragraph={noDataParagraph} /> : null}

                    {/* <Table
                        onSelectData={onSelected}
                        prev={() => fetchMore(page, 'prev', setPage)}
                        next={() => fetchMore(page, 'next', setPage)}
                        goTo={(id) => goTo(id, setActivePages)}
                        activePage={activePage}
                        pages={paginate}
                        data={viewData}
                        perPage={perPage}
                        route="" // {config.pages.user}
                        tableTitle="Transactions summary" 
                        tableHeader={['#','Pharmacy', 'Products', 'Categories', 'Ratings']}
                        dataFields={['name', 'products', 'categories', 'ratings']}
                    /> */}
                </div>
            </main>
        </div>
    );
}

export default Trip;