(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory(require('jquery'));
    } else {
        factory(root.jQuery);
    }
}(this, function ($) {

    var prefixes = ['#', '.'];

    function selectorString(el) {
        return (el.tagName + ['id', 'class'].map(function (key, i) {
            var str = $(el).attr(key);
            return str ? prefixes[i].concat(str.split(' ').join(prefixes[i])) : str;
        }).join('')).toLowerCase();
    }

    $.fn.getSelector = function (parentSel) {
        parentSel = parentSel || 'html';
        return this.map(function () {
            return $(this).parentsUntil(parentSel).map(function (i, el) {
                return selectorString(el);
            }).toArray().reverse().join(' ').concat(' ' + selectorString(($(this).eq(0))[0]));
        }).toArray().join(', ');
    };

}));