import React from 'react';
import { Row, Col, Card, Select, List, Typography, Tag, Popover, Carousel } from 'antd';
import HotStyle from './index.scss';

const { Option } = Select;
const { Paragraph, Text, Title } = Typography;

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
    CarouselArray: [
      'assassin.jpeg',
      'threeKingdom2.jpg',
      'skyrim.jpg',
      'civlization.jpg',
      'callOfDuty.jpg',
      'divinity.jpg',
    ],
  };

  render() {
    const content = (
      <Row className={HotStyle.popOverCard}>
        <Row>
          <Text ellipsis>Sid Meier’s Civilization® VI</Text>
        </Row>
        <Row>
          <Text ellipsis>文明6</Text>
        </Row>
        <Row className={HotStyle.cardRowWithBottom}>
          <Text>发行时间: 2019年10月16日</Text>
        </Row>
        <Carousel
          autoplay
          draggable
          lazyLoad="progressive"
          dots={false}
          autoplaySpeed={1000}
          effect="fade"
          className={HotStyle.cardInnerCarousel}
        >
          {this.state.CarouselArray.map((content, index) => {
            return (
              <img
                src={`https://knight-sz.oss-cn-shenzhen.aliyuncs.com/photo/${content}`}
                alt=""
                key={index}
                className={HotStyle.carouselImg}
              />
            );
          })}
        </Carousel>
        <Row className={HotStyle.cardRowWithTop}>
          <Text>标签</Text>
        </Row>
        <Row className={HotStyle.cardTagContent}>
          <Tag className={HotStyle.cardTag}>动作</Tag>
          <Tag className={HotStyle.cardTag}>策略战棋</Tag>
          <Tag className={HotStyle.cardTag}>回合制</Tag>
        </Row>
      </Row>
    );
    return (
      <div className={HotStyle.page}>
        <Card
          type="inner"
          extra={
              <Select defaultValue="相关性" className={HotStyle.listSelect}>
                <Option value="相关性">相关性</Option>
                <Option value="发行日期">发行日期</Option>
                <Option value="名称">名称</Option>
                <Option value="价格从低到高">价格从低到高</Option>
                <Option value="价格从高到低"> 价格从高到低</Option>
              </Select>
          }
          className={HotStyle.listCard}
          headStyle={{ background: '#001529' }}
        >
          <List
            className={HotStyle.innerList}
            dataSource={this.state.cartArray}
            pagination={{
              onChange: page => {
                console.log(page);
              },
              showTotal: total => `共${total}个结果`,
              pageSize: 10,
            }}
            renderItem={item => (
              <Popover content={content} placement="left">
                <List.Item key={item.id}>
                  <Row gutter={{ xs: 8, sm: 8, md: 16, lg: 16 }} className={HotStyle.listItem}>
                    <Col xs={24} sm={24} md={10} lg={8} xl={6} xxl={4}>
                      <img
                        className={HotStyle.listImg}
                        alt=""
                        src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                      />
                    </Col>
                    <Col xs={24} sm={24} md={14} lg={16} xl={18} xxl={20}>
                      <Row>
                        <Text ellipsis>Sid Meier’s Civilization® VI</Text>
                      </Row>
                      <Row className={HotStyle.listSecondRow}>
                        <Text ellipsis>文明6</Text>
                      </Row>
                      <Row>
                        <Col xs={24} sm={24} md={24} lg={6} xl={4} xxl={4}>
                            <img
                              className={HotStyle.listThirdRowTag}
                              alt=""
                              src="/windows.svg"
                            />
                            <img className={HotStyle.listThirdRowTag} alt="" src="/mac.svg" />
                            <img
                              className={HotStyle.listThirdRowTag}
                              alt=""
                              src="/steam.svg"
                            />
                        </Col>
                        <Col
                          xs={16}
                          sm={16}
                          md={18}
                          lg={12}
                          xl={14}
                          xxl={14}
                          className={HotStyle.listThirdRowSecondCol}
                        >
                          <Text>2019年10月16日</Text>
                          <Tag color="#001529" className={HotStyle.listThirdRowSecondColTag}>
                            -22%
                          </Tag>
                        </Col>
                        <Col
                          xs={8}
                          sm={8}
                          md={6}
                          lg={6}
                          xl={6}
                          xxl={6}
                          className={HotStyle.listThirdRowThirdCol}
                        >
                          <Text delete>¥ 199</Text>
                          <Text className={HotStyle.listThirdRowSecondColText}>¥ 99</Text>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </List.Item>
              </Popover>
            )}
          />
        </Card>
      </div>
    );
  }
}
