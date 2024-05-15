import React from 'react'
import '../components/Layout.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { useState } from 'react';

function DashboardLayout({children}) {
    const {user} = useSelector((state) => state.user);
    const navigate = useNavigate()
   const location = useLocation()
    const userMenu =[

        {
            name: 'Book slots',
            link: '/bookslots',
            icon: 'ri-home-2-line',
        },
        {
            name: 'View Booked slots',
            link: '/viewbookslots',
            icon: 'ri-coupon-line',
        },
        {
            name: 'Update Profile',
            link: '/update-profile',
            icon: 'ri-user-line',
        },
   ];

    const adminMenu =[

        {
            name: 'Users',
            link: '/users',
            icon: 'ri-home-2-line',
        },
        {
            name: 'GasCompanies',
            link: '/gascompanies',
            icon: 'ri-coupon-line',
        },
        {
            name: 'Update Profile',
            link: '/update-profile',
            icon: 'ri-user-line',
        },

    ];

    const menutorender = user?.isAdmin ? adminMenu : userMenu;

    return (
        <div className='main'>
            <div className='d-flex layout'>
                <div className='sidebar'>
                    <div className='sidebar-header'>
                    
                    </div>
                     
                   <div className="menu">
                    {menutorender.map((menu,i) => {
                        const isActive = location.pathname === menu.path
                        return (
                        <div key={i} className={`d-flex menu-item ${isActive && 'active-menu-item'}`}>
                            <i className={menu.icon}></i>
                            <Link to={menu.path}>{menu.name}</Link>
                            </div>
                        );
                    })}
                   </div>
                    </div>

                    <div className={`d-flex menu-item`} onClick={()=>{
                        localStorage.clear()
                        navigate('/Login')
                    }}>
                            <i className='ri-logout-box-line'></i>
                            <Link to='/Login'>Logout</Link>
                            </div>

                    
                    
                <div className='content'>
                    <div className='header'>
                       

                       <div className='d-flex'>
                       <i className="ri-notification-line header-action-icon"></i>
                       <Link className='anchor' to='/user'>{user?.name}</Link>
                       </div>
                    </div>
                    <div className='body'>
                       {children}
                    </div>
                </div>
            </div>
            </div>
    )
}
export default DashboardLayout