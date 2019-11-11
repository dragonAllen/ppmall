import React, { Fragment } from 'react';
import { Row, Col, Card, Button, Checkbox, Divider } from 'antd';
import LoginStyle from './index.scss';
import BaseForm from '@/components/FormComponents/BaseForm';

export default class Login extends React.Component {
  state = {
    key: 'account',
    register: false,
    memory: false,
  };

  onTabChange = key => {
    this.setState({ key });
  };

  onCheckBoxChange(e) {
    this.setState({ memory: e.target.checked });
  }

  onClickRegister() {
    this.setState({ register: !this.state.register });
  }

  render() {
    const registerContent = (
      <Card className={LoginStyle.loginCard}>
        <Row className={LoginStyle.content}>
          <div className={LoginStyle.title}>PPMall账号注册</div>
          <BaseForm
            hideRequiredMark
            layout="vertical"
            formLayout={null}
            dataSource={[
              {
                label: '',
                name: 'account',
                required: true,
                max: 20,
                basecheck: 1,
                placehold: '请输入账号',
              },
              { label: '', name: 'password', ispassword: 1, placehold: '请输入密码' },
            ]}
            onSubmit={() => {}}
            onValuesChange={() => {}}
            wrappedComponentRef={form => {
              this.form = form;
            }}
          />
          <Button block type="primary" size="large" style={{ marginBottom: '20px' }}>
            注册
          </Button>
          <Button block size="large" onClick={this.onClickRegister.bind(this)}>
            返回
          </Button>
        </Row>
      </Card>
    );
    const tabList = [
      {
        key: 'account',
        tab: '账号密码登录',
      },
      {
        key: 'weChat',
        tab: '微信登录',
      },
    ];
    const contentList = {
      account: (
        <Fragment>
          <Row className={LoginStyle.content}>
            <div className={LoginStyle.title}>使用PPMall账号登录</div>
            <BaseForm
              hideRequiredMark
              layout="vertical"
              formLayout={null}
              dataSource={[
                {
                  label: '',
                  name: 'account',
                  required: true,
                  max: 20,
                  basecheck: 1,
                  placehold: '请输入账号',
                },
                { label: '', name: 'password', ispassword: 1, placehold: '请输入密码' },
              ]}
              onSubmit={() => {}}
              onValuesChange={() => {}}
              wrappedComponentRef={form => {
                this.form = form;
              }}
            />
            <Row style={{ marginBottom: '20px' }}>
              <Col span={8}>
                <Checkbox onChange={this.onCheckBoxChange.bind(this)} checked={this.state.memory}>
                  记住密码
                </Checkbox>
              </Col>
              <Col span={16} style={{ textAlign: 'right' }}>
                <span className={LoginStyle.text} onClick={this.onClickRegister.bind(this)}>
                  PPMall账号注册
                </span>{' '}
                | <span className={LoginStyle.text}>忘记密码?</span>
              </Col>
            </Row>
            <Row>
              <Button block type="primary" size="large">
                登录
              </Button>
            </Row>
            <Divider />
            <Row className={LoginStyle.annotation}>
              <span>测试账号密码 : test | test</span>
            </Row>
          </Row>
        </Fragment>
      ),
      weChat: <p>content2</p>,
    };
    return (
      <div className={LoginStyle.page}>
        {this.state.register ? (
          registerContent
        ) : (
          <Fragment>
            <Card
              tabList={tabList}
              activeTabKey={this.state.key}
              onTabChange={key => {
                this.onTabChange(key, 'key');
              }}
              className={LoginStyle.loginCard}
            >
              {contentList[this.state.key]}
            </Card>
          </Fragment>
        )}
      </div>
    );
  }
}
