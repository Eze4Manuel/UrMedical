import React from 'react';
import './Message.css';

const Message = (props) => {
    const NavigationBar = props.NavigationBar;
    return (
        <div className='main-content'>
            <NavigationBar {...props} />
            <main>
                <h3 className="mt-3 mb-5">Message Details</h3>
            </main>
        </div>
    );
}

export default Message;