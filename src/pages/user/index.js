import React from 'react';
import './User.css';
import GoBack from '../../components/widgets/GoBack';
import Global from '../../assets/styles/Global';

const User = (props) => {
    const NavigationBar = props.NavigationBar;
    return (
        <div className='main-content'>
            <NavigationBar {...props} />
            <main>
                <GoBack />
                <div style={Global.center}>
                    <h3 className="mt-3 mb-5">User Details</h3>
                </div>
            </main>
        </div>
    );
}

export default User;