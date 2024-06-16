import { useState } from 'react';
import { Card } from 'antd';
import { PersonalInformation } from './PersonalInformation/PersonalInformation';
import { Documents } from './Documents/Documents';

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
 
  const onTab1Change = (key) => {
    setActiveTabKey1(key);
  };

  return (
    <>
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