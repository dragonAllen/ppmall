### 主要参照

[React Slick](https://react-slick.neostack.com/)

### 实现方式

![](C:\Users\knight\Desktop\笔记\自定义切换.png)

antd的走马灯是基于react-slick封装的, 所以很多属性和示例实际上要去react-slick的文档里找, 本来react-slick支持的自定义分页是通过内置的 customPaging /  dotsClass  等控制, 但是antd在封装的同时添加了默认的样式, 覆盖样式着实麻烦,所以换一种方式

Carousel 下设置的属性 : 

1. `lazyLoad`设置的是加载方式, 具体性能提升效果未测试
2.  `dots`设置为false取消默认下标
3. `effect`和`speed`组合设置使动画效果看上去为快速切换
4. `ref`在React访问Carousel的dom节点和方法的方式

底部div设置横向滚动, 放置缩略图供点击切换

```react
sliderRef = React.createRef();

handleChangeCarousel(index,e){
    this.sliderRef.current.slick.slickGoTo(index)
}

<Carousel lazyLoad="progressive" dots={false} effect="fade" speed={200} ref={this.sliderRef}>
    {this.state.CarouselArray.map((content, index) => {
        return (
            <img
                src={`url/${content}`}
                className={GoodDetailStyle.carouselImg}
                alt=""
                key={index}
                />
        );
    })}
</Carousel>
<div>
    <ul className={GoodDetailStyle.categoryHead}>
        {this.state.CarouselArray.map((content, index) => {
            return (
                <li onClick={this.handleChangeCarousel.bind(this,index)}>
                    <img
                        src={`url/${content}`}
                        alt=""
                        style={{ width: '160px', height: '90px' }}
                        />
                </li>
            );
        })}
    </ul>
</div>

```

```scss
.categoryHead{
  width:100%;
  display: inline;
  white-space: nowrap;
  overflow-x:scroll;
  overflow-y:hidden;
  float:left;
}
.categoryHead li{
  display:inline-block;
}
```

