import styled from '@emotion/styled';
import { Dropdown, Menu, Space } from 'antd';
import { useSelector } from 'react-redux';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { logout, selectActiveAdmin } from '../../../redux/slices/activeAdmin/activeAdminSlice';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../config/routes';

const Paragraph = styled.p`
    margin: 2px;
`

const AdminMenu = () => {

    const { firstname , lastname } = useSelector(selectActiveAdmin)

    const navigate = useNavigate()
    const dispatch = useDispatch();

    const logOut = () => {
        dispatch(logout())
        navigate(routes.login)
     }

    const adminMenu = (
        <Menu>
            <Menu.Item key="myPage" onClick={() => navigate(routes.adminDetails)}>
                <UserOutlined /> Իմ էջը
            </Menu.Item>
            <Menu.Item key="logout" onClick={logOut}>
                <LogoutOutlined /> Դուրս գալ
            </Menu.Item>
        </Menu>
    );

    return (
        <Space wrap>
            <Dropdown.Button overlay={adminMenu} placement="bottom" icon={<UserOutlined />}>
                <div>
                <Paragraph style={{ margin: 0 }}>
                    {firstname} {lastname}
                </Paragraph>
                </div>
            </Dropdown.Button>
        </Space>
    )
}

export {AdminMenu}