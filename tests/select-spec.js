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

        test('normal use', function() {
            trigger = $('<select id="example"><option value="value1">text1</option><option value="value2">text2</option></select>').appendTo(document.body);
            select = new Select({
                trigger: '#example'
            }).render();

            expect(select.get('selectSource')[0]).toBe(trigger[0]);
            expect(trigger.is(':hidden')).toBeTruthy();
            expect(select.get('trigger').html()).toBe('text1');
            expect(select.get('value')).toBe('value1');
            expect(select.get('length')).toBe(2);
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

        describe('convert model', function() {
            test('no selected item when trigger is select', function() {
                trigger = $('<select id="example"><option value="value1">text1</option><option value="value2">text2</option></select>').appendTo(document.body);
                select = new Select({
                    trigger: '#example'
                }).render();

                var model = select.model.select;
                expect(model[0].defaultSelected).toBe('false');
                expect(model[0].selected).toBe('true');
                expect(model[0].value).toBe('value1');
                expect(model[0].text).toBe('text1');
                expect(model[1].defaultSelected).toBe('false');
                expect(model[1].selected).toBe('false');
                expect(model[1].value).toBe('value2');
                expect(model[1].text).toBe('text2');
            });

            test('select second item when trigger is select', function() {
                trigger = $('<select id="example"><option value="value1">text1</option><option value="value2" selected>text2</option></select>').appendTo(document.body);
                select = new Select({
                    trigger: '#example'
                }).render();

                var model = select.model.select;
                expect(model[0].defaultSelected).toBe('false');
                expect(model[0].selected).toBe('false');
                expect(model[0].value).toBe('value1');
                expect(model[0].text).toBe('text1');
                expect(model[1].defaultSelected).toBe('true');
                expect(model[1].selected).toBe('true');
                expect(model[1].value).toBe('value2');
                expect(model[1].text).toBe('text2');
            });

            test('select both item when trigger is select', function() {
                trigger = $('<select id="example"><option value="value1" selected>text1</option><option value="value2" selected>text2</option></select>').appendTo(document.body);
                select = new Select({
                    trigger: '#example'
                }).render();

                var model = select.model.select;
                expect(model[0].defaultSelected).toBe('true');
                expect(model[0].selected).toBe('false');
                expect(model[0].value).toBe('value1');
                expect(model[0].text).toBe('text1');
                expect(model[1].defaultSelected).toBe('true');
                expect(model[1].selected).toBe('true');
                expect(model[1].value).toBe('value2');
                expect(model[1].text).toBe('text2');
            });

            test('no selected item when trigger is other DOM', function() {
                trigger = $('<a href="#" id="example"></a>').appendTo(document.body);
                select = new Select({
                    trigger: '#example',
                    model: [
                        {value: 'value1', text: 'text1'},
                        {value: 'value2', text: 'text2'}
                    ]
                }).render();

                var model = select.model.select;
                expect(model[0].defaultSelected).toBe('false');
                expect(model[0].selected).toBe('true');
                expect(model[0].value).toBe('value1');
                expect(model[0].text).toBe('text1');
                expect(model[1].defaultSelected).toBe('false');
                expect(model[1].selected).toBe('false');
                expect(model[1].value).toBe('value2');
                expect(model[1].text).toBe('text2');
            });

            test('select second item when trigger is other DOM', function() {
                trigger = $('<a href="#" id="example"></a>').appendTo(document.body);
                select = new Select({
                    trigger: '#example',
                    model: [
                        {value: 'value1', text: 'text1'},
                        {value: 'value2', text: 'text2', selected: true}
                    ]
                }).render();

                var model = select.model.select;
                expect(model[0].defaultSelected).toBe('false');
                expect(model[0].selected).toBe('false');
                expect(model[0].value).toBe('value1');
                expect(model[0].text).toBe('text1');
                expect(model[1].defaultSelected).toBe('true');
                expect(model[1].selected).toBe('true');
                expect(model[1].value).toBe('value2');
                expect(model[1].text).toBe('text2');
            });

            test('select both item when trigger is other DOM', function() {
                trigger = $('<a href="#" id="example"></a>').appendTo(document.body);
                select = new Select({
                    trigger: '#example',
                    model: [
                        {value: 'value1', text: 'text1', selected: true},
                        {value: 'value2', text: 'text2', selected: true}
                    ]
                }).render();

                var model = select.model.select;
                expect(model[0].defaultSelected).toBe('true');
                expect(model[0].selected).toBe('false');
                expect(model[0].value).toBe('value1');
                expect(model[0].text).toBe('text1');
                expect(model[1].defaultSelected).toBe('true');
                expect(model[1].selected).toBe('true');
                expect(model[1].value).toBe('value2');
                expect(model[1].text).toBe('text2');
            });

        });

        describe('select function', function() {
            test('change event', function() {
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
                expect(count).toBe(0);

                select.render();
                expect(count).toBe(0);

                select.select(1);
                expect(count).toBe(0);

                select.select(2);
                expect(count).toBe(1);
            });

            test('hide after selected', function() {
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

                expect(select.get('visible')).toBe(false);
            });

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
                expect(select.get('selectedIndex')).toBe(2);
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
                expect(select.get('selectedIndex')).toBe(2);
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
                expect(select.get('selectedIndex')).toBe(2);
            });
        });

        test('set selectedIndex', function() {
            trigger = $('<a href="#" id="example"></a>').appendTo(document.body);
            select = new Select({
                trigger: '#example',
                model: [
                    {value: 'value1', text: 'text1'},
                    {value: 'value2', text: 'text2', selected: true},
                    {value: 'value3', text: 'text3'}
                ]
            }).render();

            expect(select.currentItem[0]).toBe(select.options.eq(1)[0]);
            expect(select.get('value')).toBe('value2');
            expect(select.get('trigger').html()).toBe('text2');
            expect(select.options.eq(1).attr('data-selected'))
                .toBe('true');
            expect(select.options.eq(2).attr('data-selected'))
                .toBe('false');

            var option = select.options[2];
            select.select(option);

            expect(select.currentItem[0]).toBe(option);
            expect(select.get('value')).toBe('value3');
            expect(select.get('trigger').html()).toBe('text3');
            expect(select.options.eq(1).attr('data-selected'))
                .toBe('false');
            expect(select.options.eq(2).attr('data-selected'))
                .toBe('true');
        });

        test('syncModel', function() {
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

            expect(select.get('trigger').html()).toBe('text4');
            expect(select.get('value')).toBe('value4');
            expect(select.get('length')).toBe(2);
            expect(select.get('selectedIndex')).toBe(1);
            expect(select.currentItem[0]).toBe(select.element.find('[data-role=item]')[1]);
            expect(select.options.eq(0).attr('data-defaultSelected'))
                .toBe('false');
            expect(select.options.eq(0).attr('data-selected'))
                .toBe('false');
            expect(select.options.eq(1).attr('data-defaultSelected'))
                .toBe('true');
            expect(select.options.eq(1).attr('data-selected'))
                .toBe('true');
        });

        test('trigger click', function() {
            trigger = $('<a href="#" id="example"></a>').appendTo(document.body);
            select = new Select({
                trigger: '#example',
                model: [
                    {value: 'value1', text: 'text1'},
                    {value: 'value2', text: 'text2', selected: true}
                ]
            }).render();

            trigger.click();
            expect(select.element.is(':hidden')).toBeFalsy();
            select.hide();
            expect(select.element.is(':hidden')).toBeTruthy();
        });

        test('set disabled', function() {
            trigger = $('<a href="#" id="example"></a>').appendTo(document.body);
            select = new Select({
                trigger: '#example',
                model: [
                    {value: 'value1', text: 'text1'},
                    {value: 'value2', text: 'text2', selected: true}
                ],
                disabled: true
            }).render();

            trigger.click();
            expect(trigger.hasClass('ui-select-disabled')).toBeTruthy();
            expect(select.element.is(':hidden')).toBeTruthy();
            select.hide();

            select.set('disabled', false);
            trigger.click();
            expect(trigger.hasClass('ui-select-disabled')).toBeFalsy();
            expect(select.element.is(':hidden')).toBeFalsy();
        });

        test('set prefix', function() {
            trigger = $('<select id="example"><option value="value1">text1</option><option value="value2" selected>text2</option></select>').appendTo(document.body);
            select = new Select({
                trigger: '#example',
                prefix: 'test'
            }).render();

            expect(select.element.hasClass('test')).toBeTruthy();
            expect(select.get('trigger').hasClass('test-trigger')).toBeTruthy();
            expect(select.$('.test-content').length).toBe(1);
            expect(select.$('.test-item').length).toBe(2);
            expect(select.options.eq(0).hasClass('test-selected')).toBeFalsy();
            expect(select.options.eq(1).hasClass('test-selected')).toBeTruthy();

            select.select(0);
            expect(select.options.eq(0).hasClass('test-selected')).toBeTruthy();
            expect(select.options.eq(1).hasClass('test-selected')).toBeFalsy();
        });

        test('attr name when trigger is select', function() {
            trigger = $('<select name="example" id="example"><option value="value1">text1</option><option value="value2" selected>text2</option></select>')
                .appendTo(document.body);
            select = new Select({
                trigger: '#example',
                prefix: 'test'
            }).render();

            expect(select.get('name')).toBe('example');
        });

        test('attr name when trigger is DOM', function() {
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

            expect(!$('#select-example')[0]).toBeFalsy();
            expect($('#select-example').attr('name')).toBe('example');
        });

        test('set trigger width', function() {
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

            expect(trigger.width()).toBe(180);
        });

        test('get option', function() {
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
            expect(select.getOption(2)[0]).toBe(select.options[2]);
            expect(select.getOption('[data-selected=true]')[0])
                .toBe(select.options[1]);
            expect(select.getOption(option)[0]).toBe(select.options[1]);
        });

        test('remove option', function() {
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
            expect(select.get('length')).toBe(2);
            expect(select.get('selectedIndex')).toBe(1);
        });

        test('remove selected option', function() {
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
            expect(select.get('length')).toBe(2);
            expect(select.get('selectedIndex')).toBe(0);
            expect(select.options[1]).toBe(option);
        });

        test('add option', function() {
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
            expect(select.get('length')).toBe(4);
            expect(option.attr('data-value')).toBe('value4');
            expect(option.html()).toBe('text4');
        });
    });
});
