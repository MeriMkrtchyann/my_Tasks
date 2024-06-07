import { UserOutlined, HistoryOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { routes } from '../../config/routes';
const { Sider } = Layout;

const SiderMenu = () => {

    const [collapsed, setCollapsed] = useState(false);

    function getItem(label, key, icon, children, path) {
        return {
          key,
          icon,
          children,
          label: <Link to={path}>{label}</Link>,
        };
    }

    const siderMenu = [
        getItem('Օգտատեր', '1', <UserOutlined />, null , routes.users),
        getItem('Գործողություններր', '2', <HistoryOutlined />, null , routes.audits),
      ];
      
    return(
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
            <div className="demo-logo-vertical" />
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={siderMenu} />
        </Sider>
    )
}

export { SiderMenu }