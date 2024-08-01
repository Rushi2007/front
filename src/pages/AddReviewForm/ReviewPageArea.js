import React from 'react'
import "bootstrap-icons/font/bootstrap-icons.css";
import { Menu, Layout } from "antd";
import { Link, useLocation, useNavigate } from 'react-router-dom';



import {
    HomeOutlined,
    UnorderedListOutlined,
    UserOutlined,
    HistoryOutlined
  } from "@ant-design/icons";
  const { Sider } = Layout;

function ReviewPageArea() {

    const navigate = useNavigate();
  return (
    <div> <br></br><br></br>
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
            marginTop: "-62px",
            fontSize: "20px",
            padding: "0px 0px 1408px 0px"
          }}
        >
        <br></br>
          {/* <b> <Menu.Item key="/patientprofile" icon={<HomeOutlined />}>
            {name}
          </Menu.Item></b> */}
          <Menu.Item key="/patientprofile" icon={<UserOutlined />}>
            Profile
          </Menu.Item>
          <Menu.Item key="/BookAppointment" icon={<UnorderedListOutlined />}>
            Book Appoinment
          </Menu.Item>
          <Menu.Item key="/bookhistory" icon={<HistoryOutlined />}>
            History
          </Menu.Item>
        </Menu>
      </Sider>
    </Layout>



    </div>
  )
}

export default ReviewPageArea