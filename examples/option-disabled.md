# 设置某项为不可选

<link rel="stylesheet" href="../node_modules/alice-select/dist/select.css" />

```html
<script type="text/javascript" src="https://a.alipayobjects.com/jquery/jquery/1.7.2/jquery.js"></script>
<select id="example7">
    <option value="option1">option1</option>
    <option value="option2" selected="selected">option2</option>
    <option value="option3">option3</option>
</select>
<a href="javascript:;" id="example7-disable" style="margin-left:20px;">disable 第三项</a>
<a href="javascript:;" id="example7-enable" style="margin-left:20px;">enable 第三项</a>
```

```javascript
import Select from '../index';

const example7 = new Select({
    trigger: '#example7'
}).render();

jQuery('#example7-enable').click(function() {
    example7.enableOption(2);
});

jQuery('#example7-disable').click(function() {
    example7.disableOption(2);
});
```
