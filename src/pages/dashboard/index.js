import React from 'react';
import './Dashboard.css';
import NavigationBar from '../../components/navigation/Navbar';
import ProgressBar from '../../components/progressbar/ProgressBar';
import DashboardCard from '../../components/dashboardhelps/DashboardCard';
import DashboardBar from '../../components/dashboardhelps/DashboardBar';
import DashbaordTable from '../../components/dashboardhelps/DashbaordTable';

const deliveryData = [
    {status: 'total', total: 500, month: 'January', },
    {status: 'completed', total: 30, month: 'Feb'},
    {status: 'cancelled', total: 950, month: 'March',},
    {status: 'active', total: 180, month: 'April',},
    {status: 'pending', total: 100, month: 'May'},
]

const userData = [
    {areas: 'life camp', total: 500, month: 'January', },
    {areas: 'wuse', total: 30, month: 'Feb'},
    {areas: 'abaji', total: 950, month: 'March',},
    {areas: 'kuje', total: 180, month: 'April',},
    {areas: 'gwarinpa', total: 100, month: 'May'},
]

const reveneData = [
    {month: 'January', total: 20000, products: 30, orders: 20},
    {month: 'Feb', total: 3000, products: 30, orders: 20},
    {month: 'March', total: 95000, products: 30, orders: 20},
    {month: 'April', total: 18000, products: 30, orders: 20},
    {month: 'May', total: 100000, products: 30, orders: 20},
]

const Dashboard = (props) => {
    return (
        <div className='main-content'>
            <NavigationBar {...props} />
            <main>
                <div className="container dashboard-table__container">
                        <div className="product-summary__ctn mt-5">
                        {/* REVENUE */}
                        <div className="row">
                            <DashboardCard color='green' col="3" header="Life Revenue" value="898.5M" desc="Total revenue" />
                            <DashboardCard col="3" header="Monthly Revenue" value="20.85M" desc="The current month" />
                            <DashboardCard color='blue' col="3" header="Platform" value="2.3M" desc="Direct sales" />
                            <DashboardCard color='yellow' col="3" header="Pharmacies" value="17.9M" desc="All pharmacy gross revenue" />
                        </div>
                        <div className="row">
                            <DashboardBar header="Revenue" iconDesc="Total revenue for the last 6 months" desc="Generated revenue" icon="las la-users" Bar={ProgressBar} data={reveneData} dataKey="total" />
                            <DashbaordTable dataRow={['month', 'products', 'orders', 'total']} data={reveneData} header="Revenue by Area" headerRow={['Month', 'products', 'Orders', 'Amount']} />
                        </div>
                        {/* ORDERS */}
                        <div className="row mt-5">
                            <DashboardCard color='green' col="3" header="User" value="4.2k" desc="Total users" />
                            <DashboardCard col="3" header="Customers" value="3.3k" desc="Active users" />
                            <DashboardCard color='blue' col="3" header="Dispatchers" value="21" desc="Delivery personnel" />
                            <DashboardCard color='yellow' col="3" header="Pharmacies" value="21" desc="Listed partner pharmacies" />
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