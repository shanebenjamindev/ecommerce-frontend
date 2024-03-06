import { useState } from 'react';
import {
    HomeOutlined,
    LogoutOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import UserManagement from './UserManagement/UserManagement';
import ProductManagement from './ProductManagement/ProductManagement';
import * as UserService from '../../services/UserService';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { resetUser } from '../../redux/slides/userSlide';


const { Header, Sider, Content } = Layout;

export default function Dashboard() {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const [menuSelect, setMenuSelect] = useState("")

    const handleMenuSelect = (e) => {
        setMenuSelect(e.key)
    }

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = async () => {
        await UserService.userLogout();
        localStorage.removeItem("access_token")
        localStorage.removeItem("refresh_token")
        dispatch(resetUser())
        navigate('/')
    }

    const renderPage = (key) => {
        switch (key) {
            case "home":
                navigate('/')
            case "user-management":
                return <UserManagement />
            case "product-management":
                return <ProductManagement />
            case 'logout':
                handleLogout();
                break;
            default:
                return <></>
        }
    }

    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="demo-logo-vertical" />
                <Menu
                    onClick={handleMenuSelect}
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['dashboard']}
                    items={[
                        {
                            key: 'dashboard',
                            icon: <UserOutlined />,
                            label: 'Dashboard',
                        },
                        {
                            key: 'home',
                            icon: <HomeOutlined />,
                            label: 'HomePage'
                        },
                        {
                            key: 'user-management',
                            icon: <VideoCameraOutlined />,
                            label: 'User',
                        },
                        {
                            key: 'product-management',
                            icon: <UploadOutlined />,
                            label: 'Product',
                        },
                        {
                            key: 'logout',
                            icon: <LogoutOutlined />,
                            label: 'Log Out',
                        }
                    ]}
                />
            </Sider>
            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                >
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
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
    )
}
