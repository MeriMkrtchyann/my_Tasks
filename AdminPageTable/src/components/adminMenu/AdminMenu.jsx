import styled from '@emotion/styled';
import { Dropdown, Menu, Space } from 'antd';
import { useSelector } from 'react-redux';
import { UserOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { logout } from '../../../redux/slices/activeAdmin/activeAdminSlice';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../config/routes';

const Paragraph = styled.p`
    margin: 2px;
`

const AdminMenu = () => {

    const { firstname } = useSelector((state) => state.activeAdmin.activeAdmin)
    const { lastname } = useSelector((state) => state.activeAdmin.activeAdmin)
    const navigate = useNavigate()

    const logOut = () => {
        dispatch(logout())
        navigate(routes.login)
    }

    const dispatch = useDispatch();

    const adminMenu = (
        <Menu>
          <Menu.Item key="logout" onClick={logOut}>
            Logout
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