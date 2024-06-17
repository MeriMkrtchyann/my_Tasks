import { Card, Table } from 'antd';
import { IdcardOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';

const NonBiometricPassport = ( parm ) => {

  const [ documents , setDocuments] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        setDocuments(parm.data.documents);
      } catch (error) {
        console.error('Ошибка:', error);
      }
    };

    fetchData();
  }, [parm.data]);

  const userInfoColumns = [
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

  const userInfoData = [
    {
      key: '1',
      field: 'Անձնագրի սերիա՝',
      value: documents?.documents?.[0]?.documentNumber ?? "-",
    },
    {
      key: '2',
      field: 'Տրված է՝',
      value: documents?.documents?.[0]?.issuanceDate ?? "-",
    },
    {
      key: '3',
      field: 'Ում կողմից՝',
      value: documents?.documents?.[0]?.documentDepartment ?? "-",
    },
    {
      key: '4',
      field:'Վավեր է մինչև՝',
      value: documents?.documents?.[0]?.validityDate ?? "-",
    },
  ];

  return (
    documents?.documents?.[0] ?
      <Card
        title={<><IdcardOutlined /> Ոչ կենսաչափական անձնագիր</>}
        bordered={false}
        style={{ width: 600 }}
      >
        <Table
          columns={userInfoColumns}
          dataSource={userInfoData}
          pagination={false}
        />
      </Card>
      :
      null
  );
};

export  {NonBiometricPassport};
