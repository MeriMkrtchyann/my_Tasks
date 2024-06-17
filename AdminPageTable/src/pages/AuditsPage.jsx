import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  selectAudits, 
  selectAuditsTotal, 
  selectPage, 
  selectPagination, 
  selectSize, 
  selectSortField,
  selectDefaultSort,
  selectSortOrder, 
} from '../../redux/slices/audits/auditsSlice';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { selectAccessToken } from '../../redux/slices/activeAdmin/activeAdminSlice';
import { Table } from 'antd';
import {useGetAuditsMutation } from '../api/apiSlice.js'
import { InputSearch } from '../components/inputSearch/InputSearch.jsx';
import { handleTableChange } from '../utils/tableHelpers.js';

const AuditsPage = () => {

  const dispatch = useDispatch();
  const accessToken = useSelector(selectAccessToken);
  const audits = useSelector(selectAudits);
  const total = useSelector(selectAuditsTotal);
  const size = useSelector(selectSize);
  const page = useSelector(selectPage);
  const pagination = useSelector(selectPagination);
  const sortOrder = useSelector(selectSortOrder);
  const sortField = useSelector(selectSortField);
  const defaultSort = useSelector(selectDefaultSort);
  const [ searchValue , setSearchValue ] = useState("")
  const [getAudits] = useGetAuditsMutation()
  

  const [columns, setColumns] = useState([
    {
      title: 'Հեռախոսահամար',
      dataIndex: 'phoneNumber',
      sorter: true,
      align: 'center',
    },
    {
      title: 'Էլ․ փոստ',
      dataIndex: 'email',
      align: 'center',
    },
    {
      title: 'Սարքավորում',
      dataIndex: 'deviceType',
      align: 'center',
    },
    {
      title: 'Գործողություն',
      dataIndex: 'actionType',
      sorter: true,
      align: 'center',
    },
    {
      title: 'Կարգավիճակ',
      dataIndex: 'successful',
      render: successful => (
        successful ? <CheckOutlined style={{ color: 'green' }} /> : <CloseOutlined style={{ color: 'red' }} />
      ),
      align: 'center',
    },
    {
      title: 'Ամսաթիվ',
      dataIndex: 'createdAt',
      sorter: true,
      align: 'center',
      sortOrder : defaultSort
    },
  ]);

  useEffect(() => {
    if (accessToken) {
      getAudits({
        page: page - 1,
        size,
        sortOrder,
        sortField,
        searchValue,
      })
    }
  }, [accessToken, page, size, sortOrder, sortField, searchValue, getAudits]);

  return (
    <>
      <InputSearch setSearchValue={setSearchValue}/>
      <Table
        columns={columns}
        dataSource={audits}
        onChange={handleTableChange(dispatch, setColumns)}
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
      />
    </>
  );
};

export { AuditsPage };
