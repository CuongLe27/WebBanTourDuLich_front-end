import React from "react";
import { Layout, Row, Col, Space } from 'antd';
import "./TakeCash.css";
import HeaderForm from "../Component/Header.js";
import SiderForm from "../Component/Sider(TakeCash).js";
import FooterForm from '../Component/Footer';
import { useState, useEffect } from "react";
import App from "../App.css";
const TakeCash = () => {
    const [userData, setUserData] = useState(getUserDataFromLocalStorage());

    function getUserDataFromLocalStorage() {
        const userDataString = localStorage.getItem('userData');
        return userDataString ? JSON.parse(userDataString) : null;
    }

    function handleLogout() {
        localStorage.removeItem('userData');
        setUserData(null);
    }

    var valueName = localStorage.getItem('NameBook');
    var valueGuest = localStorage.getItem('GuestBook');
    var valuePhone = localStorage.getItem('PhoneBook');
    var valueDay = localStorage.getItem('DayBook');
    var TourBook = localStorage.getItem('TourBook');
    var Booking = localStorage.getItem('Booking');
    return (
        <Layout>
            <HeaderForm data={userData} onLogout={handleLogout} />
            <SiderForm name={valueName} guest={valueGuest} phone={valuePhone} day={valueDay} tour={TourBook} user={userData} />
            <FooterForm />
        </Layout>
    )
}
export default TakeCash;