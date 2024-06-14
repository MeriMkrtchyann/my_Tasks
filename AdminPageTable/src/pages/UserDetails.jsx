import { useEffect, useState } from 'react';
import { Card } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { selectUserId } from '../../redux/slices/usersDetails/usersDetailsSlice';
import { useSelector } from 'react-redux';
import { useGetUserByIdMutation } from '../api/apiSlice';

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

  const [data] = useGetUserByIdMutation()
  const userId = useSelector(selectUserId);

  useEffect(()=>{
    data({
      userId
      }  
    )
  },[userId,data])

    return(
        <Card
            title={<><UserOutlined /> Անձնական տվյալներ</>}
                bordered={false}
                style={{
                width: 300,
            }}
        >
            <p>{userId}</p>
        </Card>
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