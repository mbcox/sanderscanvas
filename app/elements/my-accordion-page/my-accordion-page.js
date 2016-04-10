(function () {
    'use strict';

    Polymer({
        is: 'my-accordion-page',

        behaviors: [
            Polymer.NeonAnimationRunnerBehavior
        ],

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
            /*,
            animationConfig: {
                value: function () {
                    return {
                        'opening': {
                            name: '',
                            node: this
                        },
                        'closing': {
                            name: '',
                            node: this
                        }
                    }
                }
            },
            listeners: {
                'neon-animation-finish': '_onNeonAnimationFinish'
            }*/
        },

        toggle: function () {
            //toggle the closed state of the panel by modifying the
            //isOpened property of this element. The iron-collapse
            //has its opened attribute data-bound to the isOpened
            //property of this element.
            var panel = Polymer.dom(this.root).querySelector('iron-collapse');
            this.set('isOpened', !panel.opened);
        },

        isLink: function (url) {
            return url != null;
        },

        getBackgroundCss: function (key, nested) {
            return nested != true ? ('drawer-' + key) : '';
        },

        getDropdownIcon: function (opened) {
            return !!opened ? 'icons:arrow-drop-up' : 'icons:arrow-drop-down';
            //return !!opened ? 'hardware:keyboard-arrow-down' : 'hardware:keyboard-arrow-right';
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
        },

        _closing: false,

        _isOpenedChanged: function (newValue, oldValue) {
            //don't need to execute this when the property is initialized.
            if (oldValue !== undefined) {
                console.log('isOpened for page ' + this.key + ' changed from ' + oldValue + ' to ' + newValue);
                //if (this._closing) {
                    this.processChanged();
                //} else {
                    //this.async(this.processChanged, 2000);
                //}                
            }
        },

        processChanged: function () {            
            this.closeNested();
            if (!this._closing) {
                //this.playAnimation(newValue ? 'opening' : 'closing');

                //firing the selected event will allow the parent
                //accordion close any other pages.
                console.log('firing selected event...');
                this.fire('selected', { key: this.key });
                
                var panel = Polymer.dom(this.root).querySelector('iron-collapse');
                panel.toggleClass('disable-links', !this.isOpened);
            }
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
    });
})();