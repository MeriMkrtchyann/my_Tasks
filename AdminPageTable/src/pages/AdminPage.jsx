import { Layout } from 'antd';
const { Header, Content, Footer } = Layout;
import { AdminMenu } from '../components/adminMenu/AdminMenu';
import { SiderMenu } from '../components/siderMenu/SiderMenu';
import { Outlet } from 'react-router-dom';
import { getData } from '../api/getData';
import { selectAccessToken, updateAdminInfo } from '../../redux/slices/activeAdmin/activeAdminSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { urls } from '../config/urls';

function AdminPage() {

  const dispatch = useDispatch()
  const accessToken = useSelector(selectAccessToken)
 
  useEffect(() => {
    try{
      (async function () {
        if (accessToken) {
          const adminData = await getData(urls.aboutAdmin)
          dispatch(updateAdminInfo(adminData))
        }
      })()
    }catch(err){
      console.log(err)
    }
  },[dispatch,accessToken]);

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
