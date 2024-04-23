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
    const [User, setUser] = useState([]);
    const [Book, setBook] = useState('');
    const [BookId, setBookId] = useState('');
    const [UserId, setUserId] = useState('');
    const [userEmail, setuserEmail] = useState('');
    const [tourName, settourName] = useState('');
    const [fullName, setfullName] = useState('');
    const [guestSize, setguestSize] = useState('');
    const [phone, setphone] = useState('');
    const [bookAt, setbookAt] = useState('');
    const [refreshUsers, setRefreshUsers] = useState(false);
    const targetRef2 = useRef(null);
    function formatDate(inputDate) {
        const date = new Date(inputDate);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');

        return `${year}-${month}-${day}`;
    }
    const handleChangeSelectRole = (selectedValue, allUsers) => {
        const User = allUsers.find(user => user.email === selectedValue);
        setUserId(User._id);
        setBookId('');
        setuserEmail('');
        settourName('');
        setfullName('');
        setguestSize('');
        setphone('');
        setbookAt('');
    };

    useEffect(() => {
        axios.get('http://localhost:4000/api/v1/booking/byUserId/' + UserId)
            .then((snapshot) => {
                const arrayCourses = snapshot.data.data;
                setBook(arrayCourses);
            })
            .catch(err => console.log(err))
        axios.get('http://localhost:4000/api/v1/users')
            .then((snapshot) => {
                const arrayCourses = snapshot.data.data;
                setUser(arrayCourses);
            })
            .catch(err => console.log(err))
    }, [refreshUsers, UserId])

    const setInputUser = (value) => {
        setBookId(value._id)
        setUserId(value.userId);
        setuserEmail(value.userEmail);
        settourName(value.tourName);
        setphone(value.phone);
        setfullName(value.fullName);
        setguestSize(value.guestSize);
        setbookAt(formatDate(value.bookAt));
        targetRef2.current.scrollIntoView({ behavior: 'smooth' });
    }
    const clearAllUser = () => {
        setBookId('');
        setUserId('');
        setuserEmail('');
        settourName('');
        setfullName('');
        setguestSize('');
        setphone('');
        setbookAt('');
    }
    const handleInputuserEmail = (event) => {
        setuserEmail(event.target.value);
    };
    const handleInputtourName = (event) => {
        settourName(event.target.value);
    };
    const handleInputfullName = (event) => {
        setfullName(event.target.value);
    };
    const handleInputguestSize = (event) => {
        setguestSize(event.target.value);
    };
    const handleInputphone = (event) => {
        setphone(event.target.value);
    };
    const handleInputbookAt = (event) => {
        setbookAt(event.target.value);
    };


    const onClickUpdateUser = async () => {
        if (UserId == '') {
            alert('Vui lòng chọn user từ combobox trên')
        } else if (userEmail == '' || tourName == '' || fullName == '' || guestSize == '' || phone == '' || bookAt == '') {
            alert('Vui lòng nhập đầy đủ thông tin')
        } else if (BookId == '') {
            alert('Vui lòng chọn từ bảng trên để hiện Book Id')
        }
        else {
            try {
                var userId = UserId;
                const response = await axios.put('http://localhost:4000/api/v1/booking/' + BookId, {
                    userId,
                    userEmail,
                    tourName,
                    fullName,
                    guestSize,
                    phone,
                    bookAt
                });
                console.log(response)
                setRefreshUsers(!refreshUsers);
                alert("Update success!");

            } catch (error) {
                alert("Update fail!");
            }
        }
    }
    const deleteUser = async (value) => {
        try {
            const response = await axios.delete('http://localhost:4000/api/v1/booking/' + value);
            setRefreshUsers(!refreshUsers);
            alert("Delete success!");

        } catch (error) {
            alert("Delete fail!");
        }
    }

    return (
        <div className="Book-Style">
            <br />
            <h4 style={{ textAlign: 'center' }}>Book Details</h4>
            <Row gutter={[0, 0]}>
                <Col className="gutter-row" xs={24} sm={24} xl={24} >
                    <div class="control-label2">
                        <label >User: </label>
                        <Select
                            style={{
                                width: 300,
                            }}
                            onChange={(value) => handleChangeSelectRole(value, User)}
                            options={
                                User.map((element) => ({
                                    value: element.email,
                                    label: element.email,
                                }))
                            }
                        />
                    </div>
                    <br />
                    <table>
                        <thead>
                            <tr>
                                <th>No.</th>
                                <th>User Email</th>
                                <th>Tour</th>
                                <th>Full Name</th>
                                <th>Guest size</th>
                                <th>Phone</th>
                                <th>Book At</th>
                            </tr>
                        </thead>
                        <tbody >
                            {Book.length > 0 ? (Book.map((course, index) => (
                                <tr key={index} className={index % 2 === 0 ? "even-row" : "odd-row"}>
                                    <td data-cell="No.">
                                        <div className="icon-update-del">
                                            <p>{index + 1}</p>
                                            <Popconfirm
                                                title="Delete user"
                                                description="Are you sure to delete this user?"
                                                onConfirm={() => {
                                                    deleteUser(course._id);
                                                }}
                                                placement="topLeft"
                                                okText="Yes"
                                                cancelText="No"

                                            ><h5 ant-click-animating-without-extra-node="true"><DeleteTwoTone twoToneColor={"red"} /></h5></Popconfirm>
                                            <h5 onClick={() => setInputUser(course)}><EditTwoTone twoToneColor={"green"} /></h5>
                                        </div>
                                    </td>
                                    <td data-cell="Username">{course.userEmail}</td>
                                    <td data-cell="Email">{course.tourName}</td>
                                    <td data-cell="Password">{course.fullName}</td>
                                    <td data-cell="Photo">{course.guestSize}</td>
                                    <td data-cell="Role">{course.phone}</td>
                                    <td data-cell="Role">{formatDate(course.bookAt)}</td>
                                </tr>
                            ))) : (
                                <tr>
                                    <td colSpan="7" style={{ textAlign: 'center', fontSize: '15px' }}>No booking data available.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                </Col>
            </Row>

            <Row gutter={[0, 0]} ref={targetRef2} style={{ marginTop: "100px" }}>
                <Col className="gutter-row" xs={24} sm={24} md={12} >
                    <div class="form-group">
                        <label class="control-label">Book Id</label>
                        <input type="text" value={BookId} name="name" class="form-control" readOnly />
                    </div>
                    <div class="form-group">
                        <label class="control-label">User Id</label>
                        <input type="text" value={UserId} name="name" class="form-control" readOnly />
                    </div>

                    <div class="form-group">
                        <label class="control-label">User Email</label>
                        <input type="text" value={userEmail} onChange={(event) => handleInputuserEmail(event)} name="cast" class="form-control" readOnly />
                    </div>
                    <div class="form-group">
                        <label class="control-label">Phone</label>
                        <input type="number" value={phone} onChange={(event) => handleInputphone(event)} name="cast" class="form-control" />
                    </div>
                    <div class="form-group">
                        <label class="control-label">Book At</label>
                        <input type="date" value={formatDate(bookAt)} onChange={(event) => handleInputbookAt(event)} name="cast" class="form-control" />
                    </div>
                </Col>
                <Col className="gutter-row" xs={24} sm={24} md={12} >
                    <div class="form-group">
                        <label class="control-label">Tour Name</label>
                        <input type="text" value={tourName} onChange={(event) => handleInputtourName(event)} name="cast" class="form-control" />
                    </div>
                    <div class="form-group">
                        <label class="control-label">Full Name</label>
                        <input type="text" value={fullName} onChange={(event) => handleInputfullName(event)} name="cast" class="form-control" />
                    </div>
                    <div class="form-group">
                        <label class="control-label">Guest Size</label>
                        <input type="text" value={guestSize} onChange={(event) => handleInputguestSize(event)} name="cast" class="form-control" />
                    </div>

                    <div class="form-group">
                        <Row gutter={[0, 10]}>
                            <Col className="gutter-row" xs={24} sm={24} xl={8} >
                                <button type="submit" class="btn btn-success access" onClick={onClickUpdateUser}>Update Book</button>
                            </Col>
                            <Col className="gutter-row" xs={24} sm={24} xl={8} >
                                <button type="submit" class="btn btn-success access" onClick={clearAllUser}>Clear</button>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
        </div>
    )
}
export default BookSiderForm;