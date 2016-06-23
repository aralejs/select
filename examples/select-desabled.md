# 设置 select 为 disabled

```html
<script type="text/javascript" src="https://a.alipayobjects.com/jquery/jquery/1.7.2/jquery.js"></script>

<select id="example3">
    <option value="option1">option1</option>
    <option value="option2" selected="selected">option2</option>
</select>
<a href="#" id="example3-abled" style="margin-left:20px;">设置 disabled=false</a>
<a href="#" id="example3-disabled" style="margin-left:20px;">设置 disabled=true</a>
```


```javascript
import Select from '../index';

const example3 = new Select({
    trigger: '#example3',
    disabled: true
}).render();

jQuery('#example3-disabled').click(function(e) {
    e.preventDefault();
    example3.set('disabled', true);
});

jQuery('#example3-abled').click(function(e) {
    e.preventDefault();
    example3.set('disabled', false);
});
```


