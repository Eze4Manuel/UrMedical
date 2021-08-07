import React from 'react';
import './dispatcher.css';

const Dispatcher = (props) => {
    const NavigationBar = props.NavigationBar;
    return (
        <div className='main-content'>
            <NavigationBar {...props} />
            <main>
                <h3 className="mt-3 mb-5">Dispatcher Details</h3>
            </main>
        </div>
    );
}

export default Dispatcher;