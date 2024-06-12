import { useEffect } from "react"
import { getData } from "../api/getData"
import { useDispatch, useSelector } from "react-redux"
import { selectAudits, selectAuditsTotal, updateAuditsInfo } from "../../redux/slices/audits/auditsSlice"
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { selectAccessToken } from "../../redux/slices/activeAdmin/activeAdminSlice"
import { selectPage, selectPagination, selectSize, selectSortField, selectSortOrder, updatePagination, updatePaginationTotal } from "../../redux/slices/pagination/paginationSlice"
import { urls } from "../config/urls";
import { Table } from 'antd';

const AuditsPage = () => {

  const columns = [
    {
      title: 'Հեռախոսահամար',
      dataIndex: 'phoneNumber',
      sorter: true,
      align: 'center',
    },
    {
      title: 'Էլ․ փոստ',
      dataIndex: 'email',
      // sorter: true,
      align: 'center',
    },
    {
        title: 'Սարքավորում',
        dataIndex: 'deviceType',
        sorter: true,
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
    },
  ];
  
    const dispatch = useDispatch()
    const accessToken = useSelector(selectAccessToken)
    const audits = useSelector(selectAudits);
    const total = useSelector(selectAuditsTotal)
    const size = useSelector(selectSize);
    const page = useSelector(selectPage);
    const pagination = useSelector(selectPagination)
    const sortOrder = useSelector(selectSortOrder);
    const sortField = useSelector(selectSortField)

    useEffect(() => {
      if (accessToken) {
        (async () => {
          try {
            console.log(page)
            console.log(size)
            console.log(sortField)
            console.log(sortOrder)
            const auditsData = await getData(`${urls.audits}?page=${page-1}&size=${size}&sortField=${sortField}&sortOrder=${sortOrder}`)//&sortField=${sortField}&sortOrder=${sortOrder}
            dispatch(updateAuditsInfo(auditsData));
            dispatch(updatePaginationTotal(total));
          } catch (err) {
            console.log(err);
          }
        })();
      }
    },[dispatch, accessToken, total, size , page, sortField, sortOrder])

    const onChange = (pagination, filters, sorter, extra) => {
      console.log(filters)
      console.log(extra)
      console.log("field:", sorter.field);
      console.log("order:", sorter.order);

      dispatch(updatePagination({
        page: pagination.current,
        size: pagination.pageSize,
        total: pagination.total,
        sortField: sorter.field, 
        sortOrder: sorter.order === 'ascend' ? 'desc' : sorter.order === 'descend' ? 'asc' : 'sorter.order',
    }));
    };

    return (
            
            <Table
                columns={columns}
                dataSource={audits}
                onChange={onChange}
                rowKey="id"
                pagination={pagination}
            />
    )
}

export { AuditsPage } 