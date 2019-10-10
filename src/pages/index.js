import React, { Component } from 'react';
import Player from 'griffith';
import {
  Carousel,
  Card,
  Row,
  Col,
  Tag,
  Button,
  Statistic,
  Typography,
} from 'antd';
import HomeStyle from './index.scss';

const { Meta } = Card;
const { Countdown } = Statistic;
const { Title, Text, Paragraph } = Typography;

export default class Index extends Component {
  coverRef = React.createRef();

  constructor(props) {
    super(props);
    this.state = {
      CarouselArray: [
        'assassin.jpeg',
        'threeKingdom2.jpg',
        'skyrim.jpg',
        'civlization.jpg',
        'callOfDuty.jpg',
        'divinity.jpg',
      ],
      selectArray: [
        {
          imgSrc: 'assassin.jpeg',
          color: '#c0c0c0',
          text: '刺客信条系列',
          backgroundSize: '',
        },
        {
          imgSrc: 'civlization.jpg',
          color: '',
          text: '文明系列',
          backgroundSize: '',
        },
        {
          imgSrc: 'skyrim.jpg',
          color: '#c0c0c0',
          text: '上古卷轴系列',
          backgroundSize: '',
        },
        {
          imgSrc: 'threeKingdom2.jpg',
          color: '',
          text: '全面战争系列',
          backgroundSize: '100%',
        },
        {
          imgSrc: 'callOfDuty.jpg',
          color: '',
          text: '使命召唤系列',
          backgroundSize: '',
        },
        {
          imgSrc: 'divinity.jpg',
          color: '',
          text: '神界原罪系列',
          backgroundSize: '',
        },
      ],
      recommendArray: [
        {
          title: 'The Scroll Of Taiwu',
          titleCN: '太吾绘卷',
          imgSrc: 'https://knight-sz.oss-cn-shenzhen.aliyuncs.com/photo/taiwu.jpg',
          price: '¥99',
        },
        {
          title: 'Fallout 4',
          titleCN: '辐射4',
          imgSrc: 'https://knight-sz.oss-cn-shenzhen.aliyuncs.com/photo/Fallout.jpg',
          price: '¥99',
        },
        {
          title: 'Counter-Strike: Global Offensive',
          titleCN: '反恐精英: 全球攻势',
          imgSrc: 'https://knight-sz.oss-cn-shenzhen.aliyuncs.com/photo/CSGO.jpg',
          price: '¥99',
        },
        {
          title: "Tom Clancy's Rainbow Six® Siege",
          titleCN: '彩虹六号：围攻',
          imgSrc: 'https://knight-sz.oss-cn-shenzhen.aliyuncs.com/photo/Rainbow.jpg',
          price: '¥99',
        },
        {
          title: 'Sekiro™: Shadows Die Twice',
          titleCN: '只狼: 影逝二度',
          imgSrc: 'https://knight-sz.oss-cn-shenzhen.aliyuncs.com/photo/Sekiro.jpg',
          price: '¥99',
        },
        {
          title: 'Sniper Elite 4',
          titleCN: '狙击精英4',
          imgSrc: 'https://knight-sz.oss-cn-shenzhen.aliyuncs.com/photo/Sniper.jpg',
          price: '¥99',
        },
        {
          title: 'Stellaris',
          titleCN: '群星',
          imgSrc: 'https://knight-sz.oss-cn-shenzhen.aliyuncs.com/photo/stellaris.jpg',
          price: '¥99',
        },
        {
          title: 'The Witcher® 3: Wild Hunt',
          titleCN: '巫师3: 狂猎',
          imgSrc: 'https://knight-sz.oss-cn-shenzhen.aliyuncs.com/photo/Witcher3.png',
          price: '¥99',
        },
      ],
      discountsArray: [
        {
          title: "Assassin's Creed® Odyssey",
          titleCN: '刺客信条奥德赛',
          imgSrc: 'https://knight-sz.oss-cn-shenzhen.aliyuncs.com/photo/assassin2.jpg',
          discounts: '-22%',
          price: '¥99',
        },
        {
          title: 'Total War: THREE KINGDOMS',
          titleCN: '全面战争: 三国',
          imgSrc: 'https://knight-sz.oss-cn-shenzhen.aliyuncs.com/photo/threeKingdom.jpg',
          discounts: '-22%',
          price: '¥99',
        },
        {
          title: 'Divinity: Original Sin 2',
          titleCN: '神界原罪2',
          imgSrc: 'https://knight-sz.oss-cn-shenzhen.aliyuncs.com/photo/divinity.jpg',
          discounts: '-22%',
          price: '¥99',
        },
        {
          title: 'Sid Meier’s Civilization® VI',
          titleCN: '文明6',
          imgSrc: 'https://knight-sz.oss-cn-shenzhen.aliyuncs.com/photo/civlization.jpg',
          discounts: '-22%',
          price: '¥99',
        },
      ],
      videoArray: [
        {
          title: '博人传65集, 火影系列最优作画',
          imgSrc:
            'https://knight-sz.oss-cn-shenzhen.aliyuncs.com/video/UltimateNinjaStorm4_Moment.jpg',
          tags: ['火影忍者究极风暴', '动作'],
        },
      ],
      progressBarWidth: 0,
      backgroundX: 0,
      backgroundY: 0,
      opacityNumber: 0,
      deadline: new Date(2020, 4, 16),
      currentIndex: 0,
      currentShow: HomeStyle.tabShowActive,
    };
  }

  componentWillMount() {

  }

  componentWillUnmount() {}

  onMouseHover(e) {
    this.setState({ opacityNumber: 1 });
  }

  onMouseMove(e) {
    // 蒙版宽度
    let totalWidth = this.coverRef.current.offsetWidth;
    // 鼠标坐标
    let x = e.nativeEvent.offsetX;
    // 进度条
    let percentage = Math.ceil((x / totalWidth) * 100);
    percentage += '%';
    // 预览图
    let eachPart = totalWidth / 9;
    let photoNumber = Math.ceil(x / eachPart);
    let remainder = photoNumber % 3;
    let backgroundX;
    let backgroundY;
    if (remainder == 0) {
      backgroundX = (remainder + 2) * 50;
    } else {
      backgroundX = (remainder - 1) * 50;
    }
    backgroundY = (Math.ceil(photoNumber / 3) - 1) * 50;
    backgroundX += '%';
    backgroundY += '%';
    this.setState({
      backgroundX: backgroundX,
      backgroundY: backgroundY,
      progressBarWidth: percentage,
    });
  }

  onMouseOut(e) {
    this.setState({ backgroundX: 0, backgroundY: 0, progressBarWidth: 0, opacityNumber: 0 });
  }

  onHandleTabClick(parm, e) {
    this.setState({ currentIndex: parm });
  }

  render() {
    const playerConfig = {
      id: 'cyberpunk2077',
      title: '《赛博朋克2077》2018年E3官方预告片',
      cover: 'https://knight-sz.oss-cn-shenzhen.aliyuncs.com/video/Cyberpunk2077.jpg',
      sources: {
        hd: {
          play_url: 'https://knight-sz.oss-cn-shenzhen.aliyuncs.com/video/Cyberpunk2077-1080.mp4',
          bitrate: 2000,
          size: 0,
          duration: 0,
          format: 'mp4',
          width: 0,
          height: 0,
        },
        sd: {
          play_url: 'https://knight-sz.oss-cn-shenzhen.aliyuncs.com/video/Cyberpunk2077-720.mp4',
          bitrate: 900,
          size: 0,
          duration: 0,
          format: 'mp4',
          width: 0,
          height: 0,
        },
      },
      src: 'https://knight-sz.oss-cn-shenzhen.aliyuncs.com/video/boruto-naruto_65_1080.mp4',
      initialObjectFit: 'fill',
      locale: 'zh-Hans',
      duration: 0,
    };

    return (
      <div className={HomeStyle.page}>
        <div className={HomeStyle.content}>
          <Carousel autoplay draggable lazyLoad="progressive" pauseOnFocus pauseOnHover>
            {this.state.CarouselArray.map((content, index) => {
              return (
                <img
                  src={`https://knight-sz.oss-cn-shenzhen.aliyuncs.com/photo/${content}`}
                  className={HomeStyle.carouselImg}
                  alt=""
                  key={index}
                />
              );
            })}
          </Carousel>
        </div>
        <div id="selectedSeries" className={HomeStyle.content}>
          <Card
            title="精选系列"
            extra={
              <a href="/" style={{ fontSize: '16px' }}>
                更多
              </a>
            }
            className={HomeStyle.selectCard}
          >
            {this.state.selectArray.map((content, index) => {
              return (
                <Card.Grid
                  className={HomeStyle.selectGrid}
                  style={{
                    background:
                      'url(' + require(`../assets/images/${content.imgSrc}`) + ') no-repeat',
                    color: `${content.color}`,
                    backgroundSize: `${content.backgroundSize}`,
                    fontWeight: 600,
                  }}
                  key={index}
                >
                  {content.text}
                </Card.Grid>
              );
            })}
          </Card>
        </div>
        <div id="yearlyRecommend" className={HomeStyle.content}>
          <Card
            title="年度推荐"
            extra={
              <a href="/" style={{ fontSize: '16px' }}>
                更多
              </a>
            }
            className={HomeStyle.selectCard}
          >
            <Row gutter={{ xs: 8, sm: 16, md: 24 }} align="middle">
              {this.state.recommendArray.map((content, index) => {
                return (
                  <Col xs={24} sm={24} md={12} lg={12} xl={8} xxl={6} key={index}>
                    <Card
                      className={HomeStyle.innerCart}
                      cover={<img src={content.imgSrc} alt="" />}
                    >
                      <Meta
                        title={content.title}
                        description={
                          <div>
                            <Row className={HomeStyle.cartHoverOne}>
                              <Col span={16}>
                                <p>{content.titleCN}</p>
                              </Col>
                              <Col span={8} className={HomeStyle.discounts}>
                                {content.price}
                              </Col>
                            </Row>
                            <Row
                              gutter={{ xs: 8, sm: 16, md: 24 }}
                              className={HomeStyle.cartHoverTwo}
                            >
                              <Col span={12} className={HomeStyle.cartButtonOne}>
                                <Button block>查看详情</Button>
                              </Col>
                              <Col span={12} className={HomeStyle.cartButtonTwo}>
                                <Button type="primary" block>
                                  加入购物车
                                </Button>
                              </Col>
                            </Row>
                          </div>
                        }
                      />
                    </Card>
                  </Col>
                );
              })}
            </Row>
          </Card>
        </div>
        <div id="specialOffer" className={HomeStyle.content}>
          <Card
            title="特别优惠"
            extra={
              <a href="/" style={{ fontSize: '16px' }}>
                更多
              </a>
            }
            className={HomeStyle.selectCard}
          >
            <Row gutter={{ xs: 8, sm: 16, md: 24 }} align="middle">
              {this.state.discountsArray.map((content, index) => {
                return (
                  <Col xs={24} sm={24} md={12} lg={12} xl={8} xxl={6} key={index}>
                    <Card
                      className={HomeStyle.innerCart}
                      cover={<img alt="" src={content.imgSrc} />}
                    >
                      <Meta
                        title={content.title}
                        description={
                          <div>
                            <Row className={HomeStyle.cartHoverOne}>
                              <Col span={12}>
                                <p>{content.titleCN}</p>
                              </Col>
                              <Col span={12} className={HomeStyle.discounts}>
                                <Tag color="#001529">{content.discounts}</Tag>
                                {content.price}
                              </Col>
                            </Row>
                            <Row
                              gutter={{ xs: 8, sm: 16, md: 24 }}
                              className={HomeStyle.cartHoverTwo}
                            >
                              <Col span={12} className={HomeStyle.cartButtonOne}>
                                <Button block>查看详情</Button>
                              </Col>
                              <Col span={12} className={HomeStyle.cartButtonTwo}>
                                <Button type="primary" block>
                                  加入购物车
                                </Button>
                              </Col>
                            </Row>
                          </div>
                        }
                      />
                    </Card>
                  </Col>
                );
              })}
            </Row>
          </Card>
        </div>
        <div id="relatedVideo" className={HomeStyle.content}>
          <Card
            title="相关视频"
            extra={
              <a href="/" style={{ fontSize: '16px' }}>
                更多
              </a>
            }
            className={HomeStyle.selectCard}
          >
            <Row gutter={{ xs: 8, sm: 16, md: 24 }} align="middle">
              {this.state.videoArray.map((content, index) => {
                return (
                  <Col xs={24} sm={24} md={12} lg={12} xl={8} xxl={6} key={index}>
                    <Card
                      className={HomeStyle.videoInnerCart}
                      cover={
                        <div ref={this.coverRef} className={HomeStyle.videoWrap}>
                          <img src={content.imgSrc} className={HomeStyle.videoImg} alt="" />
                          <div
                            className={HomeStyle.coverPreviewModule}
                            onMouseMove={this.onMouseMove.bind(this)}
                            onMouseOut={this.onMouseOut.bind(this)}
                            onMouseOver={this.onMouseHover.bind(this)}
                            style={{
                              opacity: `${this.state.opacityNumber}`,
                            }}
                          >
                            <div
                              className={HomeStyle.cover}
                              style={{
                                background:
                                  'url(' +
                                  require(`../assets/images/boruto-naruto_65_container.jpg`) +
                                  ') no-repeat',
                                backgroundPosition: `${this.state.backgroundX} ${this.state.backgroundY}`,
                                backgroundSize: '300% auto',
                              }}
                            />
                            <div
                              className={HomeStyle.progressBar}
                              style={{
                                width: this.state.progressBarWidth,
                              }}
                            >
                              <span style={{ width: this.state.width }} />
                            </div>
                            <span
                              className={HomeStyle.dur}
                              style={{
                                opacity: `${this.state.opacityNumber}`,
                              }}
                            >
                              02:19
                            </span>
                          </div>
                        </div>
                      }
                    >
                      <Meta
                        title={content.title}
                        description={
                          <Row>
                            {content.tags.map((tagContent, tagIndex) => {
                              return <Tag key={tagIndex}>{tagContent}</Tag>;
                            })}
                          </Row>
                        }
                      />
                    </Card>
                  </Col>
                );
              })}
            </Row>
          </Card>
        </div>
        <div id="issuedNotice" className={HomeStyle.content}>
          <Card
            title="发行预告"
            extra={
              <a href="/" style={{ fontSize: '16px' }}>
                更多
              </a>
            }
            className={HomeStyle.selectCard}
          >
            <Row gutter={{ xs: 8, sm: 16, md: 24 }}>
              <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                <Row>
                  <Card.Grid style={{ width: '100%' }}>
                    <div onClick={this.onHandleTabClick.bind(this, 0)}>
                      <Col xs={24} sm={24} md={12} lg={12} xl={8} xxl={6}>
                        <Typography>
                          <Title level={4} ellipsis>
                            Cyberpunk 2077
                          </Title>
                          <Text ellipsis strong>
                            赛博朋克2077
                          </Text>
                          <br />
                          <Text ellipsis>发售日期: 2020年4月16日</Text>
                        </Typography>
                      </Col>
                      <Col
                        xs={24}
                        sm={24}
                        md={12}
                        lg={12}
                        xl={16}
                        xxl={18}
                        style={{ textAlign: 'center' }}
                      >
                        <div style={{ textAlign: 'center' }}>
                          <Countdown
                            value={this.state.deadline}
                            format="D 天 H 时 m 分"
                            valueStyle={{ fontSize: '16px', lineHeight: '80px' }}
                          />
                        </div>
                      </Col>
                    </div>
                  </Card.Grid>
                </Row>
                <Row>
                  <Card.Grid style={{ width: '100%' }}>
                    <div onClick={this.onHandleTabClick.bind(this, 1)}>
                      <Typography>
                        <Title level={4} ellipsis>
                          Mount & Blade II: Bannerlord
                        </Title>
                        <Text ellipsis strong>
                          骑马与砍杀2
                        </Text>
                        <br />
                        <Text ellipsis>发售日期: 祝你长寿</Text>
                      </Typography>
                    </div>
                  </Card.Grid>
                </Row>
                <Row>
                  <Card.Grid style={{ width: '100%' }}>
                    <div
                      style={{ width: '100%', height: '100%' }}
                      onClick={this.onHandleTabClick.bind(this, 3)}
                    >
                      没有数据
                    </div>
                  </Card.Grid>
                </Row>
                <Row>
                  <Card.Grid style={{ width: '100%' }}>
                    <div
                      style={{ width: '100%', height: '100%' }}
                      onClick={this.onHandleTabClick.bind(this, 4)}
                    >
                      没有数据
                    </div>
                  </Card.Grid>
                </Row>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                <div
                  className={
                    this.state.currentIndex === 0 ? this.state.currentShow : HomeStyle.tabShow
                  }
                >
                  <Player
                    id="cyberpunk2077"
                    title="《赛博朋克2077》2018年E3官方预告片"
                    cover="https://knight-sz.oss-cn-shenzhen.aliyuncs.com/video/Cyberpunk2077.jpg"
                    sources={{
                      hd: {
                        play_url:
                          'https://knight-sz.oss-cn-shenzhen.aliyuncs.com/video/Cyberpunk2077-1080.mp4',
                      },
                      sd: {
                        play_url:
                          'https://knight-sz.oss-cn-shenzhen.aliyuncs.com/video/Cyberpunk2077-720.mp4',
                      },
                    }}
                    locale="zh-Hans"
                  />
                  <div style={{ padding: '10px' }}>
                    <Paragraph ellipsis={{ rows: 3, expandable: true }}>
                      《赛博朋克
                      2077》是一款开放世界动作冒险游戏，故事发生在夜之城。这是一座五光十色的大都会，权力更迭和身体改造是不变的主题。您扮演一名野心勃勃的雇佣兵：V，正在追寻一种独一无二的植入体。只要得到它，就能掌握获得永生的关键。您可以自定义角色的义体、技能和玩法，探索包罗万象的城市。您做出的选择也将会对剧情和周遭的世界产生影响。
                    </Paragraph>
                  </div>
                </div>
                <div
                  className={
                    this.state.currentIndex === 1 ? this.state.currentShow : HomeStyle.tabShow
                  }
                >
                  <Player
                    id="MountBlade2"
                    title="骑马与砍杀2官方预告片"
                    cover="https://knight-sz.oss-cn-shenzhen.aliyuncs.com/video/MountBlade2.jpg"
                    sources={{
                      hd: {
                        play_url:
                          'https://knight-sz.oss-cn-shenzhen.aliyuncs.com/video/MountBlade2_1080.mp4',
                      },
                      sd: {
                        play_url:
                          'https://knight-sz.oss-cn-shenzhen.aliyuncs.com/video/MountBlade2_720.mp4',
                      },
                    }}
                    locale="zh-Hans"
                  />
                  <div style={{ padding: '10px' }}>
                    <Paragraph ellipsis={{ rows: 3, expandable: true }}>
                      The horns sound, the ravens gather. An empire is torn by civil war. Beyond its
                      borders, new kingdoms rise. Gird on your sword, don your armour, summon your
                      followers and ride forth to win glory on the battlefields of Calradia.
                      Establish your hegemony and create a new world out of the ashes of the old.
                      Mount & Blade II: Bannerlord is the eagerly awaited sequel to the acclaimed
                      medieval combat simulator and role-playing game Mount & Blade: Warband. Set
                      200 years before, it expands both the detailed fighting system and the world
                      of Calradia. Bombard mountain fastnesses with siege engines, establish secret
                      criminal empires in the back alleys of cities, or charge into the thick of
                      chaotic battles in your quest for power.
                    </Paragraph>
                  </div>
                </div>
                <div
                  className={
                    this.state.currentIndex === 3 ? this.state.currentShow : HomeStyle.tabShow
                  }
                >
                  没有数据
                </div>
                <div
                  className={
                    this.state.currentIndex === 4 ? this.state.currentShow : HomeStyle.tabShow
                  }
                >
                  没有数据
                </div>
              </Col>
            </Row>
          </Card>
        </div>
      </div>
    );
  }
}
