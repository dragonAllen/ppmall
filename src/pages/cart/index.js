import React from 'react';
import { Table, Button, Row, Col, Divider, Empty } from 'antd';
import router from 'umi/router';
import CartStyle from './index.scss';

export default class Cart extends React.Component {
  state = {
    columns: [
      {
        title: '商品信息',
        dataIndex: 'productInfo',
        width: '600px',
      },
      {
        title: '单价',
        className: `${CartStyle.tableColumns}`,
        width: '120px',
        dataIndex: 'singlePrice',
        render: text => <div>¥ {text}</div>,
      },
      {
        title: '数量',
        className: `${CartStyle.tableColumns}`,
        width: '120px',
        dataIndex: 'number',
        render: (text, record, index) => (
          <Row>
            <Col span={8}>
              <Button
                disabled={parseInt(record.number) === 1}
                shape="circle"
                icon="minus"
                size="small"
                onClick={this.onHandleMinus.bind(this, text, record, index)}
              />
            </Col>
            <Col span={8} style={{ textAlign: 'center' }}>
              {text}
            </Col>
            <Col span={8}>
              <Button
                disabled={parseInt(record.number) === 99}
                shape="circle"
                size="small"
                icon="plus"
                onClick={this.onHandlePlus.bind(this, text, record, index)}
              />
            </Col>
          </Row>
        ),
      },
      {
        title: '小计',
        className: `${CartStyle.tableColumns}`,
        width: '120px',
        dataIndex: 'subtotal',
        render: (text, record, index) => (
          <div>¥ {(parseFloat(record.singlePrice) * parseFloat(record.number)).toFixed(2)}</div>
        ),
      },
      {
        title: '操作',
        className: `${CartStyle.tableColumns}`,
        width: '90px',
        key: 'action',
        render: (text, record) => (
          <Button
            shape="circle"
            size="small"
            icon="close"
            onClick={this.onHandleClose.bind(this, record)}
          />
        ),
      },
    ],
    data: [
      {
        key: '1',
        productInfo: "Assassin's Creed® Odyssey",
        singlePrice: '3.00',
        number: '1',
        subtotal: '',
      },
      {
        key: '2',
        productInfo: 'Total War: THREE KINGDOMS',
        singlePrice: '1.50',
        number: '2',
        subtotal: '',
      },
      {
        key: '3',
        productInfo: 'Divinity: Original Sin 2',
        singlePrice: '120000.00',
        number: '1',
        subtotal: '',
      },
    ],
    selectedRowKeys: [],
  };

  componentWillMount() {
    let data = this.state.data;
    let content = [];
    data.map(item => content.push(item.key));
    this.setState(
      {
        selectedRowKeys: content,
      },
      () => {},
    );
  }

  goToCheckout() {
    router.push("/checkout");
  }

  onHandleMinus = (text, record, index, e) => {
    let data = this.state.data;
    data[index].number = parseInt(text) - 1;
    this.setState(
      {
        data: data,
      },
      () => {},
    );
  };

  onHandlePlus = (text, record, index, e) => {
    let data = this.state.data;
    data[index].number = parseInt(text) + 1;
    this.setState(
      {
        data: data,
      },
      () => {},
    );
  };

  onSelectChange(selectedRowKeys) {
    this.setState({ selectedRowKeys });
  }

  onClearAllRow() {
    this.setState({ data: [], selectedRowKeys: [] });
  }

  onHandleClose = (record, e) => {
    console.log(record.key);
    const data = this.state.data.filter(item => item.key !== record.key);
    this.setState({ data: data });
  };

  render() {
    return (
      <div className={CartStyle.page}>
        <Row>
          <div className={CartStyle.title}>购物车清单</div>
        </Row>
        <Divider />
        <Table
          columns={this.state.columns}
          dataSource={this.state.data}
          rowClassName={CartStyle.tableRows}
          scroll={{ x: 1050 }}
          locale={{
            emptyText: (
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="您的购物车空空如也" />
            ),
          }}
          rowSelection={{
            columnWidth: '80px',
            selectedRowKeys: this.state.selectedRowKeys,
            onChange: this.onSelectChange.bind(this),
            defaultChecked: true,
          }}
          pagination={false}
          footer={() => (
            <Row type="flex" align="middle" justify="center" className={CartStyle.tableFoot}>
              <Col xs={24} sm={24} md={6} lg={4} xl={4} xxl={4}>
                <span onClick={this.onClearAllRow.bind(this)} style={{ cursor: 'pointer' }}>
                  清空所有
                </span>
              </Col>
              <Col xs={24} sm={24} md={18} lg={20} xl={20} xxl={20}>
                <Row
                  type="flex"
                  align="middle"
                  justify="center"
                  className={CartStyle.tableFootThirdRow}
                >
                  <Col xs={24} sm={12} md={10} lg={10} xl={14} xxl={16}>
                    <div className={CartStyle.tableFootThirdRowOneCol}>
                      已选择{' '}
                      <span className={CartStyle.tableFootHighLight}>
                        {this.state.data
                          .filter(item => {
                            return this.state.selectedRowKeys.includes(item.key);
                          })
                          .reduce((total, currentValue) => {
                            return total + parseInt(currentValue.number);
                          }, 0)}
                      </span>{' '}
                      /{' '}
                      {this.state.data.reduce((total, currentValue) => {
                        return total + parseInt(currentValue.number);
                      }, 0)}{' '}
                      件商品
                    </div>
                  </Col>
                  <Col xs={24} sm={12} md={8} lg={8} xl={6} xxl={4}>
                    <div className={CartStyle.tableFootThirdRowSecondCol}>
                      应付金额 : {''}
                      <span className={CartStyle.tableFootHighLight}>
                        ￥
                        {this.state.data
                          .filter(item => {
                            return this.state.selectedRowKeys.includes(item.key);
                          })
                          .reduce((total, currentValue) => {
                            return (
                              total +
                              parseFloat(
                                (
                                  parseFloat(currentValue.singlePrice) *
                                  parseFloat(currentValue.number)
                                ).toFixed(2),
                              )
                            );
                          }, 0)}
                      </span>
                    </div>
                  </Col>
                  <Col xs={24} sm={24} md={6} lg={6} xl={4} xxl={4}>
                    <Button type="primary" block onClick={this.goToCheckout.bind(this)}>
                      结算
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          )}
        />
      </div>
    );
  }
}
