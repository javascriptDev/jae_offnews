/**
 * Created by a2014 on 14-5-29.
 * a list component
 */
fml.define('hornbill/web/script-ss/cms/component/list3',
    [
        'hornbill/web/script-ss/cms/base',
        'hornbill/web/script-ss/cms/util',
        'hornbill/web/script-ss/cms/tpl'
    ], function (require) {
        var util = require('hornbill/web/script-ss/cms/util');
        var base = require('hornbill/web/script-ss/cms/base');
        var tpl = require('hornbill/web/script-ss/cms/tpl');
        var list = function (o) {
            var div = document.createElement('div');
            div.className = 'win-list';
            this.container = div;
            this.tpl = tpl.l3;
            this.data = o.data|| {list:[]};
            this.initialized= o.initialized||false;
            this.render();
        };


        return util.inherit(list, base);
    })