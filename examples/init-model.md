# 直接传入 DOM 初始化

<link rel="stylesheet" href="../node_modules/alice-select/dist/select.css" />

trigger 为任意 DOM，但必须传入 model 数据

```html
<script type="text/javascript" src="https://a.alipayobjects.com/jquery/jquery/1.7.2/jquery.js"></script>
<a href="#" id="example2" class="ui-select-trigger">请选择</a>
```

```javascript
import Select from '../index';
new Select({
    trigger: '#example2',
    model: [
        {value:'option1', text:'option1'},
        {value:'option2', text:'option2', selected: true},
        {value:'option3', text:'option3', disabled: true}
    ]
}).render();
```
