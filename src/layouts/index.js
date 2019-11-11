import React from 'react';
import Footer from './Footer';
import Header from './Header';
import { Layout, Menu, BackTop, Icon, notification } from 'antd';
import Link from 'umi/link';

class BasicLayout extends React.Component {
  componentWillMount() {
    const title = <p style={{ color: '#108ee9' }}>欢迎光临PPMall</p>;
    const desc = (
      <div>
        <p>本网站仅用于个人技术学习</p>
        <p>现阶段以实现基础功能为主</p>
        <p>点击进入 Github 了解详情</p>
      </div>
    );
    notification.open({
      icon: <Icon type="smile" style={{ color: '#108ee9' }} />,
      message: title,
      description: desc,
    });
  }

  render() {
    let href = window.location.href.split('/');
    href = '/' + href[3];

    if (href === '/404' || href === '/login') {
      return <Layout style={{ height: '100%' }}>{this.props.children}</Layout>;
    }
    return (
      <Layout>
        <Header />
        <Menu
          style={{ width: '100%', padding: '0 10% 0 10%', fontSize: '16px' }}
          defaultSelectedKeys={[href]}
          selectedKeys={[href]}
          mode="horizontal"
          theme="dark"
        >
          <Menu.Item key="/">
            <Link to="/">首页</Link>
          </Menu.Item>
          <Menu.Item key="/total">
            <Link to="/total">全部</Link>
          </Menu.Item>
        </Menu>
        <Layout.Content>{this.props.children}</Layout.Content>
        <Footer />
        <BackTop>
          <img src="/rocket.svg" alt="向上" width={60} height={60} />
        </BackTop>
      </Layout>
    );
  }
}

export default BasicLayout;
