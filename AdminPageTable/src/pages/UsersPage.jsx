import { Breadcrumb, Table } from 'antd';
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
import { updateSortOrderInColumns } from '../utils/utils';
import { useNavigate } from 'react-router-dom';
import { InputSearch } from '../components/inputSearch/InputSearch';
import { useGetUsersMutation } from '../api/users/users';
import { Loading } from '../components/loading/Loading';

const UsersPage = () => {

  const dispatch = useDispatch();
  const [getUsers, { isLoading, isError }] = useGetUsersMutation()
  const users = useSelector(selectUsers);
  const total = useSelector(selectUsersTotal)
  const size = useSelector(selectSize);
  const page = useSelector(selectPage);
  const pagination = useSelector(selectPagination);
  const sortOrder = useSelector(selectSortOrder);
  const sortField = useSelector(selectSortField);
  const defaultSort = useSelector(selectDefaultSort);

  const [ searchValue , setSearchValue ] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
      getUsers({
        page: page - 1,
        size,
        sortOrder,
        sortField,
        searchValue,
      })
  }, [page, size, sortOrder, sortField, searchValue, getUsers]);

  const [columns, setColumns] = useState([
      {
        title: 'Անուն Ազգանուն',
        dataIndex: 'fullName',
        align: 'center',
        render: (text, record) => (
          <a onClick={() => {
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
    return (
    <>
      {isError && <p style={{ color: 'red' }}>Error fetching users</p>}
      {isLoading ? (
        <Loading/>
      ) : (
        
        <div>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Օգտատերեր</Breadcrumb.Item>
          </Breadcrumb>
          <InputSearch setSearchValue={setSearchValue} />
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
              scroll={{
                x: 1000
              }}
            />;
        </div>
      )}
    </>
  );
}

export { UsersPage } 