# 多级下拉菜单

- order: 5

----

<link rel="stylesheet" href="../src/select.css" />

只能传入 DOM 和 model 初始化，不能通过 select，因为 select 框中指定多级数据很困难，所以通过 model 指定。

trigger 为任意 DOM，但必须传入 model 数据。

````html
<a href="#" id="example2">请选择</a>
````

````javascript
seajs.use(['$', 'select'], function($, Select) {
    new Select({
        trigger: '#example2',
        //disabled: true,
        renderTrigger: function(selected) {
            var titles = [],
                items = this.model.select;
            var selectedIndex = this.get('selectedIndex');
            if (!(selectedIndex instanceof Array)) {
                selectedIndex = [selectedIndex];
            }
            $.each(selectedIndex, function(i, v) {
                titles.push(items[v].text);
                items = items[v].items;
            });
            //return selected.html();
            return titles.join('-');
        },
        model: [
            {
                value:'all',
                text:'所有交易',
                defaultSelected: true
            },
            {
                value:'taobao',
                text:'淘宝购物',
                selected: true
            },
            {
                value:'alipay',
                text:'支付宝',
                items: [
                    {
                        value: 'bizIn',
                        text: '付款',
                        items: [
                            {
                                value: 'test',
                                text: 'test'
                            },
                            {
                                value: 'test2',
                                text: 'test2',
                                disabled: true
                            },
                            {
                                value: 'test3',
                                text: 'test3'
                            }
                        ]
                    },
                    {
                        value: 'bizOut',
                        text: '收款'
                    }
                ]
            },
            {
                value: 'cutom',
                text: '自定义分类',
                disabled: true,
                items: [
                    {
                        value: 'huoshifei',
                        text: '伙食费'
                    },
                    {
                        value: 'manage',
                        text: '管理分离'
                    }
                ]
            }
        ]
    }).render();
});
````

