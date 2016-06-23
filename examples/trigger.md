# trigger

需要指定 `data-role="trigger-content"`，否则会覆盖整个 trigger 的内容

```html
<script type="text/javascript" src="https://a.alipayobjects.com/jquery/jquery/1.7.2/jquery.js"></script>
<a href="#" id="example8" class="ui-select-trigger"><span data-role="trigger-content"></span><span>x</span></a>
```

```javascript
import Select from '../index';
new Select({
    trigger: '#example8',
    model: [
        {value:'option1', text:'option1'},
        {value:'option2', text:'option2'}
    ]
}).render();
```
