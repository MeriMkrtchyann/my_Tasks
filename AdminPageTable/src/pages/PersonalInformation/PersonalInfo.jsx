import { Card, Table } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { selectUser, selectUserDocuments } from '../../../redux/slices/usersDetails/usersDetailsSlice';

const PersonalInfo = ( ) => {

  const user = useSelector(selectUser);
  const documents = useSelector(selectUserDocuments);

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
      field: 'Անուն Ազգանուն',
      value: user?.fullName,
    },
    {
      key: '2',
      field: 'Ծննդյան ամսաթիվ',
      value: user?.birthDate ?? "-",
    },
    {
      key: '3',
      field: 'Հեռախոսահամար',
      value: user?.username ?? "-",
    },
    {
      key: '4',
      field: 'Էլ. փոստ',
      value: user?.email ?? "-",
    },
    {
      key: '5',
      field: 'ՀԾՀ',
      value: documents?.ssn ?? "-",
    },
  ];

  return (
    <Card
      title={<><UserOutlined /> Անձնական տվյալներ</>}
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

export default PersonalInfo;
