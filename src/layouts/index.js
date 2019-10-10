import React from 'react';
import { withRouter } from 'dva/router';
import {
  Layout,
  Row,
  Col,
  Select,
  Divider,
  Menu,
  BackTop,
  Badge,
  Drawer,
  Button,
  List,
  Icon,
  Spin,
  Typography,
  notification,
} from 'antd';
import Link from 'umi/link';
import InfiniteScroll from 'react-infinite-scroller';
import BasicStyle from './index.scss';

const { Header, Content, Footer } = Layout;
const { Option } = Select;
const { SubMenu } = Menu;
const { Paragraph } = Typography;

class BasicLayout extends React.Component {
  state = {
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
    visible: false,
    loading: false,
    hasMore: true,
  };

  componentWillMount() {
    const title = <p style={{ color: '#108ee9' }}>欢迎光临皮皮商城</p>;
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

  componentDidMount() {}

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
    if (this.props.location.pathname === '/404') {
      return <Layout style={{ height: '100%' }}>{this.props.children}</Layout>;
    }
    return (
      <Layout>
        <BackTop>
          <img src="/rocket.svg" alt width={60} height={60} />
        </BackTop>
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
            }}
          >
            <Col xs={24} sm={8} md={6} lg={5} xl={4} xxl={3}>
              共 99 件商品
            </Col>
            <Col xs={24} sm={16} md={12} lg={13} xl={14} xxl={15}>
              合计¥ 1000000.00
            </Col>
            <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6} style={{ textAlign: 'right' }}>
              <Button type="primary" block>
                去购物车
              </Button>
            </Col>
          </Row>
          <Divider />
          <Row className={BasicStyle.cartList}>
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
        <Header style={{ height: '100px', padding: '0 10% 0 10%' }}>
          <Row
            type="flex"
            align="middle"
            gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
            className={BasicStyle.headerRow}
          >
            <Col xs={6} sm={6} md={6} lg={6} xl={8}>
              <img src="/logo.jpg" className={BasicStyle.logo} alt="" />
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
                      <img src="/cart.svg" className={BasicStyle.navImg} alt="" />
                    </Badge>
                  </div>
                </Menu.Item>
                <Menu.Item key="user">
                  <img src="/user.svg" className={BasicStyle.navImg} alt="" />
                </Menu.Item>
              </Menu>
            </Col>
          </Row>
        </Header>
        <Row>
          <Menu
            style={{ width: '100%', padding: '0 10% 0 10%' }}
            defaultSelectedKeys={[this.props.history.location.pathname]}
            mode="horizontal"
            theme="dark"
          >
            <Menu.Item key="/">
              <Link to="/">首页</Link>
            </Menu.Item>
            <Menu.Item key="/hot">
              <Link to="/hot">热门</Link>
            </Menu.Item>
            <Menu.Item key="/discounts">
              <Link to="/discounts">优惠</Link>
            </Menu.Item>
            <Menu.Item key="/series">
              <Link to="/series">系列</Link>
            </Menu.Item>
            <Menu.Item key="/action">
              <Link to="/action">动作</Link>
            </Menu.Item>
            <Menu.Item key="/shooting">
              <Link to="/shooting">射击</Link>
            </Menu.Item>
            <Menu.Item key="/rolePlay">
              <Link to="/rolePlay">角色扮演</Link>
            </Menu.Item>
            <Menu.Item key="/simulation">
              <Link to="/simulation">模拟经营</Link>
            </Menu.Item>
            <Menu.Item key="/Strategy ">
              <Link to="/Strategy">策略战棋</Link>
            </Menu.Item>
            <Menu.Item key="/RealTimeStrategy ">
              <Link to="/RealTimeStrategy">即时战略</Link>
            </Menu.Item>
            <Menu.Item key="/upcoming">
              <Link to="/upcoming">即将发行</Link>
            </Menu.Item>
            <SubMenu key="company" title={<span>厂商</span>}>
              <Menu.Item key="/SEGA">
                <Link to="/SEGA">世嘉</Link>
              </Menu.Item>
              <Menu.Item key="/UBISOFT">
                <Link to="/UBISOFT">育碧</Link>
              </Menu.Item>
              <Menu.Item key="/Vivendi">
                <Link to="/Vivendi">维旺迪</Link>
              </Menu.Item>
              <Menu.Item key="/Nintendo">
                <Link to="/Nintendo">任天堂</Link>
              </Menu.Item>
              <Menu.Item key="/KONAMI">
                <Link to="/KONAMI">科乐美</Link>
              </Menu.Item>
              <Menu.Item key="/MGS">
                <Link to="/MGS">微软游戏</Link>
              </Menu.Item>
              <Menu.Item key="/SCE">
                <Link to="/SCE">索尼娱乐</Link>
              </Menu.Item>
              <Menu.Item key="/EA">
                <Link to="/EA">美国艺电</Link>
              </Menu.Item>
              <Menu.Item key="/CAPCOM">
                <Link to="/CAPCOM">卡普空</Link>
              </Menu.Item>
              <Menu.Item key="/BNGI">
                <Link to="/BNGI">万代南梦宫</Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu key="related" title={<span>周边</span>}>
              <Menu.Item key="/MOD">
                <Link to="/MOD">MOD</Link>
              </Menu.Item>
              <Menu.Item key="/skill">
                <Link to="/skill">攻略</Link>
              </Menu.Item>
            </SubMenu>
          </Menu>
        </Row>
        <Content>{this.props.children}</Content>
        <Footer style={{ padding: '60px 10% 40px 10%', background: '#ffffff' }}>
          <Row>
            <Col xs={6} sm={6} md={5} lg={4} xl={3} xxl={2}>
              <ul>
                <h3>网站指南</h3>
                <li>
                  <a href="/">关于我</a>
                </li>
                <li>
                  <a href="/">常见问题</a>
                </li>
                <li>
                  <a href="/">网站声明</a>
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
                  <a
                    href="https://www.bilibili.com"
                    target="_Blank"
                    rel="nofollow noopener noreferrer"
                  >
                    Bilibili
                  </a>
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

export default withRouter(BasicLayout);
