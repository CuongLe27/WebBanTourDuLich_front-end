import React, { useRef } from "react";
import { Col, Row, Slider, Space } from 'antd';
import { StarOutlined, UploadOutlined, DeleteTwoTone, EditTwoTone } from '@ant-design/icons';
import { Button, Card, Rate, Input, InputNumber } from 'antd';
import { useState, useEffect } from 'react';
import OwlCarousel from 'react-owl-carousel2';
import 'react-owl-carousel2/lib/styles.css';
import 'react-owl-carousel2/src/owl.theme.default.css';
import axios from 'axios';
import { Menu, theme } from 'antd';
import { useNavigate } from "react-router-dom";
import { Anchor, message, Upload, Checkbox, Popconfirm, Select, Progress, Statistic } from 'antd';
import { ref, child, get, getDatabase, onValue } from "firebase/database";
import { storage } from "../fireBase";

const RevenueSiderForm = () => {
    const [User, setUser] = useState([]);
    const [percent, setPercent] = useState(0);
    const [Tour, setTour] = useState([]);
    const [Book, setBook] = useState([]);
    const [TourCount, setTourCount] = useState(0);
    const [TourBook, setTourBook] = useState([]);
    const [refreshUsers, setRefreshUsers] = useState(false);
    const [thanhtien, setthanhtien] = useState(0);

    const calculateTotalPrice = async () => {
        var tt = 0;
        await Promise.all(User.map(async (user) => {
            let bookingData;
            await axios.get('http://localhost:4000/api/v1/booking/byUserId/' + user._id)
                .then((snapshot) => {
                    bookingData = snapshot.data.data;
                })
                .catch(err => console.log(err));

            let getTour;
            for (const booking of bookingData) {
                await axios.get('http://localhost:4000/api/v1/tours/search/getTourByTourName?title=' + booking.tourName)
                    .then((snapshot) => {
                        getTour = snapshot.data.data;
                        for (const tourgett of getTour) {
                            tt += tourgett.price;
                        }
                    })
                    .catch(err => console.log(err));
            }
        }));
        setthanhtien(tt);
    };
    useEffect(() => {
        try {
            axios.get('http://localhost:4000/api/v1/users')
                .then((snapshot) => {
                    const usersData = snapshot.data.data;
                    setUser(usersData);
                })
                .catch(err => console.log(err))
            axios.get('http://localhost:4000/api/v1/tours/get/all')
                .then((snapshot) => {
                    const arrayCourses = snapshot.data.data;
                    setTour(arrayCourses);
                })
                .catch(err => console.log(err))
            calculateTotalPrice();
            const count = User.length;
            const newPercent = (count / 5) * 1;
            const countTour = Tour.length;
            setPercent(newPercent);
            setTourCount(countTour);
        } catch (error) {
            console.error(error);
        }

    }, [User.length, Tour.length])

    return (
        <div className="Revenue-Style">
            <br />

            <h4 style={{ textAlign: 'center' }}>Revenue Details</h4>
            <div class="control-label2">
                <p>Percentage of customers buying tickets:  <Progress type="circle" percent={percent} /></p>
                <Statistic title="Total revenue:" value={thanhtien + "$"} />
                <Statistic title="Tour Count:" value={TourCount} />
            </div>
        </div >
    )
}
export default RevenueSiderForm;