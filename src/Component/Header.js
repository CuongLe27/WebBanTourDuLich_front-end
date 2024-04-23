import React, { useState, useEffect } from "react";
import { Drawer, Layout, Space, Input } from 'antd';
import App from "../App.css";
import { MenuOutlined, CloseOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Col, Row, Menu } from 'antd';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
const { Header, Footer, Sider, Content } = Layout;



const checkPageTour = () => {
    const currentUrl = window.location.pathname;
    const subStr = "Tours";
    const isContains = currentUrl.includes(subStr);

    return isContains;
}
const checkCurrentPage = () => {
    const currentUrl = window.location.pathname;
    return currentUrl;
}
const CustomMenuItem = ({ text, icon }) => {
    return (
        <div style={{ padding: '10px', color: 'red', backgroundColor: 'yellow' }}>
            {icon}
            <span>{text}</span>
        </div>
    );
};
const HeaderForm = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!props.data);
    const CheckAdmin = () => {
        if (isLoggedIn) {
            if (props.data.role == 'admin') {
                return (
                    <a href="/TourAdmin" className="font-header" target="_self" rel="noopener noreferrer" >
                        <div className={checkCurrentPage() == "/TourAdmin" ? 'font-checkclick' : ''}>
                            Admin
                        </div>
                    </a>
                );
            }
        }
    }
    const items =
        [
            {
                label: (

                    <a href="/Tours" className="font-header" target="_self" rel="noopener noreferrer" >
                        <div className={checkPageTour() ? 'font-checkclick' : ''}>
                            Tours
                        </div>
                    </a>

                ),
                key: 'SubMenu1',
            },
            {
                label: (

                    <a href="/About" className="font-header" target="_self" rel="noopener noreferrer" >
                        <div className={checkCurrentPage() == "/About" ? 'font-checkclick' : ''}>
                            About
                        </div>
                    </a>

                ),
                key: 'SubMenu1',
            },
            {
                label: (

                    <a href="/Home" className="font-header" target="_self" rel="noopener noreferrer" >
                        <div className={checkCurrentPage() == "/Home" ? 'font-checkclick' : ''}>
                            Home
                        </div>
                    </a>

                ),
                key: 'SubMenu1',
            },
            {
                label: (
                    CheckAdmin()
                ),
                key: 'SubMenu1',
            },

        ]

    const items2 =
        [
            {
                label: (

                    <a href="/Login" className="font-header2" target="_self" rel="noopener noreferrer" >
                        Login
                    </a>

                ),
                key: 'SubMenu1',
            },
            {
                label: (

                    <a href="/Register" className="font-header2" target="_self" rel="noopener noreferrer" >
                        <div style={{ backgroundColor: 'orange', textAlign: 'center', color: 'white', borderRadius: '10px', width: '100px' }}>
                            Register
                        </div>
                    </a>

                ),
                key: 'SubMenu1',
            }
        ]
    //menu
    const MenuHeader = ({ isInLine = false }) => {
        return (
            <div >
                <Menu className="menu" style={{ border: '0px', }}
                    mode={isInLine ? "inline" : "horizontal"}
                    items={items}
                ></Menu >
            </div >
        )
    }


    const [openMenu, setOpenMenu] = useState(false);
    const { Search } = Input;
    const onSearch = (value) => console.log(value);
    const [scrolled, setScrolled] = useState(false);

    //Kiểm tra chuột scrool thì hiện bottomBorder
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    const LogoutClick = () => {
        props.onLogout();
        setIsLoggedIn(false);
        if (checkCurrentPage() == "/Cart") {
            alert("Please sign in!")
            navigate("/Login")
        }
        if (checkCurrentPage() == "/TourAdmin") {
            alert("Please sign in!")
            navigate("/Home")
            navigate("/Login")
        }
    }

    const LoginHeader = ({ isInLine = false }) => {
        return (
            <>
                {isLoggedIn ? (
                    <div className="menuloginaaa">
                        <Menu className="menu3" style={{ border: '0px', }}
                            mode={isInLine ? "inline" : "horizontal"}
                            items={[
                                {
                                    label: (
                                        <a style={{ fontSize: '17px', fontWeight: '500', color: 'black' }}>{props.data.data.username}</a>
                                    ),
                                    key: 'SubMenu1',
                                },
                                {
                                    label: (

                                        <a onClick={LogoutClick} className="font-header3" target="_self" rel="noopener noreferrer" >
                                            <div style={{ width: "80px", backgroundColor: 'black', textAlign: 'center', color: 'white', borderRadius: '5px', fontSize: '15px' }}>
                                                Logout
                                            </div>
                                        </a>

                                    ),
                                    key: 'SubMenu1',
                                }
                            ]}
                        ></Menu >
                    </div >
                ) : (
                    <div >
                        <Menu className="menu2" style={{ border: '0px', }}
                            mode={isInLine ? "inline" : "horizontal"}
                            items={items2}
                        ></Menu >
                    </div >
                )}
            </>
        )
    }
    const [numCart, setNumCart] = useState(0);
    useEffect(() => {
        if (!!props.data) {
            try {
                axios.get('http://localhost:4000/api/v1/booking/byUserId/' + props.data.data._id)
                    .then((snapshot) => {
                        const arrayCourses = snapshot.data.data;
                        setNumCart(arrayCourses.length);
                    })
            } catch (error) {
                console.error(error);
            }
        } else {
            setNumCart(0);

        }
    }, [props.data]);
    const navigate = useNavigate();
    const viewBookingHistory = () => {
        if (isLoggedIn == false) {
            alert("Please sign in!")
            navigate("/Login")
        } else {
            navigate("/Cart")
        }
    }

    return (
        <>
            <Row gutter={[10, 8]}>
                <Col className="gutter-row" sm={24} lg={24}>

                    <Header className={`headerStyle ${scrolled ? 'scrolled' : ''}`}>
                        <img src="/Img/logo1.png" alt="Logo" className="img1" ></img>
                        <span className="HeadertoRespon">
                            <MenuHeader />
                        </span>
                        <LoginHeader />

                        <Drawer open={openMenu} onClose={() => { setOpenMenu(false); }}>
                            <div className="drawerM">
                                <a style={{ color: 'black', textDecoration: 'none' }} onClick={viewBookingHistory}>
                                    <ShoppingCartOutlined className="img3" style={{ height: '10px' }} />
                                    <p style={{
                                        backgroundColor: 'orange', position: 'relative', left: '60px', bottom: '50px', color: 'white',
                                        height: '30px', width: '30px', borderRadius: '50px', display: 'flex', alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>{numCart}</p>
                                </a>
                                <MenuHeader isInLine />
                            </div>
                        </Drawer>
                        <div className="menuIcon" onClick={() => {
                            setOpenMenu(true);
                        }}>
                            <MenuOutlined style={{ fontSize: '20px' }} />
                        </div>
                        <a style={{ color: 'black' }} onClick={viewBookingHistory}>
                            <ShoppingCartOutlined className="img2" />
                            <p style={{
                                backgroundColor: 'orange', position: 'absolute', right: '50px', top: '25px', color: 'white',
                                height: '30px', width: '30px', borderRadius: '50px', display: 'flex', alignItems: 'center',
                                justifyContent: 'center'
                            }} className="font2">{numCart}</p>
                        </a>
                    </Header>
                </Col>
            </Row >
        </>
    )
}
export default HeaderForm;