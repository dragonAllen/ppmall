import React, { Fragment } from 'react';
import { Row, Layout, Menu, Avatar } from 'antd';
import LayoutStyle from './_layout.scss';
import Link from 'umi/link';

const { Sider } = Layout;

export default class UserLayout extends React.Component {
  state = {
    data: [],
    radioValue: 'orderList',
  };

  render() {
    let href = window.location.href.split('/user');
    href = '/user' + href[1];
    return (
      <Fragment>
        <Layout className={LayoutStyle.page}>
          <Sider breakpoint="lg" collapsedWidth="0" className={LayoutStyle.sider}>
            <Row className={LayoutStyle.row}>
              <Avatar size={72} src="/head.png" />
            </Row>
            <Row className={LayoutStyle.row}>姓名</Row>
            <Menu
              theme="dark"
              mode="inline"
              className={LayoutStyle.menu}
              defaultSelectedKeys={[href]}
              selectedKeys={[href]}
            >
              <Menu.Item key="/user/orderList">
                <Link to="/user/orderList">我的订单</Link>
              </Menu.Item>
              <Menu.Item key="/user/gameList">
                <Link to="/user/gameList">我的游戏</Link>
              </Menu.Item>
            </Menu>
          </Sider>
          {this.props.children}
        </Layout>
      </Fragment>
    );
  }
}
