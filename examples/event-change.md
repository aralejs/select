# change 事件

```html
<script type="text/javascript" src="https://a.alipayobjects.com/jquery/jquery/1.7.2/jquery.js"></script>
<a href="#" id="example5" class="ui-select-trigger">请选择</a>
<span id="example5-log"></span>
```

```javascript
import Select from '../index';
const log = jQuery('#example5-log');
new Select({
    trigger: '#example5',
    model: [
        {value:'option1', text:'option1'},
        {value:'option2', text:'option2'},
        {value:'option3', text:'option3'},
        {value:'option4', text:'option4'}
    ]
}).on('change', function(target) {
    log.html(`已选择: value->${target.attr('data-value')} ; text->${target.html()}`);
}).render();
```

