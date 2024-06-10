import { Input, Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { getData } from '../api/getData';
import { urls } from '../config/urls';
import { selectUsersInfo, updateUsersInfo } from '../../redux/slices/usersInfo/usersInfoSlice';

  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

const UsersPage = () => {

  const dispatch = useDispatch()
  const [ searchedText, setSearchedText ] = useState("")
  const users = useSelector(selectUsersInfo);
  console.log(users)

  useEffect(() => {
    try{
      (async function () {
        const accessToken = localStorage.getItem('access_token');
        if (accessToken) {
          const usersData = await getData(urls.aboutUsers)
          dispatch(updateUsersInfo(usersData))
        }
      })()
     
    }catch(err){
      console.log(err)
    }
  },[dispatch]);


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
        filteredValue: [searchedText],
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

   
    return (
      <>
       <Input.Search 
            placeholder="Search here..."
            onSearch={(value) => {
              setSearchedText(value)
            }}
      />
     
            <Table 
                columns={columns} 
                dataSource={users } 
                nChange={onChange} 
                rowKey="id"
            />;
      </>
    )
}

export { UsersPage } 