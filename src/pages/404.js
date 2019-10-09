import { Result } from 'antd';
import React from 'react';

const Error = () => (
  <Result
    status="404"
    title="404"
    subTitle="该页面不存在"
  />
);

export default Error;
