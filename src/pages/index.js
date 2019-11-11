import React, { Component, Fragment } from 'react';
import { Carousel, Card, Row, Col } from 'antd';
import { Link } from 'umi';
import HomeStyle from './index.scss';
import VideoPreviewCard from '@/components/VideoPreviewCard';
import GoodCard from '@/components/GoodCard';
import VerticalTabCard from '@/components/VerticalTabCard';

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      CarouselArray: [
        {
          id: 1,
          src: 'assassin.jpeg',
          alt: '刺客信条',
        },
        {
          id: 2,
          src: 'skyrim.jpg',
          alt: '上古卷轴5',
        },
        {
          id: 3,
          src: 'civlization.jpg',
          alt: '文明6',
        },
      ],
      recommendArray: [
        {
          id: 1,
          title: 'The Scroll Of Taiwu',
          titleCN: '太吾绘卷',
          imgSrc: 'https://knight-sz.oss-cn-shenzhen.aliyuncs.com/photo/taiwu.jpg',
          imgAlt: '太吾绘卷',
          price: '¥99',
        },
        {
          id: 2,
          title: 'Fallout 4',
          titleCN: '辐射4',
          imgSrc: 'https://knight-sz.oss-cn-shenzhen.aliyuncs.com/photo/Fallout.jpg',
          imgAlt: '辐射4',
          price: '¥99',
        },
        {
          id: 3,
          title: 'Counter-Strike: Global Offensive',
          titleCN: '反恐精英: 全球攻势',
          imgSrc: 'https://knight-sz.oss-cn-shenzhen.aliyuncs.com/photo/CSGO.jpg',
          imgAlt: '反恐精英: 全球攻势',
          price: '¥99',
        },
        {
          id: 4,
          title: "Tom Clancy's Rainbow Six® Siege",
          titleCN: '彩虹六号：围攻',
          imgSrc: 'https://knight-sz.oss-cn-shenzhen.aliyuncs.com/photo/Rainbow.jpg',
          imgAlt: '彩虹六号：围攻',
          price: '¥99',
        },
        {
          id: 5,
          title: 'Sekiro™: Shadows Die Twice',
          titleCN: '只狼: 影逝二度',
          imgSrc: 'https://knight-sz.oss-cn-shenzhen.aliyuncs.com/photo/Sekiro.jpg',
          imgAlt: '只狼: 影逝二度',
          price: '¥99',
        },
        {
          id: 6,
          title: 'Sniper Elite 4',
          titleCN: '狙击精英4',
          imgSrc: 'https://knight-sz.oss-cn-shenzhen.aliyuncs.com/photo/Sniper.jpg',
          imgAlt: '狙击精英4',
          price: '¥99',
        },
        {
          id: 7,
          title: 'Stellaris',
          titleCN: '群星',
          imgSrc: 'https://knight-sz.oss-cn-shenzhen.aliyuncs.com/photo/stellaris.jpg',
          imgAlt: '群星',
          price: '¥99',
        },
        {
          id: 8,
          title: 'The Witcher® 3: Wild Hunt',
          titleCN: '巫师3: 狂猎',
          imgSrc: 'https://knight-sz.oss-cn-shenzhen.aliyuncs.com/photo/Witcher3.png',
          imgAlt: '巫师3: 狂猎',
          price: '¥99',
        },
      ],
      discountsArray: [
        {
          id: 1,
          title: "Assassin's Creed® Odyssey",
          titleCN: '刺客信条奥德赛',
          imgSrc: 'https://knight-sz.oss-cn-shenzhen.aliyuncs.com/photo/assassin2.jpg',
          imgAlt: '刺客信条奥德赛',
          discounts: '-22%',
          price: '¥99',
        },
        {
          id: 2,
          title: 'Total War: THREE KINGDOMS',
          titleCN: '全面战争: 三国',
          imgSrc: 'https://knight-sz.oss-cn-shenzhen.aliyuncs.com/photo/threeKingdom.jpg',
          imgAlt: '全面战争: 三国',
          discounts: '-22%',
          price: '¥99',
        },
        {
          id: 3,
          title: 'Divinity: Original Sin 2',
          titleCN: '神界原罪2',
          imgSrc: 'https://knight-sz.oss-cn-shenzhen.aliyuncs.com/photo/divinity.jpg',
          imgAlt: '神界原罪2',
          discounts: '-22%',
          price: '¥99',
        },
        {
          id: 4,
          title: 'Sid Meier’s Civilization® VI',
          titleCN: '文明6',
          imgSrc: 'https://knight-sz.oss-cn-shenzhen.aliyuncs.com/photo/civlization.jpg',
          imgAlt: '文明6',
          discounts: '-22%',
          price: '¥99',
        },
      ],
      videoArray: [
        {
          id: 1,
          title: '博人传65集, 火影系列最优作画',
          imgSrc:
            'https://knight-sz.oss-cn-shenzhen.aliyuncs.com/video/UltimateNinjaStorm4_Moment.jpg',
          videoSrc:
            'https://knight-sz.oss-cn-shenzhen.aliyuncs.com/video/boruto-naruto_65_1080.mp4',
          tags: ['火影忍者究极风暴', '动作'],
          duration: '02:19',
          spritesImg:
            'https://knight-sz.oss-cn-shenzhen.aliyuncs.com/video/boruto-naruto_65_container.jpg',
        },
      ],
      issuedNoticeArray: [
        {
          id: 1,
          left: {
            title: 'Cyberpunk 2077',
            titleCN: '赛博朋克2077',
            issueTime: '2020年4月16日',
            countdown: new Date(2020, 4, 16),
          },
          right: {
            imgSrc: 'https://knight-sz.oss-cn-shenzhen.aliyuncs.com/video/Cyberpunk2077.jpg',
            imgAlt: '赛博朋克2077',
            desc:
              '《赛博朋克2077》是一款开放世界动作冒险游戏，故事发生在夜之城。这是一座五光十色的大都会，权力更迭和身体改造是不变的主题。您扮演一名野心勃勃的雇佣兵：V，正在追寻一种独一无二的植入体。只要得到它，就能掌握获得永生的关键。您可以自定义角色的义体、技能和玩法，探索包罗万象的城市。您做出的选择也将会对剧情和周遭的世界产生影响。',
          },
        },
        {
          id: 2,
          left: {
            title: 'Mount & Blade II: Bannerlord',
            titleCN: '赛博朋克2077',
            issueTime: '祝你长寿',
            countdown: '',
          },
          right: {
            imgSrc: 'https://knight-sz.oss-cn-shenzhen.aliyuncs.com/video/MountBlade2.jpg',
            imgAlt: '骑马与砍杀2',
            desc:
              'The horns sound, the ravens gather. An empire is torn by civil war. Beyond its\n' +
              '                    borders, new kingdoms rise. Gird on your sword, don your armour, summon your\n' +
              '                    followers and ride forth to win glory on the battlefields of Calradia.\n' +
              '                    Establish your hegemony and create a new world out of the ashes of the old.\n' +
              '                    Mount & Blade II: Bannerlord is the eagerly awaited sequel to the acclaimed\n' +
              '                    medieval combat simulator and role-playing game Mount & Blade: Warband. Set\n' +
              '                    200 years before, it expands both the detailed fighting system and the world\n' +
              '                    of Calradia. Bombard mountain fastnesses with siege engines, establish secret\n' +
              '                    criminal empires in the back alleys of cities, or charge into the thick of\n' +
              '                    chaotic battles in your quest for power.',
          },
        },
      ],
    };
  }

  componentWillMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <div className={HomeStyle.page}>
        <div className={HomeStyle.carouselContent}>
          <Carousel autoplay draggable lazyLoad="progressive" pauseOnFocus pauseOnHover>
            {this.state.CarouselArray.map((content, index) => {
              return (
                <Fragment key={content.src}>
                  <Link to="/detail/good">
                    <img
                      src={`https://knight-sz.oss-cn-shenzhen.aliyuncs.com/photo/${content.src}`}
                      className={HomeStyle.carouselImg}
                      alt={content.alt}
                    />
                  </Link>
                </Fragment>
              );
            })}
          </Carousel>
        </div>
        <div id="yearlyRecommend" className={HomeStyle.content}>
          <GoodCard title="年度推荐" data={this.state.recommendArray} />
        </div>
        <div id="specialOffer" className={HomeStyle.content}>
          <GoodCard title="特别优惠" data={this.state.discountsArray} />
        </div>
        <div id="relatedVideo" className={HomeStyle.content}>
          <Card
            title="相关视频"
            headStyle={{
              background: 'linear-gradient(to top,#d8d8d8,#e8e8e8, #f5f5f5)',
              fontSize: '24px',
            }}
            bodyStyle={{ background: '#f0f2f5', padding: '0 0 20px 0' }}
            bordered={false}
            style={{ borderRadius: '8px 8px 0 0' }}
          >
            <Row gutter={4}>
              {this.state.videoArray.map((content, index) => {
                return (
                  <Fragment key={content.id}>
                    <Col xs={24} sm={24} md={12} lg={12} xl={8} xxl={6} >
                      <VideoPreviewCard data={content} />
                    </Col>
                  </Fragment>
                );
              })}
            </Row>
          </Card>
        </div>
        <div id="issuedNotice" className={HomeStyle.content}>
          <VerticalTabCard title="发行预告" data={this.state.issuedNoticeArray} />
        </div>
      </div>
    );
  }
}
