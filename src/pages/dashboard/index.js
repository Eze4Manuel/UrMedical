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


const userData = [
    { areas: 'life camp', total: 500, month: 'January', },
    { areas: 'wuse', total: 30, month: 'Feb' },
    { areas: 'abaji', total: 950, month: 'March', },
    { areas: 'kuje', total: 180, month: 'April', },
    { areas: 'gwarinpa', total: 100, month: 'May' },
]

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
    const [orderStatus, setOrderStatus] = useState([]);


    const deliveryData = [

        { status: 'total', total: (orderCount?.total) ? orderCount.total : 0, month: 'January', },
        { status: 'completed', total: (orderStatus[1]) ? orderStatus[1].total : 0,  month: 'Feb' },
        { status: 'cancelled',  total: (orderStatus[2]) ? orderStatus[2].total : 0, month: 'March', },
        { status: 'active',  total: (orderStatus[0]) ? orderStatus[0].total : 0, month: 'April', },
        { status: 'pending',  total: (orderStatus[3]) ? orderStatus[3].total : 0, month: 'May' },
    ]

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
            if (reqData.status === "error") {
                helpers.sessionHasExpired(set, reqData.msg)
            }
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
            if (reqData.status === "error") {
                helpers.sessionHasExpired(set, reqData.msg)
            }
            if (reqData.status === 'ok') {
                setTotalTransaction(reqData.data[0])
            }
            setLoader(false)
        })()
    }, [user?.token, page, set])

    // Getting Transaction summary by customer
    useEffect(() => {
        (async () => {
            setLoader(true)
            let reqData = await lib.getTransactionsSummary(user?.token, 'customer')
            if (reqData.status === "error") {
                helpers.sessionHasExpired(set, reqData.msg)
            }
            if (reqData.status === 'ok') {
                setTotalCustomerRevenue(reqData.data[0])
            }
            setLoader(false)
        })()
    }, [user?.token, page, set])

    // Getting Transaction summary by pharmacy
    useEffect(() => {
        (async () => {
            setLoader(true)
            let reqData = await lib.getTransactionsSummary(user?.token, 'pharmacy')
            if (reqData.status === "error") {
                helpers.sessionHasExpired(set, reqData.msg)
            }
            if (reqData.status === 'ok') {
                setTotalPharmacyRevenue(reqData.data[0])
            }
            setLoader(false)
        })()
    }, [user?.token, page, set])


    // Getting Order summary by count
    useEffect(() => {
        (async () => {
            setLoader(true)
            let reqData = await lib.getOrderSummary(user?.token, 'count')
            if (reqData.status === "error") {
                helpers.sessionHasExpired(set, reqData.msg)
            }
            if (reqData.status === 'ok') {
                setOrderCount(reqData.data[0])
            }
            setLoader(false)
        })()
    }, [user?.token, page, set])

    // Getting Order summary by status
    useEffect(() => {
        (async () => {
            setLoader(true)
            let reqData = await lib.getOrderSummary(user?.token, 'status')
            if (reqData.status === "error") {
                helpers.sessionHasExpired(set, reqData.msg)
            }
            if (reqData.status === 'ok') {
                setOrderStatus(reqData.data)
            }
            setLoader(false)
        })()
    }, [user?.token, page, set])





    return (
        <div className='main-content'>
            <NavigationBar {...props} />
            <main>
                <div className="container dashboard-table__container">
                    <div className="product-summary__ctn mt-5">
                        {/* REVENUE */}
                        <div className="row">
                            <DashboardCard color='green' col="3" header="Transactions" value={totalTransactions?.total ? totalTransactions?.total: 0} desc="Total transactions" />
                            <DashboardCard col="3" header="Total Revenue" value={`N ${totalCustomerRevenue?.total ? totalCustomerRevenue?.total : 0}`} desc="All Customer Revenue" />
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
                            <DashboardBar iconDesc="Total order in the last 6 months" desc="Order by Area" header="Orders" icon="las la-users" Bar={ProgressBar} data={userData} dataKey="total" />
                            <DashbaordTable data={userData} dataRow={['month', 'areas', 'total']} header="Orders by Area" headerRow={['Month', 'Area', 'Amount']} />
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