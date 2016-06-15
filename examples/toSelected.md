# 通过 select 接口去选择

<link rel="stylesheet" href="../node_modules/alice-select/dist/select.css" />

```html
<script type="text/javascript" src="https://a.alipayobjects.com/jquery/jquery/1.7.2/jquery.js"></script>
<a href="#" id="example4" class="ui-select-trigger">请选择</a>
<a href="#" class="example4-select" data-value="1">选择1</a>
<a href="#" class="example4-select" data-value="2">选择2</a>
<a href="#" class="example4-select" data-value="3">选择3</a>
<a href="#" class="example4-select" data-value="4">选择4</a>

```

```javascript
import Select from '../index';

const example4 = new Select({
    trigger: '#example4',
    name: 'example4',
    model: [
        {value:'option1', text:'option1'},
        {value:'option2', text:'option2'},
        {value:'option3', text:'option3'},
        {value:'option4', text:'option4'}
    ]
}).render();

jQuery('.example4-select').click(function(e) {
    e.preventDefault();
    const index = jQuery(e.currentTarget).attr('data-value');
    example4.select(index - 1);
});
```

