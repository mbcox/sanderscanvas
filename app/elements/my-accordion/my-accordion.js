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

            //autoset key property on pages
            var pages = this.queryAllEffectiveChildren('my-accordion-page');
            for (var i = 0; i < pages.length; i++) {
                pages[i].set('key', i + 1);
                pages[i].set('nested', this.nested);
            }
        },

        heard: function (e, detail, sender) {
            console.log('heard selected event - ' + detail.key);
            //first, check to see if we just toggled a new page...
            if (this.selected != detail.key) {
                this.set('selected', detail.key);
                var pages = this.queryAllEffectiveChildren('my-accordion-page');
                var scrollPage = null;
                var pageIndex = -1;
                for (var i = 0; i < pages.length; i++) {
                    var selPage = pages[i];
                    var isToggledPage = selPage.key === detail.key;
                    if (isToggledPage) {
                        //remember this page
                        pageIndex = i;
                        scrollPage = selPage;
                    } else {
                        //close any other pages
                        console.log('Closing page ' + (i + 1));
                        //selPage.set('isOpened', false); //pages[i].key === detail.key);
                        selPage.closeNoFire();
                    }                    
                }
                //now that we've closed all the other pages, we can scroll to the
                //new page. We must close the other pages first as that may
                //affect the scroll positioning.
                if (scrollPage) {
                    //scroll the toggled page to the top of the screen
                    this.async(function () {
                    var rect = this.absolutePosition(scrollPage); // selPage.getBoundingClientRect();
                    console.log('Scrolling page ' + (pageIndex + 1) + ' to top. window.scrollTo(0, ' + +rect.top + ')');
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
            console.log('closeAll called...');
            var pages = this.queryAllEffectiveChildren('my-accordion-page');
            for (var i = 0; i < pages.length; i++) {
                pages[i].set('isOpened', false);
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