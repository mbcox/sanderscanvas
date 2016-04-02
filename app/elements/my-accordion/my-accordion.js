(function () {
    'use strict';

    Polymer({
        is: 'my-accordion',

        properties: {
            items: {
                type: Array,
                notify: true
            },
            selected: {
                type: String,
                notify: true
            }
        },

        ready: function () {
            //build up items for accordion-page elements
            //var pages = Polymer.dom(this).querySelectorAll("accordion-page");
            var pages = this.queryAllEffectiveChildren('accordion-page');
            this.items = [];
            for (var i = 0; i < pages.length; i++) {
                var page = pages[i];
                var item = {
                    key: page.getAttribute('key'),
                    title: page.getAttribute('title')
                };
                this.push('items', item);
            }
        },

        isSelected: function (key, selected) {
            return key === selected;
        },

        toggle: function (e) {
            var page = '#' + e.model.item.key;
            var toggleSection = Polymer.dom(this.root).querySelector(page);
            if (toggleSection != null) {
                toggleSection.toggle();
            }
        },

        getContentKey: function (key) {
            return "[key='" + key + "']";
        }
    });
})();