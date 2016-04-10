(function () {
    'use strict';

    Polymer({
        is: 'my-map',
        extends: 'map',
        properties: {
            areas: Array,
            value: [],
            observer: '_areasChanged'
        },
        _areasChanged: function (newValue, oldValue) {
            var n = Polymer.dom(this.root);
            while (n.firstChild) {
                n.removeChild(n.firstChild);
            }
            for (var i = 0; i < this.areas.length; i++) {
                var a = this.areas[i];
                var area = document.createElement('area');
                area.setAttribute('shape', a.shape);
                area.setAttribute('coords', a.coords);
                area.setAttribute('href', a.href);
                area.setAttribute('target', a.target);
                area.setAttribute('alt', a.alt);
                Polymer.dom(this.root).appendChild(area);
            }
        }
    });
})();