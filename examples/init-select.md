# 根据原生的 select 初始化

<link rel="stylesheet" href="../node_modules/alice-select/dist/select.css" />

```html
<script type="text/javascript" src="https://a.alipayobjects.com/jquery/jquery/1.7.2/jquery.js"></script>
<select id="example1">
    <option value="option1">option1</option>
    <option value="option2" selected="selected">option2</option>
    <option value="option3">option3</option>
</select>
```

```javascript
import Select from '../index';
new Select({
    trigger: '#example1'
}).render();
```

