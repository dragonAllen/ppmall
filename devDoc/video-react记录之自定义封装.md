### 主要参照

[video-react](https://github.com/video-react/video-react)

[steam详情页](https://store.steampowered.com/app/779340/Total_War_THREE_KINGDOMS/?curator_clanid=32991376)

### 封装目标

react下挑选了几个高星的开源播放器, 想要完全自定义还是得上video.js, 文档和更新频率跟其他项目不是一个量级, 然而工作量略大, 所以暂时先用video-react做;

网站的好些功能是按照steam做的(简易版本~), 因为steam提供WEB API, 还是响应式网站, 以及有各种高清素材可以下载; 那么点播形式的播放自然是参考steam详情页的图文视频走马灯了

### 实现方式

video-react 的文档和示例还是比较完整的,常见的自定义视频播放控制条用组件化的形式来实现, 可自定义插件, 但是有一些细节终究还是要自己踩坑

主要实现功能: 

1. observer: 视频脱离视线自动暂停
2. onContextMenu: 禁止右键菜单
3. onEnded: 视频播放完毕触发事件
4. player插件: 参见官网文档

```react
import React from 'react';
import PropTypes from 'prop-types';
import {
  Player,
  Shortcut,
  BigPlayButton,
  LoadingSpinner,
  ControlBar,
  VolumeMenuButton,
  PlaybackRateMenuButton
} from 'video-react';

/**
 * https://video-react.js.org/
 *
 * */
export default class VideoPlayer extends React.Component {
  playerRef = React.createRef();
  playerWrap = React.createRef();

  static propTypes = {
    src: PropTypes.string,
    fluid: PropTypes.bool,
    muted: PropTypes.bool,
    autoPlay: PropTypes.bool,
    playsInline: PropTypes.bool,
    width: PropTypes.number,
    height: PropTypes.number,
    poster: PropTypes.string,
    preload: PropTypes.oneOf(['auto', 'metadata', 'none']),
    aspectRatio: PropTypes.string,
    startTime: PropTypes.number,
  };

  static defaultProps = {
    src: undefined,
    fluid: true,
    muted: false,
    autoPlay: false,
    playsInline: false,
    poster: '',
    preload: 'auto',
    aspectRatio: '16:9',
    startTime: undefined,
  };

  componentDidMount() {
    this.observer.observe(this.playerWrap.current)
  }

  componentWillUnmount() {
    this.observer.disconnect()
  }

  handleEnd(e) {
    if (this.props.onEnded) {
      this.props.onEnded(e);
    }
  }

  observer = new IntersectionObserver(
    entries => {
      const {intersectionRatio} = entries[0]
      if (intersectionRatio <= 0) {
        this.playerRef.current.pause()
      }
    },
    {threshold: [0, 1]}
  )

  render() {
    const { src, ...setting } = this.props;
    return (
      <div onContextMenu={(e)=> e.preventDefault()} ref={this.playerWrap}>   
        <Player {...setting} ref={this.playerRef} onEnded={this.handleEnd.bind(this)}>
          <source src={src} />
          <Shortcut />
          <BigPlayButton position="center" />
          <LoadingSpinner />
          <ControlBar>
            <VolumeMenuButton vertical />
            <PlaybackRateMenuButton rates={[0.5, 1, 1.5, 2]} order={7}/>
          </ControlBar>
        </Player>
      </div>
    );
  }
}
```

### 源码简介

1. video-react-master 下 的`docs/` 为示例, `src/`为主文件, `styles/`为样式
2. `src/` 下的 `index.js` 为主入口, 引入了所有组件并输出, `actions/`封装了原生video的方法, `components/`是组件, `reducers/`内含redux相关文件, `uitls/`内含一些操作方法的封装
3. `components/`下的`Player.js`显然就是使用必选的主组件, 进入可见 return 了一个 div 包含 {children}, children 源于一个 getChildren 的方法, getChildren 方法内默认给出的是 <Video>以及一些插件组件

```react
const children = this.getChildren(props);
return (
      <div
        className={classNames(
          {
            'video-react-controls-enabled': true,
            'video-react-has-started': hasStarted,
            'video-react-paused': paused,
            'video-react-playing': !paused,
            'video-react-waiting': waiting,
            'video-react-seeking': seeking,
            'video-react-fluid': fluid,
            'video-react-fullscreen': isFullscreen,
            'video-react-user-inactive': !userActivity,
            'video-react-user-active': userActivity,
            'video-react-workinghover': !browser.IS_IOS
          },
          'video-react',
          this.props.className
        )}
        style={this.getStyle()}
        ref={c => {
          this.manager.rootElement = c;
        }}
        role="region"
        onTouchStart={this.handleMouseDown}
        onMouseDown={this.handleMouseDown}
        onTouchMove={this.handleMouseMove}
        onMouseMove={this.handleMouseMove}
        onKeyDown={this.handleKeyDown}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        tabIndex="-1"
      >
        {children}
      </div>
    );
```

```react
  getChildren(props) {
    const {
      className: _, // remove className
      children: originalChildren,
      ...propsWithoutChildren
    } = props;
    const children = React.Children.toArray(this.props.children).filter(
      e => !isVideoChild(e)
    );
    const defaultChildren = this.getDefaultChildren(originalChildren);
    return mergeAndSortChildren(
      defaultChildren,
      children,
      propsWithoutChildren
    );
  }
  getDefaultChildren(originalChildren) {
    return [
      <Video
        ref={c => {
          this.video = c;
          this.manager.video = this.video;
        }}
        key="video"
        order={0.0}
      >
        {originalChildren}
      </Video>,
      <PosterImage key="poster-image" order={1.0} />,
      <LoadingSpinner key="loading-spinner" order={2.0} />,
      <Bezel key="bezel" order={3.0} />,
      <BigPlayButton key="big-play-button" order={4.0} />,
      <ControlBar key="control-bar" order={5.0} />,
      <Shortcut key="shortcut" order={99.0} />
    ];
  }
```

4. 进入`components/`下的`Video.js`, 可见实际封装的就是原生的 video, 也提供了原生的方法, 这些外部调用IDE是没有提示的, 坑了不少时间

```react
    return (
      <video
        className={classNames('video-react-video', this.props.className)}
        id={videoId}
        crossOrigin={crossOrigin}
        ref={(c) => {
          this.video = c;
        }}
        muted={muted}
        preload={preload}
        loop={loop}
        playsInline={playsInline}
        autoPlay={autoPlay}
        poster={poster}
        src={src}
        onLoadStart={this.handleLoadStart}
        onWaiting={this.handleWaiting}
        onCanPlay={this.handleCanPlay}
        onCanPlayThrough={this.handleCanPlayThrough}
        onPlaying={this.handlePlaying}
        onEnded={this.handleEnded}
        onSeeking={this.handleSeeking}
        onSeeked={this.handleSeeked}
        onPlay={this.handlePlay}
        onPause={this.handlePause}
        onProgress={this.handleProgress}
        onDurationChange={this.handleDurationChange}
        onError={this.handleError}
        onSuspend={this.handleSuspend}
        onAbort={this.handleAbort}
        onEmptied={this.handleEmptied}
        onStalled={this.handleStalled}
        onLoadedMetadata={this.handleLoadedMetaData}
        onLoadedData={this.handleLoadedData}
        onTimeUpdate={this.handleTimeUpdate}
        onRateChange={this.handleRateChange}
        onVolumeChange={this.handleVolumeChange}
        tabIndex="-1"
      >
        {this.renderChildren()}
      </video>
    );
```

