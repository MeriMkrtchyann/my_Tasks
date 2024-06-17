import { useDispatch, useSelector } from 'react-redux';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { 
  selectUsers, 
  selectUsersTotal, 
  selectPage, 
  selectPagination, 
  selectSize, 
  selectSortField, 
  selectDefaultSort,
  selectSortOrder, 
  } from '../../redux/slices/usersInfo/usersInfoSlice';
import { selectAccessToken } from '../../redux/slices/activeAdmin/activeAdminSlice';
import { useGetUsersMutation } from '../api/apiSlice';
import { updateId } from '../../redux/slices/usersDetails/usersDetailsSlice';
import { useNavigate } from 'react-router-dom';
import { InputSearch } from '../components/inputSearch/InputSearch';
import { InformationTable } from '../components/tabel/Tabel';

const UsersPage = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [ searchValue , setSearchValue ] = useState("")
  const [getUsers] = useGetUsersMutation()
  const accessToken = useSelector(selectAccessToken)
  const users = useSelector(selectUsers);
  const total = useSelector(selectUsersTotal)
  const size = useSelector(selectSize);
  const page = useSelector(selectPage);
  const pagination = useSelector(selectPagination);
  const sortOrder = useSelector(selectSortOrder);
  const sortField = useSelector(selectSortField);
  const defaultSort = useSelector(selectDefaultSort);

  useEffect(() => {
    if (accessToken) {
      getUsers({
        page: page - 1,
        size,
        sortOrder,
        sortField,
        searchValue,
      })
    }
  }, [accessToken, page, size, sortOrder, sortField, searchValue, getUsers]);

  const [columns, setColumns] = useState([
      {
        title: 'Անուն Ազգանուն',
        dataIndex: 'fullName',
        align: 'center',
        render: (text, record) => (
          <a onClick={() => {
            localStorage.setItem("userId", record.id)
            dispatch(updateId(record.id))
            navigate(`/admin/users/${record.id}`)
          }}>
            {text}
          </a>
        ),
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
          sortOrder: defaultSort,
          align: 'center',
      },
    ]);

    return (
      <>
        <InputSearch setSearchValue={setSearchValue}/>
        <InformationTable 
          columns={columns} 
          users={users} 
          setColumns={setColumns} 
          pagination={pagination} 
          total={total}
        />
      </>
    )
}

export { UsersPage } 