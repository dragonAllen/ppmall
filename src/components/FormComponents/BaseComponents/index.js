import { PureComponent } from 'react';
import PopupForm from '../PopupForm';

/**
 * 基础页面组件，所有业务组件的基类
 */
export default class BaseComponent extends PureComponent {
  state = {};

  componentWillUnmount() {
    // 切换页面的时候销毁所有PopupForm.open创建的弹框
    PopupForm.destroyAll();
  }

  /**
   * 获取动态路由的参数
   *
   * @returns {{}}
   */
  getRouteParams = () => {
    const { match: { params } = {} } = this.props || {};
    return params || {};
  };

  /**
   * 获取当前路径的相对名称
   *
   * @returns {any}
   */
  getPathName = () => {
    const { location: { pathname } = {} } = this.props || {};
    return pathname ? pathname.split('/').slice(-1)[0] : null;
  };

  /**
   * 显示弹框
   *
   * @param type
   * @param ifShow
   * @param formValues
   */
  showPopup = (type, ifShow = true, formValues = {}) => {
    this.setState(state => ({
      // forms用于统一管理当前组件下托管的所有表单组件
      // eslint-disable-next-line react/no-unused-state
      forms: { ...(state ? state.forms : null), [type]: { visible: ifShow, formValues } },
    }));
  };
}
