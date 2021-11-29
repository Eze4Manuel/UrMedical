import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import NavigationBar from '../../components/navigation/Navbar';
import ProgressBar from '../../components/progressbar/ProgressBar';
import DashboardCard from '../../components/dashboardhelps/DashboardCard';
import DashboardBar from '../../components/dashboardhelps/DashboardBar';
import DashbaordTable from '../../components/dashboardhelps/DashbaordTable';

import lib from './lib';
import { useAuth } from '../../core/hooks/useAuth';
import helpers from '../../core/func/Helpers';
import { ContainerLoader } from '../../components/loading/Loading';
import { fShortenNumber } from '../../assets/utils/formatNumber';

const Dashboard = (props) => {
    const { set, user } = useAuth();
    const [loader, setLoader] = useState(false);
    const [page,] = useState(1);
    const [totalUsers, setTotalUsers] = useState(1);
    const [userTypes, setUserTypes] = useState([]);
    const [totalTransactions, setTotalTransaction] = useState([]);
    const [revenueFor6Months, setRevenueFor6Months] = useState([]);
    const [revenueByArea, setRevenueByArea] = useState([]);
    const [revenueByMonth, setRevenueByMonth] = useState({});
    const [, setTotalCustomerRevenue] = useState([]);
    const [totalPharmacyRevenue, setTotalPharmacyRevenue] = useState({});
    const [orderCount, setOrderCount] = useState([]);
    const [orderStatus, setOrderStatus] = useState({});
    const [orderArea, setOrderArea] = useState([]);
    const [orderMonth, setOrderMonth] = useState([]);

    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();





    // Getting Transaction summary by type
    useEffect(() => {
        (async () => {
            setLoader(true)
            let reqData = await lib.getUsers(user?.token, 'type')
            if (reqData.status === "error") {
                helpers.sessionHasExpired(set, reqData.msg)
            }
            if (reqData.status === 'ok') {
                setUserTypes(reqData.data);
            }
            setLoader(false)
        })()
    }, [user?.token, page, set])


    // Getting Users summary by count
    useEffect(() => {
        (async () => {
            setLoader(true)
            let reqData = await lib.getUsers(user?.token, 'count')
            if (reqData.status === 'ok') {
                setTotalUsers(reqData.data)
            }
            setLoader(false)
        })()
    }, [user?.token, page, set])


    // Getting Transaction summary by count
    useEffect(() => {
        (async () => {
            setLoader(true)
            let reqData = await lib.getTransactionsSummary(user?.token, 'count', currentYear)
            if (reqData.status === 'ok') {
                setTotalTransaction(reqData.data[0])
            }
            setLoader(false)
        })()
    }, [user?.token, page, set, currentYear])

    // Getting Transaction summary by customer
    useEffect(() => {
        (async () => {
            let reqData = await lib.getTransactionsSummary(user?.token, 'customer', currentYear)
            if (reqData.status === 'ok') {
                setTotalCustomerRevenue(reqData.data[0])
            }
        })()
    }, [user?.token, page, set, currentYear])

    // Getting Transaction summary by pharmacy
    useEffect(() => {
        (async () => {
            let reqData = await lib.getTransactionsSummary(user?.token, 'pharmacy', currentYear)
            if (reqData.status === 'ok') {
                setTotalPharmacyRevenue(reqData.data[0])
            }
        })()
    }, [user?.token, page, set, currentYear])

    // Getting Transaction summary by Area
    useEffect(() => {
        (async () => {
            let reqData = await lib.getTransactionsSummary(user?.token, 'area', currentYear)
            if (reqData.status === 'ok') {
                setRevenueByArea(reqData.data)
            }
        })()
    }, [user?.token, page, set, currentYear])

    // Getting Transaction summary by Month
    useEffect(() => { 
        (async () => {
            let reqData = await lib.getTransactionsSummary(user?.token, 'month', currentYear)
            if (reqData.status === 'ok') {
                setRevenueByMonth(reqData.data?.find(e => {
                    return e._id === currentMonth
                }));
                setRevenueFor6Months(reqData.data)
            }
        })()
    }, [user?.token, page, set, currentMonth, currentYear])

    // Getting Order summary by count
    useEffect(() => {
        (async () => {
            let reqData = await lib.getOrderSummary(user?.token, 'count')
            if (reqData.status === 'ok') {
                setOrderCount(reqData.data[0])
            }
        })()
    }, [user?.token, page, set])

    // Getting Order summary by status
    useEffect(() => {
        (async () => {
            let reqData = await lib.getOrderSummary(user?.token, 'status')
            if (reqData.status === 'ok') {
                await mapStatus(reqData.data)
            }
        })()
    }, [user?.token, page, set])

    // Getting Order summary by area
    useEffect(() => {
        (async () => {
            setLoader(true)
            let reqData = await lib.getOrderSummary(user?.token, 'area')
            if (reqData.status === 'ok') {
                setOrderArea(reqData.data)
            }
        })()
    }, [user?.token, page, set])

    // Getting Order summary by month
    useEffect(() => {
        (async () => {
            setLoader(true)
            let reqData = await lib.getOrderSummary(user?.token, 'month')
            if (reqData.status === 'ok') {
                setOrderMonth(reqData.data)
            }
            setLoader(false)

        })()
    }, [user?.token, page, set])

    const months = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

    let reveneData = revenueFor6Months.length > 0 ? revenueFor6Months?.map((e, ind) => {
        return { sn: ind + 1, month: months[e._id], dispatch_fee: e.dispatch_fee, amount: e.amount, total: e.total }
    }) : [{ sn: 0, month: '', dispatch_fee: '', amount: '', total: '' }]
    reveneData.splice(5);

    const mapStatus = (res) => {
        let obj = {
            active: 0,
            cancelled: 0,
            fulfilled: 0,
            pending: 0
        }
        res.forEach(e => {
            obj[`${e._id}`] = e.total
        })
        setOrderStatus(obj);
        return
    }


    const deliveryData = [
        { status: 'Total', total: (orderCount?.total) ? orderCount.total : 0, month: 'January', },
        { status: 'Completed', total: orderStatus.fulfilled, month: 'Feb' },
        { status: 'Cancelled', total: orderStatus.cancelled, month: 'March', },
        { status: 'Active', total: orderStatus.active, month: 'April', },
        { status: 'Pending', total: orderStatus.pending, month: 'May' },
    ]

    const userData = (orderArea.length > 0) ? orderArea?.map((e, ind) => (
        { areas: e._id, total: e.total, sn: ind + 1, }
    )) :
        [
            { areas: '', total: 0, sn: '', },
        ]


    const userData2 = (orderMonth.length > 0) ? orderMonth?.map((e, ind) => (
        { sn: ind, total: e.total, month: months[e._id], }
    )) :
        [
            { areas: '', total: 0, sn: '', },
        ]


    return (
        <div className='main-content'>
            {loader ? <ContainerLoader /> : null}
            <NavigationBar {...props} />
            <main>
                <div className="container dashboard-table__container">
                    <div className="product-summary__ctn mt-5">
                        {/* REVENUE */}
                        <div className="row">
                            <DashboardCard col="3" header="Monthly Revenue" value={`${fShortenNumber(revenueByMonth?.total) ?? 0}`} desc="The current month" />
                            <DashboardCard color='yellow' col="3" header="Pharmacies" value={`${fShortenNumber(totalPharmacyRevenue?.total) ?? 0}`} desc="All pharmacy gross revenue" />
                            <DashboardCard color='green' col="3" header="Transactions" value={fShortenNumber(totalTransactions?.total) ??  0} desc="Total transactions" />

                        </div>
                        <div className="row">
                            <DashbaordTable dataRow={['sn', '_id', 'amount', 'dispatch_fee', 'total']} data={revenueByArea} header="Revenue by Area" headerRow={['#', 'Area', 'Amount', 'Dispatch Fee', 'Total']} />
                            <DashbaordTable dataRow={['sn', 'month', 'amount', 'dispatch_fee', 'total']} data={reveneData} header="Revenue For Last 6 months" headerRow={['#', 'Month', 'Amount', 'Dispatch Fee', 'Total']} />
                            <DashboardBar header="Revenue Chart" iconDesc="Total revenue for the last 6 months" desc="Generated revenue" icon="las la-users" Bar={ProgressBar} data={reveneData} dataKey="total" />
                        </div>
                        {/* ORDERS */}
                        <div className="row mt-5">
                            <DashboardCard color='red' col="3" header="User" value={totalUsers?.total ?? 0} desc="Total users" />
                            <DashboardCard color='green' col="3" header="Support" value={userTypes[1]?.total ?? 0} desc="Total Support" />
                            <DashboardCard col="3" header="Customers" value={userTypes[3]?.total ?? 0} desc="Listed customers" />
                            <DashboardCard color='blue' col="3" header="Dispatches" value={userTypes[0]?.total ?? 0} desc="Delivery personnel" />
                            <DashboardCard color='yellow' col="3" header="Pharmacies" value={userTypes[2]?.total ?? 0} desc="Listed partner pharmacies" />
                            <DashboardCard color='black' col="3" header="Pharmacists" value={userTypes[4]?.total ?? 0} desc="Listed pharmacists" />
                        </div>
                        <div className="row">
                            <DashboardBar iconDesc="Total order in the last 6 months" desc="Orders" header="Orders" icon="las la-users" Bar={ProgressBar} data={userData2} dataKey="total" />
                        </div>
                        <div className="row mb-5 pb-5">
                            <DashbaordTable data={userData} col="6" dataRow={['sn', 'areas', 'total']} header="Orders by Area" headerRow={['#', 'Area', 'No of Orders']} />
                            <DashbaordTable order={true} col="6" data={deliveryData} dataRow={['status', 'total']} header="Current deliveries" headerRow={['Status', 'Quantity']} />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Dashboard;