import React from 'react';
import {
  Row,
  Col,
  Layout,
  Menu,
  Icon,
  Card,
  Checkbox,
  Select,
  List,
  Spin,
  Typography,
  Avatar,
} from 'antd';
import InfiniteScroll from 'react-infinite-scroller';

const { Option } = Select;
const { Paragraph } = Typography;

export default class Hot extends React.Component {
  state = {
    cartArray: [
      {
        id: '1',
        name: '1',
      },
      {
        id: '2',
        name: '2',
      },
      {
        id: '3',
        name: '3',
      },
      {
        id: '4',
        name: '4',
      },
      {
        id: '5',
        name: '5',
      },
      {
        id: '6',
        name: '6',
      },
      {
        id: '7',
        name: '7',
      },
      {
        id: '8',
        name: '8',
      },
      {
        id: '9',
        name: '9',
      },
      {
        id: '10',
        name: '10',
      },
      {
        id: '11',
        name: '11',
      },
    ],
  };

  render() {
    return (
      <div style={{ height: '100%', width: '100%', margin: '20px 0', padding: '0 20px' }}>
        <Card
          type="inner"
          extra={
            <div>
              <Select defaultValue="相关性" style={{ width: 120, marginLeft: 10 }}>
                <Option value="相关性">相关性</Option>
                <Option value="发行日期">发行日期</Option>
                <Option value="名称">名称</Option>
                <Option value="价格从低到高">价格从低到高</Option>
                <Option value="价格从高到低"> 价格从高到低</Option>
              </Select>
            </div>
          }
          style={{ width: '100%', borderRadius: '8px' }}
          headStyle={{ background: '#001529' }}
        >
          <List
            style={{ minHeight: '1000px', borderRadius: '8px' }}
            dataSource={this.state.cartArray}
            pagination={{
              onChange: page => {
                console.log(page);
              },
              showTotal: total => `共${total}个结果`,
              pageSize: 10,
            }}
            renderItem={item => (
              <List.Item key={item.id}>
                <List.Item.Meta
                  avatar={
                    <img src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" width={80} height={80} />
                  }
                  title="Sid Meier’s Civilization® VI"
                  description="文明6"
                />
              </List.Item>
            )}
          />
        </Card>
      </div>
    );
  }
}
