import { useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme, Dropdown, Space } from 'antd';
import { useSelector } from 'react-redux' 
import MyTable from '../components/tables/Table';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

const Paragraph = styled.p`
    margin: 2px;
`

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, category, icon, children) {
  return {
    key,
    icon,
    category,
    children,
    label,
  };
}
const items = [
  getItem('Users', 'Users', 'Users', <UserOutlined />, [
    getItem('Tom', 'Tom', 'User'),
    getItem('Bill', 'Bill', 'User'),
    getItem('Alex', 'Alex', 'User'),
  ]),
  getItem('Admins', 'Admins', 'Users', <UserOutlined />, [
    getItem('Meri', 'Meri', 'Admin'),
    getItem('Arthur', 'Arthur', 'Admin'),
  ]),
];
const userContent = {
  'Tom': 'Tom is a developer.',
  'Bill': 'Bill is a cat.',
  'Alex': 'Alex is a designer.',
  'Meri': 'Meri is an admin.',
  'Arthur': 'Arthur is an admin.',
};

function AdminPage() {

  const {firstname} = useSelector((state) => state.activeUser.activeUser)
  const {lastname} = useSelector((state) => state.activeUser.activeUser)
  const [collapsed, setCollapsed] = useState(false);
  const [categoryType, setCategoryType] = useState('');
  const [category, setCategory] = useState('');
  const {token: { colorBgContainer, borderRadiusLG },} = theme.useToken();
  const navigate = useNavigate()

  const handleMenuClick = (value) => {
    setCategoryType(value.key);
    const selectedCategory = findCategory(items, value.key);
    setCategory(selectedCategory);
  };

  const findCategory = (items, key) => {
    for (const item of items) {
      if (item.key === key) {
        return item.category;
      }
      if (item.children) {
        const category = findCategory(item.children, key);
        if (category) {
          return category;
        }
      }
    }
    return null;
  };

  /////////////

  const onLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/login");
  };

  const menu = (
    <Menu>
      <Menu.Item key="logout" onClick={onLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  /////////////

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={[categoryType]}
          mode="inline"
          items={items}
          onClick={handleMenuClick}
        />
      </Sider>
      <Layout>
      <Header
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            color: "white",
          }}
        >
          <Space wrap>
            <Dropdown.Button overlay={menu} placement="bottom" icon={<UserOutlined />}>
              <div>
                <Paragraph style={{ margin: 0 }}>{firstname} {lastname}</Paragraph>
              </div>
            </Dropdown.Button>
          </Space>
    



      </Header>   
        <Content style={{ margin: '0 16px' }}>
        {categoryType ? 
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>{category}</Breadcrumb.Item>
            <Breadcrumb.Item>{categoryType}</Breadcrumb.Item>
          </Breadcrumb>
          :
          <div>
            <MyTable/>
          </div>
        }
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: categoryType ? colorBgContainer : borderRadiusLG,
              borderRadius: borderRadiusLG,
            }}
          >
            {userContent[categoryType]}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
}

export {AdminPage}