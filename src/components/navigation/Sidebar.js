import React, { Fragment } from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';
import config from './config';

const Sidebar = (props) => {
    const sidebarLinks = config.sidebar.map(cfg => {
        if (cfg.divider === 'dashboard'
        && !props?.user?.user_type !== 'superadmin'
        && props?.user?.user_type === 'admin') {
            return null;
        } else {
            return (
                <Fragment>
                    <div className="menu-head">
                        <span className="text-capitalize">{cfg.divider}</span>
                        </div>
                        <ul>
                            {cfg.sub.map(sub => (
                                <li key={sub.name}>
                                    <Link to={sub.link}>
                                        <span className={sub.icon}></span>{sub.name}
                                    </Link>
                                </li>
                                ))
                            }
                        </ul>
                </Fragment>
            )
        }
    });

    return (
        <div className="sidebar sidebar_wp">
            <div className="sidebar-brand">
                <div className="brand-flex">
                    <div className="brand-icons">
                        <span>Camels Logistics</span>
                    </div>
                </div>
            </div>
            <hr style={{background: '#fff'}} />
            <div className="sidebar-main">
                <div className="sidebar-user">
                    <div>
                        <h3>
                            {props?.user?.username}<br />
                            <span style={{color: '#91A0AF'}} className="user-id small text-uppercase">
                                {props?.user?._id ?? props?.user?.auth_id}
                            </span>
                        </h3>
                </div>
            </div>
            <div className="sidebar-menu">
                {sidebarLinks}
            </div>
        </div>
    </div>
    );
}


export default Sidebar;