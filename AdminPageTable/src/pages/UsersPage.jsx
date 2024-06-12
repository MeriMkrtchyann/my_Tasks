import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { useEffect } from 'react';
import { getData } from '../api/getData';
import { urls } from '../config/urls';
import { selectUsers, selectUsersTotal, updateUsers } from '../../redux/slices/usersInfo/usersInfoSlice';
import { selectAccessToken } from '../../redux/slices/activeAdmin/activeAdminSlice';
import { selectPage, selectSize, updatePagination } from "../../redux/slices/pagination/paginationSlice"

const UsersPage = () => {

  const dispatch = useDispatch()
  const accessToken = useSelector(selectAccessToken)
  const users = useSelector(selectUsers);
  const total = useSelector(selectUsersTotal)
  const size = useSelector(selectSize);
  const page = useSelector(selectPage);
  // const pagination = useSelector(selectPagination)

  useEffect(() => {
    if (accessToken) {
      (async function () {
        try {
          const usersData = await getData(`${urls.aboutUsers}?page=${page-1}&size=${size}`);
          dispatch(updateUsers(usersData));
          dispatch(updatePagination({ page, size, total }));
        } catch (err) {
          console.log(err);
        }
      })();
    }
  }, [dispatch, accessToken, total, size, page]);


    const columns = [
      {
        title: 'Անուն Ազգանուն',
        dataIndex: 'fullName',
        align: 'center',
      },
      {
        title: 'Հեռախոսահամար',
        dataIndex: 'username',
        align: 'center',
      },
      {
        title: 'Էլ․ փոստ',
        dataIndex: 'email',
        sorter: true,
        align: 'center',
      },
      {
        title: 'Գրանցման ամսաթիվ',
        dataIndex: 'createdAt',
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
          sorter: true,
          align: 'center',
      },
    ];

    // const onChange = (pagination) => {
    //   dispatch(updatePagination({
    //     page: pagination.current,
    //     size: pagination.pageSize,
    //     total: pagination.total,
    // }));
    // };
   
    return (
      <>
        <Table 
            columns={columns} 
            dataSource={users} 
            // onChange={onChange} 
            rowKey="id"
            // pagination={pagination}
        />;
      </>
    )
}

export { UsersPage } 