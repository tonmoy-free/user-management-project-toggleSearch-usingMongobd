import React from 'react';
import Header from '../components/Header';
import { Outlet } from 'react-router';

const HomeLayout = () => {
    return (
        <div>
           <Header></Header>
           <Outlet></Outlet> 
        </div>
    );
};

export default HomeLayout;