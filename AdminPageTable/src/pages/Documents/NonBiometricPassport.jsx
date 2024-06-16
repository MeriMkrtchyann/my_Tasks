import { Card, Table } from 'antd';
import { IdcardOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { selectUser, selectUserDocuments } from '../../../redux/slices/usersDetails/usersDetailsSlice';

const NonBiometricPassport = ( ) => {

  const user = useSelector(selectUser);
  const documents = useSelector(selectUserDocuments);
console.log(documents)
console.log(user)
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
    <Card
      title={<><IdcardOutlined /> Նույնականացման քարտ</>}
      bordered={false}
      style={{ width: 600 }}
    >
      <Table
        columns={userInfoColumns}
        dataSource={userInfoData}
        pagination={false}
      />
    </Card>
  );
};

export  {NonBiometricPassport};
