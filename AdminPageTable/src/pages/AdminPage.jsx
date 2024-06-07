import { useSelector } from 'react-redux' 
import { Breadcrumb, Layout, theme } from 'antd';
const { Header, Content, Footer } = Layout;
import { AdminMenu } from '../components/adminMenu/AdminMenu';
import { SiderMenu } from '../components/siderMenu/SiderMenu';
import { Outlet } from 'react-router-dom';

function AdminPage() {

  const usersInfo = useSelector((state) => state)
 
  console.log(usersInfo)

  
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <SiderMenu />
      <Layout>
        <Header style={{ display: 'flex', justifyContent: 'flex-end', color: "white" }}>
          <AdminMenu />
        </Header>
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ padding: 24, minHeight: 360, background: colorBgContainer, borderRadius: borderRadiusLG }}>
            <Outlet />
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
