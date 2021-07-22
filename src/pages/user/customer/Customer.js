import React from 'react';
import './Customer.css';
import Global from '../../../assets/styles/Global';

const Customer = (props) => {
    const NavigationBar = props.NavigationBar;
    return (
        <div className='main-content'>
            <NavigationBar {...props} />
            <main>
                <div style={Global.center}>
                    <h3 className="mt-3 mb-5">Customer Details</h3>
                </div>
            </main>
        </div>
    );
}

export default Customer;