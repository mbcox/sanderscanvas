(function () {
    'use strict';

    Polymer({
        is: 'my-accordion-page',

        properties: {
            key: String,
            title: String,
            isSelected: {
                type: Boolean,
                value: false//,
                //observer: '_isSelectedChanged'
            },
            isOpened: {
                type: Boolean,
                value: false,
                observer: '_isOpenedChanged'
            },
            linkUrl: {
                type: String,
                value: null
            },
            nested: {
                type: Boolean,
                value: false
            }
        },

        toggle: function () {
            var panel = Polymer.dom(this.root).querySelector('iron-collapse');
            //panel.toggle();
            this.set('isOpened', !panel.opened);
            //this.fire('selected', { key: this.key });                        
            //this.closeNested();
        },

        showDropDown: function (selected, isOpened) {
            return !selected || !isOpened;
        },

        isFirst: function (key) {
            return key !== "1" ? "noTopBorder" : "";
        },

        isLink: function (url) {
            return url != null;
        },

        //attached: function () {
        //    var el = Polymer.dom(this).parentNode;
        //    while (el != null) {
        //        if (el.tagName != null && el.tagName.toLowerCase() === 'my-accordion') {
        //            this.set('nested', !!el.nested);
        //            break;
        //        }
        //        el = el.parentNode;
        //    }
        //},

        getCssClass: function (key, nested) {
            var classes = [];            
            if (key !== "1") {
                classes.push('noTopBorder');
            }
            if (!!nested) {
                classes.push('drawer-' + key);
                classes.push('subcontent-page');
            } else {
                classes.push('topcontent-page');                
            }
            return classes.join(' ');
        },

        getBackgroundCss: function (key, nested) {
            var classes = [];
            if (nested != true) {
                classes.push('drawer-' + key);
            }            
            return classes.join(' ');
        },

        getBorderCss: function (key, nested, opened) {
            var panel = Polymer.dom(this.root).querySelector('iron-collapse');
            var button = Polymer.dom(this.root).querySelector('paper-button');

            if (panel && button) {
                var isNested = !!nested;
                var isOpened = !!opened;

                panel.toggleClass('nested-content', isNested);
                button.toggleClass('nested-content', isNested);

                if (isNested) {
                    var hideTopBorder = key != 1;
                    panel.toggleClass('noTopBorder', hideTopBorder);
                    button.toggleClass('noTopBorder', hideTopBorder);
                }
            }

            //var classes = [];
            //if (!!nested) {                
            //    classes.push('nested-content');
            //    if (key != 1) {
            //        classes.push('noTopBorder');
            //    }
            //}
            //if (!isOpened) {
            //    //classes.push('iron-collapse-closed');
            //}
            //if (additional != null) {
            //    classes.push(additional);
            //}
            //if (!!nested) {
            //    console.log('  Subdrawer #' + key + ' - ' + classes.join(' '));
            //} else {
            //    console.log('Drawer #' + key + ' - ' + classes.join(' '));
            //}
            

            //return classes.join(' ');
        },

        _closing: false,

        _isOpenedChanged: function (newValue, oldValue) {
            if (oldValue !== undefined) {
                console.log('isOpened for page ' + this.key + ' changed from ' + oldValue + ' to ' + newValue);
                //var panel = Polymer.dom(this.root).querySelector('iron-collapse');
                //panel.toggle();
                //this.isOpened = panel.opened;
                this.closeNested();
                if (!this._closing) {
                    console.log('firing selected event...');
                    this.fire('selected', { key: this.key });
                }
            }

            //if (!newValue && !!oldValue) {
            //    this.closeNested();
            //}
        },                

        closeNoFire: function () {
            this._closing = true;
            this.set('isOpened', false);
            this._closing = false;
        },

        closeNested: function () {
            if (!this.isOpened) {
                var subPanels = this.queryAllEffectiveChildren('my-accordion');
                for (var i = 0; i < subPanels.length; i++) {
                    subPanels[i].closeAll();
                }
            }
        }
        /*
        _isSelectedChanged: function (newValue, oldValue) {
            var drawers = this.queryAllEffectiveChildren('my-accordion');
            for (var i = 0; i < drawers.length; i++) {
                drawers[i].closeAll();
            }
        }*/
    });
})();