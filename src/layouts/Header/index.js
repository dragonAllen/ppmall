import React from 'react';
import Link from 'umi/link';
import { Badge, Col, Layout, Menu, Row, Select, Popover, Avatar, Button } from 'antd';
import HeaderStyle from './index.scss';
import CartDrawer from '@/components/CartDrawer';

export default class PPMallHeader extends React.Component {
  state = {
    visible: false,
  };

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <Layout.Header className={HeaderStyle.page}>
        <Row
          type="flex"
          align="middle"
          gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
          className={HeaderStyle.headerRow}
        >
          <Col xs={6} sm={6} md={6} lg={6} xl={8}>
            <Link to="/">
              <img src="/logo.jpg" className={HeaderStyle.logo} alt="LOGO" />
            </Link>
          </Col>
          <Col xs={12} sm={8} md={6} lg={6} xl={6}>
            <Select
              mode="multiple"
              allowClear={true}
              placeholder="搜索"
              style={{ width: '100%', height: '100%' }}
            >
              <Select.Option value="lucy">lucy</Select.Option>
            </Select>
          </Col>
          <Col xs={6} sm={10} md={12} lg={12} xl={10}>
            <Menu
              style={{ width: '100%', fontSize: '16px' }}
              mode="horizontal"
              theme="dark"
              selectedKeys={['']}
            >
              <Menu.Item key="github">
                <a
                  className={HeaderStyle.navText}
                  href="https://github.com/dragonAllen/ppmall"
                  target="_Blank"
                  rel="nofollow noopener noreferrer"
                >
                  Github
                </a>
              </Menu.Item>
              <Menu.Item key="admin">
                <a
                  className={HeaderStyle.navText}
                  href="/"
                  target="_Blank"
                  rel="nofollow noopener noreferrer"
                >
                  后台
                </a>
              </Menu.Item>
              <Menu.Item key="cart">
                <div onClick={this.showDrawer.bind(this)}>
                  <Badge count={0}>
                    <img src="/cart.svg" className={HeaderStyle.navImg} alt="" />
                  </Badge>
                </div>
              </Menu.Item>
              <Menu.Item key="user">
                <Popover
                  overlayClassName={HeaderStyle.popoverCard}
                  placement="bottom"
                  arrowPointAtCenter
                  content={
                    <div className={HeaderStyle.popoverContent}>
                      <Avatar size={64} src="/head.png" />
                      <div className={HeaderStyle.name}>姓名</div>
                      <Link to="/user/orderList">
                        <Button block className={HeaderStyle.button}>
                          我的订单
                        </Button>
                      </Link>
                      <Link to="/user/gameList">
                        <Button block className={HeaderStyle.button}>
                          我的游戏
                        </Button>
                      </Link>
                      <Button block className={HeaderStyle.button}>
                        退出
                      </Button>
                    </div>
                  }
                >
                  <Link to="/login">
                    <img src="/user.svg" className={HeaderStyle.navImg} alt="user" />
                  </Link>
                </Popover>
              </Menu.Item>
            </Menu>
          </Col>
        </Row>
        <CartDrawer visible={this.state.visible} onClose={this.onClose} />
      </Layout.Header>
    );
  }
}
