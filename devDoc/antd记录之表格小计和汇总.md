### 主要参照

[Issues #5710](https://github.com/ant-design/ant-design/issues/5710)

### 实现方式

![](C:\Users\knight\Desktop\笔记\小计和汇总.png)

3.x版本的表格缺失官方支持的汇总功能, google之下只有 #5710的讨论有些价值, 目前简易购物车结算功能实现方式如下

#### 小计

所有列名为 商品信息, 单价, 数量, 小计, 操作, 小计为单行金额计算 = 单价*数量, 小数点保留两位

1. `text`为传入的该列参数值, 如 单价 为 ¥ 1 的 1
2. `record`为该行所有列的集合, 取对应的key得到value, 如 `record.number` 为该行数量的参数值
3. `index` 为该行的对应下标

数量列加入增加和减少的Button, 通过record获取参数值并进行变更操作

小计列通过record进行四则运算, 保留两位小数返回String

```react
	{
        title: '单价',
        className: `${CartStyle.tableColumns}`,
        width: '120px',
        dataIndex: 'singlePrice',
        render: text => <div>¥ {text}</div>,
      },
      {
        title: '数量',
        className: `${CartStyle.tableColumns}`,
        width: '120px',
        dataIndex: 'number',
        render: (text, record, index) => (
          <Row>
            <Col span={8}>
              <Button
                disabled={record.number == 1 ? true : false}
                shape="circle"
                icon="minus"
                size="small"
                onClick={this.onHandleMinus.bind(this, text, record, index)}
              />
            </Col>
            <Col span={8} style={{ textAlign: 'center' }}>
              {text}
            </Col>
            <Col span={8}>
              <Button
                disabled={record.number == 99 ? true : false}
                shape="circle"
                size="small"
                icon="plus"
                onClick={this.onHandlePlus.bind(this, text, record, index)}
              />
            </Col>
          </Row>
        ),
      },
      {
        title: '小计',
        className: `${CartStyle.tableColumns}`,
        width: '120px',
        dataIndex: 'subtotal',
        render: (text, record, index) => (
          <div>¥ {(parseFloat(record.singlePrice) * parseFloat(record.number)).toFixed(2)}</div>
        ),
      }
```

```js
  onHandleMinus = (text, record, index, e) => {
    let data = this.state.data;
    data[index].number = parseInt(text) - 1;
    this.setState(
      {
        data: data,
      },
      () => {},
    );
  };

  onHandlePlus = (text, record, index, e) => {
    let data = this.state.data;
    data[index].number = parseInt(text) + 1;
    this.setState(
      {
        data: data,
      },
      () => {},
    );
  };
```

#### 汇总

首先自定义一个页脚, 本来想再加一个全选的按钮, 没弄懂自定义全选的正确打开方式, 暂时舍弃了

页脚现有 `清空所有` `已选择x/x件商品` `应付金额:¥xx` `结算`

1. `selectedRowKeys` 为 table的行选择框属性, 为选择框的选中数组
2. `data` 为 table的传入数据数组

通过 `js` 的 filter 和 reduce 方法对数据进行四则运算, 变更数据

```react
footer={() => (
    <Row type="flex" align="middle" justify="center" className={CartStyle.tableFoot}>
        <Col xs={24} sm={24} md={6} lg={4} xl={4} xxl={4}>
            <span onClick={this.onClearAllRow.bind(this)} style={{ cursor: 'pointer' }}>
                清空所有
            </span>
        </Col>
        <Col xs={24} sm={24} md={18} lg={20} xl={20} xxl={20}>
            <Row
                type="flex"
                align="middle"
                justify="center"
                className={CartStyle.tableFootThirdRow}
                >
                <Col xs={24} sm={12} md={10} lg={10} xl={14} xxl={16}>
                    <div className={CartStyle.tableFootThirdRowOneCol}>
                        已选择{' '}
                        <span className={CartStyle.tableFootHighLight}>
                            {this.state.data
                                .filter(item => {
                                return this.state.selectedRowKeys.includes(item.key);
                            })
                                .reduce((total, currentValue) => {
                                return total + parseInt(currentValue.number);
                            }, 0)}
                        </span>{' '}
                        /{' '}
                        {this.state.data.reduce((total, currentValue) => {
                            return total + parseInt(currentValue.number);
                        }, 0)}{' '}
                        件商品
                    </div>
                </Col>
                <Col xs={24} sm={12} md={8} lg={8} xl={6} xxl={4}>
                    <div className={CartStyle.tableFootThirdRowSecondCol}>
                        应付金额 : {''}
                        <span className={CartStyle.tableFootHighLight}>
                            ￥
                            {this.state.data
                                .filter(item => {
                                return this.state.selectedRowKeys.includes(item.key);
                            })
                                .reduce((total, currentValue) => {
                                return (
                                    total +
                                    parseFloat(
                                        (
                                            parseFloat(currentValue.singlePrice) *
                                            parseFloat(currentValue.number)
                                        ).toFixed(2),
                                    )
                                );
                            }, 0)}
                        </span>
                    </div>
                </Col>
                <Col xs={24} sm={24} md={6} lg={6} xl={4} xxl={4}>
                    <Button type="primary" block onClick={this.goToCheckout.bind(this)}>
                        结算
                    </Button>
                </Col>
            </Row>
        </Col>
    </Row>
)}
```

