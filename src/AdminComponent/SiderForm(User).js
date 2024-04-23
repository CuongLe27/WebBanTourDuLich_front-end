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

const UserSiderForm = () => {
    const [User, setUser] = useState([]);
    const [Id, setId] = useState('');
    const [NameUser, setNameUser] = useState('');
    const [PasswordUser, setPasswordUser] = useState('');
    const [EmailUser, setEmailUser] = useState('');
    const [RoleUser, setRoleUser] = useState('');
    const [PhotoUser, setPhotoUser] = useState([
        {
            uid: '-1',
            name: '',
            status: 'done',
        },
    ]);
    const [Url, setUrl] = useState('');
    const [refreshUsers, setRefreshUsers] = useState(false);
    const targetRef2 = useRef(null);
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
                ...PhotoUser[0],
                name: file.name,
            };
            setPhotoUser([newFile]);
            return false
        },
    };
    useEffect(() => {
        axios.get('http://localhost:4000/api/v1/users')
            .then((snapshot) => {
                const arrayCourses = snapshot.data.data;
                setUser(arrayCourses);
            })
            .catch(err => console.log(err))
    }, [refreshUsers])
    const handleChangeSelectRole = (value) => {
        setRoleUser(value);
    };
    // //Phân trang
    const [currentPage, setCurrentPage] = useState(1)
    const recordsPerPage = 8;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const recods = User.slice(firstIndex, lastIndex);
    const npage = Math.ceil(User.length / recordsPerPage);
    const numbers = [...Array(npage + 1).keys()].slice(1);

    const changeCPage = (id) => {
        setCurrentPage(id);
    };
    const setInputUser = (value) => {
        setId(value._id);
        setNameUser(value.username);
        setPasswordUser(value.password);
        setEmailUser(value.email);
        setRoleUser(value.role);
        const newFile = {
            ...PhotoUser[0],
            name: value.photo,
        };
        setPhotoUser([newFile]);
        setUrl(value.photo);
        targetRef2.current.scrollIntoView({ behavior: 'smooth' });
    }
    const clearAllUser = () => {
        setId('');
        setNameUser('');
        setPasswordUser('');
        setEmailUser('');
        setRoleUser('');
        const newFile = {
            ...PhotoUser[0],
            name: '',
        };
        setPhotoUser([newFile]);
    }
    const handleInputName = (event) => {
        setNameUser(event.target.value);
    };
    const handleInputPassword = (event) => {
        setPasswordUser(event.target.value);
    };
    const handleInputEmail = (event) => {
        setEmailUser(event.target.value);
    };


    const onClickUpdateUser = async () => {
        if (Id == '') {
            alert('Vui lòng chọn id từ danh sách trên')
        } else if (NameUser == '' || PasswordUser == '' || EmailUser == '' || RoleUser == '') {
            alert('Vui lòng nhập đầy đủ thông tin')
        }
        else {
            var id = Id;
            var username = NameUser;
            var password = PasswordUser;
            var email = EmailUser;
            var role = RoleUser;
            var photo = Url;
            try {
                const response = await axios.put('http://localhost:4000/api/v1/users/' + id, {
                    username,
                    email,
                    password,
                    photo,
                    role
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
            const response = await axios.delete('http://localhost:4000/api/v1/users/' + value);
            console.log(response)
            setRefreshUsers(!refreshUsers);
            alert("Delete success!");

        } catch (error) {
            alert("Delete fail!");
        }
    }
    return (
        <div className="updateUser">
            <br />
            <h4 style={{ textAlign: 'center' }}>User Details</h4>
            <Row gutter={[0, 0]}>
                <Col className="gutter-row" xs={24} sm={24} xl={24} >
                    <table>
                        <thead>
                            <tr>
                                <th>No.</th>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Password</th>
                                <th>Photo</th>
                                <th>Role</th>
                            </tr>
                        </thead>
                        <tbody >
                            {recods.map((course, index) => (
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
                                    <td data-cell="Username">{course.username}</td>
                                    <td data-cell="Email">{course.email}</td>
                                    <td data-cell="Password">
                                        <p className="photo-Tour">{course.password}</p></td>
                                    <td data-cell="Photo">
                                        <p className="desc-Tour">{course.photo}</p>
                                    </td>
                                    <td data-cell="Role">{course.role}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div class="pagination p1" ref={targetRef2} >
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
                        <label class="control-label">Username</label>
                        <input type="text" value={NameUser} onChange={(event) => handleInputName(event)} name="name" class="form-control" />
                    </div>

                    <div class="form-group">
                        <label class="control-label">Password</label>
                        <input type="text" value={PasswordUser} onChange={(event) => handleInputPassword(event)} name="cast" class="form-control" readOnly />
                    </div>

                </Col>
                <Col className="gutter-row" xs={24} sm={24} md={12} >
                    <div class="form-group">
                        <label class="control-label">Email</label>
                        <input type="text" value={EmailUser} onChange={(event) => handleInputEmail(event)} name="cast" class="form-control" />
                    </div>
                    <div class="form-group">
                        <label class="control-label">Photo</label>
                        <br />
                        <Upload {...props} fileList={PhotoUser}>
                            <Button icon={<UploadOutlined />}>Upload image</Button>
                        </Upload>
                    </div>
                    <div class="form-group" style={{ display: 'flex', gap: '10px', alignItems: "center" }}>
                        <label class="control-label">Role</label>
                        <Select
                            defaultValue="user"
                            style={{
                                width: 120,
                            }}
                            onChange={handleChangeSelectRole}
                            options={[
                                {
                                    value: 'user',
                                    label: 'user',
                                },
                                {
                                    value: 'admin',
                                    label: 'admin',
                                },
                            ]}
                        />
                    </div>

                    <div class="form-group">
                        <Row gutter={[0, 10]}>
                            <Col className="gutter-row" xs={24} sm={24} xl={8} >
                                <button type="submit" class="btn btn-success access" onClick={onClickUpdateUser}>Update User</button>
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
export default UserSiderForm;