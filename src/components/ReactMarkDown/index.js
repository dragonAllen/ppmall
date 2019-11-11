import React from 'react';
import ReactMarkdown from 'react-markdown';
import ReactMarkDownStyle from './index.scss';

/**
 * https://video-react.js.org/
 *
 * */
export default class ReactMarkDown extends React.Component {
  render() {
    const { src } = this.props;
    return (
      <div className={ReactMarkDownStyle.markDownContainer}>
        <ReactMarkdown source={src} escapeHtml={false} className={ReactMarkDownStyle.markDown} />
      </div>
    );
  }
}
