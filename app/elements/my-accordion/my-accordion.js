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
            },
            nested: Boolean
        },

        attached: function () {
            //this.heard({}, { key: this.selected }, null);
            var el = Polymer.dom(this).parentNode;
            while (el != null)
            {
                if (el.tagName != null && el.tagName.toLowerCase() === 'my-accordion')
                {
                    this.set('nested', true);
                    break;
                }
                el = el.parentNode;
            }
        },

        heard: function (e, detail, sender) {
            var pages = this.queryAllEffectiveChildren('my-accordion-page');
            for (var i = 0; i < pages.length; i++) {
                pages[i].set('isSelected', pages[i].key === detail.key);
            }
            e.cancelBubble = true;
        },

        getCssClass: function (nested) {
            return nested ? "subcontent" : "topcontent";
        },

        closeAll: function () {
            this.async(this.closeAllAsync, null, 100);
        },

        closeAllAsync: function () {
            var pages = this.queryAllEffectiveChildren('my-accordion-page');
            for (var i = 0; i < pages.length; i++) {
                pages[i].set('isSelected', false);
            }
        }
    });
})();