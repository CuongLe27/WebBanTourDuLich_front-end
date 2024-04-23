import React from "react";
import { Layout, Row, Col, Space } from 'antd';
import App from "../App.css";
import "./TourAdmin.css"
import HeaderForm from "../Component/HeaderForm";
import SiderForm from '.../';
import FooterForm from '../Component/FooterForm';
import { useState, useEffect } from "react";
const TourAdmin = () => {
    // const [userData, setUserData] = useState(getUserDataFromLocalStorage());

    // function getUserDataFromLocalStorage() {
    //     const userDataString = localStorage.getItem('userData');
    //     return userDataString ? JSON.parse(userDataString) : null;
    // }

    // function handleLogout() {
    //     localStorage.removeItem('userData');
    //     setUserData(null);
    // }
    return (
        <Layout>
            <HeaderForm />
            <SiderForm />
            <FooterForm />
        </Layout>
    )
}
export default TourAdmin;