/**
 * Created by a2014 on 14-5-29.
 * a list component
 */
require.define('cpt/list4',
    [
        'base',
        'util',
        'tpl'
    ], function (require) {
        var util = require('util');
        var base = require('base');
        var tpl = require('tpl');
        var list = function (o) {
            var div = document.createElement('div');
            div.className = 'win-list';
            this.container = div;
            this.tpl = tpl.l4;
            this.data = o.data|| {list:[]};
            this.initialized= o.initialized||false;
            this.render();
        };


        return util.inherit(list, base);
    })