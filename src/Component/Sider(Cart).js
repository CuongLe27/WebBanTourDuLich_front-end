import React from "react";
import { Col, Row, Slider, useRef } from 'antd';
import { EnvironmentOutlined, EnvironmentFilled, StarFilled, DollarOutlined, ClockCircleOutlined, TeamOutlined } from '@ant-design/icons';
import { Button, Card, Rate, Input, InputNumber } from 'antd';
import { useState, useEffect } from 'react';
import OwlCarousel from 'react-owl-carousel2';
import 'react-owl-carousel2/lib/styles.css';
import 'react-owl-carousel2/src/owl.theme.default.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const checkCurrentPage = () => {
    const currentUrl = window.location.pathname;
    const parts = currentUrl.split('/');
    const id = parts[parts.length - 1];
    return id;
}

const SiderForm = (props) => {
    const [Booking, setBooking] = useState([])
    const [loading, setLoading] = useState(true);
    const [totals, setTotals] = useState({});
    useEffect(() => {
        const fetchData = async () => {
            try {
                const bookingResponse = await axios.get('http://localhost:4000/api/v1/booking/byUserId/' + props.dataLogin.data._id);
                const arrayCourses = bookingResponse.data;
                setBooking(arrayCourses);

                const newTotals = {};
                for (const course of arrayCourses.data) {
                    try {
                        const response = await axios.get('http://localhost:4000/api/v1/tours/search/getTourByTourName?title=' + course.tourName);
                        //(course.tourName) là khóa.
                        newTotals[course.tourName] = response.data.data[0].price;
                    } catch (error) {
                        console.log(error);
                        newTotals[course.tourName] = 0;
                    }
                }
                setTotals(newTotals);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        };

        fetchData();
    }, [props.dataLogin.data._id]);

    if (loading) {
        return <div style={{ marginTop: '100px', textAlign: 'center', fontSize: '50px' }}>Loading...</div>;
    }
    return (
        <>
            <div className="siderBook">
                <div>
                    <h3>List Booking</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>No.</th>
                                <th>Tour Name</th>
                                <th>Guest Size</th>
                                <th>Price</th>
                                <th>Total</th>
                                <th>Book At</th>
                            </tr>
                        </thead>
                        {Booking.data.map((course, index) => (
                            <tbody >
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{course.tourName}</td>
                                    <td>{course.guestSize}</td>
                                    <td>{totals[course.tourName]}</td>
                                    <td>{totals[course.tourName] * course.guestSize}</td>
                                    <td>{new Date(course.bookAt).toLocaleDateString()}</td>
                                </tr>
                            </tbody>
                        ))}
                    </table>
                </div>
            </div >
        </>
    )
}
export default SiderForm;