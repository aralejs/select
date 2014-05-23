var $ = require('jquery');
var sinon = require('sinon');
var expect = require('expect.js');
var Select = require('../index');

describe('select', function() {

    var trigger, select;

    afterEach(function() {
        if (select) {
            select.destroy();
            select = null;
        }
        if (trigger) {
            trigger.remove();
            trigger = null;
        }
    });

    it('normal use', function() {
        trigger = $('<select id="example"><option value="value1">text1</option><option value="value2">text2</option></select>').appendTo(document.body);
        select = new Select({
            trigger: '#example'
        }).render();

        expect(select.get('selectSource')[0]).to.be(trigger[0]);
        expect(trigger.is(':hidden')).to.be(false);
        expect(select.get('trigger').html()).to.be('text1');
        expect(select.get('value')).to.be('value1');
        expect(select.get('length')).to.be(2);
        expect(select.get('selectedIndex')).to.be(0);
        expect(select.currentItem[0]).to.be(select.element.find('[data-role=item]')[0]);
        expect(select.options.eq(0).attr('data-selected'))
        .to.be('true');
        expect(select.options.eq(0).attr('data-defaultSelected'))
        .to.be('false');
        expect(select.options.eq(1).attr('data-selected'))
        .to.be('false');
        expect(select.options.eq(1).attr('data-defaultSelected'))
        .to.be('false');

        select.get("trigger").mouseenter();
        expect(select.get("trigger").hasClass(select.get('classPrefix') + '-trigger-hover')).to.be(true);

        select.get("trigger").mouseleave();
        expect(select.get("trigger").hasClass(select.get('classPrefix') + '-trigger-hover')).to.be(false);
    });

    describe('convert model', function() {
        it('no selected item when trigger is select', function() {
            trigger = $('<select id="example"><option value="value1">text1</option><option value="value2">text2</option></select>').appendTo(document.body);
            select = new Select({
                trigger: '#example'
            }).render();

            var model = select.get("model").select;
            expect(model[0].defaultSelected).to.be(false);
            expect(model[0].selected).to.be(true);
            expect(model[0].value).to.be('value1');
            expect(model[0].text).to.be('text1');
            expect(model[1].defaultSelected).to.be(false);
            expect(model[1].selected).to.be(false);
            expect(model[1].value).to.be('value2');
            expect(model[1].text).to.be('text2');
        });

        it('select second item when trigger is select', function() {
            trigger = $('<select id="example"><option value="value1">text1</option><option value="value2" selected>text2</option></select>').appendTo(document.body);
            select = new Select({
                trigger: '#example'
            }).render();

            var model = select.get("model").select;
            expect(model[0].defaultSelected).to.be(false);
            expect(model[0].selected).to.be(false);
            expect(model[0].value).to.be('value1');
            expect(model[0].text).to.be('text1');
            expect(model[1].defaultSelected).to.be(true);
            expect(model[1].selected).to.be(true);
            expect(model[1].value).to.be('value2');
            expect(model[1].text).to.be('text2');
        });

        it('disable second item when trigger is disabled', function() {
            trigger = $('<select id="example"><option value="value1">text1</option><option value="value2" disabled>text2</option></select>').appendTo(document.body);
            select = new Select({
                trigger: '#example'
            }).render();

            var model = select.get("model").select;
            expect(model[0].disabled).to.be(false);
            expect(model[1].disabled).to.be(true);
        });

        it('select both item when trigger is select', function() {
            trigger = $('<select id="example"><option value="value1" selected>text1</option><option value="value2" selected>text2</option></select>').appendTo(document.body);
            select = new Select({
                trigger: '#example'
            }).render();

            var model = select.get("model").select;
            expect(model[0].defaultSelected).to.be(true);
            expect(model[0].selected).to.be(false);
            expect(model[0].value).to.be('value1');
            expect(model[0].text).to.be('text1');
            expect(model[1].defaultSelected).to.be(true);
            expect(model[1].selected).to.be(true);
            expect(model[1].value).to.be('value2');
            expect(model[1].text).to.be('text2');
        });

        it('no selected item when trigger is other DOM', function() {
            trigger = $('<a href="#" id="example"></a>').appendTo(document.body);
            select = new Select({
                trigger: '#example',
                model: [
                    {value: 'value1', text: 'text1'},
                    {value: 'value2', text: 'text2'}
                ]
            }).render();

            var model = select.get("model").select;
            expect(model[0].defaultSelected).to.be(false);
            expect(model[0].selected).to.be(true);
            expect(model[0].value).to.be('value1');
            expect(model[0].text).to.be('text1');
            expect(model[1].defaultSelected).to.be(false);
            expect(model[1].selected).to.be(false);
            expect(model[1].value).to.be('value2');
            expect(model[1].text).to.be('text2');
        });

        it('select second item when trigger is other DOM', function() {
            trigger = $('<a href="#" id="example"></a>').appendTo(document.body);
            select = new Select({
                trigger: '#example',
                model: [
                    {value: 'value1', text: 'text1'},
                    {value: 'value2', text: 'text2', selected: true}
                ]
            }).render();

            var model = select.get("model").select;
            expect(model[0].defaultSelected).to.be(false);
            expect(model[0].selected).to.be(false);
            expect(model[0].value).to.be('value1');
            expect(model[0].text).to.be('text1');
            expect(model[1].defaultSelected).to.be(true);
            expect(model[1].selected).to.be(true);
            expect(model[1].value).to.be('value2');
            expect(model[1].text).to.be('text2');
        });

        it('select both item when trigger is other DOM', function() {
            trigger = $('<a href="#" id="example"></a>').appendTo(document.body);
            select = new Select({
                trigger: '#example',
                model: [
                    {value: 'value1', text: 'text1', selected: true},
                    {value: 'value2', text: 'text2', selected: true}
                ]
            }).render();

            var model = select.get("model").select;
            expect(model[0].defaultSelected).to.be(true);
            expect(model[0].selected).to.be(false);
            expect(model[0].value).to.be('value1');
            expect(model[0].text).to.be('text1');
            expect(model[1].defaultSelected).to.be(true);
            expect(model[1].selected).to.be(true);
            expect(model[1].value).to.be('value2');
            expect(model[1].text).to.be('text2');
        });

        it('no option', function() {
            trigger = $('<select id="example"></select>').appendTo(document.body);
            select = new Select({
                trigger: '#example'
            }).render();

            var model = select.get("model").select;
            expect(model.length).to.be(0);
        });

        it('customize triggerTpl', function() {
            trigger = $('<select id="example"></select>').appendTo(document.body);
            select = new Select({
                trigger: '#example',
                triggerTpl: '<p></p>'
            }).render();

            expect(select.get('trigger').hasClass('ui-select-trigger')).to.be(true);
            expect(select.get('trigger')[0].tagName).to.be('P');
        });

    });

    describe('select function', function() {
        it('change event', function() {
            var count = 0;
            trigger = $('<a href="#" id="example"></a>').appendTo(document.body);
            select = new Select({
                trigger: '#example',
                model: [
                    {value: 'value1', text: 'text1'},
                    {value: 'value2', text: 'text2', selected: true},
                    {value: 'value3', text: 'text3'}
                ]
            }).on('change', function() {
                count++;
            });
            expect(count).to.be(0);

            select.render();
            expect(count).to.be(0);

            select.select(1);
            expect(count).to.be(0);

            select.select(2);
            expect(count).to.be(1);
        });

        it('hide after selected', function() {
            trigger = $('<a href="#" id="example"></a>').appendTo(document.body);
            select = new Select({
                trigger: '#example',
                model: [
                    {value: 'value1', text: 'text1'},
                    {value: 'value2', text: 'text2', selected: true},
                    {value: 'value3', text: 'text3'}
                ]
            }).render();
            select.show().select(1);

            expect(select.get('visible')).to.be(false);
        });

        it('by index', function() {
            trigger = $('<a href="#" id="example"></a>').appendTo(document.body);
            select = new Select({
                trigger: '#example',
                model: [
                    {value: 'value1', text: 'text1'},
                    {value: 'value2', text: 'text2', selected: true},
                    {value: 'value3', text: 'text3'}
                ]
            }).render();

            select.select(2);
            expect(select.get('selectedIndex')).to.be(2);
        });

        it('by selector', function() {
            trigger = $('<a href="#" id="example"></a>').appendTo(document.body);
            select = new Select({
                trigger: '#example',
                model: [
                    {value: 'value1', text: 'text1'},
                    {value: 'value2', text: 'text2', selected: true},
                    {value: 'value3', text: 'text3'}
                ]
            }).render();

            select.select('[data-value=value3]');
            expect(select.get('selectedIndex')).to.be(2);
        });

        it('by dom', function() {
            trigger = $('<a href="#" id="example"></a>').appendTo(document.body);
            select = new Select({
                trigger: '#example',
                model: [
                    {value: 'value1', text: 'text1'},
                    {value: 'value2', text: 'text2', selected: true},
                    {value: 'value3', text: 'text3'}
                ]
            }).render();

            var option = select.options[2];
            select.select(option);
            expect(select.get('selectedIndex')).to.be(2);
        });
    });

    it('set selectedIndex', function() {
        trigger = $('<a href="#" id="example"></a>').appendTo(document.body);
        select = new Select({
            trigger: '#example',
            model: [
                {value: 'value1', text: 'text1'},
                {value: 'value2', text: 'text2', selected: true},
                {value: 'value3', text: 'text3'}
            ]
        }).render();

        expect(select.currentItem[0]).to.be(select.options.eq(1)[0]);
        expect(select.get('value')).to.be('value2');
        expect(select.get('trigger').html()).to.be('text2');
        expect(select.options.eq(1).attr('data-selected'))
            .to.be('true');
        expect(select.options.eq(2).attr('data-selected'))
            .to.be('false');

        var option = select.options[2];
        select.select(option);

        expect(select.currentItem[0]).to.be(option);
        expect(select.get('value')).to.be('value3');
        expect(select.get('trigger').html()).to.be('text3');
        expect(select.options.eq(1).attr('data-selected'))
            .to.be('false');
        expect(select.options.eq(2).attr('data-selected'))
            .to.be('true');
    });

    it('syncModel', function() {
        trigger = $('<a href="#" id="example"></a>').appendTo(document.body);
        select = new Select({
            trigger: '#example',
            model: [
                {value: 'value1', text: 'text1'},
                {value: 'value2', text: 'text2', selected: true}
            ]
        }).render();

        select.syncModel([
            {value: 'value3', text: 'text3'},
            {value: 'value4', text: 'text4', selected: true}
        ]);

        expect(select.get('trigger').html()).to.be('text4');
        expect(select.get('value')).to.be('value4');
        expect(select.get('length')).to.be(2);
        expect(select.get('selectedIndex')).to.be(1);
        expect(select.currentItem[0]).to.be(select.element.find('[data-role=item]')[1]);
        expect(select.options.eq(0).attr('data-defaultSelected'))
            .to.be('false');
        expect(select.options.eq(0).attr('data-selected'))
            .to.be('false');
        expect(select.options.eq(1).attr('data-defaultSelected'))
            .to.be('true');
        expect(select.options.eq(1).attr('data-selected'))
            .to.be('true');
    });

    it('trigger mousedown', function() {
        trigger = $('<a href="#" id="example"></a>').appendTo(document.body);
        select = new Select({
            trigger: '#example',
            model: [
                {value: 'value1', text: 'text1'},
                {value: 'value2', text: 'text2', selected: true}
            ]
        }).render();

        trigger.mousedown();
        expect(select.element.is(':hidden')).to.be(false);
        select.hide();
        expect(select.element.is(':hidden')).to.be(true);
    });

    it('set disabled', function() {
        trigger = $('<a href="#" id="example"></a>').appendTo(document.body);
        select = new Select({
            trigger: '#example',
            model: [
                {value: 'value1', text: 'text1'},
                {value: 'value2', text: 'text2', selected: true}
            ],
            disabled: true
        }).render();

        trigger.mousedown();
        expect(trigger.hasClass('ui-select-disabled')).to.be(true);
        expect(select.element.is(':hidden')).to.be(true);
        select.hide();

        select.set('disabled', false);
        trigger.mousedown();
        expect(trigger.hasClass('ui-select-disabled')).to.be(false);
        expect(select.element.is(':hidden')).to.be(false);
    });

    it('set classPrefix', function() {
        trigger = $('<select id="example"><option value="value1">text1</option><option value="value2" selected>text2</option></select>').appendTo(document.body);
        select = new Select({
            trigger: '#example',
            classPrefix: 'test'
        }).render();

        expect(select.element.hasClass('test')).to.be(true);
        expect(select.get('trigger').hasClass('test-trigger')).to.be(true);
        expect(select.$('.test-content').length).to.be(1);
        expect(select.$('.test-item').length).to.be(2);
        expect(select.options.eq(0).hasClass('test-selected')).to.be(false);
        expect(select.options.eq(1).hasClass('test-selected')).to.be(true);

        select.select(0);
        expect(select.options.eq(0).hasClass('test-selected')).to.be(true);
        expect(select.options.eq(1).hasClass('test-selected')).to.be(false);
    });

    it('attr name when trigger is select', function() {
        trigger = $('<select name="example" id="example"><option value="value1">text1</option><option value="value2" selected>text2</option></select>')
            .appendTo(document.body);
        select = new Select({
            trigger: '#example'
        }).render();

        expect(select.get('name')).to.be('example');
    });

    it('attr name when trigger is DOM', function() {
        trigger = $('<a href="#" id="example"></a>')
            .appendTo(document.body);
        select = new Select({
            trigger: '#example',
            model: [
                {value: 'value1', text: 'text1'},
                {value: 'value2', text: 'text2', selected: true}
            ],
            name: 'example'
        }).render();

        expect(!$('#select-example')[0]).to.be(false);
        expect($('#select-example').attr('name')).to.be('example');
    });

    it('set trigger width', function() {
        trigger = $('<a href="#" id="example"></a>')
            .css({
                display: 'block',
                padding: '5px',
                border: '5px solid #ccc'
            }).appendTo(document.body);
        select = new Select({
            trigger: '#example',
            model: [
                {value: 'value1', text: 'text1'},
                {value: 'value2', text: 'text2', selected: true}
            ],
            width: '200px'
        }).render();

        expect(trigger.width()).to.be(180);
    });

    it('get option', function() {
        trigger = $('<a href="#" id="example"></a>')
            .appendTo(document.body);
        select = new Select({
            trigger: '#example',
            model: [
                {value: 'value1', text: 'text1'},
                {value: 'value2', text: 'text2', selected: true},
                {value: 'value3', text: 'text3'}
            ]
        }).render();

        var option = $('[data-selected=true]');
        expect(select.getOption(2)[0]).to.be(select.options[2]);
        expect(select.getOption('[data-selected=true]')[0])
            .to.be(select.options[1]);
        expect(select.getOption(option)[0]).to.be(select.options[1]);
    });

    it('remove option', function() {
        trigger = $('<a href="#" id="example"></a>')
            .appendTo(document.body);
        select = new Select({
            trigger: '#example',
            model: [
                {value: 'value1', text: 'text1'},
                {value: 'value2', text: 'text2'},
                {value: 'value3', text: 'text3', selected: true}
            ]
        }).render();

        select.removeOption(0);
        expect(select.get('length')).to.be(2);
        expect(select.get('selectedIndex')).to.be(1);
    });

    it('remove selected option', function() {
        trigger = $('<a href="#" id="example"></a>')
            .appendTo(document.body);
        select = new Select({
            trigger: '#example',
            model: [
                {value: 'value1', text: 'text1'},
                {value: 'value2', text: 'text2', selected: true},
                {value: 'value3', text: 'text3'}
            ]
        }).render();

        var option = select.options[2];
        select.removeOption('[data-selected=true]');
        expect(select.get('length')).to.be(2);
        expect(select.get('selectedIndex')).to.be(0);
        expect(select.options[1]).to.be(option);
    });

    it('add option', function() {
        trigger = $('<a href="#" id="example"></a>')
            .appendTo(document.body);
        select = new Select({
            trigger: '#example',
            model: [
                {value: 'value1', text: 'text1'},
                {value: 'value2', text: 'text2', selected: true},
                {value: 'value3', text: 'text3'}
            ]
        }).render();
        select.addOption({value: 'value4', text: 'text4'});

        var option = select.options.eq(3);
        expect(select.get('length')).to.be(4);
        expect(option.attr('data-value')).to.be('value4');
        expect(option.html()).to.be('text4');
    });

    it('disabledChange', function() {
        trigger = $('<a href="#" id="example"></a>')
            .appendTo(document.body);
        var spy = sinon.spy();
        select = new Select({
            trigger: '#example',
            model: [
                {value: 'value1', text: 'text1'},
                {value: 'value2', text: 'text2', selected: true},
                {value: 'value3', text: 'text3'}
            ]
        }).on('disabledChange', spy);

        var selected = select.options.eq(1);
        select.render();
        expect(spy.callCount).to.be(1);
        expect(spy.withArgs(selected, false).called).to.be.ok();

        select.set('disabled', true);
        // console.log(spy.callCount)
        expect(spy.callCount).to.be(2);
        expect(spy.withArgs(selected, true).called).to.be.ok();
    });

    it('model should clone', function() {
        var example1 = $('<a href="#" id="example1"></a>')
            .appendTo(document.body);
        var example2 = $('<a href="#" id="example2"></a>')
            .appendTo(document.body);

        var model = [
            {value: 'value1', text: 'text1'},
            {value: 'value2', text: 'text2'}
        ];

        var select1 = new Select({
            trigger: '#example1',
            model: model
        }).render();

        var select2 = new Select({
            trigger: '#example2',
            model: model
        }).render();

        expect(select1.get('selectedIndex')).to.be(0);
        expect(select2.get('selectedIndex')).to.be(0);
        example1.remove();
        example2.remove();
    });

    it('sync selectSource when select', function() {
        trigger = $('<select id="example"><option value="value1">text1</option><option value="value2">text2</option></select>')
            .appendTo(document.body);
        select = new Select({
            trigger: '#example'
        }).render();

        select.set('selectedIndex', 1);
        expect(select.get('selectSource')[0].value).to.be('value2');

        select.syncModel([
            {value: 'value3', text: 'text3'},
            {value: 'value4', text: 'text4', selected: true}
        ]);
        expect(select.get('selectSource')[0].value).to.be('value4');
    });

    it('sync selectSource when link', function() {
        trigger = $('<a href="#" id="example"></a>').appendTo(document.body);
        select = new Select({
            trigger: '#example',
            name: 'city',
            model: [
                {value: 'value1', text: 'text1'},
                {value: 'value2', text: 'text2'}
            ]
        }).render();

        select.set('selectedIndex', 1);
        expect(select.get('selectSource')[0].value).to.be('value2');

        select.syncModel([
            {value: 'value3', text: 'text3'},
            {value: 'value4', text: 'text4', selected: true}
        ]);
        expect(select.get('selectSource')[0].value).to.be('value4');
    });

    it('disable & enable option', function() {
        trigger = $('<a href="#" id="example"></a>')
            .appendTo(document.body);
        select = new Select({
            trigger: '#example',
            model: [
                {value: 'value1', text: 'text1'},
                {value: 'value2', text: 'text2', selected: true},
                {value: 'value3', text: 'text3'}
            ]
        }).render();
        select.disableOption(2);
        expect(select.options.eq(2).data('disabled')).to.be.ok();
        select.enableOption(2);
        expect(select.options.eq(2).data('disabled')).not.to.be.ok();
    });

    it('html sync to model', function() {
        trigger = $('<a href="#" id="example"></a>')
            .appendTo(document.body);
        select = new Select({
            trigger: '#example',
            model: [
                {value: 'value1', text: 'text1'},
                {value: 'value2', text: 'text2', selected: true},
                {value: 'value3', text: 'text3'}
            ]
        }).render();
        select.select(0);
        expect(select.get('model').select[0].selected).to.be.ok();
        select.select(1);
        expect(select.get('model').select[1].selected).to.be.ok();
        select.select(2);
        expect(select.get('model').select[2].selected).to.be.ok();
    });

    it('html original select should be visiable', function() {
        trigger = $('<select id="example"><option value="value1">text1</option><option value="value2">text2</option></select>').appendTo(document.body);
        select = new Select({
            trigger: '#example'
        }).render();
        expect(select.get('selectSource').is(':visible')).to.be.ok();
    });

    it('#54 completeModel bug', function () {
        trigger = $('<a href="#" id="example"></a>')
            .appendTo(document.body);
        select = new Select({
            trigger: '#example',
            model: [
                {value: 'value1', text: 'text1', selected: true},
                {value: 'value2', text: 'text2'},
                {value: 'value3', text: 'text3', selected: true},
                {value: 'value4', text: 'text4', selected: true}
            ]
        }).render();
        expect(select.get('model').select[0].selected).not.to.be.ok();
        expect(select.get('model').select[1].selected).not.to.be.ok();
        expect(select.get('model').select[2].selected).not.to.be.ok();
        expect(select.get('model').select[3].selected).to.be.ok();
    })
});
