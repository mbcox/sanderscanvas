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
                //console.log('drawer ' + pages[i].key + ' ' + selected);
                if (selected) {
                    var selPage = pages[i];
                    this.async(function () {
                        var rect = this.absolutePosition(selPage); // selPage.getBoundingClientRect();
                        //console.log('Scroll to: ' + rect.top);
                        window.scrollTo(0, rect.top - 1);
                    }, 300);
                }
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
        },

        absolutePosition: function (el) {
            var
        found,
        left = 0,
        top = 0,
        width = 0,
        height = 0,
        offsetBase = el.offsetBase;
            if (!offsetBase && document.body) {
                offsetBase = el.offsetBase = document.createElement('div');
                offsetBase.style.cssText = 'position:absolute;left:0;top:0';
                document.body.appendChild(offsetBase);
            }
            if (el && el.ownerDocument === document && 'getBoundingClientRect' in el && offsetBase) {
                var boundingRect = el.getBoundingClientRect();
                var baseRect = offsetBase.getBoundingClientRect();
                found = true;
                left = boundingRect.left - baseRect.left;
                top = boundingRect.top - baseRect.top;
                width = boundingRect.right - boundingRect.left;
                height = boundingRect.bottom - boundingRect.top;
            }
            return {
                found: found,
                left: left,
                top: top,
                width: width,
                height: height,
                right: left + width,
                bottom: top + height
            };
        }
    });
})();