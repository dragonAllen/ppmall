import React from 'react';
import { Col, Divider, Layout, Row } from 'antd';
import './index.scss'

export default class PPMallFooter extends React.Component {
  render() {
    return (
      <Layout.Footer style={{ padding: '60px 10% 40px 10%', background: '#ffffff' }}>
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
      </Layout.Footer>
    )
  }
}
