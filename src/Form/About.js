import React from "react";
import { Layout, Row, Col, Space } from 'antd';
import App from "../App.css";
import "./About.css"
import HeaderForm from "../Component/Header";
import SiderForm from '../Component/Sider(About)';
import FooterForm from '../Component/Footer';
import { useState, useEffect } from "react";

const Login = () => {
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
export default Login;