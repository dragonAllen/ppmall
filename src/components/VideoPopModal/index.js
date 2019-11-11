import React from 'react';
import { Modal } from 'antd';
import VideoPopModalStyle from './index.scss';
import VideoPlayer from '@/components/VideoPlayer';

export default class VideoPopModal extends React.Component {
  onMouseClickColse() {
    if (this.props.onCancel) {
      this.props.onCancel();
    }
  }

  render() {
    const { visible, src } = this.props;
    return (
      <div className={VideoPopModalStyle.content}>
        <Modal
          visible={visible}
          centered
          destroyOnClose
          maskClosable={false}
          footer={null}
          width="80vw"
          onCancel={this.onMouseClickColse.bind(this)}
        >
          <VideoPlayer src={src} autoPlay />
        </Modal>
      </div>
    );
  }
}
