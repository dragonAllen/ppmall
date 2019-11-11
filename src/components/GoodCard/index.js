import React from 'react';
import { Button, Card, Col, Row, Tag } from 'antd';
import GoodCardStyle from './index.scss';
import PropTypes from 'prop-types';

export default class GoodCard extends React.Component {

  static propTypes = {
    data: PropTypes.array,
    title: PropTypes.string,
    headStyle: PropTypes.object,
    bodyStyle: PropTypes.object,
    bordered: PropTypes.bool,
  };

  static defaultProps = {
    data: undefined,
    title: undefined,
    headStyle: {
      background: 'linear-gradient(to top,#d8d8d8,#e8e8e8, #f5f5f5)',
      fontSize: '24px',
    },
    bodyStyle: { background: '#f0f2f5', padding: '0 0 20px 0' },
    bordered: false,
  };

  render() {
    const { data, title, headStyle, bodyStyle, bordered } = this.props;
    return (
      <Card
        title={title}
        headStyle={headStyle}
        bodyStyle={bodyStyle}
        bordered={bordered}
        className={GoodCardStyle.selectCard}
      >
        <Row gutter={4}>
          {data.map((content, index) => {
            return (
              <Col xs={24} sm={24} md={12} lg={12} xl={8} xxl={6} key={content.id}>
                <Card
                  className={GoodCardStyle.innerCart}
                  cover={<img src={content.imgSrc} alt={content.imgAlt} className={GoodCardStyle.coverImg} />}
                >
                  <Card.Meta
                    title={content.title}
                    description={
                      <div>
                        <Row className={GoodCardStyle.cartHoverOne}>
                          <Col span={16}>
                            <p>{content.titleCN}</p>
                          </Col>
                          <Col span={8} className={GoodCardStyle.discounts}>
                            {content.discounts ? <Tag color="#001529">${content.discounts}</Tag> : null}
                            {content.price}
                          </Col>
                        </Row>
                        <Row gutter={4} className={GoodCardStyle.cartHoverTwo}>
                          <Col span={12} className={GoodCardStyle.cartButtonOne}>
                            <Button block>查看详情</Button>
                          </Col>
                          <Col span={12} className={GoodCardStyle.cartButtonTwo}>
                            <Button type="primary" block>
                              加入购物车
                            </Button>
                          </Col>
                        </Row>
                      </div>
                    }
                  />
                </Card>
              </Col>
            );
          })}
        </Row>
      </Card>

    );
  }
}
