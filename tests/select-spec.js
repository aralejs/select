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
            test('and option does not set selected', function() {
                trigger = $('<select id="example"><option value="value1">text1</option><option value="value2">text2</option></select>').appendTo(document.body);
                select = new Select({
                    trigger: '#example'
                }).render();

                expect(select.get('selectSource')[0]).toBe(trigger[0]);
                expect(trigger.is(':hidden')).toBeTruthy();
                expect(select.get('trigger').html()).toBe('text1');
                expect(select.get('value')).toBe('value1');
                expect(select.get('selectedIndex')).toBe(0);
                expect(select.currentItem[0]).toBe(select.element.find('[data-role=item]')[0]);
                expect(select.options.eq(0).attr('data-selected'))
                    .toBe('true');
                expect(select.options.eq(0).attr('data-defaultSelected'))
                    .toBe('false');
                expect(select.options.eq(1).attr('data-selected'))
                    .toBe('false');
                expect(select.options.eq(1).attr('data-defaultSelected'))
                    .toBe('false');
            });

            test('and option set selected', function() {
                trigger = $('<select id="example"><option value="value1">text1</option><option value="value2" selected>text2</option></select>').appendTo(document.body);
                select = new Select({
                    trigger: '#example'
                }).render();

                expect(select.get('selectSource')[0]).toBe(trigger[0]);
                expect(trigger.is(':hidden')).toBeTruthy();
                expect(select.get('trigger').html()).toBe('text2');
                expect(select.get('value')).toBe('value2');
                expect(select.get('length')).toBe(2);
                expect(select.get('selectedIndex')).toBe(1);
                expect(select.currentItem[0]).toBe(select.element.find('[data-role=item]')[1]);
                expect(select.options.eq(0).attr('data-selected'))
                    .toBe('false');
                expect(select.options.eq(0).attr('data-defaultSelected'))
                    .toBe('false');
                expect(select.options.eq(1).attr('data-selected'))
                    .toBe('true');
                expect(select.options.eq(1).attr('data-defaultSelected'))
                    .toBe('true');
            });

            test('and option set double selected ', function() {
                trigger = $('<select id="example"><option value="value1" selected>text1</option><option value="value2" selected>text2</option></select>').appendTo(document.body);
                select = new Select({
                    trigger: '#example'
                }).render();

                expect(select.get('selectSource')[0]).toBe(trigger[0]);
                expect(trigger.is(':hidden')).toBeTruthy();
                expect(select.get('trigger').html()).toBe('text2');
                expect(select.get('value')).toBe('value2');
                expect(select.get('selectedIndex')).toBe(1);
                expect(select.currentItem[0]).toBe(select.element.find('[data-role=item]')[1]);
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
            test('and model does not set selected', function() {
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

            test('and model set selected', function() {
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

            test('and model set double selected', function() {
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

                expect(select.get('trigger').html()).toBe('text3');
                expect(select.get('value')).toBe('value3');
                expect(select.get('selectedIndex')).toBe(2);
                expect(select.options.eq(1).attr('data-defaultSelected'))
                    .toBe('true');
                expect(select.options.eq(1).attr('data-selected'))
                    .toBe('false');
                expect(select.options.eq(2).attr('data-defaultSelected'))
                    .toBe('false');
                expect(select.options.eq(2).attr('data-selected'))
                    .toBe('true');
            });
            test('by selector', function() {
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

                expect(select.get('trigger').html()).toBe('text3');
                expect(select.get('value')).toBe('value3');
                expect(select.get('selectedIndex')).toBe(2);
                expect(select.options.eq(1).attr('data-defaultSelected'))
                    .toBe('true');
                expect(select.options.eq(1).attr('data-selected'))
                    .toBe('false');
                expect(select.options.eq(2).attr('data-defaultSelected'))
                    .toBe('false');
                expect(select.options.eq(2).attr('data-selected'))
                    .toBe('true');

            });
            test('by dom', function() {
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

                expect(select.get('trigger').html()).toBe('text3');
                expect(select.get('value')).toBe('value3');
                expect(select.get('selectedIndex')).toBe(2);
                expect(select.options.eq(1).attr('data-defaultSelected'))
                    .toBe('true');
                expect(select.options.eq(1).attr('data-selected'))
                    .toBe('false');
                expect(select.options.eq(2).attr('data-defaultSelected'))
                    .toBe('false');
                expect(select.options.eq(2).attr('data-selected'))
                    .toBe('true');

            });
        });
            test('set disabled', function() {
            });
            test('set prefix', function() {
            });
            test('set triggerTemplate', function() {
            });
    });
});
