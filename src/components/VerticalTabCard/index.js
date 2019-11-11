import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Card, Col, Row, Statistic, Typography } from 'antd';
import VerticalTabCardStyle from './index.scss';

const { Title, Text, Paragraph } = Typography;
const { Countdown } = Statistic;

export default class VerticalTabCard extends React.Component {
  state = {
    currentIndex: 0,
  };

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

  onHandleTabClick(parm, e) {
    this.setState({ currentIndex: parm });
  }

  render() {
    const { data, title, headStyle, bodyStyle, bordered } = this.props;
    return (
      <Card
        title={title}
        headStyle={headStyle}
        bodyStyle={bodyStyle}
        bordered={bordered}
        className={VerticalTabCardStyle.selectCard}
      >
        <Row gutter={4}>
          <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
            {data.map((content, index) => {
              return (
                <Fragment key={content.id}>
                  <Card.Grid
                    style={{ width: '100%' }}
                    onClick={this.onHandleTabClick.bind(this, index)}
                  >
                    <Col xs={24} sm={24} md={12} lg={12} xl={8} xxl={6}>
                      <Typography>
                        <Title level={4} ellipsis>
                          {content.left.title}
                        </Title>
                        <Text ellipsis strong>
                          {content.left.titleCN}
                        </Text>
                        <br />
                        <Text ellipsis>发售日期: {content.left.issueTime}</Text>
                      </Typography>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={16} xxl={18}>
                      {content.left.countdown ? (
                        <div style={{ textAlign: 'center' }}>
                          <Countdown
                            value={content.left.countdown}
                            format="D 天 H 时 m 分"
                            valueStyle={{ fontSize: '16px', lineHeight: '80px' }}
                          />
                        </div>
                      ) : null}
                    </Col>
                  </Card.Grid>
                </Fragment>
              );
            })}
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
            {data.map((content, index) => {
              return (
                <div
                  className={
                    this.state.currentIndex === index
                      ? VerticalTabCardStyle.tabShowActive
                      : VerticalTabCardStyle.tabShow
                  }
                  key={index}
                >
                  <img
                    src={content.right.imgSrc}
                    alt={content.right.imgAlt}
                    style={{ width: '100%', height: 'auto' }}
                  />
                  <div style={{ padding: '10px' }}>
                    <Paragraph ellipsis={{ rows: 3, expandable: true }}>
                      {content.right.desc}
                    </Paragraph>
                  </div>
                </div>
              );
            })}
          </Col>
        </Row>
      </Card>
    );
  }
}
