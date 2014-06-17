/**
 * Created by a2014 on 14-5-29.
 * a list component
 */
require.define('newDesign/cpt/list2',
    [
        'newDesign/base',
        'newDesign/util',
        'newDesign/tpl'
    ], function (require) {
        var util = require('util');
        var base = require('base');
        var tpl = require('tpl');
        var list = function (o) {
            var div = document.createElement('div');
            div.className = 'win-list';
            this.container = div;
            this.tpl = tpl.l2;
            this.data = o.data|| {list:[]};
            this.initialized= o.initialized||false;
            this.render();
        };


        return util.inherit(list, base);
    })