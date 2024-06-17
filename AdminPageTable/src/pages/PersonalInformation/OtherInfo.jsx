import { Card, Table } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';

const OtherInfo = (parm) => {

  const [ user , setUser] = useState([])
  const [ documents , setDocuments] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        setUser(parm?.data?.user);
        setDocuments(parm?.data?.documents);
      } catch (error) {
        console.error('Ошибка:', error);
      }
    };

    fetchData();
  }, [parm.data]);



  const otherInfoColumns = [
    {
      title: 'Դաշտ',
      dataIndex: 'field',
      key: 'field',
    },
    {
      title: 'Արժեք',
      dataIndex: 'value',
      key: 'value',
    },
  ];

  const otherInfoData = [
    {
      key: '1',
      field: 'Գրանցման ամսաթիվ',
      value: user?.createdAt ?? '-',
    },
    {
      key: '2',
      field: 'Վերջին մուտք',
      value: user?.lastLogin ?? '-',
    },
    {
      key: '3',
      field: 'Face identification',
      value: documents?.ssnIndicator ?? '-',
    },
    {
      key: '4',
      field: 'The PIN is Set up',
      value: '-',
    },
    {
      key: '5',
      field: 'Կարգավիճակ',
      value: user?.status ?? '-',
    },
    {
      key: '6',
      field: 'Մեկնաբանություն',
      value: '-',
    },
  ];

  return (
    <Card
      title={<><ExclamationCircleOutlined /> Այլ</>}
      bordered={false}
      style={{ width: 600 }}
    >
      <Table
        columns={otherInfoColumns}
        dataSource={otherInfoData}
        pagination={false}
      />
    </Card>
  );
};

export default OtherInfo;
