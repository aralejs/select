define(function(require) {

    var $ = require('jquery');
    var Select = require('../src/select');

    describe('select', function() {

        afterEach(function() {
            trigger.remove();
            trigger = null;
        });

        test('normal use', function() {
            var trigger = $('<select id="example"><option value="value1">text1</option><option value="value2" selected>text2</option></select>');
            new Select({
                trigger: '#example'
            }).render();

            
        });
    });
});
