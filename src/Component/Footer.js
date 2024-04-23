import React from "react";
import { Layout, Space } from 'antd';
import App from "../App.css";
import { Col, Row } from 'antd';
import { YoutubeOutlined, GithubOutlined, FacebookOutlined, InstagramOutlined, EnvironmentTwoTone, MailTwoTone, PhoneTwoTone } from "@ant-design/icons";

const { Header, Footer, Sider, Content } = Layout;

const style = {
    padding: '1px 0 ',
    textAlign: 'left',
};
const FooterForm = () => {
    return (
        <>
            <Footer className="footerStyle" >
                <Row gutter={[0, 0]}>
                    <Col className="gutter-row" xs={24} sm={24} lg={6}>
                        <div style={style}>
                            <img src="/Img/logo1.png" alt="Logo" className="img1" />
                            <br />
                            <div style={{ fontSize: '20px' }}>
                                <YoutubeOutlined style={{ marginLeft: '10px' }} /><GithubOutlined style={{ marginLeft: '30px' }} /><FacebookOutlined style={{ marginLeft: '30px' }} /><InstagramOutlined style={{ marginLeft: '30px' }} />
                            </div>

                        </div>
                    </Col>
                    <Col className="gutter-row" xs={24} sm={24} lg={6}>
                        <div style={style}>
                            <h2>Discover</h2>
                            <a href="/Home">Home</a>
                            <br /><br />
                            <a href="/About">About</a>
                            <br /><br />
                            <a href="/Tours">Tours</a>

                        </div>
                    </Col>
                    <Col className="gutter-row" xs={24} sm={24} lg={6}>
                        <div style={style}>
                            <h2>Quick Links</h2>
                            <a href="#">Gallery</a>
                            <br /><br />
                            <a href="#">Login</a>
                            <br /><br />
                            <a href="#">Register</a>
                        </div>
                    </Col>
                    <Col className="gutter-row" xs={24} sm={24} lg={6}>
                        <div style={style}>
                            <h2>Contact</h2>
                            <a href="#"><span style={{ fontWeight: '600' }}><EnvironmentTwoTone twoToneColor={"orange"} /> Address:</span>  Cuong</a>
                            <br /><br />
                            <a href="#"><span style={{ fontWeight: '600' }}><MailTwoTone twoToneColor={"orange"} /> Email:</span>  Cuong1112@gmail.com</a>
                            <br /><br />
                            <a href="#"><span style={{ fontWeight: '600' }}><PhoneTwoTone twoToneColor={"orange"} /> Phone:</span>  032819332323</a>
                        </div>
                    </Col>
                </Row>
            </Footer >
        </>
    )
}
export default FooterForm;