import { Layout } from 'antd';
const { Header, Content, Footer } = Layout;
import { AdminMenu } from '../components/adminMenu/AdminMenu';
import { SiderMenu } from '../components/siderMenu/SiderMenu';
import { Outlet } from 'react-router-dom';

function AdminPage() {

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <SiderMenu />
      <Layout>
        <Header style={{ display: 'flex', justifyContent: 'flex-end', color: "white" }}>
          <AdminMenu />
        </Header>
        <Content style={{ margin: '16px' }}>
            <Outlet />
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
}

export {AdminPage}
