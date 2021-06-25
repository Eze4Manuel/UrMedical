import React from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const Navigation = (props) => {
    return (
        <div>
            <Sidebar {...props}/>
            <Navbar {...props}/>
        </div>
    );
}


export default Navigation;