import React, { useState, useEffect } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Menu, Layout } from "antd";
import { useNavigate } from "react-router-dom";
// import { BrowserRouter, Route, Routes } from "react-router-dom";

import {
    HomeOutlined,
    UnorderedListOutlined,
    UserOutlined,
    HistoryOutlined
} from "@ant-design/icons";
const { Sider } = Layout;


function SideBar() {

    const [name, setUsername] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        const storedUsername = sessionStorage.getItem("name");
        if (storedUsername) {
            setUsername(storedUsername);
            console.log("Patient name", storedUsername);
        }
    }, []);

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Sider
                className="text-white fs-5 ant-layout ant-layout-has-sider"
                style={{ backgroundColor: "#223645" }}
                breakpoint="md"
                collapsedWidth="0"
            >
                <Menu
                    theme="dark"
                    //   mode="inline"
                    //   defaultSelectedKeys={["/ProviderProfileArea"]}
                    onClick={({ key }) => {
                        navigate(key);
                    }}
                    style={{
                        marginRight: "-75px",
                        marginLeft: "-9px",
                        marginTop: "-20px",
                        fontSize: "20px",
                        padding: "0px 0px 1300px 0px"
                    }}
                >
                    {/* <b> <Menu.Item key="/ProviderProfileArea" icon={<HomeOutlined />}>
                        {name}
                    </Menu.Item></b> */}
                    <Menu.Item key="/ProviderProfileArea" icon={<UserOutlined />}>
                        Profile
                    </Menu.Item>
                    <Menu.Item key="/ChangePasswordArea" icon={<UnorderedListOutlined />}>
                        Book Appoinment
                    </Menu.Item>
                    <Menu.Item key="/ProviderLandingPage" icon={<HistoryOutlined />}>
                        History
                    </Menu.Item>
                </Menu>
            </Sider>
        </Layout>
    );
}

export default SideBar
