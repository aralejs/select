# HISTORY

---

## 0.10.0

`improved` 按照 spm@3.x 规范升级。

## 0.9.10

`tag:fixed` #54 修复 completeModel 函数的问题

## 0.9.9

`tag:improved` 生成的 input[hidden] 控件用特殊方式进行隐藏，用代码探测时为可见状态。

## 0.9.8

`tag:improved` 升级依赖到 overlay@1.1.4 和 template@0.9.2 。

`tag:new` 添加 enableOption 和 disableOption 方法。

`tag:fixed` 修复了选中选项后没有同步到 model 的问题。

`tag:improved` 原生 select 采用特殊方式进行隐藏，探测它时为可见状态。

`tag:fixed` 修复 name 属性中带 `.` 时报错的问题。

`tag:fixed` 修复 destroy 时没有删除隐藏的 input 的问题。

`tag:fixed` 修复 IE 下由于 border-width 可能为 `thin|medium|thick` 导致的宽度计算错误。


## 0.9.7

`tag:new` #45 增加 option 的 disabled 状态

`tag:new` 使用 alice.select

`tag:new` #14 添加 maxHeight 参数

`tag:improved` #52 change 事件增加之前的 item

`tag:improved` #45 如果不设置 classPrefix，所有通过js add/removeClass 的操作都无效

`tag:improved` #45 triggerTpl 可配置

`tag:improved` #37 item 区域的click点击不应该冒泡

`tag:improved` #46 trigger 的触发方式应该是 mousedown

`tag:fixed` #51 修复 IE6 下的样式问题

`tag:fixed` #49 修复 trigger 无法 toggle 

## 0.9.6

`tag:changed` 升级 overlay 到 1.1.1

`tag:fixed` #39 修复多个组件使用同一个 model 互相干扰的问题 

`tag:fixed` #43 修复 syncModel 未同步 select 的问题 

## 0.9.5

`tag:fixed` #38 修复 convertSelect 的错误

`tag:improved` 升级 templatable 到 0.9.1


## 0.9.4

`tag:improved` 升级 overlay 到 1.1.0

`tag:improved` 对 templatable 的依赖从 arale/widget/1.0.3/templatable 升级到 arale/templatable/0.9.0/templatable 。


## 0.9.3

`tag:improved` 升级 overlay 到 1.0.1

`tag:improved` 升级 widget 到 1.0.3

## 0.9.2

`tag:new` [#31](https://github.com/aralejs/select/issues/31) 增加 disabledChange 事件

`tag:improved` [#30](https://github.com/aralejs/select/issues/30) 支持解析 html

`tag:improved` [#17](https://github.com/aralejs/select/issues/17) 支持 triggerTemplate

## 0.9.1

`tag:improved` 升级 overlay 到 0.9.13

## 0.9.0

`tag:new` [#4](https://github.com/aralejs/select/issues/4) 支持操作 option

`tag:new` [#8](https://github.com/aralejs/select/issues/8) 支持表单项

`tag:new` [#9](https://github.com/aralejs/select/issues/9) trigger 和浮层应该等宽

`tag:new` [#11](https://github.com/aralejs/select/issues/11) firefox css('border') 失效

`tag:new` [#15](https://github.com/aralejs/select/issues/15) destroy的bug

### 0.8.0

`tag:new` 初始化
