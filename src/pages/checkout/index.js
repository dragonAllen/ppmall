import React, { Fragment } from 'react';
import { Row, Col, Card, Icon, Typography, Table, Button } from 'antd';
import ModalForm from '@/components/FormComponents/ModalForm';
import CheckoutStyle from './index.scss';
import router from 'umi/router';

const { Text } = Typography;

class checkoutForm extends ModalForm {
  getDataSource = () => [
    { label: '收货人', name: 'name', required: true, max: 10, basecheck: 1 },
    { label: '收货地址', name: 'address', required: true, max: 30, basecheck: 1 },
    {
      label: '手机号码',
      name: 'phoneNumber',
      required: true,
      type: 'number',
      len: 11,
    },
  ];
}

export default class Checkout extends React.Component {
  state = {
    data: [],
    columns: [
      {
        title: '商品信息',
        dataIndex: 'productInfo',
        width: '600px',
      },
      {
        title: '单价',
        width: '120px',
        dataIndex: 'singlePrice',
        render: text => <div>¥ {text}</div>,
      },
      {
        title: '数量',
        width: '120px',
        dataIndex: 'number',
      },
      {
        title: '小计',
        width: '120px',
        dataIndex: 'subtotal',
        render: text => <div>¥ {text}</div>,
      },
    ],
    tableData: [
      {
        key: '1',
        productInfo: "Assassin's Creed® Odyssey",
        singlePrice: '3.00',
        number: '1',
        subtotal: '3.00',
      },
      {
        key: '2',
        productInfo: 'Total War: THREE KINGDOMS',
        singlePrice: '1.50',
        number: '2',
        subtotal: '3.00',
      },
      {
        key: '3',
        productInfo: 'Divinity: Original Sin 2',
        singlePrice: '120000.00',
        number: '1',
        subtotal: '120000.00',
      },
    ],
  };

  addNewAddress = () => {
    checkoutForm.open({
      title: '新增收货地址',
      width: '50%',
      centered: true,
      onSubmit: data => {
        let dataArray = this.state.data;
        dataArray.push({
          name: data.name,
          address: data.address,
          phoneNumber: data.phoneNumber,
        });
        this.setState({
          data: dataArray,
        });
      },
    });
  };

  goToPayment() {
    router.push('/payment');
  }

  render() {
    return (
      <div className={CheckoutStyle.page}>
        <Card type="inner" title="收货地址" style={{ minHeight: '200px', borderRadius: '8px' }}>
          <Row gutter={{ xs: 8, sm: 8, md: 8, lg: 8 }}>
            {this.state.data
              ? this.state.data.map((item, index) => {
                  return (
                    <Fragment key={index}>
                      <Col xs={24} sm={12} md={12} lg={8} xl={8} xxl={6}>
                        <Card
                          style={{ width: '100%', height: '120px', marginBottom: '8px' }}
                          key={index}
                        >
                          <Row>
                            <Text ellipsis style={{ width: '100%' }}>
                              收货人: {item.name}
                            </Text>
                          </Row>
                          <Row>
                            <Text ellipsis style={{ width: '100%' }}>
                              收货地址: {item.address}
                            </Text>
                          </Row>
                          <Row>
                            <Text ellipsis style={{ width: '100%' }}>
                              手机号码: {item.phoneNumber}
                            </Text>
                          </Row>
                        </Card>
                      </Col>
                    </Fragment>
                  );
                })
              : null}
            <Col xs={24} sm={12} md={12} lg={8} xl={8} xxl={6}>
              <Card
                style={{ width: '100%', height: '120px', marginBottom: '8px' }}
                onClick={this.addNewAddress}
              >
                <Icon
                  type="plus"
                  style={{ width: '100%', height: '80px', lineHeight: '80px', fontSize: '32px' }}
                />
              </Card>
            </Col>
          </Row>
        </Card>
        <Card
          type="inner"
          style={{ minHeight: '200px', borderRadius: '8px', marginTop: '40px' }}
          bodyStyle={{ padding: '0' }}
        >
          <Table
            columns={this.state.columns}
            dataSource={this.state.tableData}
            scroll={{ x: 960 }}
            pagination={false}
            footer={() => (
              <Row type="flex" align="middle" justify="center" gutter={8}>
                <Col
                  xs={14}
                  sm={18}
                  md={18}
                  lg={18}
                  xl={20}
                  xxl={20}
                  style={{ textAlign: 'right' }}
                >
                  应付金额 : <span className={CheckoutStyle.tableFootHighLight}>¥ 12000000.00</span>
                </Col>
                <Col xs={10} sm={6} md={6} lg={6} xl={4} xxl={4}>
                  {' '}
                  <Button type="primary" block onClick={this.goToPayment.bind(this)}>
                    提交订单
                  </Button>
                </Col>
              </Row>
            )}
          />
        </Card>
      </div>
    );
  }
}
