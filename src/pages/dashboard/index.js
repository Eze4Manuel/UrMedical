import React from 'react';
import Global from '../../assets/styles/Global';
import NavigationBar from '../../components/navigation/Navbar';


const Dashboard = (props) => {
    return (
        <div className='main-content'>
            <NavigationBar {...props} />
            <main>
                <div style={Global.center}>
                    <h3 className="mt-3 mb-5">Analytics</h3>
                </div>
            </main>
        </div>
    );
}

export default Dashboard;