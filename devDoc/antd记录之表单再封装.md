### 主要参照

[Ant Design Pro 使用之 表单组件再封装](https://www.jianshu.com/p/c7120bf2e4f8)

[CodeSandbox示例](https://codesandbox.io/s/9zoxv04wzo)

[antd 常用知识点和小技巧总结](https://www.jianshu.com/p/c8ebb9eb0e81)

### 使用方法

1. 引入组件,如

```js
import ModalForm from '@/components/FormComponents/ModalForm';
```

2. 类继承并加入dataSource,如

```js
class checkoutForm extends ModalForm {
  getDataSource = () => [
    { label: '收货人', name: 'name', required: true, whitespace: true },
    { label: '收货地址', name: 'address', required: true, whitespace: true },
    {
      label: '手机号码',
      name: 'phoneNumber',
      required: true,
      type: 'number',
      whitespace: true,
      len: 11
    },
  ];
}
```

3. 方法中调用open,如
```js
checkoutForm.open({
    title: '新增收货地址',
    width: '50%',
    centered: true,
    formValues: {
        name: '初始值',
    },
    onSubmit: data => console.log(`表单提交:${JSON.stringify(data)}`)
});
```

### 个人修改

#### 自定义校验

没有找到该作者封装后的自定义校验示例写法, 暂时修改方法如下, 强制表单内只允许输入中英文和数字, 可动态配置字段非空,长度和最大最小值

```js
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
      initialValue = formValues[name],
      valuePropName = 'value',
    } = item;
    let ruleArray = [];
    if (required) {
      ruleArray.push({ required: true, message: `${label}不能为空` });
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
    ruleArray.push({
      pattern: /^[\u4e00-\u9fa50-9A-Za-z]+$/,
      message: '只允许输入中英文和数字',
    });
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
```

