(function () {
    'use strict';

    Polymer({
        is: 'my-imagemap',

        properties: {
            imgSrc: {
                type: String,
                value: ""
            },
            imgAlt: {
                type: String,
                value: ""
            },
            areas: {
                type: Array,
                value: []
            },
            test: {
                type: String,
                value: ""
            }
        },

        attached: function () {
            this.async(function () {
                var msg = this.imgAlt + this.imgSrc;

                var temp = [];
                var areas = this.queryAllEffectiveChildren('area');
                for (var i = 0; i < areas.length; i++) {
                    var a = areas[i];
                    var b = {
                        shape: a.getAttribute('shape'),
                        coords: a.getAttribute('coords'),
                        href: a.getAttribute('href'),
                        target: a.getAttribute('target'),
                        alt: a.getAttribute('alt')
                    }
                    temp.push(b);
                }
                this.set('areas', temp);
            });
        },

        ready: function () {
        }
    });
})();