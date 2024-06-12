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
  updateAuditsInfo, 
  updateAuditsTotal, 
  updatePagination 
} from '../../redux/slices/audits/auditsSlice';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { selectAccessToken } from '../../redux/slices/activeAdmin/activeAdminSlice';
import { getData } from '../api/getData';
import { urls } from '../config/urls';
import { Table } from 'antd';
import { updateSortOrderInColumns } from '../utils/utils';

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
      (async () => {
        try {
          const response = await getData(`${urls.audits}?page=${page - 1}&size=${size}&sortOrder=${sortOrder}&sortField=${sortField}`);
          const { audits: auditsData, total: totalData } = response;
          dispatch(updateAuditsInfo(auditsData));
          dispatch(updateAuditsTotal(totalData));
        } catch (err) {
          console.log(err);
        }
      })();
    }
  }, [dispatch, accessToken,total, page, size, sortOrder, sortField]);

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
    />
  );
};

export { AuditsPage };
