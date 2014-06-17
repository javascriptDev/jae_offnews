/**
 * Created by a2014 on 14-5-29.
 */
require.define('newDesign/eventManager', [], function (require, exports) {
    var EventMgr = function () {
        var events = {};

        var exist = function (type) {
            var is = false;
            if (events[type]) {
                is = true;
            }
            return is;
        }

        var pub = function (type, scope, cfg) {
            events[type].forEach(function (item) {
                item.call(scope, cfg);
            })
        }
        var sub = function (type, fn) {
            exist(type) ? events[type].push(fn) : events[type] = new Array(fn);
        }
        var fire = function (type, opt) {
            pub(type);
        }

        this.pub = pub;
        this.sub = sub;
        this.fire = fire;

    }


    exports.event = new EventMgr();
    exports.type = {
        showProperty: 'showp',
        saveProperty: 'savep',
        updateLayout:'ol'
    }


})