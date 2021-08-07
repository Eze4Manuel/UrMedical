import React from 'react';
import './Transaction.css';

const Transaction = (props) => {
    const NavigationBar = props.NavigationBar;
    return (
        <div className='main-content'>
            <NavigationBar {...props} />
            <main>
                <h3 className="mt-3 mb-5">Transaction Details</h3>
            </main>
        </div>
    );
}

export default Transaction;