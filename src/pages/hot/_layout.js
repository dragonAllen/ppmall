import React from 'react';
import { Row, Layout, Menu, Icon, Checkbox, Select } from 'antd';
import LayoutStyle from './_layout.scss';

const { Sider } = Layout;
const { Option } = Select;

export default class HotLayout extends React.Component {
  state = {
    data: [],
    value: undefined,
    expand: false,
  };

  handleChange = value => {
    this.setState({ value: value });
  };

  handleSearch = value => {
    if (value) {
    } else {
      this.setState({ data: [] });
    }
  };

  toggleForm = () => {
    const { expand } = this.state;
    this.setState({
      expand: !expand,
    });
  };

  render() {
    const tagArray = ['动作', '射击', '角色扮演', '模拟经营', '策略战棋', '即时战略'];
    const LanguageArray = [
      '俄语',
      '德语',
      '西班牙语',
      '日语',
      '韩语',
      '泰语',
      '法语',
      '希腊语',
      '意大利语',
    ];
    return (
      <div>
        <Row className={LayoutStyle.header}>
          <div className={LayoutStyle.title}>热门游戏</div>
          <div className={LayoutStyle.secondary}>所有产品</div>
        </Row>
        <Layout className={LayoutStyle.page}>
          <Sider breakpoint="lg" collapsedWidth="0" className={LayoutStyle.sider}>
            <Menu theme="dark" mode="inline" selectable={false} className={LayoutStyle.menu}>
              <Row className={LayoutStyle.row}>按标签缩小范围</Row>
              <Checkbox.Group>
                {tagArray.map((item, index) => {
                  return (
                    <Row key={index}>
                      <Checkbox value={item} className={LayoutStyle.checkBox}>
                        {item}
                      </Checkbox>
                    </Row>
                  );
                })}
              </Checkbox.Group>
              <Row className={LayoutStyle.rowNoLine}>
                <Select
                  showSearch
                  showArrow={false}
                  placeholder="搜索更多标签"
                  filterOption={false}
                  value={this.state.value}
                  notFoundContent={null}
                  onChange={this.handleChange}
                  onSearch={this.handleSearch}
                  style={{ width: '100%', height: '100%' }}
                >
                  {this.state.data.map(item => {
                    return (
                      <Option key={item} value={item}>
                        {item}
                      </Option>
                    );
                  })}
                </Select>
              </Row>
              <Row className={LayoutStyle.row}>按操作系统缩小范围</Row>
              <Checkbox.Group>
                <Row>
                  <Checkbox value="Windows" className={LayoutStyle.checkBox}>
                    Windows
                  </Checkbox>
                </Row>
                <Row>
                  <Checkbox value="Mac OS X" className={LayoutStyle.checkBox}>
                    Mac OS X
                  </Checkbox>
                </Row>
                <Row>
                  <Checkbox value="SteamOS + Linux" className={LayoutStyle.checkBox}>
                    SteamOS + Linux
                  </Checkbox>
                </Row>
              </Checkbox.Group>
              <Row className={LayoutStyle.row}>按语言缩小范围</Row>
              <Checkbox.Group>
                <Row>
                  <Checkbox value="简体中文" className={LayoutStyle.checkBox}>
                    简体中文
                  </Checkbox>
                </Row>
                <Row>
                  <Checkbox value="繁体中文" className={LayoutStyle.checkBox}>
                    繁体中文
                  </Checkbox>
                </Row>
                <Row>
                  <Checkbox value="英语" className={LayoutStyle.checkBox}>
                    英语
                  </Checkbox>
                </Row>
                {this.state.expand
                  ? LanguageArray.map(item => {
                      return (
                        <Row key={item}>
                          <Checkbox value={item} className={LayoutStyle.checkBox}>
                            {item}
                          </Checkbox>
                        </Row>
                      );
                    })
                  : null}
              </Checkbox.Group>
              <Row className={LayoutStyle.rowNoLine}>
                <div onClick={this.toggleForm}>
                  {this.state.expand ? null : (
                    <div>
                      <a style={{ color: '#f5f5f5' }}>查看全部</a> <Icon type="down" />
                    </div>
                  )}
                </div>
              </Row>
            </Menu>
          </Sider>
          {this.props.children}
        </Layout>
      </div>
    );
  }
}
