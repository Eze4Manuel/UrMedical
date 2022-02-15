import React, { useEffect, useState } from 'react';
import './Partner.css';
import SubNavbar from '../../../components/subnavbar';
// import NoData from '../../../components/widgets/NoData';
import lib from './lib';
import Table from '../../../components/table';
import { getPageCount, getPages, goTo, onSetPage } from '../../../core/func/utility';
import NewPartnerForm from './NewPartnerForm';
import { ContainerLoader } from '../../../components/loading/Loading';
import PartnerUserData from './PartnerUserData'
import { useAuth } from '../../../core/hooks/useAuth';
import { useNotifications } from '@mantine/notifications';
import Alert from '../../../components/flash/Alert';
import helpers from '../../../core/func/Helpers';

// const noDataTitle = "You haven't created any partner account yet.";
// const noDataParagraph = "You can create a partner yourself by clicking on the button Add partner.";

const fQeury = (data) => {
    return data.map(d => {
        let px = d.users_data[0] || []
        return {
            email: px?.email || d?.contact_email,
            phone_number: px?.phone_number || d?.contact_phone_nnumber,
            ...d
        }
    })
}

const Partner = (props) => {
    const { set, user } = useAuth();
    const notify = useNotifications();
    const [searchInput, setSearchInput] = useState('');
    const [openForm, setOpenForm] = useState(false);
    const [openData, setOpenData] = useState(false);
    const [notFound, setNotFound] = useState(false);
    const [data, setData] = useState([]);
    const [selected, setSelected] = useState(null);
    const [option, setOption] = useState('name');
    const [page, setPage] = useState(1);
    const [activePage, setActivePages] = useState(1);
    const [loader, setLoader] = useState(false);
    const [noDataAlert, setNoDataAlert] = useState(false);

    // data 
    useEffect(() => {
        (async () => {
            setLoader(true)
            let reqData = await lib.get(page, null, user?.token)
            if (reqData.status === "error") {
                helpers.sessionHasExpired(set, reqData.msg)
            }
            if (reqData.status === 'ok') {
                (reqData.data?.length === 0) ?
                    setNoDataAlert(true)
                    :
                    setData(fQeury(reqData.data))
            }
            setLoader(false);
        })();
    }, [user?.token, page, set])



    // setup table data
    const perPage = getPageCount(10);
    const paginate = getPages(data.length, perPage);
    const start = (activePage === 1) ? 0 : (activePage * perPage) - perPage;
    const stop = start + perPage;
    const viewData = data.slice(start, stop);



    const reload = async () => {
        setLoader(true)
        let reqData = await lib.get(1, null, user?.token)
        setLoader(false)
        if (reqData.status === "error") {
            helpers.sessionHasExpired(set, reqData.msg)
        }
        if (reqData.status === 'ok' && reqData?.data?.length > 0) {
            setData(fQeury(reqData.data))

        }
    }

    const onSearch = async () => {
        setLoader(true)
        let reqData = await lib.get(1, searchInput, user?.token)
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

    const onCreate = async (values, setLoading, setError, setValues, resetData) => {
        setLoading(true)
        let reqData = await lib.create(values, user?.token)
        setLoading(false)
        if (reqData.status === "error") {
            helpers.sessionHasExpired(set, reqData.msg, setError)
        }
        if (reqData.status === "ok") {
            setValues(resetData)
            setOpenForm(false)
            helpers.alert({ notifications: notify, icon: 'success', color: 'green', message: 'Pharmacy account created' })
            await reload()
        }
    }

    const fetchMore = (page, key, set) => {
        onSetPage(page, key, set)
    }

    const onSelected = async (value) => {
        setLoader(true)
        let reqData = await lib.getOne(value?.pharm_id, user?.token)
        if (reqData.status === 'ok' && reqData?.data) {
            setSelected(reqData.data)
        }
        setLoader(false)
        setOpenData(true)
    }

    const onDeleted = async (id) => {
        // remove from selected
        setSelected(null)
        // close modal
        setOpenData(false)
        // remove from data list
        let d = data.filter(val => (String(val?.auth_id) !== String(id)))
        setData(fQeury(d))
        await reload()
    }

    return (
        <div className="main-content">
            <main>
                {loader ? <ContainerLoader /> : null}
                <Alert onCancel={() => setNoDataAlert(false)} show={noDataAlert} title="Notification" message="You have no more data" />

                <Alert onCancel={() => setNotFound(false)} show={notFound} title="Notification" message="No match found" />
                <NewPartnerForm show={openForm} onHide={() => setOpenForm(false)} onSubmit={onCreate} />
                <SubNavbar
                    showFilter
                    showSearch
                    showButton
                    filterName="filter_partner"
                    filterList={['name', 'location', 'phone']}
                    searchPlaceholder="Search for partner..."
                    ariaLabel="partner"
                    ariaDescription="partner"
                    onSearch={() => onSearch()}
                    searchInput={searchInput}
                    onChangeInput={setSearchInput}
                    searchID="search_partner"
                    buttonTitle="Add Partner"
                    onSelectChange={setOption}
                    option={option}
                    onAddItem={() => setOpenForm(true)}
                />
                <PartnerUserData onUpdated={(data) => setSelected(data)} onDeleted={(id) => onDeleted(id)} data={selected} show={openData} onHide={() => setOpenData(false)} />
                {
                    viewData.length > 0
                        ? (
                            <div className="partner-table__container">
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
                                    tableHeader={['#', 'Name', 'phone', 'Email', 'Area']}
                                    dataFields={['name', 'phone_number', 'email', 'area']}
                                />
                            </div>
                        )
                        : null
                }
            </main>
        </div>
    )
}

export default Partner
