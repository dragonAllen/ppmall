import { Row, Button } from 'antd';
import React from 'react';


const Error = () => (
  <div
    style={{
      background: 'url(' + require(`../assets/404.jpg`) + ') no-repeat',
      backgroundSize: '150%',
      height: '100vh',
    }}
  >
    <Row style={{ width: '100%',top:'25%',padding:'0 0 0 45%' }}>
        <div style={{ color: '#f5f5f5',fontSize:'64px' }}>404</div>
        <div style={{ color: '#f5f5f5',fontSize:'32px' }}>
          您访问的页面不存在
        </div>
        <div style={{ marginTop:'20px' }}>
        <Button ghost  style={{width:'200px',height:'40px'}}>去往首页</Button>
        </div>
    </Row>
  </div>
);

export default Error;
