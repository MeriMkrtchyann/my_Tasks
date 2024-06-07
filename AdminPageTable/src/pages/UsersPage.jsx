import { Table } from 'antd';
import { useSelector } from 'react-redux';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

const columns = [
    {
      title: 'Անուն Ազգանուն',
      dataIndex: 'fullName',
      align: 'center',
    },
    {
      title: 'Հեռախոսահամար',
      dataIndex: 'username',
      sorter: {
        compare: (a, b) => a.email.localeCompare(b.email),
        multiple: 3,
      },
      align: 'center',
    },
    {
      title: 'Էլ․ փոստ',
      dataIndex: 'email',
      sorter: {
        compare: (a, b) => a.email.localeCompare(b.email),
        multiple: 2,
      },
      align: 'center',
    },
    {
      title: 'Գրանցման ամսաթիվ',
      dataIndex: 'createdAt',
      sorter: {
        compare: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
        multiple: 1,
      },
      align: 'center',
    },
    {
        title: 'Կարգավիճակ',
        dataIndex: 'status',
        align: 'center',
    },
    {
        title: 'Նույնականացված',
        dataIndex: 'identified',
        render: identified => (
            identified ? <CheckOutlined style={{ color: 'green' }} /> : <CloseOutlined style={{ color: 'red' }} />
          ),
        align: 'center',
    },
    {
        title: 'Վերջին մուտք',
        dataIndex: 'lastLogin',
        sorter: {
            compare: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
            multiple: 1,
        },
        align: 'center',
    },
  ];


  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

const UsersPage = () => {

    const {users} = useSelector(state => state.usersInfo.usersInfo);
    console.log(users)
    return (
        <div>
            <Table 
                columns={columns} 
                dataSource={users} 
                nChange={onChange} 
                rowKey="id"
            />;
        </div>
    )
}

export { UsersPage } 