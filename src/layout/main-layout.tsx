import React, { useState, useEffect } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout, Menu, theme, Typography } from "antd";
import Cookies from "js-cookie";
import { MenuData } from "./menu-data";
import styles from './main-layout.module.css';

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

export const MainLayout: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const token = Cookies.get("Token");

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    useEffect(() => {
        if (!token) {
            navigate('/', { replace: true });
            return;
        }

        if (location.pathname === '/app') {
            navigate('/app/category', { replace: true });
        }
    }, [location.pathname, navigate, token]);

    const item = MenuData.map((item) => ({
        key: item.id,
        label: (
            <Link className={styles.menuLink} to={item.path}>
                {item.label}
            </Link>
        ),
        icon: React.createElement(item.icon),
        className: location.pathname.includes(item.path) ? 
            `${styles.menuItem} ${styles.menuItemSelected}` : 
            styles.menuItem
    }));

    if (!token) {
        return null;
    }

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider 
                width={200}
                trigger={null}
                collapsed={collapsed}
                collapsible
            >
                <div className={styles.logoVertical}>
                    {!collapsed && (
                        <Title 
                            level={4} 
                            className={styles.logoText}
                        >
                            Ecommerce
                        </Title>
                    )}
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    items={item}
                    className={styles.menu}
                    selectedKeys={[location.pathname.split('/')[2]]}
                />
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer }}>
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
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};