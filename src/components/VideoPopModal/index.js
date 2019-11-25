import React from 'react';
import { Modal } from 'antd';
import VideoPopModalStyle from './index.scss';
import VideoPlayer from '@/components/VideoPlayer';

export default class VideoPopModal extends React.Component {
  onMouseClickClose() {
    if (this.props.onCancel) {
      this.props.onCancel();
    }
  }

  render() {
    const { visible, src } = this.props;
    return (
        <Modal
          wrapClassName={VideoPopModalStyle.content}
          visible={visible}
          centered
          destroyOnClose
          maskClosable={false}
          footer={null}
          width="80vw"
          onCancel={this.onMouseClickClose.bind(this)}
        >
          <VideoPlayer src={src} autoPlay />
        </Modal>
    );
  }
}
