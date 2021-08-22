import React from 'react';
import './Dashboard.css';
import NavigationBar from '../../components/navigation/Navbar';


const PharmacyDashboard = (props) => {
    return (
        <div className='main-content'>
            <NavigationBar {...props} />
            <main>
                <div className="container dashboard-table__container">
                        
                </div>
            </main>
        </div>
    );
}

export default PharmacyDashboard;