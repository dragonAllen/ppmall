import React from 'react';
import { Button, Col, Divider, Drawer, Icon, List, Row, Spin, Typography } from 'antd';
import CartDrawerStyle from './index.scss';
import InfiniteScroll from 'react-infinite-scroller';
import router from 'umi/router';

const { Paragraph } = Typography;

export default class CartDrawer extends React.Component {

  state={
    cartArray: [
      {
        id: '1',
        name: '1',
      },
      {
        id: '2',
        name: '2',
      },
    ],
    cartArray2: [
      {
        id: '11',
        name: '11',
      },
    ],
    value: [],
    fetching: false,
    loading: false,
    hasMore: true,
  }

  handleInfiniteOnLoad() {
    let { cartArray } = this.state;
    this.setState({
      loading: true,
    });
    if (cartArray.length > 18) {
      this.setState({
        hasMore: false,
        loading: false,
      });
    }
    const data = cartArray.concat(this.state.cartArray2);
    this.setState({
      cartArray: data,
      loading: false,
    });
  }

  onClose = () => {
    if (this.props.onClose()) {
      this.props.onClose()
    }
  };

  goToCart() {
    router.push('/cart');
    this.props.onClose()
  }

  render() {
    const {visible} = this.props
    return (
      <Drawer
        title="最新加入商品"
        placement="right"
        onClose={this.onClose}
        visible={visible}
        width="50vw"
      >
        <Row
          style={{
            height: '30px',
            lineHeight: '30px',
          }}
        >
          <Col xs={24} sm={8} md={6} lg={5} xl={4} xxl={3}>
            共 99 件商品
          </Col>
          <Col xs={24} sm={16} md={12} lg={13} xl={14} xxl={15}>
            合计¥ 1000000.00
          </Col>
          <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6} style={{ textAlign: 'right' }}>
            <Button type="primary" block onClick={this.goToCart.bind(this)}>
              去购物车
            </Button>
          </Col>
        </Row>
        <Divider />
        <Row className={CartDrawerStyle.cartList}>
          <InfiniteScroll
            initialLoad={false}
            pageStart={0}
            loadMore={this.handleInfiniteOnLoad.bind(this)}
            hasMore={!this.state.loading && this.state.hasMore}
            useWindow={false}
          >
            <List
              dataSource={this.state.cartArray}
              renderItem={item => (
                <List.Item key={item.id}>
                  <Row gutter={{ xs: 8, sm: 8, md: 16, lg: 16 }} style={{ width: '99%' }}>
                    <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                      <img
                        style={{ width: '100%', minHeight: '160px' }}
                        alt="logo"
                        src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                      />
                    </Col>
                    <Col xs={24} sm={24} md={16} lg={16} xl={16} xxl={16}>
                      <Row>Sid Meier’s Civilization® VI</Row>
                      <Row>
                        <Paragraph ellipsis={{ rows: 3 }}>文明6</Paragraph>
                      </Row>
                      <Row>
                        <Col xs={14} sm={14} md={16} lg={16} xl={18} xxl={20}>
                          ¥ 99
                        </Col>
                        <Col xs={10} sm={10} md={8} lg={8} xl={6} xxl={4}>
                          <Icon type="delete" />
                          删除
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </List.Item>
              )}
            >
              {this.state.loading && this.state.hasMore && (
                <div
                  style={{
                    position: 'absolute',
                    bottom: '40px',
                    width: '100%',
                    textAlign: 'center',
                  }}
                >
                  <Spin />
                </div>
              )}
            </List>
          </InfiniteScroll>
        </Row>
      </Drawer>
    )
  }
}
