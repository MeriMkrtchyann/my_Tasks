import { useEffect, useState } from 'react';
import { Card } from 'antd';
import { selectUser, selectUserDocuments, selectUserId } from '../../redux/slices/usersDetails/usersDetailsSlice';
import { useSelector } from 'react-redux';
import { useGetUserByIdMutation } from '../api/apiSlice';
import PersonalInfo from './PersonalInfo';
import OtherInfo from './OtherInfo';

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

const A = () => {
  const [userDetails] = useGetUserByIdMutation()
  const userId = useSelector(selectUserId);
  const user = useSelector(selectUser);
  const documents = useSelector(selectUserDocuments);

  useEffect(()=>{
    userDetails({ userId })
  },[userId,userDetails])
  console.log(documents)

  return(
      <div style={{display: 'flex' , gap:20}}>
        <PersonalInfo user={user} documents={documents}/>
        <OtherInfo user={user} documents={documents}/>
      </div>
    )
}

const contentList = {
  tab1: <div><A/></div>
//   tab2: <p>2</p>,
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