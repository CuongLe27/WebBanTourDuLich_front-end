import React from "react";
import { Col, Row, Slider, useRef } from 'antd';
import { EnvironmentOutlined, DashboardTwoTone, EnvironmentTwoTone, SearchOutlined, CheckCircleOutlined, QrcodeOutlined, TeamOutlined, SettingFilled, CarryOutOutlined, TrophyFilled, FireFilled } from '@ant-design/icons';
import { Button, Card, Rate, Input, InputNumber } from 'antd';
import { useState, useEffect } from 'react';
import OwlCarousel from 'react-owl-carousel2';
import 'react-owl-carousel2/lib/styles.css';
import 'react-owl-carousel2/src/owl.theme.default.css';
import axios from 'axios';
const SiderForm = () => {
    const [username, setUsername] = useState('')
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [photo, setPhoto] = useState('')

    const onSubmitLogin = async () => {
        //           ^: Bắt đầu của chuỗi.
        //         \S+: Ký tự không phải khoảng trắng
        //           @: Dấu @.
        //          \.: Dấu chấm.
        //           $: Kết thúc của chuỗi.
        const emailPattern = /^\S+@\S+\S+$/;
        if (email == '' || password == '') {
            alert('Vui lòng nhập đầy đủ thông tin')
        } else {
            const isValid = emailPattern.test(email);
            if (!isValid) {
                alert('Vui lòng nhập đúng email')
            } else {
                try {
                    const response = await axios.post('http://localhost:4000/api/v1/auth/register', {
                        username,
                        email,
                        password,
                        photo
                    });
                    alert('Đăng ký thành công:');
                } catch (error) {
                    alert('Đăng ký thất bại:', error);
                }
            }
        }
    };
    const dataEmail = (even) => {
        setemail(even.target.value);
    };
    const dataPass = (even) => {
        setpassword(even.target.value);
    };

    return (
        <>
            <div className="siderStyle-Login">
                <div className="background-login">
                    <Row gutter={[25, 8]}>
                        <Col className="gutter-row" xs={24} lg={12}>
                            <div className="img-login">
                                <img src="/Img/login-icon.png" alt="Logo" className="img1"></img>
                            </div>
                        </Col>
                        <Col className="gutter-row" xs={24} lg={12}>
                            <div className="form-login">
                                <img src="/Img/user-icon.png" alt="Logo" className="img1" style={{ height: '80px', position: 'absolute', left: '38%', top: '-30px' }} />
                                <h2>Register</h2>
                                <Input placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
                                <Input placeholder="Email" onChange={(event) => dataEmail(event)} />
                                <Input placeholder="Password" type="password" onChange={(event) => dataPass(event)} />
                                <Button onClick={onSubmitLogin}>Create Account</Button>
                                <p>Already have an account? <a href="/Login">Login</a></p>
                            </div>
                        </Col>
                    </Row>
                </div>

            </div >
        </>
    )
}
export default SiderForm;