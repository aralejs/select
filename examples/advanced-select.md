# 多级下拉菜单

- order: 5

----

只能传入 DOM 和 model 初始化，不能通过 select，因为 select 框中指定多级数据很困难，所以通过 model 指定。

trigger 为任意 DOM，但必须传入 model 数据。

````iframe:200
<link rel="stylesheet" href="http://static.alipayobjects.com/al/alice.base-1.2.css" />
<link rel="stylesheet" href="../src/select.css" />

<a href="#" id="example2">请选择</a>

<script>
seajs.use(['$', 'select'], function($, Select) {
    var s = new Select({
        trigger: '#example2',
        //disabled: true,
        /*
        renderTrigger: function(selected) {
            var titles = [],
                options = this.model.select;
            var selectedIndex = this.get('selectedIndex');
            if (!(selectedIndex instanceof Array)) {
                selectedIndex = [selectedIndex];
            }
            $.each(selectedIndex, function(i, v) {
                titles.push(options[v].text);
                options = options[v].options;
            });
            //return selected.html();
            return titles.join('-');
        },
        */
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
                options: [
                    {
                        value: 'bizIn',
                        text: '付款',
                        options: [
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
                options: [
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

    s.on('change', function(target) {
        console && console.log && console.log(target.get(0));
    });
});
</script>
````

