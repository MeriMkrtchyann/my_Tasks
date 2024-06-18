
import { Spin } from 'antd';

const Loading = () => (
    <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        height: '100vh', 
        width: '100vw' 
      }}>
    <Spin size="large" />
  </div>
);

export {Loading}