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

function formatDate(inputDate) {
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const date = new Date(inputDate);
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();

    return `${month} ${day}, ${year}`;
}

const SiderForm = (props) => {
    const navigate = useNavigate();
    const [valueGuest, SetValueGuest] = useState("");
    const [valueName, SetValueName] = useState("");
    const [valuePhone, SetValuePhone] = useState("");
    const [valueDay, SetValueDay] = useState("");
    const [Review, SetReview] = useState("");
    const [rateStar, SetrateStar] = useState(0);
    const [Tour, setTour] = useState([])

    const handleInputChange = (event) => {
        SetValueGuest(event.target.value);
    };
    const handleInputReview = (event) => {
        SetReview(event.target.value);
    };
    const handleInputName = (event) => {
        SetValueName(event.target.value);
    };
    const handleInputPhone = (event) => {
        SetValuePhone(event.target.value);
    };
    const handleInputDay = (event) => {
        SetValueDay(event.target.value);
    };
    const handleClick = () => {
        const today = new Date().toISOString().split('T')[0];
        if (!props.dataLogin) {
            alert("Please sign in")
            navigate('/Login')
        } else if (/^[A-Za-z]+$/.test(valueName) == false || valueName == '') {
            alert("Please input right name")
        } else if (isNaN(valuePhone) || valuePhone == '') {
            alert("Please input right phone")
        } else if (valuePhone.length > 10 || valuePhone < 0) {
            alert("Please enter <=10 and >=0")
        } else if (valueDay < today) {
            alert("Please enter day >= current day")
        } else if (valueGuest == '') {
            alert('Please write guest!')
        }
        else if (valueGuest <= 0 || valueGuest > 1000 || isNaN(valueGuest)) {
            alert("The guest need >=0 and <= 1000")
            SetValueGuest("");
        } else {
            localStorage.setItem('NameBook', JSON.parse(JSON.stringify(valueName)));
            localStorage.setItem('PhoneBook', JSON.stringify(parseInt(valuePhone)));
            localStorage.setItem('DayBook', JSON.stringify(valueDay));
            localStorage.setItem('GuestBook', JSON.stringify(parseInt(valueGuest)));
            localStorage.setItem('TourBook', JSON.parse(JSON.stringify(Tour.title)));
            navigate("/TakeCash")
        }
    }
    const handleClickReview = async () => {
        if (!props.dataLogin) {
            alert("Please sign in")
            navigate('/Login')
        } else if (Review == '') {
            alert('Please write review!')
        } else {
            var reviewText = Review;
            var username = props.dataLogin.data.username;
            var rating = rateStar;

            try {
                const response = await axios.post(
                    `http://localhost:4000/api/v1/review/${checkCurrentPage()}`,
                    {
                        reviewText,
                        username,
                        rating
                    }
                );

                const newReviewData = response.data.data;
                // Nếu Tour có dữ liệu reviews, kết hợp các đánh giá mới vào mảng hiện có
                // Nếu Tour chưa có dữ liệu reviews, sẽ gán mảng mới chứa đánh giá mới vào Tour
                const updatedTourData = Tour
                    ? {
                        // Sử dụng toán tử spread sao chép tất cả thuộc tính của Tour vào đối tượng mới
                        ...Tour,
                        // Thêm newReviewData vào cuối mảng reviews của Tour bằng cách tạo một mảng mới 
                        // ([...Tour.reviews]) và thêm newReviewData vào cuối mảng.
                        reviews: [...Tour.reviews, newReviewData],
                    }
                    : {
                        ...Tour,
                        // Tạo một mảng mới với newReviewData đưa vào khi duy nhất 1 phần tử trong mảng.
                        reviews: [newReviewData],
                    };

                setTour(updatedTourData);
                SetReview("");
            } catch (error) {
                alert(error);
            }
        }
    }

    useEffect(() => {
        axios.get("http://localhost:4000/api/v1/tours/" + checkCurrentPage())
            .then((snapshot) => {
                const arrayCourses = snapshot.data.data;
                setTour(arrayCourses);
            })
            .catch(err => console.log(err))
    }, [])
    function rateCount() {
        var totalReviews = 0;
        if (Tour && Array.isArray(Tour.reviews)) {
            totalReviews = Tour.reviews.length;
        }
        return totalReviews;
    }
    function rateAverage() {
        if (Tour && Array.isArray(Tour.reviews)) {
            const totalReviews = Tour.reviews.length;
            // Hàm reduce tích lũy các giá trị của mảng thành một giá trị duy nhất: array.reduce(callback, initialValue);
            const totalRatings = Tour.reviews.reduce((sum, review) => sum + review.rating, 0);
            const averageRating = totalRatings / totalReviews;
            const a = averageRating.toFixed(1);
            return a;
        }
    }
    function sumTotal() {
        if (Tour) {
            var sum = 0;
            sum = Tour.price * valueGuest + 10;
            return sum;
        }
    }

    const handleRateStar = (rate) => {
        if (rateStar === rate) {
            SetrateStar(0);
        } else {
            SetrateStar(rate);
        }
    }

    return (
        <>
            <div className="siderBook">
                <Row gutter={[30, 20]}>
                    <Col className="gutter-row" xs={24} xl={15}>
                        {Tour && (
                            <>
                                <img src={Tour.photo} alt="Logo" className="img1"></img>

                                <div className="Tour-Info">
                                    <h3>{Tour.title}</h3>
                                    <div className="top1">
                                        <p className="rate"><StarFilled style={{ color: 'orange' }} />{rateCount() !== 0 ? `${rateAverage()}(${rateCount()})` : "Not rated"}</p>
                                        <p className="rate"><EnvironmentFilled style={{ color: 'orange' }} />{Tour.address}</p>
                                    </div>
                                    <div className="top2">
                                        <Row gutter={[20, 0]}>
                                            <Col className="gutter-row" xs={24} lg={4}>
                                                <p className="rate"><EnvironmentOutlined style={{ color: 'orange' }} />{Tour.city}</p>
                                            </Col>
                                            <Col className="gutter-row" xs={24} lg={5}>
                                                <p className="rate"><DollarOutlined style={{ color: 'orange' }} />{Tour.price}/person</p>
                                            </Col>
                                            <Col className="gutter-row" xs={24} lg={5}>
                                                <p className="rate"><ClockCircleOutlined style={{ color: 'orange' }} />{Tour.distance} k/m</p>
                                            </Col>
                                            <Col className="gutter-row" xs={24} lg={6}>
                                                <p className="rate"><TeamOutlined style={{ color: 'orange' }} />{Tour.maxGroupSize} people</p>
                                            </Col>
                                        </Row>
                                    </div>
                                    <h5>Description</h5>
                                    <p>{Tour.desc}</p>
                                </div>
                            </>
                        )}
                        {Tour && Array.isArray(Tour.reviews) && (
                            <div className="Tour-Review">
                                <h3>Reviews ({rateCount()} reviews)</h3>
                                <div className="rate-row">
                                    <p className="rate" onClick={() => handleRateStar(1)}>{"1"}<StarFilled style={{ color: rateStar >= 1 ? 'orange' : 'gray' }} /></p>
                                    <p className="rate" onClick={() => handleRateStar(2)}>{"2"}<StarFilled style={{ color: rateStar >= 2 ? 'orange' : 'gray' }} /></p>
                                    <p className="rate" onClick={() => handleRateStar(3)}>{"3"}<StarFilled style={{ color: rateStar >= 3 ? 'orange' : 'gray' }} /></p>
                                    <p className="rate" onClick={() => handleRateStar(4)}>{"4"}<StarFilled style={{ color: rateStar >= 4 ? 'orange' : 'gray' }} /></p>
                                    <p className="rate" onClick={() => handleRateStar(5)}>{"5"}<StarFilled style={{ color: rateStar >= 5 ? 'orange' : 'gray' }} /></p>
                                </div>
                                <div className="input-review">
                                    <input type="text" value={Review} onChange={(event) => handleInputReview(event)} placeholder="share your thoughts" required="" />
                                    <button style={{ width: '100px' }} type="submit" onClick={() => handleClickReview()}>Submit</button>
                                </div>
                                <ul style={{ listStyle: "none", paddingLeft: '0' }}>
                                    {Tour.reviews.map(review => (

                                        <li className="item-review">
                                            <img src="/Img/avatar.jpg" alt="" />
                                            <div className="font-review1">
                                                <div className="font-review">
                                                    <div style={{}}>
                                                        <h5>{review.username}</h5><p>{formatDate(review.updatedAt)}</p>
                                                    </div>
                                                    <p className="rate">{review.rating}<StarFilled style={{ color: 'orange' }} /></p>
                                                </div>
                                                <h6>{review.reviewText}</h6>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </Col>
                    {Tour && (
                        <Col className="gutter-row" xs={24} xl={7}>
                            <div className="bill-Box-Sticky">
                                <div className="bill-Box">
                                    <div className="money-Bill">
                                        <h3>${Tour.price} <span>/per person</span></h3>
                                        <p className="rate"><StarFilled style={{ color: 'orange' }} />{rateCount() !== 0 ? `${rateAverage()}(${rateCount()})` : "Not rated"}</p>
                                    </div>
                                    <div className="money-Bill2">
                                        <h2>Information</h2>
                                        <div className="information-Bill">
                                            <input type="text" value={valueName} onChange={(event) => handleInputName(event)} placeholder="Full Name" id="fullName" required="" />
                                            <input type="tel" value={valuePhone} onChange={(event) => handleInputPhone(event)} placeholder="Phone" id="phone" required="" />
                                            <div className="day-guest">
                                                <input type="date" placeholder="" value={valueDay} onChange={(event) => handleInputDay(event)} id="bookAt" required=""></input>
                                                <input type="number" placeholder="Guest" value={valueGuest} onChange={(event) => handleInputChange(event)} id="guestTotal" required=""></input>
                                            </div>
                                        </div>
                                    </div>
                                    <br />
                                    <ul style={{ listStyle: "none", paddingLeft: '0' }}>
                                        <li><p>${Tour.price} x 1 person </p> <p>${Tour.price}</p></li>
                                        <li><p>Service charge </p><p>$10</p></li>
                                        <li><h5>Total </h5> <h5>${sumTotal() ? sumTotal() : 0}</h5></li>
                                    </ul>
                                    <Button className="Card-button" onClick={() => handleClick()}>Book Now</Button>
                                </div>
                            </div>
                        </Col>
                    )}
                </Row>

                <div className="we-Subcribe">
                    <Row gutter={[0, 0]}>
                        <Col className="gutter-row" xs={24} lg={12}>
                            <h2 >Subcribe US now to get useful traveling information</h2>
                            <div className="button-subcribe">
                                <Input placeholder="Enter your email" style={{ width: '40%', }} />
                                <Button type="text">Subcribe</Button>
                            </div>
                            <p>WE HAPPY TO MAKE YOU THE SUPER NICE TRIP. THANK! LOVE U</p>
                        </Col>
                        <Col className="gutter-row" xs={24} lg={12}>
                            <img alt="example" src="/Img/male-tourist.png" className="img-style" width={500} />
                        </Col>
                    </Row>
                </div>

            </div >
        </>
    )
}
export default SiderForm;