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
  updatePagination
} from '../../redux/slices/audits/auditsSlice';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Table } from 'antd';
import { useGetAuditsMutation } from '../api/apiSlice.js';
import { InputSearch } from '../components/inputSearch/InputSearch.jsx';
import { updateSortOrderInColumns } from '../utils/utils.js';

const AuditsPage = () => {
  const dispatch = useDispatch();
  const audits = useSelector(selectAudits);
  const total = useSelector(selectAuditsTotal);
  const size = useSelector(selectSize);
  const page = useSelector(selectPage);
  const pagination = useSelector(selectPagination);
  const sortOrder = useSelector(selectSortOrder);
  const sortField = useSelector(selectSortField);
  const defaultSort = useSelector(selectDefaultSort);
  const [searchValue, setSearchValue] = useState("");
  const [getAudits] = useGetAuditsMutation();

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
      sortOrder: defaultSort,
    },
  ]);

  useEffect(() => {
      getAudits({
        page: page - 1,
        size,
        sortOrder,
        sortField,
        searchValue,
      });
  }, [page, size, sortOrder, sortField, searchValue, getAudits]);


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
      <InputSearch setSearchValue={setSearchValue}/>
      <Table
        columns={columns}
        dataSource={audits}
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
      />
    </>
  );
};

export { AuditsPage };
