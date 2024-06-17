import { useState } from 'react';
import { Breadcrumb, Card } from 'antd';
import { PersonalInformation } from './PersonalInformation/PersonalInformation';
import { Documents } from './Documents/Documents';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/slices/usersDetails/usersDetailsSlice';

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


const contentList = {
  tab1: <div><PersonalInformation/></div>,
  tab2: <div><Documents/></div>,
};


const UserDetails = () => {
  const [activeTabKey1, setActiveTabKey1] = useState('tab1');
  const user = useSelector(selectUser);
  const onTab1Change = (key) => {
    setActiveTabKey1(key);
  };

  return (
    <>
     <Breadcrumb
        style={{
        margin: '16px 0',
        }}
      >
        <Breadcrumb.Item>Օգտատերեր</Breadcrumb.Item>
        <Breadcrumb.Item >{user.fullName}</Breadcrumb.Item>
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