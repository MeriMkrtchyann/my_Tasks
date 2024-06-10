import { Input, Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { useEffect } from 'react';
import { getData } from '../api/getData';
import { urls } from '../config/urls';
import { selectUsers, updateUsers } from '../../redux/slices/usersInfo/usersInfoSlice';
import { selectAccessToken } from '../../redux/slices/activeAdmin/activeAdminSlice';
// import { selectPagination  } from '../../redux/slices/pagination/paginationSlice';
// updatePageSize, updatePaginationCurrent
  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

const UsersPage = () => {

  const dispatch = useDispatch()
  const accessToken = useSelector(selectAccessToken)
  const users = useSelector(selectUsers);

  useEffect(() => {
    try{
      (async function () {
        if (accessToken) {
          const usersData = await getData(urls.aboutUsers)
          dispatch(updateUsers(usersData))
        }
      })()
    }catch(err){
      console.log(err)
    }
  },[dispatch, accessToken]);


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
        filteredValue: null,
        onFilter : (value , record) => {
          return record.email.includes(value);
        }
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

   
    return (
      <>
        <Input.Search 
              placeholder="Search here..."
        />
        <Table 
            columns={columns} 
            dataSource={users} 
            nChange={onChange} 
            rowKey="id"
        />;
      </>
    )
}

export { UsersPage } 