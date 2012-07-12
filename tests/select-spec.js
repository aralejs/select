define(function(require) {

    var $ = require('jquery');
    var Select = require('../src/select');

    describe('select', function() {

        var trigger, select;

        afterEach(function() {
//            if (select) {
//                select.destroy();
//                select = null;
//            }
//            if (trigger) {
//                trigger.remove();
//                trigger = null;
//            }
        });

        test('normal use', function() {
            trigger = $('<select id="example"><option value="value1">text1</option><option value="value2" selected>text2</option></select>').appendTo(document.body);
            select = new Select({
                trigger: '#example'
            }).render();

            expect(trigger.is(':hidden')).toBeTruthy();
            expect(select.get('trigger').html()).toBe('text2');
            expect(select.get('value')).toBe('text2');
            expect(select.get('length')).toBe(2);
            expect(select.get('selectedIndex')).toBe(1);
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
