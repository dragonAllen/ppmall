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
            <PlaybackRateMenuButton rates={[0.5, 1, 1.5, 2, 2.5, 3]} order={7}/>
          </ControlBar>
        </Player>
      </div>
    );
  }
}
