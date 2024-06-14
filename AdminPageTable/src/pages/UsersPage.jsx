import { Table, Input } from 'antd';
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
  updatePagination,
  } from '../../redux/slices/usersInfo/usersInfoSlice';
import { selectAccessToken } from '../../redux/slices/activeAdmin/activeAdminSlice';
import { updateSortOrderInColumns } from '../utils/utils';
import { useGetUsersMutation } from '../api/apiSlice';

const UsersPage = () => {

  const dispatch = useDispatch();
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

  const [ searchValue , setSearchValue ] = useState("")

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

    const onChange = (pagination, _filters, sorter) => {
      const newSortOrder = sorter.order === 'ascend' ? 'asc' : 'desc';
      const newSortField = sorter.field || "createdAt";
  
      dispatch(updatePagination({
        page: pagination.current,
        size: pagination.pageSize,
        sortOrder: newSortOrder,
        sortField: newSortField,
        defaultSort: null, 
      }));
  
      setColumns(prevColumns => updateSortOrderInColumns(prevColumns, newSortField, sorter));
    };

    
    const onSearch = (value) => {
        setSearchValue(value)
    };

    const onChangeValue = (event) => {
      if (!event.target.value) {
        setSearchValue("")
      }
    }
   
    return (
      <>
        <Input.Search
            placeholder="input search text"
            onSearch={onSearch}
            onChange={onChangeValue}
            style={{
              width: 200,
            }}
          />
        <Table 
            columns={columns} 
            dataSource={users} 
            onChange={onChange} 
            rowKey="id"
            pagination={{
              current: pagination.page,
              pageSize: pagination.size,
              total: total,
              showSizeChanger: pagination.showSizeChanger,
              pageSizeOptions: pagination.pageSizeOptions,
              showQuickJumper: pagination.showQuickJumper,
            }}
        />;
      </>
    )
}

export { UsersPage } 