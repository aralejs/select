# 其他操作

- order: 2

----

<script>
seajs.use('select.css');
</script>

## 设置 select 为 disabled

<select id="example3">
    <option value="option1">option1</option>
    <option value="option2" selected="selected">option2</option>
</select>
<a href="#" id="example3-abled" style="margin-left:20px;">设置 disabled=false</a>
<a href="#" id="example3-disabled" style="margin-left:20px;">设置 disabled=true</a>

````javascript
seajs.use(['select','jquery'], function(Select, $) {
    var example3 = new Select({
        trigger: '#example3',
        disabled: true
    }).render();

    $('#example3-disabled').click(function(e) {
        e.preventDefault();
        example3.set('disabled', true);
    });

    $('#example3-abled').click(function(e) {
        e.preventDefault();
        example3.set('disabled', false);
    });
});
````

## 可以通过 select 接口去选择

<a href="#" id="example4">请选择</a>
<a href="#" class="example4-select" data-value="1">选择1</a>
<a href="#" class="example4-select" data-value="2">选择2</a>
<a href="#" class="example4-select" data-value="3">选择3</a>
<a href="#" class="example4-select" data-value="4">选择4</a>


````javascript
seajs.use(['select','jquery'], function(Select, $) {
    var example4 = new Select({
        trigger: '#example4',
        name: 'example4',
        model: [
            {value:'option1', text:'option1'},
            {value:'option2', text:'option2'},
            {value:'option3', text:'option3'},
            {value:'option4', text:'option4'}
        ]
    }).render();

    $('.example4-select').click(function(e) {
        e.preventDefault();
        var index = $(e.currentTarget).attr('data-value');
        example4.select(index - 1);
    });
});
````

## 提供 change 的事件

<a href="#" id="example5">请选择</a>
<span id="example5-log"></span>

````javascript
seajs.use(['select','jquery'], function(Select, $) {
    var log = $('#example5-log');
    new Select({
        trigger: '#example5',
        model: [
            {value:'option1', text:'option1'},
            {value:'option2', text:'option2'},
            {value:'option3', text:'option3'},
            {value:'option4', text:'option4'}
        ]
    }).on('change', function(target) {
        log.html(
            '已选择: value -> ' + 
            target.attr('data-value') +
            '; text -> ' +
            target.html()
        );
    }).render();
});
````
