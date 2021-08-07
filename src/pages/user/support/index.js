import React from 'react';
import './support.css';

const Support = (props) => {
    const NavigationBar = props.NavigationBar;
    return (
        <div className='main-content'>
            <NavigationBar {...props} />
            <main>
                <h3 className="mt-3 mb-5">Support Details</h3>
            </main>
        </div>
    );
}

export default Support;