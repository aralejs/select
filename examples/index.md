# Example

----

<script type="text/javascript">
var relationMap = {"WATER":{"北京":["北京"],"太阳系国":[],"重庆":["重庆"],"新疆":[],"广东":["东莞","广州","梅州","深圳","珠海"],"天津":[],"浙江":["东阳","杭州","嘉兴","金华","宁波","绍兴","台州","温州","义乌"],"省份":[],"深圳":[],"广西":["南宁"],"内蒙古":["赤峰"],"江西":["九江","南昌","新余"],"安徽":["蚌埠","合肥","淮北","淮南","黄山"],"陕西":["西安"],"辽宁":["鞍山","大连","沈阳","营口"],"山西":["太原"],"四川":["成都"],"江苏":["淮安","江都","江阴","南京","南通","苏州","宿迁","无锡","徐州","扬州","镇江"],"河北":["石家庄"],"福建":["福州","莆田","泉州","厦门"],"吉林":["吉林"],"云南":["昆明"],"湖北":["武汉"],"海南":[],"上海":["上海"],"全国":[],"湖南":["长沙","衡阳","湘潭"],"山东":["济南","青岛","潍坊","烟台"],"河南":["开封","洛阳","信阳","岳阳","郑州"],"黑龙江":["哈尔滨"]},"GAS":{"北京":["北京"],"太阳系国":[],"重庆":["重庆"],"新疆":[],"广东":["东莞","佛山","广州","深圳"],"天津":[],"浙江":["杭州","宁波","温州","浙江全省"],"省份":[],"深圳":[],"广西":[],"内蒙古":["呼和浩特"],"江西":["南昌","新余"],"安徽":["合肥","淮北"],"陕西":["西安"],"辽宁":["鞍山","朝阳","大连","沈阳"],"山西":[],"四川":["成都"],"江苏":["淮安","南京","南通","苏州","无锡","徐州","扬州","宜兴","镇江"],"河北":["石家庄"],"福建":["福州"],"吉林":[],"云南":["昆明"],"湖北":[],"海南":["海口"],"上海":["上海"],"全国":[],"湖南":[],"山东":["济南","青岛","潍坊","烟台"],"河南":["开封","洛阳","郑州"],"黑龙江":["哈尔滨"]},"ELECTRIC":{"北京":["北京"],"太阳系国":[],"重庆":["重庆"],"新疆":[],"广东":["潮州","东莞","佛山","广州","河源","惠州","江门","揭阳","梅州","汕尾","深圳","中山","珠海"],"天津":[],"浙江":["杭州","湖州","嘉兴","金华","丽水","宁波","衢州","绍兴","台州","温州","舟山"],"省份":[],"深圳":[],"广西":["北海","防城港","贵港","桂林","河池","来宾","柳州","南宁","玉林"],"内蒙古":["阿拉善盟","巴彦淖尔","包头","赤峰","鄂尔多斯","呼和浩特","呼伦贝尔","通辽","乌海","乌兰察布","锡林郭勒","兴安盟","准格尔"],"江西":["抚州","赣州","吉安","景德镇","九江","南昌","萍乡","上饶","新余","宜春","鹰潭"],"贵州":["安顺","毕节","都匀","贵阳","凯里","六盘水","铜仁","兴义","遵义"],"安徽":["安徽全省","安庆","蚌埠","滁州","合肥","淮北","淮南","黄山","宿州"],"陕西":["西安"],"辽宁":["鞍山","本溪","朝阳","大连","丹东","抚顺","阜新","葫芦岛","盘锦","沈阳","铁岭","营口"],"山西":["太原"],"青海":["西宁"],"四川":["成都","绵阳","自贡"],"江苏":["常州","淮安","江苏全省","连云港","南京","南通","苏州","宿迁","泰州","无锡","徐州","盐城","扬州","镇江"],"福建":["福州","龙岩","南平","宁德","莆田","泉州","三明","厦门","漳州"],"吉林":["白城","白山","长春","吉林","辽源","四平","松原","通化","延边州延吉"],"上海":["上海"],"云南":["昆明"],"湖北":["鄂州","湖北全省","黄冈","黄石","荆门","荆州","十堰","随州","武汉","仙桃","咸宁","襄樊","孝感","宜昌"],"海南":["海口"],"全国":[],"甘肃":["白银","甘南","嘉峪关","金昌","酒泉","张掖"],"湖南":["长沙","常德","衡阳","湖南全省"],"山东":["济南","青岛","潍坊","烟台"],"河南":["安阳","鹤壁","济源","焦作","开封","洛阳","漯河","南阳","平顶山","濮阳","三门峡","商丘","新乡","信阳","许昌","郑州","周口","驻马店"],"黑龙江":["哈尔滨","黑龙江全省"]}};

function parseProv(type) {
    var o = relationMap[type], result = [];
    result.push({value:'',text:'请选择', selected: true})
    for (i in o) {
        var prov = i;
        result.push({value:prov,text:prov, selected: false})
    }
    return result;
}
function parseCity(type, prov) {
    var o = relationMap[type], cities = o[prov], result = [];
    result.push({value:'',text:'请选择', selected: true})
    for (i in cities) {
        var city = cities[i];
        result.push({value:city,text:city, selected: false})
    }
    return result;
}
</script>

<style>
.ui-select-trigger {
    font-size:12px;
    border: 1px solid #eee;
    padding:5px 10px;
    font-family:tahoma;
}
.ui-select {
    border: 1px solid #eee;
    font-family:tahoma;
}
.ui-select-content {
    padding: 2px 0;
    margin: 0;
    background: #fff;
}
.ui-select-item {
    font-size:12px;
    padding: 5px 10px;
    list-style: none;
}
.ui-select-selected {
    background: red;
}
.ui-select-hover {
    background: #ccc;
}
.ui-select-disabled {
    color: #ccc;
}
</style>

## 基本使用，trigger 为 select，并默认选中 option2

<select id="example1">
    <option value="option1">option1</option>
    <option value="option2" selected="selected">option2</option>
</select>

````javascript
seajs.use(['select'], function(Select) {
    new Select({
        trigger: '#example1'
    }).render();
});
````

## 初始化可以传递一个 model

<a href="#" id="example2">请选择</a>

````javascript
seajs.use(['select'], function(Select) {
    new Select({
        trigger: '#example2',
        model: [
            {value:'option1', text:'option1'},
            {value:'option2', text:'option2', selected: true}
        ]
    }).render();
});
````

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
            ' text -> ' +
            target.html()
        );
    }).render();
});
````

## 支持 select 级联操作

<select id="exampel6-1">
    <option value="WATER">水费</option>
    <option value="ELECTRIC">电费</option>
</select>
<a href="#" id="exampel6-2">请选择</a>
<a href="#" id="exampel6-3">请选择</a>

````javascript
seajs.use(['select'], function(Select) {
    var a1 = new Select({
        trigger: '#exampel6-1'
    }).on('change', function(target) {
        var type = target.attr('data-value');
        var model = parseProv(type);
        console.log(model);
        a2.syncModel(model);
    });

    var a2 = new Select({
        trigger: '#exampel6-2',
        model: parseProv('WATER')
    }).on('change', function(target) {
        var prov = target.attr('data-value');
        var model = parseCity(a1.get('value'), prov);
        a3.syncModel(model);
    });

    var a3 = new Select({
        trigger: '#exampel6-3',
        model: parseCity('WATER')
    });

    a1.render();
    a2.render();
    a3.render();
});
````

# trigger 的宽度和浮层的宽度保持一致

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
