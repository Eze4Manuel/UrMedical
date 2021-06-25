import React from 'react';
import './Navbar.css';

const Navbar = (props) => {
    return (
        <header className="header subnav-container">
            <div className="menu-toggle">
                <label for="">
                    <span className="las la-bars"></span>
                </label>
            </div>
            <div className="header-icons">
                <span className="las la-search"></span>
                <span className="las la-bookmark"></span>
                <span className="las la-sms"></span>
            </div>
        </header>
    );
}


export default Navbar;