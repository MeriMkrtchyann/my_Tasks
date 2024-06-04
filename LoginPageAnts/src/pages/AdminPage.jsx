import { useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import Tabel from '../components/tabels/Tabel';

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, categori, icon, children) {
  return {
    key,
    icon,
    categori,
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

export default function AdminPage() {
  const [collapsed, setCollapsed] = useState(false);
  const [categoriType, setCategoriType] = useState('');
  const [categori, setCategori] = useState('');
  const {token: { colorBgContainer, borderRadiusLG },} = theme.useToken();

  const handleMenuClick = (value) => {
    setCategoriType(value.key);
    const selectedCategory = findCategory(items, value.key);
    setCategori(selectedCategory);
  };

  const findCategory = (items, key) => {
    for (const item of items) {
      if (item.key === key) {
        return item.categori;
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

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={[categoriType]}
          mode="inline"
          items={items}
          onClick={handleMenuClick}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
       
        <Content style={{ margin: '0 16px' }}>
        {categoriType ? 
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>{categori}</Breadcrumb.Item>
            <Breadcrumb.Item>{categoriType}</Breadcrumb.Item>
          </Breadcrumb>
          :
          <div>
            <Tabel/>
          </div>
        }
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: categoriType ? colorBgContainer : borderRadiusLG,
              borderRadius: borderRadiusLG,
            }}
          >
            {userContent[categoriType]}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
}
