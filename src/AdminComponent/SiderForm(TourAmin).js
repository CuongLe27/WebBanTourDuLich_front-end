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
import { Anchor, message, Upload, Checkbox, Popconfirm } from 'antd';
import { ref, child, get, getDatabase, onValue } from "firebase/database";
import { storage } from "../fireBase";
import UserSiderForm from "./SiderForm(User)";
import BookSiderForm from "./SiderForm(BookAdmin)";
import ReviewSiderForm from "./SiderForm(ReviewAdmin)";
import RevenueSiderForm from "./SiderForm(RevenueAdmin)";
const SiderForm = () => {
    const [Tour, setTour] = useState([]);
    const [Id, setId] = useState('');
    const [TitleTour, setTitleTour] = useState('');
    const [CityTour, setCityTour] = useState('');
    const [AddressTour, setAddressTour] = useState('');
    const [DistanceTour, setDistanceTour] = useState('');
    const [PhotoTour, setPhotoTour] = useState([
        {
            uid: '-1',
            name: '',
            status: 'done',
        },
    ]);
    const [DescTour, setDescTour] = useState('');
    const [PriceTour, setPriceTour] = useState('');
    const [GuestTour, setGuestTour] = useState('');
    const [FeartureTour, setFeartureTour] = useState();
    const [Url, setUrl] = useState('');
    const [refreshTours, setRefreshTours] = useState(false);
    const targetRef = useRef(null);
    const props = {
        name: 'file',
        maxCount: 1,
        accept: '.png,.jpeg,.jpg',
        showUploadList: {
            showRemoveIcon: false,
        },
        beforeUpload(file) {
            try {
                storage.ref('/images/' + file.name).put(file)
                    .on("state_changed", alert("Upload success"), alert, () => {
                        storage.ref("images").child(file.name).getDownloadURL()
                            .then((url) => {
                                setUrl(url);
                            })
                    });
            } catch (e) {
                console.log(e)
            }

            const newFile = {
                ...PhotoTour[0],
                name: file.name,
            };
            setPhotoTour([newFile]);
            return false
        },
    };
    const onChangeFearture = (e) => {
        if (e.target.checked == true) {
            setFeartureTour(true);
        } else {
            setFeartureTour(false);
        }
    };
    useEffect(() => {
        axios.get('http://localhost:4000/api/v1/tours/get/all')
            .then((snapshot) => {
                const arrayCourses = snapshot.data.data;
                setTour(arrayCourses);
            })
            .catch(err => console.log(err))
    }, [refreshTours])
    // //Phân trang
    const [currentPage, setCurrentPage] = useState(1)
    const recordsPerPage = 7;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const recods = Tour.slice(firstIndex, lastIndex);
    const npage = Math.ceil(Tour.length / recordsPerPage);
    const numbers = [...Array(npage + 1).keys()].slice(1);

    const changeCPage = (id) => {
        setCurrentPage(id);
    };
    const setInputTour = (value) => {
        setId(value._id)
        setTitleTour(value.title);
        setCityTour(value.city);
        setAddressTour(value.address);
        setDistanceTour(value.distance);
        const newFile = {
            ...PhotoTour[0],
            name: value.photo,
        };
        setPhotoTour([newFile]);
        setUrl(value.photo);
        setDescTour(value.desc);
        setPriceTour(value.price);
        setGuestTour(value.maxGroupSize);
        setFeartureTour(value.featured);
        targetRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    const clearAllTour = () => {
        setId('');
        setTitleTour('');
        setCityTour('');
        setAddressTour('');
        setDistanceTour('');
        const newFile = {
            ...PhotoTour[0],
            name: '',
        };
        setPhotoTour([newFile]);
        setDescTour('');
        setPriceTour('');
        setGuestTour('');
        setFeartureTour(null);
    }
    const handleInputTitle = (event) => {
        setTitleTour(event.target.value);
    };
    const handleInputCity = (event) => {
        setCityTour(event.target.value);
    };
    const handleInputAddress = (event) => {
        setAddressTour(event.target.value);
    };
    const handleInputDistance = (event) => {
        setDistanceTour(event.target.value);
    };
    const handleInputDesc = (event) => {
        setDescTour(event.target.value);
    };
    const handleInputPrice = (event) => {
        setPriceTour(event.target.value);
    };
    const handleInputGuest = (event) => {
        setGuestTour(event.target.value);
    };
    const onClickAddTour = async () => {
        if (TitleTour == '' || CityTour == '' || AddressTour == '' || DistanceTour == '' || PhotoTour == '' || DescTour == '' || PriceTour == '' || GuestTour == '') {
            alert('Vui lòng nhập đầy đủ thông tin')
        } else if (Url == '') {
            alert('Vui lòng thêm hình')
        }
        else {

            var title = TitleTour;
            var city = CityTour;
            var address = AddressTour;
            var distance = DistanceTour;
            var photo = Url;
            var desc = DescTour;
            var price = PriceTour;
            var maxGroupSize = GuestTour;
            var review = [];
            var featured = FeartureTour;
            try {
                const response = await axios.post('http://localhost:4000/api/v1/tours', {
                    title,
                    city,
                    address,
                    distance,
                    photo,
                    desc,
                    price,
                    maxGroupSize,
                    review,
                    featured
                });
                console.log(response)
                setRefreshTours(!refreshTours);
                alert("Add success!");

            } catch (error) {
                alert("Add fail!");
            }
        }
    }
    const onClickUpdateTour = async () => {
        if (Id == '') {
            alert('Vui lòng chọn id từ danh sách trên')
        } else if (TitleTour == '' || CityTour == '' || AddressTour == '' || DistanceTour == '' || PhotoTour == '' || DescTour == '' || PriceTour == '' || GuestTour == '') {
            alert('Vui lòng nhập đầy đủ thông tin')
        } else if (Url == '') {
            alert('Vui lòng thêm hình')
        }
        else {
            var id = Id;
            var title = TitleTour;
            var city = CityTour;
            var address = AddressTour;
            var distance = DistanceTour;
            var photo = Url;
            var desc = DescTour;
            var price = PriceTour;
            var maxGroupSize = GuestTour;
            var review = [];
            var featured = FeartureTour;
            try {
                const response = await axios.put('http://localhost:4000/api/v1/tours/' + id, {
                    title,
                    city,
                    address,
                    distance,
                    photo,
                    desc,
                    price,
                    maxGroupSize,
                    review,
                    featured
                });
                console.log(response)
                setRefreshTours(!refreshTours);
                alert("Update success!");

            } catch (error) {
                alert("Update fail!");
            }
        }
    }
    const deleteTour = async (value) => {
        try {
            const response = await axios.delete('http://localhost:4000/api/v1/tours/' + value);
            console.log(response)
            setRefreshTours(!refreshTours);
            alert("Delete success!");

        } catch (error) {
            alert("Delete fail!");
        }
    }

    return (
        <div className="admin-Tour">
            <Anchor
                direction="horizontal"
                className="anchor-admin"
                items={[
                    {
                        key: 'part-1',
                        href: '#part-1',
                        title: (
                            <p className="custom-anchor">Tour</p>
                        ),
                    },
                    {
                        key: 'part-2',
                        href: '#part-2',
                        title: (
                            <p className="custom-anchor">User</p>
                        ),
                    },
                    {
                        key: 'part-3',
                        href: '#part-3',
                        title: (
                            <p className="custom-anchor">Book</p>
                        ),
                    },
                    {
                        key: 'part-4',
                        href: '#part-4',
                        title: (
                            <p className="custom-anchor">Review</p>
                        ),
                    },
                    {
                        key: 'part-5',
                        href: '#part-5',
                        title: (
                            <p className="custom-anchor">Revenue</p>
                        ),
                    },
                ]}

            />
            <div>
                <div id="part-1" className="addTour">
                    <br />
                    <h4 style={{ textAlign: 'center' }}>Tour Details</h4>
                    <Row gutter={[0, 0]}>
                        <Col className="gutter-row" xs={24} sm={24} xl={24} >
                            <table>
                                <thead>
                                    <tr>
                                        <th>No.</th>
                                        <th>Title</th>
                                        <th>City</th>
                                        <th>Address</th>
                                        <th>Distance</th>
                                        <th>Photo</th>
                                        <th>Description</th>
                                        <th>Price</th>
                                        <th>Max group size</th>
                                        <th>Fearture</th>
                                    </tr>
                                </thead>
                                <tbody >
                                    {recods.map((course, index) => (
                                        <tr key={index} className={index % 2 === 0 ? "even-row" : "odd-row"}>
                                            <td data-cell="No.">
                                                <div className="icon-update-del">
                                                    <p>{index + 1}</p>
                                                    <Popconfirm
                                                        title="Delete the tour"
                                                        description="Are you sure to delete this tour?"
                                                        onConfirm={() => {
                                                            deleteTour(course._id);
                                                        }}
                                                        placement="topLeft"
                                                        okText="Yes"
                                                        cancelText="No"

                                                    ><h5 ant-click-animating-without-extra-node="true"><DeleteTwoTone twoToneColor={"red"} /></h5></Popconfirm>
                                                    <h5 onClick={() => setInputTour(course)}><EditTwoTone twoToneColor={"green"} /></h5>
                                                </div>
                                            </td>
                                            <td data-cell="Title">{course.title}</td>
                                            <td data-cell="City">{course.city}</td>
                                            <td data-cell="Address">{course.address}</td>
                                            <td data-cell="Distance">{course.distance}</td>
                                            <td data-cell="Photo" >
                                                <p className="photo-Tour">{course.photo}</p>
                                            </td>
                                            <td data-cell="Desc" >
                                                <div className="desc-Tour">{course.desc}</div>
                                            </td>
                                            <td data-cell="Price">{course.price}</td>
                                            <td data-cell="Size">{course.maxGroupSize}</td>
                                            <td data-cell="Featured">{course.featured ? "True" : "False"}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div class="pagination p1" ref={targetRef}>
                                <ul>
                                    {
                                        numbers.map((n, i) => (
                                            <a class={`${currentPage == n ? 'is-active' : ''}`} key={i} onClick={() => changeCPage(n)}><li>{n}</li></a>

                                        ))
                                    }
                                </ul>
                            </div>
                        </Col>
                    </Row>
                    <Row gutter={[0, 0]}>
                        <Col className="gutter-row" xs={24} sm={24} md={12} >
                            <div class="form-group">
                                <label class="control-label">Id</label>
                                <input type="text" value={Id} name="name" class="form-control" readOnly />
                            </div>
                            <div class="form-group">
                                <label class="control-label">Title</label>
                                <input type="text" value={TitleTour} onChange={(event) => handleInputTitle(event)} name="name" class="form-control" />
                            </div>
                            <div class="form-group">
                                <label class="control-label">City</label>
                                <input type="text" value={CityTour} onChange={(event) => handleInputCity(event)} name="cast" class="form-control" />
                            </div>
                            <div class="form-group">
                                <label class="control-label">Address</label>
                                <input type="text" value={AddressTour} onChange={(event) => handleInputAddress(event)} name="cast" class="form-control" />
                            </div>

                            <div class="form-group">
                                <label class="control-label">Photo</label>
                                <br />
                                <Upload {...props} fileList={PhotoTour}>
                                    <Button icon={<UploadOutlined />}>Upload image</Button>

                                </Upload>

                            </div>
                        </Col>
                        <Col className="gutter-row" xs={24} sm={24} md={12} >
                            <div class="form-group">
                                <label class="control-label">Distance</label>
                                <input type="number" value={DistanceTour} onChange={(event) => handleInputDistance(event)} name="distance" class="form-control" />
                            </div>
                            <div class="form-group">
                                <label class="control-label">Description</label>
                                <input type="text" value={DescTour} onChange={(event) => handleInputDesc(event)} name="cast" class="form-control" />
                            </div>
                            <div class="form-group">
                                <label class="control-label">Price</label>
                                <input type="number" value={PriceTour} onChange={(event) => handleInputPrice(event)} name="distance" class="form-control" />
                            </div>
                            <div class="form-group">
                                <label class="control-label">Max group size</label>
                                <input type="number" value={GuestTour} onChange={(event) => handleInputGuest(event)} name="distance" class="form-control" />
                            </div>
                            <div class="form-group">
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <label class="control-label">Fearture</label>
                                    <Checkbox checked={FeartureTour} onChange={onChangeFearture}></Checkbox>
                                </div>
                            </div>
                            <div class="form-group">
                                <Row gutter={[0, 10]}>
                                    <Col className="gutter-row" xs={24} sm={24} xl={8} >
                                        <button type="submit" class="btn btn-success access" onClick={onClickAddTour}>Add Tour</button>
                                    </Col>
                                    <Col className="gutter-row" xs={24} sm={24} xl={8} >
                                        <button type="submit" class="btn btn-success access" onClick={onClickUpdateTour}>Update Tour</button>
                                    </Col>
                                    <Col className="gutter-row" xs={24} sm={24} xl={8} >
                                        <button type="submit" class="btn btn-success access" onClick={clearAllTour}>Clear</button>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div id="part-2">
                </div>
                <UserSiderForm />
                <div id="part-3">
                </div>
                <BookSiderForm />
                <div id="part-4">
                </div>
                <ReviewSiderForm />
                <div id="part-5">
                </div>
                <RevenueSiderForm />
            </div>
        </div >
    )
}
export default SiderForm;