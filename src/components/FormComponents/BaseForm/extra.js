import React from 'react';
import { Form, Input, Radio, Select } from 'antd';
import { isArray, isFunction, isPlainObject, isUndefined } from 'lodash';

/**
 * 对象转为entry数组
 *
 * @param object   原对象
 * @param callback 转换方式
 * @returns {any}
 */
function entries(object, callback = item => item) {
  return isPlainObject(object)
    ? Object.entries(object).map(([key, value]) => callback({ key, value }))
    : null;
}

/**
 * 补充表单字段配置
 *
 * @param items      字段定义：[{label: '名称', name: 'name', required: true}]
 * @param formValues 字段默认值: {name: 'default'}
 * @returns {*}
 */
export function fillFormItems(items, formValues = {}) {
  return items.map(item => {
    const {
      label,
      name,
      required,
      len,
      max,
      min,
      basecheck,
      ispassword,
      // eslint-disable-next-line
      placehold,
      initialValue = formValues[name],
      valuePropName = 'value',
    } = item;
    let ruleArray = [];
    if (required) {
      ruleArray.push({ required: true, message: `${label}不能为空` });
    }
    if (basecheck === 1) {
      ruleArray.push({
        pattern: /^[\u4e00-\u9fa50-9A-Za-z]+$/,
        message: '只允许输入中英文和数字',
      });
    }
    if (ispassword === 1) {
      ruleArray.push({
        validator: (rule, value, callback) => {
          const pattern = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{6,15}$/;
          if (!pattern.test(value)) {
            callback('密码必须为6-15位的字母和数字组合');
          }
          callback();
        },
      });
    }
    if (!isUndefined(len)) {
      ruleArray.push({ len: len, message: `请输入${len}位的${label}` });
    }
    if (!isUndefined(max)) {
      ruleArray.push({ max: max, message: `${label}最大字数为${max}` });
    }
    if (!isUndefined(min)) {
      ruleArray.push({ min: min, message: `${label}最小字数为${min}` });
    }
    return {
      options: {
        rules: ruleArray,
        initialValue,
        valuePropName,
      },
      ...item,
    };
  });
}

/**
 * 绘制FormItem
 *
 * @param item
 * @param getFieldDecorator
 * @param formLayout
 * @returns {*}
 */
export function renderFormItem(item, getFieldDecorator, formLayout) {
  const {
    label,
    name,
    options,
    layout,
    // eslint-disable-next-line
    password = formLayout,
    itemRender,
    itemRender2,
    ispassword,
    placehold,
    ...props
  } = item;
  let child;
  if (isFunction(itemRender)) {
    child = itemRender(getFieldDecorator);
  } else {
    child = getFieldDecorator(name, options)(
      itemRender || (
        <Input
          size="large"
          placeholder={placehold}
          {...props}
          type={ispassword === 1 ? 'password' : 'text'}
        />
      ),
    );
  }
  return (
    <Form.Item key={name} label={label} {...layout}>
      {child}
    </Form.Item>
  );
}

/**
 * 绘制组合表单项
 *
 * @param iterable 格式：[{ key: 'key', value: 'value' }] 或者 {key1: value1, key2: value2}
 * @param Parent   父组件类型
 * @param Item     子组件类型
 * @param props    传递给父组件的属性
 * @returns {*}
 */
export function renderGroupComponent(iterable, Parent, Item, props) {
  if (iterable) {
    const forEach = ({ key, value }) => (
      <Item key={key} value={key}>
        {value}
      </Item>
    );
    const child = isArray(iterable) ? iterable.map(forEach) : entries(iterable, forEach);
    return <Parent {...props}>{child}</Parent>;
  }
  return null;
}

/**
 * 绘制单选按钮
 *
 * @param iterable 格式：[{ key: 'key', value: 'value' }] 或者 {key1: value1, key2: value2}
 * @param Item     子组件类型
 * @param props    传递给父组件的属性
 * @returns {*}
 */
export function renderRadioGroup(iterable, Item = Radio, props) {
  return renderGroupComponent(iterable, Radio.Group, Item, props);
}

/**
 * 绘制下拉选择框
 *
 * @param iterable 格式：[{ key: 'key', value: 'value' }] 或者 {key1: value1, key2: value2}
 * @param props    传递给父组件的属性
 * @returns {*}
 */
export function renderSelect(iterable, props) {
  const newProps = {
    placeholder: '请选择',
    style: { width: '100%' },
    ...props,
  };
  return renderGroupComponent(iterable, Select, Select.Option, newProps);
}

/**
 * 提交表单
 *
 * @param form       Form.create创建的表单对象
 * @param formValues 表单初始值
 * @param callback   表单校验成功后回调
 */
export function submitForm(form, formValues, callback) {
  if (form) {
    form.validateFields((err, fieldsValue) => {
      if (!err && isFunction(callback)) {
        callback({ ...formValues, ...fieldsValue }, form);
      }
    });
  } else {
    // eslint-disable-next-line no-console
    console.warn('form is not defined');
  }
}
