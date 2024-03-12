import { useState } from "react";
import {
  HomeOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  OrderedListOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";

import { Layout, Menu, Button, theme } from "antd";
import UserManagement from "./UserManagement/UserManagement";
import ProductManagement from "./ProductManagement/ProductManagement";
import * as UserService from "../../services/UserService";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetUser } from "../../redux/slides/userSlide";
import { userHook } from "../../hooks/userHook";
import Dashboard from "./Dashboard/Dashboard";

const { Header, Sider, Content } = Layout;

export default function Admin() {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const user = userHook();

  const [menuSelect, setMenuSelect] = useState("");

  const handleMenuSelect = (e) => {
    setMenuSelect(e.key);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await UserService.userLogout();
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    dispatch(resetUser());
    navigate("/");
  };

  const renderPage = (key) => {
    switch (key) {
      case "dashboard":
        return <Dashboard />;
      case "user-management":
        return <UserManagement />;
      case "product-management":
        return <ProductManagement />;
      case "logout":
        handleLogout();
        break;
      default:
        return <Dashboard />;
    }
  };

  const renderUser = () => {
    return user ? <p>Hello, {user.name}</p> : null;
  };

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />

        <Link to="/">
          <img className="p-2" src="/images/logo.jpg" />
        </Link>

        <Menu
          onClick={handleMenuSelect}
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["dashboard"]}
          items={[
            {
              key: "dashboard",
              icon: <HomeOutlined />,
              label: "Dashboard",
            },
            {
              key: "user-management",
              icon: <UserOutlined />,
              label: "User",
            },
            {
              key: "product-management",
              icon: <ShoppingCartOutlined />,
              label: "Product",
            },
            {
              key: "order-management",
              icon: <OrderedListOutlined />,
              label: "Order",
            },
            {
              key: "logout",
              icon: <LogoutOutlined />,
              label: "Log Out",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
          theme="dark"
          className="d-md-flex"
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <div className="ml-auto">{renderUser()}</div>
        </Header>

        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            height: "100dvh",
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {renderPage(menuSelect)}
        </Content>
      </Layout>
    </Layout>
  );
}
