import React, { useEffect, useState } from 'react';
import './Partner.css';
import SubNavbar from '../../../components/subnavbar';
import NoData from '../../../components/widgets/NoData';
import lib from './lib';
import Table from '../../../components/table';
import { getPageCount, getPages, goTo, onSetPage } from '../../../core/func/utility';
import partnerData from '../../../assets/data/pharmacy';
import NewPartnerForm from './NewPartnerForm';
import { ContainerLoader } from '../../../components/loading/Loading';
import PartnerUserData from './PartnerUserData'


const noDataTitle = "You haven't created any partner account yet.";
const noDataParagraph = "You can create a partner yourself by clicking on the button Add partner.";


const handleDataSearch = () => {}


const Partner = (props) => {
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
        setData(partnerData)
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
        <div className="main-content">
            <NavigationBar {...props} />
            <main>
                {loader ? <ContainerLoader /> : null}
                <NewPartnerForm show={openForm} onHide={() => setOpenForm(false)} onSubmit={onCreate} />

                <SubNavbar  
                    showFilter
                    showSearch
                    showButton
                    filterName="filter_partner"
                    filterList={['name', 'location','phone']}
                    searchPlaceholder="Search for partner..."
                    ariaLabel="partner"
                    ariaDescription="partner"
                    onSearch={() => handleDataSearch(searchInput)}
                    searchInput={searchInput}
                    onChangeInput={setSearchInput}
                    searchID="search_partner"
                    buttonTitle="Add Partner"
                    onSelectChange={setOption}
                    option={option}
                    onAddItem={() => setOpenForm(true)}
                />
                {data.length === 0 ? <NoData title={noDataTitle} paragraph={noDataParagraph} /> : null}
                <PartnerUserData onDeleted={(id) => onDeleted(id)} data={selected} show={openData} onHide={() => setOpenData(false)} />
                <div className="customer-table__container">
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
                        tableTitle="Partners - Pharmacy" 
                        tableHeader={['#','Name', 'phone', 'City', 'Area']}
                        dataFields={['name', 'phone_number', 'city', 'home_area']}
                    />
                </div>
            </main>
        </div>
    )
}

export default Partner
