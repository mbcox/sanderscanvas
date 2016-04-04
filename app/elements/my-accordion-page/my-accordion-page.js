(function () {
    'use strict';

    Polymer({
        is: 'my-accordion-page',

        properties: {
            key: String,
            title: String,
            isSelected: {
                type: Boolean,
                value: false
            },
            isOpened: {
                type: Boolean,
                value: true
            }
        },

        toggle: function () {
            this.$.panel.toggle();
            this.isOpened = this.$.panel.opened;
            this.fire('selected', { key: this.key });
            var subPanels = this.queryAllEffectiveChildren('my-accordion');
            if (!this.isOpened) {
                for (var i = 0; i < subPanels.length; i++) {
                    subPanels[i].closeAll();
                }
            }
        },

        showDropDown: function (selected, isOpened) {
            return !selected || !isOpened;
        },

        isFirst: function (key) {
            return key !== "1" ? "noTopBorder" : "";
        }
    });
})();