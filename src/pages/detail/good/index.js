import React, { Fragment } from 'react';
import { Row, Col, Carousel, Typography, Anchor, Tooltip, Tag, List } from 'antd';
import { endsWith } from 'lodash';
import GoodDetailStyle from './index.scss';
import VideoPlayer from '@/components/VideoPlayer';
import ReactMarkdown from '@/components/ReactMarkDown';
import HeaderImg from '@/assets/images/ThreeKingdomsHeader.jpg';
import TestMD from '@/assets/md/TestMD.md';

const { Text, Paragraph } = Typography;
const { Link } = Anchor;

export default class GoodDetail extends React.Component {
  sliderRef = React.createRef();

  constructor(props) {
    super(props);
    this.state = {
      CarouselArray: [
        // 'MountBlade2_1080.mp4',
        // 'Cyberpunk2077-1080.mp4',
        // 'boruto-naruto_65_1080.mp4',
        'assassin.jpeg',
        'threeKingdom2.jpg',
        'skyrim.jpg',
        'civlization.jpg',
        'callOfDuty.jpg',
        'divinity.jpg',
      ],
      prev: 0,
      // expand: false,
    };
    this.videoRefs = [];
  }

  componentDidMount() {}

  handleChangeCarousel(index, e) {
    // 点击切换走马灯
    // 是否为视频
    if (endsWith(this.state.CarouselArray[this.state.prev], '.mp4')) {
      this.videoRefs[this.state.prev].playerRef.current.video.pause();
    }
    this.setState(
      {
        prev: index,
      },
      () => {
        this.sliderRef.current.slick.slickGoTo(index);
        if (endsWith(this.state.CarouselArray[index], '.mp4')) {
          this.videoRefs[index].playerRef.current.video.play();
        }
      },
    );
  }

  handleVideoEnd(index, e) {
    // 视频播放完毕自动播放下一个
    const length = this.videoRefs.length;
    this.setState(
      {
        prev: index,
      },
      () => {
        this.sliderRef.current.slick.slickGoTo(index + 1);
        if (index + 1 < length) {
          this.videoRefs[index + 1].playerRef.current.video.play();
        }
      },
    );
  }

  render() {
    const data = [
      {
        title: 'DLC1',
        price: '99',
      },
      {
        title: 'DLC2',
        price: '99',
      },
      {
        title: 'DLC3',
        price: '99',
      },
    ];
    return (
      <div className={GoodDetailStyle.page}>
        <Row>
          <div className={GoodDetailStyle.title}>Total War: THREE KINGDOMS</div>
          <div className={GoodDetailStyle.secondary}>全面战争: 三国</div>
        </Row>
        <Row style={{ margin: '20px 0 40px 0', background: '#e8e8e8' }}>
          <Col xs={24} sm={24} md={24} lg={16} xl={16} xxl={14}>
            <Carousel
              lazyLoad="progressive"
              dots={false}
              effect="fade"
              speed={200}
              ref={this.sliderRef}
            >
              {this.state.CarouselArray.map((content, index) => {
                return endsWith(content, '.mp4') ? (
                  <Fragment key={index}>
                    <VideoPlayer
                      src={`https://knight-sz.oss-cn-shenzhen.aliyuncs.com/video/${content}`}
                      ref={ref => (this.videoRefs[index] = ref)}
                      onEnded={this.handleVideoEnd.bind(this, index)}
                      autoPlay={index === 0}
                    />
                  </Fragment>
                ) : (
                  <Fragment key={index}>
                    <img
                      src={`https://knight-sz.oss-cn-shenzhen.aliyuncs.com/photo/${content}`}
                      className={GoodDetailStyle.carouselImg}
                      alt=" "
                    />
                  </Fragment>
                );
              })}
            </Carousel>
            <ul className={GoodDetailStyle.categoryHead}>
              {this.state.CarouselArray.map((content, index) => {
                return endsWith(content, '.mp4') ? (
                  <Fragment key={index}>
                    <li onClick={this.handleChangeCarousel.bind(this, index)}>
                      <img
                        src="/videoPlay.jpg"
                        alt="videoPlay"
                        style={{ width: '160px', height: '90px' }}
                      />
                    </li>
                  </Fragment>
                ) : (
                  <Fragment key={index}>
                  <li onClick={this.handleChangeCarousel.bind(this, index)}>
                    <img
                      src={`https://knight-sz.oss-cn-shenzhen.aliyuncs.com/photo/${content}`}
                      alt="测试"
                      style={{ width: '160px', height: '90px' }}
                    />
                  </li>
                  </Fragment>
                );
              })}
            </ul>
          </Col>
          <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={10}>
            <div style={{ width: '100%' }}>
              <img src={HeaderImg} style={{ width: '100%' }} alt="" />
            </div>
            <Row style={{ padding: '10px 10px 20px 10px' }}>
              <Paragraph ellipsis={{ rows: 4, expandable: true }} style={{ fontWeight: 700 }}>
                《Total War™: THREE
                KINGDOMS》首次在这一获奖无数的策略类游戏系列中重塑中国古代的烽火传奇。在扣人心弦的回合制战役中，可以建设国家，治国理政；在令人叹为观止的即时战斗中，则可以征战沙场，破军杀敌。《THREE
                KINGDOMS》将二者巧妙结合，重新定义了那段英雄辈出的传奇历史。
              </Paragraph>
              <Anchor affix={false} style={{ background: '#e8e8e8' }}>
                <Link
                  href="#ConsumerComment"
                  title={
                    <div style={{ marginBottom: '4px' }}>
                      <span style={{ fontWeight: 700, marginRight: '10px' }}>最近评测:</span>
                      <span>多半好评 (612)</span>
                    </div>
                  }
                />
                <Link
                  href="#ConsumerComment"
                  title={
                    <div>
                      <span style={{ fontWeight: 700, marginRight: '10px' }}>全部评测:</span>
                      <span>特别好评 (29,118)</span>
                    </div>
                  }
                />
              </Anchor>
              <div style={{ marginLeft: '2px', marginTop: '10px' }}>
                <div>
                  <span style={{ fontWeight: 700, marginRight: '10px' }}>发行日期:</span>
                  <span>2018年10月6日</span>
                </div>
                <div style={{ marginTop: '10px' }}>
                  <div>
                    <Tooltip
                      title="CREATIVE ASSEMBLY, Feral Interactive (Mac), Feral Interactive (Linux)"
                      mouseEnterDelay={1}
                    >
                      <Text ellipsis style={{ width: '100%' }}>
                        <span style={{ fontWeight: 700, marginRight: '24px' }}>开发商:</span>
                        <span>
                          CREATIVE ASSEMBLY, Feral Interactive (Mac), Feral Interactive (Linux)
                        </span>
                      </Text>
                    </Tooltip>
                  </div>
                  <div>
                    <Tooltip
                      title="CREATIVE ASSEMBLY, Feral Interactive (Mac), Feral Interactive (Linux)"
                      mouseEnterDelay={1}
                    >
                      <Text ellipsis style={{ width: '100%' }}>
                        <span style={{ fontWeight: 700, marginRight: '24px' }}>发行商:</span>
                        <span>SEGA, Feral Interactive (Mac), Feral Interactive (Linux)</span>
                      </Text>
                    </Tooltip>
                  </div>
                </div>
                <div style={{ marginTop: '10px' }}>
                  <span style={{ fontWeight: 700, marginRight: '34px' }}>标签: </span>
                  <Tag color="#d8d8d8" style={{ color: 'black', marginBottom: '4px' }}>
                    策略
                  </Tag>
                  <Tag color="#d8d8d8" style={{ color: 'black', marginBottom: '4px' }}>
                    动作
                  </Tag>
                  <Tag color="#d8d8d8" style={{ color: 'black', marginBottom: '4px' }}>
                    回合制
                  </Tag>
                </div>
              </div>
            </Row>
          </Col>
        </Row>
        <Row>
          <Row
            style={{
              background: 'linear-gradient(#e8e8e8,#d8d8d8, #f5f5f5)',
              padding: '30px 20px 50px 20px',
            }}
          >
            <Col span={20} style={{ fontSize: '28px' }}>
              Total War: THREE KINGDOMS
            </Col>
            <Col span={4}>
              <div>
                <img alt="" src="/windows.svg" style={{ width: '30px', height: '30px' }} />
                <img alt="" src="/mac.svg" style={{ width: '30px', height: '30px' }} />
                <img alt="" src="/steam.svg" style={{ width: '30px', height: '30px' }} />
              </div>
            </Col>
            <div
              style={{
                position: 'absolute',
                bottom: '-15px',
                right: '6vw',
                width: '300px',
                height: '40px',
                background: '#d8d8d8',
                borderRadius: '4px',
              }}
            >
              <div
                style={{
                  color: '#001529',
                  width: '100px',
                  float: 'left',
                  lineHeight: '40px',
                  textAlign: 'center',
                  fontSize: '16px',
                }}
              >
                <Text delete>¥199</Text>
                <Text style={{ fontWeight: 700, marginLeft: '4px' }}>¥99</Text>
              </div>
              <div
                style={{
                  background: '#1890ff',
                  color: '#f5f5f5',
                  width: '200px',
                  float: 'right',
                  lineHeight: '40px',
                  textAlign: 'center',
                  borderRadius: '4px',
                }}
              >
                加入购物车
              </div>
            </div>
          </Row>
          <div style={{ height: '30px', width: '100%' }} />
          <Row
            style={{
              background: 'linear-gradient(#e8e8e8,#d8d8d8, #f5f5f5)',
              padding: '10px 0 50px 0',
            }}
          >
            <List
              size="small"
              dataSource={data}
              renderItem={item => (
                <List.Item>
                  <Row style={{ width: '100%' }}>
                    <Col
                      xs={19}
                      sm={19}
                      md={20}
                      lg={21}
                      xl={21}
                      xxl={21}
                      style={{ padding: '0 20px' }}
                    >
                      <span>{item.title}</span>
                    </Col>
                    <Col xs={5} sm={5} md={4} lg={3} xl={3} xxl={3} style={{ padding: '0 20px' }}>
                      <span>¥{item.price}</span>
                    </Col>
                  </Row>
                </List.Item>
              )}
            />
            <div
              style={{
                position: 'absolute',
                bottom: '-15px',
                right: '6vw',
                width: '300px',
                height: '40px',
                background: '#d8d8d8',
                borderRadius: '4px',
              }}
            >
              <div
                style={{
                  color: '#001529',
                  width: '100px',
                  float: 'left',
                  lineHeight: '40px',
                  textAlign: 'center',
                  fontSize: '16px',
                }}
              >
                <Text delete>¥199</Text>
                <Text style={{ fontWeight: 700, marginLeft: '4px' }}>¥99</Text>
              </div>
              <div
                style={{
                  background: '#1890ff',
                  color: '#f5f5f5',
                  width: '200px',
                  float: 'right',
                  lineHeight: '40px',
                  textAlign: 'center',
                  borderRadius: '4px',
                }}
              >
                将所有 DLC 加入购物车
              </div>
            </div>
          </Row>
        </Row>
        <div style={{ height: '30px', width: '100%' }} />
        <Row
          style={{
            fontSize: '26px',
            padding: '4px 20px',
            borderBottom: '1px #d8d8d8 solid',
            fontWeight: 600,
          }}
        >
          关于此游戏
        </Row>
        <div className={GoodDetailStyle.markDownRowOpen}>
          <ReactMarkdown src={TestMD} />
        </div>
      </div>
    );
  }
}
