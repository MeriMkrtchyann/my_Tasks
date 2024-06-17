import { useEffect, useState } from 'react';
import { Breadcrumb, Card } from 'antd';
import { PersonalInformation } from './PersonalInformation/PersonalInformation';
import { Documents } from './Documents/Documents';
import { useGetUserByIdMutation } from '../api/apiSlice';
import { useParams } from 'react-router-dom';

const tabList = [
  {
    key: 'tab1',
    tab: 'Անձնական տվյալներ',
  },
  {
    key: 'tab2',
    tab: 'Փաստաթղթեր',
  },
];


const UserDetails = () => {
  const [activeTabKey1, setActiveTabKey1] = useState('tab1');
  const [userDetails, { data }] = useGetUserByIdMutation()
  
  const { userId } = useParams();

  const onTab1Change = (key) => {
    setActiveTabKey1(key);
  };

  useEffect(() => {
    userDetails({ userId });
  }, [userId, userDetails]);

  const contentList = {
    tab1: <div><PersonalInformation data={data}/></div>,
    tab2: <div><Documents data={data}/></div>,
  };


  return (
    <>
     <Breadcrumb
        style={{
        margin: '16px 0',
        }}
      >
        <Breadcrumb.Item>Օգտատերեր</Breadcrumb.Item>
        <Breadcrumb.Item >{data?.user?.fullName}</Breadcrumb.Item>
      </Breadcrumb>
      <Card
        style={{
          width: '100%',
        }}
        tabList={tabList}
        activeTabKey={activeTabKey1}
        onTabChange={onTab1Change}
      >
        {contentList[activeTabKey1]}
      </Card>
    </>
  );
};
export {UserDetails};