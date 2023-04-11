
import {Link, Outlet, useNavigate } from 'react-router-dom'
import React, { useState, useEffect } from 'react';

import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Button, MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem(<Link style={{ textDecorationLine: 'none' }} to={`/admin/products`}>List Sản Phẩm</Link>, 'sub1',  <PieChartOutlined />),
  getItem(<Link style={{ textDecorationLine: 'none' }} to={`/admin/categories`}>List Danh Mục</Link>, 'sub1',  <PieChartOutlined />),
  
];
const AdminLayout = () => {
  const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token); // kiểm tra token có tồn tại hay không
      }, []);
      
      const handleLogout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false); // đăng xuất
        navigate("/admin");
      };
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
  <div>
    
      <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}> 
      <div>
    {isLoggedIn && (
                                    <Button type="primary" onClick={handleLogout}>
                                        Đăng xuất
                                    </Button>
                                    )}
                                    {!isLoggedIn && ( 
                                    <Button type="primary" onClick={() => navigate("/login")}>
                                        Đăng nhập
                                    </Button>
                                    )}
    </div>       
        <div style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)' }} />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
      
      <Layout className="site-layout">
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
        
          </Breadcrumb>
          <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
          < Outlet/>
          </div>
          
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  </div>
  );

}

export default AdminLayout