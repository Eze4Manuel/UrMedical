import React, { useEffect, useState } from 'react';
import './ProductSummary.css';
import { Dialog } from 'primereact/dialog';
import config from '../../assets/utils/config';
import lib from './lib';
import { TabView, TabPanel } from 'primereact/tabview';
import Table from '../../components/table';
import { useAuth } from '../../core/hooks/useAuth';
import { getPageCount, getPages, goTo, onSetPage } from '../../core/func/utility';
import helpers from '../../core/func/Helpers';
import NoData from '../../components/widgets/NoData';
import ProductSelectedSummary from './ProductSelectedSummary';
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
    const [showPassword, setShowPassword] = React.useState(false);
    const [delWarning, setDelWarning] = React.useState(false);
    const [pharmData, setPharmData] = React.useState(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [loader, setLoader] = useState(false);
    const [selected, setSelected] = useState(null);
    const [page, setPage] = useState(1);
    const [openData, setOpenData] = useState(false);
    const [activePage, setActivePages] = useState(1);

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






    return (
        <Dialog closeOnEscape header="Pharmacy Product Summary" visible={show} modal onHide={() => onHide()} style={{ width: "70vw" }}>
            <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
                <TabPanel header="Products">
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

                </TabPanel>

            </TabView>


        </Dialog>
    )
}

export default SupportUserData
