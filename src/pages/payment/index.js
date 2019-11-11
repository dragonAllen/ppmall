import React from 'react';
import { Button, Col, Divider, Row, Typography } from 'antd';
import PaymentStyle from './index.scss';

const { Title } = Typography;

export default class Payment extends React.Component {
  state = {};

  render() {
    return (
      <div className={PaymentStyle.page}>
        <Title>支付须知</Title>
        <Title level={3} type="secondary">
          当前支付无金额设置, 最低金额为¥ 1
        </Title>
        <Title level={3} type="secondary">
          请在 24 小时内完成支付, 超时订单将自动取消
        </Title>
        <Title level={3} type="secondary">
          本网站不会在您完成支付后的 72 小时内发货, 您的支付将用作打赏
        </Title>
        <Divider style={{ marginTop: '40px' }} />
        <Row type="flex" align="middle" justify="center" gutter={8}>
          <Col
            xs={14}
            sm={18}
            md={18}
            lg={18}
            xl={20}
            xxl={20}
            style={{ textAlign: 'right',fontSize:'20px' }}
          >
            订单金额{' '}:{' '}<span className={PaymentStyle.tableFootHighLight}>¥{' '}12000000.00</span>
          </Col>
          <Col xs={10} sm={6} md={6} lg={6} xl={4} xxl={4}>
            {' '}
            <Button type="primary" block style={{height:'40px'}}>
              立即支付
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}
