import React from "react";
import { Col, Row, Slider, useRef } from 'antd';
import { StarFilled, EnvironmentOutlined, DashboardTwoTone, EnvironmentTwoTone, SearchOutlined, CheckCircleOutlined, QrcodeOutlined, TeamOutlined, SettingFilled, CarryOutOutlined, TrophyFilled, FireFilled } from '@ant-design/icons';
import { Button, Card, Rate, Input, InputNumber } from 'antd';
import { useState, useEffect } from 'react';
import OwlCarousel from 'react-owl-carousel2';
import 'react-owl-carousel2/lib/styles.css';
import 'react-owl-carousel2/src/owl.theme.default.css';
import axios from 'axios';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
const styleText = {
    position: 'relative',
    width: '80px',
    height: '30px',
};
const checkCurrentPage = () => {
    const currentUrl = window.location.pathname;
    const parts = currentUrl.split('/');
    const id = parts[parts.length - 1];
    return id;
}
const Tour = () => {
    const [Tour, setTour] = useState([])
    useEffect(() => {
        axios.get('http://localhost:4000/api/v1/tours/search/getTourBySearch?' + checkCurrentPage())
            .then((snapshot) => {
                const arrayCourses = snapshot.data.data;
                console.log("data", arrayCourses);
                setTour(arrayCourses);
            })
            .catch(err => console.log(err))
    }, [])

    function rateCount(reviews) {
        if (reviews && Array.isArray(reviews)) {
            var totalReviews = reviews.length;
            return totalReviews;
        }
    }
    function rateAverage(reviews) {
        if (reviews && Array.isArray(reviews)) {
            const totalReviews = reviews.length;
            const totalRatings = reviews.reduce((sum, review) => sum + review.rating, 0);
            const averageRating = totalRatings / totalReviews;
            const a = averageRating.toFixed(1);
            return a;
        }
    }
    // //Phân trang
    const [currentPage, setCurrentPage] = useState(1)
    const recordsPerPage = 8;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const recods = Tour.slice(firstIndex, lastIndex);
    const npage = Math.ceil(Tour.length / recordsPerPage);
    const numbers = [...Array(npage + 1).keys()].slice(1);

    const changeCPage = (id) => {
        setCurrentPage(id);
    };

    const [valueLocation, SetvalueLocation] = useState("");
    const [valueDistance, SetvalueDistance] = useState("");
    const [valuePeople, SetvaluePeople] = useState("");
    const handleInputLocation = (event) => {
        SetvalueLocation(event.target.value);
    };
    const handleInputDistance = (event) => {
        SetvalueDistance(event);
    };
    const handleInputPeople = (event) => {
        SetvaluePeople(event);
    };
    return (
        <>
            <Row gutter={[0, 0]}>
                <Col className="gutter-row" xs={24} lg={24}>
                    <div className="siderStyle-Tour">
                        <div className="siderStyle2-Tour">
                            <div className="Content-siderStyle-Tour">
                                <h1> All Tours</h1>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row >
            <div className="sider-Tour">
                <div className="we-Explore">
                    <div className="card-Explore">
                        <div className="siderStyle-Tour-top3">
                            <Row gutter={[0, 0]}>
                                <Col className="gutter-row" xs={24} sm={24} md={12} lg={8}>
                                    <div className="location-text" >
                                        <h6> Location
                                            <br />
                                            <Input placeholder="Where are you going?" onChange={(event) => handleInputLocation(event)} style={{ zIndex: '2', border: 'none', width: '150px', height: '30px', right: '10px' }} />
                                        </h6>
                                    </div>
                                    <div className="location-icon" >
                                        <EnvironmentTwoTone twoToneColor={"#f08080"} style={{ fontSize: '28px' }} />
                                    </div>
                                </Col>
                                <Col className="gutter-row" xs={24} sm={24} md={12} lg={7}>
                                    <div className="distance-text" >
                                        <h6>Distance<br />
                                            <InputNumber placeholder="Distance k/m" min={1} max={10000} onChange={(event) => handleInputDistance(event)} style={{ zIndex: '2', border: 'none', width: '150px', height: '30px', right: '10px' }} />
                                        </h6>
                                    </div>
                                    <div className="distance-icon" >
                                        <DashboardTwoTone twoToneColor={"#f08080"} style={{ fontSize: '28px' }} />
                                    </div>
                                </Col>
                                <Col className="gutter-row" xs={24} sm={12} md={12} lg={7}>
                                    <div className="maxpeople-text" >
                                        <h6>Max People<br />
                                            <InputNumber placeholder="0" min={1} max={200} onChange={(event) => handleInputPeople(event)} style={{ zIndex: '2', border: 'none', width: '150px', height: '30px', right: '10px' }} />
                                        </h6>
                                    </div>
                                    <div className="maxpeople-icon">
                                        <TeamOutlined style={{ color: '#f08080', fontSize: '28px' }} />
                                    </div>
                                </Col>
                                <Col className="gutter-row" xs={24} sm={12} md={12} lg={2}>
                                    <a href={`/Tours/ToursBySearch/city=${valueLocation}&distance=${valueDistance}&maxGroupSize=${valuePeople}`} >
                                        <div className="custom-search-icon">
                                            <SearchOutlined style={{ color: 'white', fontSize: '28px' }} />
                                        </div>
                                    </a>
                                </Col>
                                <Col className="gutter-row" xs={24} sm={24} md={24} lg={24}>

                                </Col>
                            </Row>
                        </div>

                        <Row gutter={[0, 20]}>
                            {recods.map((course, index) => (
                                <Col className="gutter-row" xs={24} md={12} lg={6} key={index}>

                                    <Card

                                        hoverable
                                        style={{
                                            width: '90%',
                                            boxShadow: '0px 15px 40px rgb(190, 185, 185)',
                                        }}
                                        cover={<img alt="example" src={course.photo} height={180} />}
                                    >
                                        <div className="Card-text">
                                            <p className={course.featured ? "feat" : ""}>{course.featured ? 'Featured' : <div style={styleText}></div>}</p>
                                            <p className="rate"><StarFilled style={{ color: 'orange' }} />{rateCount(course.reviews) !== 0 ? `${rateAverage(course.reviews)}(${rateCount(course.reviews)})` : "Not rated"}</p>
                                            <p className="local"><EnvironmentOutlined style={{ color: 'orange' }} /> {course.city}</p>
                                            <p className="country">{course.title}</p>
                                            <h5 className="money"><span style={{ color: 'orange' }}>${course.price}</span> /per person</h5>
                                        </div>
                                        <div className="Card-button">
                                            <a href={"/Tours/" + course._id}><Button className="Card-button2" >Book Now</Button></a>

                                        </div>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </div>
                </div>
                <div class="pagination p1">
                    <ul>
                        {
                            numbers.map((n, i) => (
                                <a class={`${currentPage == n ? 'is-active' : ''}`} key={i} onClick={() => changeCPage(n)}><li>{n}</li></a>

                            ))
                        }
                    </ul>
                </div>

                <div className="we-Subcribe">
                    <Row gutter={[0, 0]}>
                        <Col className="gutter-row" xs={24} lg={12}>
                            <h2 >Subcribe DUONG now to get useful traveling information</h2>
                            <div className="button-subcribe">
                                <Input placeholder="Enter your email" style={{ width: '40%', }} />
                                <Button type="text">Subcribe</Button>
                            </div>
                            <p>WE SO CHIPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP</p>
                        </Col>
                        <Col className="gutter-row" xs={24} lg={12}>
                            <img alt="example" src="/Img/male-tourist.png" className="img-style" width={500} />
                        </Col>
                    </Row>
                </div>
            </div>
        </>
    )
}
export default Tour;