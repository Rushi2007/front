import React, { useState, useEffect } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Menu, Layout } from "antd";
import { useNavigate } from "react-router-dom";
// import { BrowserRouter, Route, Routes } from "react-router-dom";

import {
  HomeOutlined,
  UnorderedListOutlined,
  UserOutlined,
  FileImageOutlined,
  SettingOutlined,
  DotChartOutlined,
  AccountBookOutlined
} from "@ant-design/icons";
// import ChangePasswordArea from "../../ChangePassword/ChangePasswordArea/ChangePasswordArea";

const { Sider } = Layout;

const ManageProcedure = () => {
  const [name, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = sessionStorage.getItem("name");
    if (storedUsername) {
      setUsername(storedUsername);
      console.log("provider name", storedUsername);
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
          <b> <Menu.Item key="/ProviderProfileArea" icon={<HomeOutlined />}>
            {name}
          </Menu.Item></b>
          <Menu.Item key="/ProviderProfileArea" icon={<UserOutlined />}>
            Profile
          </Menu.Item>
          <Menu.Item key="/ChangePasswordArea" icon={<UnorderedListOutlined />}>
            Change Password
          </Menu.Item>
          <Menu.Item key="/ProviderLandingPage" icon={<DotChartOutlined />}>
            Manage Procedure
          </Menu.Item>
          <Menu.Item key="/DoctorProfileArea" icon={<SettingOutlined />}>
            Manage Doctor
          </Menu.Item>
          <Menu.Item key="/AddInsuranceDetails" icon={<SettingOutlined />}>
            Add Insurance
          </Menu.Item>
          <Menu.Item key="/AddAccomodationDetails" icon={<AccountBookOutlined />}>
            Add Accommodation Rooms
          </Menu.Item>
          <Menu.Item key="/ProviderGallery" icon={<FileImageOutlined />}>
            Provider Gallery
          </Menu.Item>
        </Menu>
      </Sider>
    </Layout>
  );
};

export default ManageProcedure;
