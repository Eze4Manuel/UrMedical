import React from 'react';
import './Trip.css';

const Trip = (props) => {
    const NavigationBar = props.NavigationBar;
    return (
        <div className='main-content'>
            <NavigationBar {...props} />
            <main>
                <h3 className="mt-3 mb-5">Trip Details</h3>
            </main>
        </div>
    );
}

export default Trip;