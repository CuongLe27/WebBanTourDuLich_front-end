import React, { useRef } from "react";
import { Col, Row, Slider } from 'antd';
import { StarOutlined, UploadOutlined, DeleteTwoTone, EditTwoTone } from '@ant-design/icons';
import { Button, Card, Rate, Input, InputNumber } from 'antd';
import { useState, useEffect } from 'react';
import OwlCarousel from 'react-owl-carousel2';
import 'react-owl-carousel2/lib/styles.css';
import 'react-owl-carousel2/src/owl.theme.default.css';
import axios from 'axios';
import { Menu, theme } from 'antd';
import { useNavigate } from "react-router-dom";
import { Anchor, message, Upload, Checkbox, Popconfirm, Select } from 'antd';
import { ref, child, get, getDatabase, onValue } from "firebase/database";
import { storage } from "../fireBase";

const BookSiderForm = () => {
    const [Title, setTitle] = useState('');
    const [Tour, setTour] = useState([]);
    const [TourByTitle, setTourByTitle] = useState([]);
    const [TourId, setTourId] = useState('');
    const [refreshUsers, setRefreshUsers] = useState(false);
    function formatDate(inputDate) {
        const date = new Date(inputDate);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');

        return `${year}-${month}-${day}`;
    }
    const handleChangeSelectRole = (value) => {
        setTitle(value)
    };

    useEffect(() => {
        axios.get('http://localhost:4000/api/v1/tours/search/getTourByTourName?title=' + Title)
            .then((snapshot) => {
                const arrayCourses = snapshot.data.data;
                setTourByTitle(arrayCourses);
                setTourId(arrayCourses[0]._id);
            })
            .catch(err => console.log(err))
        axios.get('http://localhost:4000/api/v1/tours/get/all')
            .then((snapshot) => {
                const arrayCourses = snapshot.data.data;
                setTour(arrayCourses);
            })
            .catch(err => console.log(err))
    }, [refreshUsers, Title])

    const deleteUser = async (value, tour) => {
        try {
            const response = await axios.delete('http://localhost:4000/api/v1/review/' + tour + '/reviewId/' + value);
            setRefreshUsers(!refreshUsers);
            alert("Delete success!");

        } catch (error) {
            alert("Delete fail!");
        }
    }

    return (
        <div className="Review-Style">
            <br />
            <h4 style={{ textAlign: 'center' }}>Review Details</h4>
            <div class="control-label2">
                <label >Tour: </label>
                <Select
                    style={{
                        width: 330,
                    }}
                    onChange={handleChangeSelectRole}
                    options={
                        Tour.map((element) => ({
                            value: element.title,
                            label: "City: " + element.city + ".  Title: " + element.title,
                        }))
                    }
                />
            </div>

            <br />
            <table>
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Username</th>
                        <th>Review Text</th>
                        <th>Rating</th>
                        <th>Create At</th>
                    </tr>
                </thead>
                <tbody >
                    {TourByTitle.length > 0 ? (TourByTitle[0].reviews.map((course, index) => (
                        <tr key={index} className={index % 2 === 0 ? "even-row" : "odd-row"}>
                            <td data-cell="No.">
                                <div className="icon-update-del">
                                    <p>{index + 1}</p>
                                    <Popconfirm
                                        title="Delete user"
                                        description="Are you sure to delete this user?"
                                        onConfirm={() => {
                                            deleteUser(course._id, TourId);
                                        }}
                                        placement="topLeft"
                                        okText="Yes"
                                        cancelText="No"

                                    ><h5 ant-click-animating-without-extra-node="true"><DeleteTwoTone twoToneColor={"red"} /></h5></Popconfirm>
                                </div>
                            </td>
                            <td data-cell="Username">{course.username}</td>
                            <td data-cell="Review Text">{course.reviewText}</td>
                            <td data-cell="Rating">{course.rating}</td>
                            <td data-cell="Create At">{formatDate(course.createdAt)}</td>
                        </tr>
                    ))) : (
                        <tr>
                            <td colSpan="7" style={{ textAlign: 'center', fontSize: '15px' }}>No tour data available.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div >
    )
}
export default BookSiderForm;