import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { useEffect } from 'react';
import { getData } from '../api/getData';
import { urls } from '../config/urls';
import { selectUsers, selectUsersTotal, updateUsers } from '../../redux/slices/usersInfo/usersInfoSlice';
import { selectAccessToken } from '../../redux/slices/activeAdmin/activeAdminSlice';
import { selectPage, selectPagination, selectSize, updatePagination } from "../../redux/slices/pagination/paginationSlice"

const UsersPage = () => {

  const dispatch = useDispatch()
  const accessToken = useSelector(selectAccessToken)
  const users = useSelector(selectUsers);
  const total = useSelector(selectUsersTotal)
  const size = useSelector(selectSize);
  const page = useSelector(selectPage);
  const pagination = useSelector(selectPagination)


  useEffect(() => {
    try{
      (async function () {
        if (accessToken) {
          const usersData = await getData(`${urls.aboutUsers}?page=${page-1}&size=${size}`)
          dispatch(updateUsers(usersData))
          dispatch(updatePagination({ page, size, total }))
        }
      })()
    }catch(err){
      console.log(err)
    }
  },[dispatch, accessToken, total, size , page]);


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

    const onChange = (pagination) => {
      console.log(pagination)
      dispatch(updatePagination({
        page: pagination.current,
        size: pagination.pageSize,
        total: pagination.total,
    }));
    };
   
    return (
      <>
        <Table 
            columns={columns} 
            dataSource={users} 
            onChange={onChange} 
            rowKey="id"
            pagination={pagination}
        />;
      </>
    )
}

export { UsersPage } 