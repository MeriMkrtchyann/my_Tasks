import { useEffect } from "react"
import { getData } from "../api/getData"
import { useDispatch, useSelector } from "react-redux"
import { selectAudits, selectAuditsTotal, updateAuditsInfo } from "../../redux/slices/audits/auditsSlice"
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Table } from "antd"
import { selectAccessToken } from "../../redux/slices/activeAdmin/activeAdminSlice"
import { selectPage, selectPagination, selectSize, updatePagination } from "../../redux/slices/pagination/paginationSlice"
import { urls } from "../config/urls";

const columns = [
    {
      title: 'Հեռախոսահամար',
      dataIndex: 'phoneNumber',
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
    },
    {
        title: 'Սարքավորում',
        dataIndex: 'deviceType',
        align: 'center',
    },
    {
        title: 'Գործողություն',
        dataIndex: 'actionType',
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
        sorter: {
            compare: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
            multiple: 1,
        },
        align: 'center',
    },
  ];

const AuditsPage = () => {
  
    const dispatch = useDispatch()
    const accessToken = useSelector(selectAccessToken)
    const audits = useSelector(selectAudits);
    const total = useSelector(selectAuditsTotal)
    const size = useSelector(selectSize);
    const page = useSelector(selectPage);
    const pagination = useSelector(selectPagination)
   
    useEffect(() => {
       (async () => {
        if (accessToken) {
          const audits = await getData(`${urls.audits}?page=${page}&size=${size}`)
          dispatch(updateAuditsInfo(audits));
        }
       })()
    },[dispatch, accessToken, total, size , page])

    const onChange = (pagination) => {
      dispatch(updatePagination({
        page: pagination.current,
        size: pagination.pageSize,
        total: pagination.total
    }));
    };

    return (
        <div>
            <Table 
                columns={columns} 
                dataSource={audits} 
                onChange={onChange} 
                rowKey="id"
                pagination={pagination}
            />;
        </div>
    )
}

export { AuditsPage } 