import React from "react";
import { Layout, Row, Col, Space } from 'antd';
import "./TourAdmin.css"
import HeaderForm from "../Component/Header.js";
import SiderForm from '../AdminComponent/SiderForm(TourAmin)';
import FooterForm from '../Component/Footer.js';
import { useState, useEffect } from "react";
const TourAdmin = () => {
    const [userData, setUserData] = useState(getUserDataFromLocalStorage());

    function getUserDataFromLocalStorage() {
        const userDataString = localStorage.getItem('userData');
        return userDataString ? JSON.parse(userDataString) : null;
    }

    function handleLogout() {
        localStorage.removeItem('userData');
        setUserData(null);
    }
    return (
        <Layout>
            <HeaderForm data={userData} onLogout={handleLogout} />
            <SiderForm dataLogin={userData} />
            <FooterForm />
        </Layout>
    )
}
export default TourAdmin;