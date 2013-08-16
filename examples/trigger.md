# trigger

- order: 4

----

<script>
seajs.use('select.css');
</script>

## trigger 的宽度和浮层的宽度保持一致

<a href="#" id="example7-1" class="ui-select-trigger">请选择</a>
<a href="#" id="example7-2" class="ui-select-trigger">请选择</a>

````javascript
seajs.use(['select','jquery'], function(Select, $) {
    new Select({
        trigger: '#example7-1',
        model: [
            {value:'option1', text:'aaaaaaaaaaaaaaaa'},
            {value:'option2', text:'字比较少'},
            {value:'option3', text:'字比较少'}
        ]
    }).render();

    new Select({
        trigger: '#example7-2',
        model: [
            {value:'option1', text:'字好多多aaa多多多多多'},
            {value:'option2', text:'字比较多'},
            {value:'option3', text:'字比较多'}
        ]
    }).render();
});
````

## 自定义 trigger

需要指定 `data-role="trigger-content"`，否则会覆盖整个 trigger 的内容

````html
<a href="#" id="example8"><span data-role="trigger-content"></span><span>x</span></a>
````

````javascript
seajs.use(['select','jquery'], function(Select, $) {
    new Select({
        trigger: '#example8',
        model: [
            {value:'option1', text:'option1'},
            {value:'option2', text:'option2'}
        ]
    }).render();
});
````
