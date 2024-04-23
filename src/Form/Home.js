import React from "react";
import { Layout, Row, Col, Space } from 'antd';
import App from "../App.css";
import "./Home.css"
import HeaderForm from "../Component/Header";
import SiderForm from '../Component/Sider(Home).js';
import FooterForm from '../Component/Footer';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from "react";
import Cookies from 'js-cookie';
const Home = () => {
    // Mỗi khi component Home được render lại (ví dụ, bởi sự kiện hoặc sự thay đổi trong các component khác), 
    // hàm getUserDataFromLocalStorage() sẽ được gọi để lấy dữ liệu mới và sẽ cập nhật lại trạng thái userData với dữ liệu mới.
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
export default Home;