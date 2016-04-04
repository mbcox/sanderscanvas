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
                var selected = pages[i].key === detail.key;
                pages[i].set('isSelected', selected); //pages[i].key === detail.key);
                //if (selected) {
                //    var selPage = pages[i];
                //    this.async(function () {
                //        var rect = selPage.getBoundingClientRect();
                //        window.scrollTo(0, rect.top);
                //    }, 250);
                //}
            }
            e.cancelBubble = true;            
        },

        getCssClass: function (nested) {
            return nested ? "subcontent" : "topcontent";
        },

        closeAll: function () {
            this.async(this.closeAllAsync, 100);
        },

        closeAllAsync: function () {
            var pages = this.queryAllEffectiveChildren('my-accordion-page');
            for (var i = 0; i < pages.length; i++) {
                pages[i].set('isSelected', false);
            }
        }        
    });
})();