import React, { useEffect, useState } from 'react';
import './Transaction.css';
import NoData from '../../components/widgets/NoData';
import SubNavbar from '../../components/subnavbar/index';
import lib from './lib';
import Table from '../../components/table';
import { getPageCount, getPages, goTo, onSetPage } from '../../core/func/utility';
import { ContainerLoader } from '../../components/loading/Loading';
import TransactionDetail from './TransactionDetail'
import transactionData from '../../assets/data/transaction';
import { useAuth } from '../../core/hooks/useAuth';
import helpers from '../../core/func/Helpers';

const noDataTitle = "No transaction have have been made yet.";
const noDataParagraph = "You will see all transactions on this page.";

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
const Transaction = (props) => {
    const { set, user } = useAuth();
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
    const [notFound, setNotFound] = useState(false);

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
            setLoader(false);
        })()
    }, [])

    // setup table data
    const perPage = getPageCount(10);
    const paginate = getPages(data.length, perPage);
    const start = (activePage === 1) ? 0 : (activePage * perPage) - perPage;
    const stop = start + perPage;
    const viewData = data.slice(start, stop);

    const onSearch = async() => {
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
                <SubNavbar
                    showFilter
                    showSearch
                    showButton={false}
                    filterName="transaction"
                    filterList={['name', 'location', 'phone']}
                    searchPlaceholder="Search for transaction..."
                    ariaLabel="transaction"
                    ariaDescription="transaction"
                    onSearch={() => onSearch()}
                    searchInput={searchInput}
                    onChangeInput={setSearchInput}
                    searchID="transaction"
                    buttonTitle="Add pharmacy"
                    onSelectChange={setOption}
                    option={option}
                    onAddItem={() => setOpenForm(true)}
                />
                {data.length === 0 ? <NoData title={noDataTitle} paragraph={noDataParagraph} /> :
                    <>
                        <TransactionDetail onDeleted={(id) => onDeleted(id)} data={selected} show={openData} onHide={() => setOpenData(false)} />
                        <div className="transaction-table__container">
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
                                tableTitle="Transactions"
                                tableHeader={['#', 'ID', 'Name', 'Email', 'Payment Method', 'Amount']}
                                dataFields={['_id', 'name', 'email', 'payment_method', 'amount']}
                            />
                        </div>
                    </>

                }
            </main>
        </div>
    );
}

export default Transaction;