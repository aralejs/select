define(function(require) {

    var $ = require('jquery');
    var Select = require('../src/select');

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

        describe('init when trigger is select', function() {
            test('option set selected', function() {
                trigger = $('<select id="example"><option value="value1">text1</option><option value="value2" selected>text2</option></select>').appendTo(document.body);
                select = new Select({
                    trigger: '#example'
                }).render();

                expect(trigger.is(':hidden')).toBeTruthy();
                expect(select.get('trigger').html()).toBe('text2');
                expect(select.get('value')).toBe('value2');
                expect(select.get('length')).toBe(2);
                expect(select.get('selectedIndex')).toBe(1);
                expect(select.options.eq(0).attr('data-selected'))
                    .toBe('false');
                expect(select.options.eq(0).attr('data-defaultSelected'))
                    .toBe('false');
                expect(select.options.eq(1).attr('data-selected'))
                    .toBe('true');
                expect(select.options.eq(1).attr('data-defaultSelected'))
                    .toBe('true');
            });

            test('option does not set selected', function() {
                trigger = $('<select id="example"><option value="value1">text1</option><option value="value2">text2</option></select>').appendTo(document.body);
                select = new Select({
                    trigger: '#example'
                }).render();

                expect(trigger.is(':hidden')).toBeTruthy();
                expect(select.get('trigger').html()).toBe('text1');
                expect(select.get('value')).toBe('value1');
                expect(select.get('selectedIndex')).toBe(0);
                expect(select.options.eq(0).attr('data-selected'))
                    .toBe('true');
                expect(select.options.eq(0).attr('data-defaultSelected'))
                    .toBe('false');
                expect(select.options.eq(1).attr('data-selected'))
                    .toBe('false');
                expect(select.options.eq(1).attr('data-defaultSelected'))
                    .toBe('false');
            });

            test('option set double selected ', function() {
                trigger = $('<select id="example"><option value="value1" selected>text1</option><option value="value2" selected>text2</option></select>').appendTo(document.body);
                select = new Select({
                    trigger: '#example'
                }).render();

                expect(trigger.is(':hidden')).toBeTruthy();
                expect(select.get('trigger').html()).toBe('text2');
                expect(select.get('value')).toBe('value2');
                expect(select.get('selectedIndex')).toBe(1);
                expect(select.options.eq(0).attr('data-selected'))
                    .toBe('false');
                expect(select.options.eq(0).attr('data-defaultSelected'))
                    .toBe('true');
                expect(select.options.eq(1).attr('data-selected'))
                    .toBe('true');
                expect(select.options.eq(1).attr('data-defaultSelected'))
                    .toBe('true');
            });
        });

        describe('init when trigger is not select', function() {
            test('model does not set selected', function() {
                trigger = $('<a href="#" id="example"></a>').appendTo(document.body);
                select = new Select({
                    trigger: '#example',
                    model: [
                        {value: 'value1', text: 'text1'},
                        {value: 'value2', text: 'text2'}
                    ]
                }).render();

                expect(select.get('trigger').html()).toBe('text1');
                expect(select.get('value')).toBe('value1');
                expect(select.get('length')).toBe(2);
                expect(select.get('selectedIndex')).toBe(0);
                expect(select.options.eq(0).attr('data-selected'))
                    .toBe('true');
                expect(select.options.eq(0).attr('data-defaultSelected'))
                    .toBe('false');
                expect(select.options.eq(1).attr('data-selected'))
                    .toBe('false');
                expect(select.options.eq(1).attr('data-defaultSelected'))
                    .toBe('false');
            });

            test('model set selected', function() {
                trigger = $('<a href="#" id="example"></a>').appendTo(document.body);
                select = new Select({
                    trigger: '#example',
                    model: [
                        {value: 'value1', text: 'text1'},
                        {value: 'value2', text: 'text2', selected: true}
                    ]
                }).render();

                expect(select.get('trigger').html()).toBe('text2');
                expect(select.get('value')).toBe('value2');
                expect(select.get('length')).toBe(2);
                expect(select.get('selectedIndex')).toBe(1);
                expect(select.options.eq(0).attr('data-selected'))
                    .toBe('false');
                expect(select.options.eq(0).attr('data-defaultSelected'))
                    .toBe('false');
                expect(select.options.eq(1).attr('data-selected'))
                    .toBe('true');
                expect(select.options.eq(1).attr('data-defaultSelected'))
                    .toBe('true');
            });

            test('model set double selected', function() {
                trigger = $('<a href="#" id="example"></a>').appendTo(document.body);
                select = new Select({
                    trigger: '#example',
                    model: [
                        {value: 'value1', text: 'text1', selected: true},
                        {value: 'value2', text: 'text2', selected: true}
                    ]
                }).render();

                expect(select.get('trigger').html()).toBe('text2');
                expect(select.get('value')).toBe('value2');
                expect(select.get('selectedIndex')).toBe(1);
                expect(select.options.eq(0).attr('data-selected'))
                    .toBe('false');
                expect(select.options.eq(0).attr('data-defaultSelected'))
                    .toBe('true');
                expect(select.options.eq(1).attr('data-selected'))
                    .toBe('true');
                expect(select.options.eq(1).attr('data-defaultSelected'))
                    .toBe('true');
            });
        });

    describe('select function', function() {
        test('by index', function() {

        });
        test('by selector', function() {

        });
        test('by dom', function() {

        });
    });
    });
});
