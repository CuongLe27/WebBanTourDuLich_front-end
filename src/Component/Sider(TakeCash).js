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

const SiderForm = (props) => {
    const [CardName, SetCardName] = useState("");
    const [CardNum, SetCardNum] = useState("");
    const [Date2, SetDate2] = useState("");
    const [CVV, SetCVV] = useState("");

    const handleInputName = (event) => {
        SetCardName(event.target.value);
    };
    const handleInputNum = (event) => {
        SetCardNum(event.target.value);
    };
    const handleInputDate2 = (event) => {
        SetDate2(event.target.value);
    };
    const handleInputCVV = (event) => {
        SetCVV(event.target.value);
    };
    const navigate = useNavigate();
    const handleClick = async () => {
        if (CardName == "" || CardNum == "" || Date2 == "" || CVV == "") {
            alert("Please enter full information!")
        } else {
            try {
                var userId = props.user.data._id.toString();
                var userEmail = props.user.data.email.toString();
                var tourName = props.tour;
                var fullName = props.name;
                var guestSize = props.guest;
                var phone = props.phone;
                var bookAt = new Date(props.day);
                const response = await axios.post('http://localhost:4000/api/v1/booking', {
                    userId,
                    userEmail,
                    tourName,
                    fullName,
                    guestSize,
                    phone,
                    bookAt
                });
                alert("Booking success!");
                navigate(-1)
            } catch (error) {
                alert(error);
            }
        }

    }
    return (
        <div class="siderCash">
            <div className="Cash-Background">
                <h3>Payment</h3>
                <div>
                    <div class="form-group">
                        <label class="Card-label">Name on Card</label>
                        <input type="text" value={CardName} onChange={(event) => handleInputName(event)} class="form-control" name="name" />
                    </div>
                    <div class="form-group">
                        <label class="Card-label">Card Number</label>
                        <input type="text" value={CardNum} onChange={(event) => handleInputNum(event)} class="form-control" name="number" required title="Enter 16 digit card number" />

                    </div>
                    <div class="form-group">
                        <label class="Card-label">Expiration date</label>
                        <input type="date" value={Date2} onChange={(event) => handleInputDate2(event)} class="form-control" name="date" />
                    </div>
                    <div class="form-group">
                        <label class="Card-label">CVV</label>
                        <input type="text" value={CVV} onChange={(event) => handleInputCVV(event)} class="form-control" name="cvv" />
                    </div>
                    <div class="form-group buttonaa">
                        <br />
                        <button class="btn btn-success" onClick={() => handleClick()}> Make Payment</button>
                    </div>
                </div>
            </div>
        </div >
    )
}
export default SiderForm;