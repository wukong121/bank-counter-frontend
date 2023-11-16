import React, {useState} from 'react';
import {
  FileOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type {MenuProps} from 'antd';
import {Breadcrumb, Button, Col, Layout, Menu, Row, Space, theme} from 'antd';
import {Link, Outlet} from "react-router-dom";

const {Header, Content, Footer, Sider} = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    to?: string,
    children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label: to ? <Link to={to}>{label}</Link> : label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('Accounts', '1', <UserOutlined/>, '/accounts'),
  getItem('Transfer', '2', <FileOutlined/>, '/transfer'),
];

const HomePage: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: {colorBgContainer},
  } = theme.useToken();

  return (
      <Layout style={{minHeight: '100vh'}}>
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          <div className="demo-logo-vertical"/>
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items}/>
        </Sider>
        <Layout>
          <Header style={{padding: 0, background: colorBgContainer}}>
            <Row>
              <Col span={22}></Col>
              <Col span={2}>
                <Space>
                  <Button>logout</Button>
                </Space>
              </Col>
            </Row>
          </Header>
          <Content style={{margin: '0 16px'}}>
            <Breadcrumb style={{margin: '16px 0'}}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>somebody</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{padding: 24, minHeight: 360, background: colorBgContainer}}>
              <Outlet />
            </div>
          </Content>
          <Footer style={{textAlign: 'center'}}>Ant Design ©2023 Created by Ant UED</Footer>
        </Layout>
      </Layout>
  );
};

export default HomePage;