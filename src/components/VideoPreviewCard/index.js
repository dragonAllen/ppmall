import React, { Fragment } from 'react';
import { Card, Row, Tag } from 'antd';
import VideoPreviewCardStyle from './index.scss';
import VideoPopModal from '@/components/VideoPopModal';

export default class VideoPreviewCard extends React.Component {
  coverRef = React.createRef();

  state = {
    progressBarWidth: 0,
    backgroundX: 0,
    backgroundY: 0,
    opacityNumber: 0,
    videoPlay: false
  }

  onMouseHover(e) {
    this.setState({ opacityNumber: 1 });
  }

  // TODO 计算优化
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
    if (remainder === 0) {
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

  onMouseClick() {
    this.setState({
      videoPlay: !this.state.videoPlay,
    });
  }

  onMouseOut(e) {
    this.setState({ backgroundX: 0, backgroundY: 0, progressBarWidth: 0, opacityNumber: 0 });
  }

  render() {
    const { data } = this.props;
    return (
      <Fragment>
        <VideoPopModal
          visible={this.state.videoPlay}
          onCancel={this.onMouseClick.bind(this)}
          src={data.videoSrc}
        />
        <Card
          className={VideoPreviewCardStyle.videoInnerCart}
          cover={
            <div
              ref={this.coverRef}
              className={VideoPreviewCardStyle.videoWrap}
              onClick={this.onMouseClick.bind(this)}
            >
              <img src={data.imgSrc} className={VideoPreviewCardStyle.videoImg} alt="" />
              <div
                className={VideoPreviewCardStyle.coverPreviewModule}
                onMouseMove={this.onMouseMove.bind(this)}
                onMouseOut={this.onMouseOut.bind(this)}
                onMouseOver={this.onMouseHover.bind(this)}
                style={{
                  opacity: `${this.state.opacityNumber}`,
                }}
              >
                <div
                  className={VideoPreviewCardStyle.cover}
                  style={{
                    background: `url("${data.spritesImg}") no-repeat`,
                    backgroundPosition: `${this.state.backgroundX} ${this.state.backgroundY}`,
                    backgroundSize: '300% auto',
                  }}
                />
                <div
                  className={VideoPreviewCardStyle.progressBar}
                  style={{
                    width: this.state.progressBarWidth,
                  }}
                >
                  <span style={{ width: this.state.width }} />
                </div>
                <span
                  className={VideoPreviewCardStyle.dur}
                  style={{
                    opacity: `${this.state.opacityNumber}`,
                  }}
                >
                {data.duration}
              </span>
              </div>
            </div>
          }
        >
          <Card.Meta
            title={data.title}
            description={
              <Row>
                {data.tags.map((tag, index) => {
                  return <Tag key={index}>{tag}</Tag>;
                })}
              </Row>
            }
          />
        </Card>
      </Fragment>
    );
  }
}
