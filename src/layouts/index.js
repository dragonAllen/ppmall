import React from 'react';
import { Layout, Row, Col, Select, Divider, Menu, BackTop, Badge, Drawer, Button  } from 'antd';
import Logo from '../../public/logo.jpg';
import User from '../../public/user.svg';
import Cart from '../../public/cart.svg';
import BasicStyle from './index.scss';

const { Header, Content, Footer } = Layout;
const { Option } = Select;
const { SubMenu } = Menu;

class BasicLayout extends React.Component {
  state = {
    data: [],
    value: [],
    fetching: false,
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
      <Layout>
        <BackTop />
        <Drawer
          title="最新加入商品"
          placement="right"
          onClose={this.onClose}
          visible={this.state.visible}
          width="50%"
        >
          <Row
            style={{
              height: '30px',
              lineHeight: '30px',
              marginBottom: '20px'
            }}
          >
            <Col xs={12} sm={8} md={6} lg={5} xl={4} xxl={3}>
              共 xx 件商品
            </Col>
            <Col xs={12} sm={8} md={12} lg={13} xl={14} xxl={15}>
              总计¥ xxxx
            </Col>
            <Col xs={24} sm={8} md={6} lg={6} xl={6} xxl={6} style={{ textAlign: 'right' }}>
              <Button type="danger" block>
                去购物车
              </Button>
            </Col>
          </Row>
          <Divider/>
          <Row
            style={{
              background: '#c0c0c0',
              height: '500px',
            }}
          >
            内容
          </Row>
        </Drawer>
        <Header style={{ height: '100px', padding: '0 10% 0 10%' }}>
          <Row
            type="flex"
            align="middle"
            gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
            className={BasicStyle.headerRow}
          >
            <Col xs={6} sm={6} md={6} lg={6} xl={8}>
              <img src={Logo} className={BasicStyle.logo} alt="" />
            </Col>
            <Col xs={12} sm={8} md={6} lg={6} xl={6}>
              <Select
                mode="multiple"
                allowClear={true}
                placeholder="搜索"
                style={{ width: '100%', height: '100%' }}
              >
                <Option value="lucy">lucy</Option>
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
                  <a className={BasicStyle.navText} href="https://github.com/dragonAllen/ppmall">
                    Github
                  </a>
                </Menu.Item>
                <Menu.Item key="admin">
                  <a className={BasicStyle.navText} href="/">
                    后台
                  </a>
                </Menu.Item>
                <Menu.Item key="cart">
                  <div onClick={this.showDrawer.bind(this)}>
                    <Badge count={0}>
                      <img src={Cart} className={BasicStyle.navImg} alt="" />
                    </Badge>
                  </div>
                </Menu.Item>
                <Menu.Item key="user">
                  <img src={User} className={BasicStyle.navImg} alt="" />
                </Menu.Item>
              </Menu>
            </Col>
          </Row>
        </Header>
        <Row>
          <Menu
            style={{ width: '100%', padding: '0 10% 0 10%' }}
            defaultSelectedKeys={['home']}
            mode="horizontal"
            theme="dark"
          >
            <Menu.Item key="home">
              <a href="/">首页</a>
            </Menu.Item>
            <Menu.Item key="hot">热门</Menu.Item>
            <Menu.Item key="discounts">优惠</Menu.Item>
            <Menu.Item key="recommendation">推荐</Menu.Item>
            <Menu.Item key="action">动作</Menu.Item>
            <Menu.Item key="shooting">射击</Menu.Item>
            <Menu.Item key="rolePlay">角色扮演</Menu.Item>
            <Menu.Item key="simulation">模拟经营</Menu.Item>
            <Menu.Item key="Strategy ">策略战棋</Menu.Item>
            <Menu.Item key="RealTimeStrategy ">即时战略</Menu.Item>
            <Menu.Item key="upcoming">即将发行</Menu.Item>
            <SubMenu key="company" title={<span>厂商</span>}>
              <Menu.Item key="SEGA">世嘉</Menu.Item>
              <Menu.Item key="UBISOFT">育碧</Menu.Item>
              <Menu.Item key="Vivendi">维旺迪</Menu.Item>
              <Menu.Item key="Nintendo">任天堂</Menu.Item>
              <Menu.Item key="KONAMI">科乐美</Menu.Item>
              <Menu.Item key="MGS">微软游戏</Menu.Item>
              <Menu.Item key="SCE">索尼娱乐</Menu.Item>
              <Menu.Item key="EA">美国艺电</Menu.Item>
              <Menu.Item key="CAPCOM">卡普空</Menu.Item>
              <Menu.Item key="BNGI">万代南梦宫</Menu.Item>
            </SubMenu>
            <SubMenu key="related" title={<span>周边</span>}>
              <Menu.Item key="MOD">MOD</Menu.Item>
              <Menu.Item key="skill">攻略</Menu.Item>
            </SubMenu>
          </Menu>
        </Row>
        <Content>{this.props.children}</Content>
        <Footer style={{ padding: '60px 10% 40px 10%', marginTop: '40px', background: '#ffffff' }}>
          <Row>
            <Col xs={6} sm={6} md={5} lg={4} xl={3} xxl={2}>
              <ul>
                <h3>服务指南</h3>
                <li>
                  <a href="/">购买指南</a>
                </li>
                <li>
                  <a href="/">支付方式</a>
                </li>
                <li>
                  <a href="/">服务声明</a>
                </li>
              </ul>
            </Col>
            <Col xs={6} sm={6} md={5} lg={4} xl={3} xxl={2}>
              <ul>
                <h3>数据来源</h3>
                <li>
                  <a
                    href="https://store.steampowered.com/"
                    target="_Blank"
                    rel="nofollow noopener noreferrer"
                  >
                    Steam
                  </a>
                </li>
                <li>
                  <a
                    href="https://bbs.3dmgame.com/forum.php"
                    target="_Blank"
                    rel="nofollow noopener noreferrer"
                  >
                    3DM
                  </a>
                </li>
                <li>
                  <a href="/">还没想好</a>
                </li>
              </ul>
            </Col>
            <Col xs={6} sm={6} md={5} lg={4} xl={3} xxl={2}>
              <ul>
                <h3>相关链接</h3>
                <li>
                  <a
                    href="https://github.com/dragonAllen/ppmall"
                    target="_Blank"
                    rel="nofollow noopener noreferrer"
                  >
                    Github
                  </a>
                </li>
                <li>
                  <a href="/">后台</a>
                </li>
                <li>
                  <a href="/">还没想好</a>
                </li>
              </ul>
            </Col>
          </Row>
          <Divider />
          <Row>
            <a href="/">
              <span>xxxICP备xxxxxxxxx号-1</span>
              <span style={{ marginLeft: '10px' }}>xxxICP证xxxxxxxxx号</span>
            </a>
          </Row>
        </Footer>
      </Layout>
    );
  }
}

export default BasicLayout;
