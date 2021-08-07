import React from 'react';
import './Setting.css';

const Setting = (props) => {
    const NavigationBar = props.NavigationBar;
    return (
        <div className='main-content'>
            <NavigationBar {...props} />
            <main>
                <h3 className="mt-3 mb-5">Setting Details</h3>
            </main>
        </div>
    );
}

export default Setting;