import React from "react";
import { Col, Row, Slider, useRef } from 'antd';
import { EnvironmentOutlined, EnvironmentFilled, StarFilled, DollarOutlined, ClockCircleOutlined, TeamOutlined } from '@ant-design/icons';
import { Button, Card, Rate, Input, InputNumber } from 'antd';
import { useState, useEffect } from 'react';
import { ColorFactory } from "antd/es/color-picker/color";


const SiderForm = (props) => {
    return (
        <>
            <Row gutter={[0, 0]}>
                <Col className="gutter-row" xs={24} lg={24}>
                    <div className="siderStyle-Tour">
                        <div className="siderStyle2-Tour">
                            <div className="Content-siderStyle-Tour">
                                <h1> About Us</h1>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row >
            <Row>
                <div id="tooplate_main">

                    <div className="col_w600 float_l">

                        <h2>Who We Are</h2>

                        <p>Together with their companions, the mountains will give birth to feathers and great thrusts, and a ridiculous mouse will be born. It is something that a large group of members would like to be the author of. Let's talk about the high level of protein.</p>
                        <p>But I hate to flatter my author. Duis luctus no fear, a vulputate mauris. But if you are wise, you are pregnant
                            for the land is free. Tomorrow I'll be free, no protein, no makeup, no protein, no laughter. So that sometimes he is the author of a great story for me. Validate XHTML and CSS.</p>

                        <h6>Until Euismod a few times the football player</h6>
                        <p>It's a pain in the ass but there's no need for it in the market. Children are living with disease, old age and children, and they are suffering from hunger and poverty. Sed sed accumsan players. Until the end of the propaganda and the shooting of the players, what is the course of the pain? Some and the mass like a pillow or some other fear. There is no advantage to it before the end of the day.</p>

                    </div>
                    <div className="col_w300 float_r">

                        <h2>Testimonial</h2>
                        <blockquote>
                            <p>Fusce nec felis id lake sollicitudin vulputate. Proin tincidunt, arcu that pellentesque accumsan, nor dolor imperdiet ligula, quis vevera climbus no a hate. For life is full of laughter, but it is ugly. Mauris feugiat takes up the time of fringilla, felis in velit. Unfortunately, neither does it invest.</p>

                            <cite>Thomas - <span>Web Designer</span></cite>
                        </blockquote>

                    </div>

                    <div className="cleaner"></div>
                </div>
            </Row>
            <Row>
                <div id="tooplate_main">
                    <div class="col_w450 float_l">
                        <div id="contact_form">

                            <h4>Quick Contact Form</h4>

                            <form method="post" name="contact" action="#">

                                <label for="author">Name:</label> <input type="text" id="author" name="author" class="required input_field" />
                                <div class="cleaner h10"></div>

                                <label for="email">Email:</label> <input type="text" class="validate-email required input_field" name="email" id="email" />
                                <div class="cleaner h10"></div>

                                <label for="subject">Subject:</label> <input type="text" class="validate-subject required input_field" name="subject" id="subject" />
                                <div class="cleaner h10"></div>

                                <label for="text">Message:</label> <textarea id="text" name="text" rows="0" cols="0" class="required"></textarea>
                                <div class="cleaner h10"></div>

                                <input type="submit" value="Send" id="submit" name="submit" class="submit_btn float_l" />
                                <input type="reset" value="Reset" id="reset" name="reset" class="submit_btn float_r" />

                            </form>

                        </div>
                    </div>

                    <div class="col_w450 float_r">
                        <h4>Our Location</h4>
                        <div id="map">
                            <a class="pirobox" href="images/map_big.jpg" title="Our Location">
                                <img width="300" height="150" src="images/map_thumb.jpg" alt="Our Location in Yangon" class="image_wrapper" />
                            </a>
                        </div>
                        <div class="cleaner h30"></div>

                        <h4>Mailing Address</h4>
                        <h6><strong>Location</strong></h6>
                        182-180 Nam nec nunc ac ante, <br />
                        Praesent posuere accumsan, 14420<br />
                        Nam rhoncus, diam a mollis tempor<br /><br />

                        <b>Phone:</b> 020-060-6620<br />
                        <b>Email:</b> <a href="">info@company.com</a>

                    </div>

                    <div class="cleaner"></div>
                </div>
            </Row>
        </>
    )
}
export default SiderForm;