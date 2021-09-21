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


const reveneData = [
    { month: 'January', total: 20000, products: 30, orders: 20 },
    { month: 'Feb', total: 3000, products: 30, orders: 20 },
    { month: 'March', total: 95000, products: 30, orders: 20 },
    { month: 'April', total: 18000, products: 30, orders: 20 },
    { month: 'May', total: 100000, products: 30, orders: 20 },
]

const Dashboard = (props) => {

    const { set, user } = useAuth();
    const [loader, setLoader] = useState(false);
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [totalUsers, setTotalUsers] = useState(1);
    const [userTypes, setUserTypes] = useState([]);
    const [totalTransactions, setTotalTransaction] = useState([]);
    const [totalCustomerRevenue, setTotalCustomerRevenue] = useState([]);
    const [totalPharmacyRevenue, setTotalPharmacyRevenue] = useState([]);
    const [orderCount, setOrderCount] = useState([]);
    const [orderStatus, setOrderStatus] = useState({});
    const [orderArea, setOrderArea] = useState([]);
    const [orderMonth, setOrderMonth] = useState([]);





    // Getting Transaction summary by type
    useEffect(() => {
        (async () => {
            setLoader(true)
            let reqData = await lib.getUsers(user?.token, 'type')
            if (reqData.status === "error") {
                helpers.sessionHasExpired(set, reqData.msg)
            }
            if (reqData.status === 'ok') {
                setUserTypes(reqData.data)
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
            let reqData = await lib.getTransactionsSummary(user?.token, 'count')
            if (reqData.status === 'ok') {
                setTotalTransaction(reqData.data[0])
            }
            setLoader(false)
        })()
    }, [user?.token, page, set])

    // Getting Transaction summary by customer
    useEffect(() => {
        (async () => {
            let reqData = await lib.getTransactionsSummary(user?.token, 'customer')
            if (reqData.status === 'ok') {
                setTotalCustomerRevenue(reqData.data[0])
            }
        })()
    }, [user?.token, page, set])

    // Getting Transaction summary by pharmacy
    useEffect(() => {
        (async () => {
            let reqData = await lib.getTransactionsSummary(user?.token, 'pharmacy')
            if (reqData.status === 'ok') {
                setTotalPharmacyRevenue(reqData.data[0])
            }
        })()
    }, [user?.token, page, set])


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
            // let today = new Date(Date.now())
            // let start_date = formatDate(today, 'yy-mm-dd');

            let reqData = await lib.getOrderSummary(user?.token, 'month')
            if (reqData.status === 'ok') {
                setOrderMonth(reqData.data)
            }
            setLoader(false)

        })()
    }, [user?.token, page, set])


    const months = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']


    const mapStatus = (res) => {
        let obj = {
            active: 0,
            cancelled: 0,
            fulfilled: 0,
            pending: 0
        }
        res.map(e => {
            obj[`${e._id}`] = e.total
        })
        setOrderStatus(obj);
        return
    }

    const formatDate = (date, format) => {
        const map = {
            mm: date.getMonth() + 1,
            dd: date.getDate(),
            yy: date.getFullYear().toString().slice(-2),
            yyyy: date.getFullYear()
        }

        return format.replace(/mm|dd|yy|yyy/gi, matched => map[matched])
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
            { areas: 'life camp', total: 0, sn: '1', },
        ]


    const userData2 = (orderMonth.length > 0) ? orderMonth?.map((e, ind) => (
        { sn: ind, total: e.total, month: months[e._id], }
    )) :
        [
            { areas: 'life camp', total: 0, sn: '1', },
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
                            <DashboardCard color='green' col="3" header="Transactions" value={totalTransactions?.total ? totalTransactions?.total : 0} desc="Total transactions" />
                            <DashboardCard col="3" header="Monthly Revenue" value="20.85M" desc="The current month" />
                            <DashboardCard color='blue' col="3" header="Platform" value="N2.3M" desc="Direct sales" />
                            <DashboardCard color='yellow' col="3" header="Pharmacies" value={`N${totalPharmacyRevenue?.pharmacy_revenue ? totalPharmacyRevenue?.pharmacy_revenue : 0}`} desc="All pharmacy gross revenue" />
                        </div>
                        <div className="row">
                            <DashboardBar header="Revenue" iconDesc="Total revenue for the last 6 months" desc="Generated revenue" icon="las la-users" Bar={ProgressBar} data={reveneData} dataKey="total" />
                            <DashbaordTable dataRow={['month', 'products', 'orders', 'total']} data={reveneData} header="Revenue by Area" headerRow={['Month', 'products', 'Orders', 'Amount']} />
                        </div>
                        {/* ORDERS */}
                        <div className="row mt-5">
                            <DashboardCard color='red' col="3" header="User" value={totalUsers?.total ? totalUsers?.total : 0} desc="Total users" />
                            <DashboardCard color='green' col="3" header="Support" value={userTypes[1]?.total ? userTypes[1]?.total : 0} desc="Total Support" />
                            <DashboardCard col="3" header="Customers" value={userTypes[3]?.total ? userTypes[3]?.total : 0} desc="Listed customers" />
                            <DashboardCard color='blue' col="3" header="Dispatchers" value={userTypes[0]?.total ? userTypes[0]?.total : 0} desc="Delivery personnel" />
                            <DashboardCard color='yellow' col="3" header="Pharmacies" value={userTypes[2]?.total ? userTypes[2]?.total : 0} desc="Listed partner pharmacies" />
                            <DashboardCard color='black' col="3" header="Pharmacists" value={userTypes[4]?.total ? userTypes[4]?.total : 0} desc="Listed pharmacists" />
                        </div>
                        <div className="row">
                            <DashboardBar iconDesc="Total order in the last 6 months" desc="Orders" header="Orders" icon="las la-users" Bar={ProgressBar} data={userData2} dataKey="total" />
                            <DashbaordTable data={userData} dataRow={['sn', 'areas', 'total']} header="Orders by Area" headerRow={['#', 'Area', 'No of Orders']} />
                        </div>
                        <div className="row mb-5 pb-5">
                            <DashbaordTable order={true} col="12" data={deliveryData} dataRow={['status', 'total']} header="Current deliveries" headerRow={['Status', 'Quantity']} />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Dashboard;