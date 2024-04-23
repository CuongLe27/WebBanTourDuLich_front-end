import React from "react";
import { Col, Row, Slider, useRef } from 'antd';
import { StarFilled, EnvironmentOutlined, DashboardTwoTone, EnvironmentTwoTone, SearchOutlined, CheckCircleOutlined, QrcodeOutlined, TeamOutlined, SettingFilled, CarryOutOutlined, TrophyFilled, FireFilled } from '@ant-design/icons';
import { Button, Card, Rate, Input, InputNumber } from 'antd';
import { useState, useEffect } from 'react';
import OwlCarousel from 'react-owl-carousel2';
import 'react-owl-carousel2/lib/styles.css';
import 'react-owl-carousel2/src/owl.theme.default.css';
import axios from 'axios';
const { Meta } = Card;
const styleText = {
    position: 'relative',
    width: '80px',
    height: '30px',
};
const options = {
    loop: true,
    slideBy: 1,
    autoplay: false,
    dots: false,
    center: true,
    autoplayTimeout: 3000,
    responsive: {
        0: {
            items: 1,
        },
        800: {
            items: 3,
        }
    }
};
const SiderForm = () => {
    const [Tour, setTour] = useState([])
    const [loading, setLoading] = useState(true);
    const [valueLocation, SetvalueLocation] = useState("");
    const [valueDistance, SetvalueDistance] = useState("");
    const [valuePeople, SetvaluePeople] = useState("");
    useEffect(() => {
        axios.get('http://localhost:4000/api/v1/tours/search/getFeaturedTour')
            .then((snapshot) => {
                const arrayCourses = snapshot.data.data;
                setTour(arrayCourses);
            })
            .catch(err => console.log(err))
            .finally(() => {
                setLoading(false);
            });
    }, [])
    //loading carousel
    if (loading) {
        return <div style={{ marginTop: '100px', textAlign: 'center', fontSize: '50px' }}>Loading...</div>;
    }
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
            <div className="siderStyle">
                <Row gutter={[0, 0]}>
                    <Col className="gutter-row" xs={24} xl={10}>
                        <div className="styleLoai">
                            <p>Know Before You Go </p>
                        </div>
                        <div className="top1">
                            <h1>Traveling opens the door to creating <span style={{ color: 'rgb(190, 173, 250)' }}>Get memories with us</span></h1>
                            <p style={{ height: '170px' }}>Our Vietnam is a beautiful country. We have a variety of landscapes which are widely well-known such as Ha Long Bay, Hoi An Old quarter and Phong Nha Ke Bang cave. A long coast with many attractive beaches is also our recognized reputation. Although Vietnam was a rich traditional culture country, it has undergone a great change since 1945 due to the war. But you can still find spiritual values in traditional arts performances such as singing Tru, Cheo, Tuong, water puppet, ancient artifacts at the museums at the cultural centers in Hanoi and Saigon.</p>
                        </div>
                    </Col>
                    <Col className="gutter-row" xs={24} xl={14}>
                        <div className="top2">
                            <img src="/Img/hero-img01.jpg" alt="Logo" className="img1"></img>
                            <video controls className="img2">
                                <source src="/Img/hero-video.mp4" type="video/mp4" />
                            </video>
                            <img src="/Img/hero-img02.jpg" alt="Logo" className="img3"></img>
                        </div>
                    </Col>
                </Row>
                <div className="top3">
                    <Row gutter={[0, 0]}>
                        <Col className="gutter-row" xs={24} sm={24} md={12} xl={8}>
                            <div className="location-text" >
                                <h6> Location
                                    <br />
                                    <Input placeholder="Where are you going?" onChange={(event) => handleInputLocation(event)} style={{ border: 'none', width: '170px', right: '10px' }} />
                                </h6>
                            </div>
                            <div className="location-icon" >
                                <EnvironmentTwoTone twoToneColor={"#f08080"} style={{ fontSize: '28px' }} />
                            </div>
                        </Col>
                        <Col className="gutter-row" xs={24} sm={24} md={12} xl={7}>
                            <div className="distance-text" >
                                <h6>Distance<br />
                                    <InputNumber placeholder="Distance k/m" min={1} max={10000} onChange={(event) => handleInputDistance(event)} style={{ border: 'none', width: '150px', right: '10px' }} />
                                </h6>
                            </div>
                            <div className="distance-icon" >
                                <DashboardTwoTone twoToneColor={"#f08080"} style={{ fontSize: '28px' }} />
                            </div>
                        </Col>
                        <Col className="gutter-row" xs={24} sm={12} md={12} xl={7}>
                            <div className="maxpeople-text" >
                                <h6>Max People<br />
                                    <InputNumber placeholder="0" min={1} max={200} onChange={(event) => handleInputPeople(event)} style={{ border: 'none', width: '150px', right: '10px' }} />
                                </h6>
                            </div>
                            <div className="maxpeople-icon">
                                <TeamOutlined style={{ color: '#f08080', fontSize: '28px' }} />
                            </div>
                        </Col>
                        <Col className="gutter-row" xs={24} sm={12} md={12} xl={2}>
                            <a href={`/Tours/ToursBySearch/city=${valueLocation}&distance=${valueDistance}&maxGroupSize=${valuePeople}`} >
                                <div className="custom-search-icon" >
                                    <SearchOutlined style={{ color: 'white', fontSize: '28px' }} />
                                </div>
                            </a>
                        </Col>
                    </Row>
                </div>
                <div className="we-Serve">
                    <Row gutter={[0, 10]}>
                        <Col className="gutter-row" sm={24} md={24} lg={5}>
                            <div className="styleServe">
                                <p>What we serve</p>
                                <h2>We offer our best services</h2>
                            </div>
                        </Col>
                        <Col className="gutter-row" xs={24} sm={24} md={12} lg={6}>
                            <div className="background-all">
                                <div class="background">
                                    <img src="/Img/weather.png" alt="Logo" className="img1-weServe"></img>
                                </div>
                                <h3>Calculate Weather</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                            </div>
                        </Col>
                        <Col className="gutter-row" xs={24} sm={24} md={12} lg={6}>
                            <div className="background-all">
                                <div class="background">
                                    <img src="/Img/linktour.png" alt="Logo" className="img2-weServe"></img>
                                </div>
                                <h3>Best Tour Guide</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                            </div>
                        </Col>
                        <Col className="gutter-row" xs={24} sm={24} md={12} lg={6}>
                            <div className="background-all">
                                <div class="background">
                                    <img src="/Img/customs.png" alt="Logo" className="img3-weServe"></img>
                                </div>
                                <h3>Customization</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className="we-Explore">
                    <div className="styleLoai">
                        <br />
                        <p>Explore </p>
                        <br />
                        <h3>Our featured tours</h3>
                    </div>
                    <div className="card-Explore">
                        <Row gutter={[0, 20]}>
                            {Tour.map((course, index) => (
                                <Col className="gutter-row" xs={24} md={8} lg={6} key={index}>
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
                                            <div className="rate">
                                                <StarFilled style={{ color: 'rgb(185, 148, 112)', paddingBottom: '15px' }} /><p >{rateCount(course.reviews) !== 0 ? `${rateAverage(course.reviews)}(${rateCount(course.reviews)})` : "Not rated"}</p>
                                            </div>
                                            <div className="local">
                                                <EnvironmentOutlined style={{ color: 'rgb(185, 148, 112)', paddingBottom: '15px' }} /> <p>{course.city}</p>
                                            </div>
                                            <p className="country">{course.title}</p>
                                            <h5 className="money"><span style={{ color: 'rgb(185, 148, 112)' }}>${course.price}</span> /per person</h5>
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
                <div className="we-Experience">
                    <Row gutter={[0, 0]}>
                        <Col className="gutter-row" md={17} lg={10}>
                            <div className="styleLoai">
                                <p>Experience </p>
                                <br />
                                <h3>With our all experience we will serve you</h3>
                                <br />
                                <h5>Nice to make you happy. <br />Let try now my friend</h5>
                                <br />
                            </div>
                            <div className="box-all">
                                <div className="box">
                                    <h3>12k</h3>
                                    <p>Successful trip</p>
                                </div>
                                <div className="box">
                                    <h3>2k</h3>
                                    <p>Regular clients</p>
                                </div>
                                <div className="box">
                                    <h3>15</h3>
                                    <p>Year experience</p>
                                </div>
                            </div>
                        </Col>
                        <Col className="gutter-row" sm={24} md={24} lg={5}>
                            < img alt="example" src="/Img/experience-guy.png" />
                        </Col>
                    </Row>
                </div>
                <div className="we-Gallery">
                    <div className="styleLoai">
                        <p>Gallery </p>
                        <h3>Visit our customers tour gallery</h3>
                    </div>
                    <div className="gallery-tong">
                        <div className="picture-tong">
                            < img alt="example" src="/Img/gallery-01.jpg" className="img-style" />
                            < img alt="example" src="/Img/gallery-05.jpg" className="img-style" />
                        </div>
                        <div className="picture-tong">
                            < img alt="example" src="/Img/gallery-02.jpg" className="img-style" />
                            < img alt="example" src="/Img/gallery-06.jpg" className="img-style" />
                        </div>
                        <div className="picture-tong">
                            < img alt="example" src="/Img/gallery-03.jpg" className="img-style" />
                            < img alt="example" src="/Img/gallery-07.jpg" className="img-style" />
                        </div>
                        <div className="picture-tong">
                            < img alt="example" src="/Img/gallery-04.jpg" className="img-style" />
                            < img alt="example" src="/Img/gallery-08.jpg" className="img-style" />
                        </div>
                    </div>
                </div>
                <div className="we-Fans">
                    <div className="styleLoai">
                        <p>Fans Love </p>
                        <h3>What our fans say about us</h3>
                    </div>
                    <OwlCarousel class="owl-carousel owl-theme" options={options}>
                        {/* <div class="owl-item">
                            <p>Our Vietnam is a beautiful country. We have a variety of landscapes which are widely well-known such as Ha Long Bay, Hoi An Old quarter and Phong Nha Ke Bang cave. A long coast with many attractive beaches is also our recognized reputation.</p>
                            <div className="img-Fans">
                                <img alt="example" src="/Img/gallery-04.jpg" className="img-style" />
                                <div style={{ display: 'block', marginLeft: '20px' }}>
                                    <h3>Duy Khang</h3>
                                    <p style={{ position: 'relative', bottom: '10px' }}>Customer</p>
                                </div>

                            </div>
                        </div>
                        <div class="owl-item">
                            <p>Our Vietnam is a beautiful country. We have a variety of landscapes which are widely well-known such as Ha Long Bay, Hoi An Old quarter and Phong Nha Ke Bang cave. A long coast with many attractive beaches is also our recognized reputation.</p>
                            <div className="img-Fans">
                                <img alt="example" src="/Img/gallery-04.jpg" className="img-style" />
                                <div style={{ display: 'block', marginLeft: '20px' }}>
                                    <h3>Hoang Gia</h3>
                                    <p style={{ position: 'relative', bottom: '10px' }}>Customer</p>
                                </div>

                            </div>
                        </div>
                        <div class="owl-item">
                            <p>Our Vietnam is a beautiful country. We have a variety of landscapes which are widely well-known such as Ha Long Bay, Hoi An Old quarter and Phong Nha Ke Bang cave. A long coast with many attractive beaches is also our recognized reputation.</p>
                            <div className="img-Fans">
                                <img alt="example" src="/Img/gallery-04.jpg" className="img-style" />
                                <div style={{ display: 'block', marginLeft: '20px' }}>
                                    <h3>Van Duong</h3>
                                    <p style={{ position: 'relative', bottom: '10px' }}>Customer</p>
                                </div>

                            </div>
                        </div>*/}

                        {Tour.map((course, index) => (
                            course.reviews.map((course2, index) => (
                                <>
                                    <div class="owl-item">
                                        <p>{course2.reviewText}</p>
                                        <div className="img-Fans">
                                            <img alt="example" src="/Img/gallery-04.jpg" className="img-style" />
                                            <div style={{ marginLeft: '20px' }}>
                                                <h5>{course2.username}</h5>
                                                <p style={{ position: 'relative', bottom: '10px' }}>Customer</p>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ))
                        ))}

                    </OwlCarousel>
                </div>
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