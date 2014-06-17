/**
 * Created by addison on 14-5-28.
 * component base class.
 */

require.define('base',
    [
        'tplHelper',
        'popup',
        'eventManager'
    ],
    function (require, exports) {
        var tplHelper = require('tplHelper');
        var popup = require('popup');
        var em = require('eventManager');

        var base = function (o) {
            this.initialized = o.initialized || false;
            this.data = o.data || [];
            this.render();
        }
        base.prototype = {
            render: function () {
                this.id = 'c' + Math.random();
                if (this.initialized) {
                    var html = tplHelper.template.compile(this.tpl)(this.data);
                    if (this.container) {
                        this.container.innerHTML = html;
                        this.el = this.container.outerHTML;
                        this.dom = this.container;
                    } else {
                        this.dom = document.createElement('div').appendChild(html);
                        this.el = dom.outerHTML;
                    }
                } else {
                    this.initialized = true;
                    var empty = document.createElement('div');
                    empty.innerHTML = '请添加数据';

                    if (this.container) {
                        this.container.innerHTML = empty.outerHTML;
                        this.el = this.container.outerHTML;
                        this.dom = this.container;
                    } else {
                        this.dom = document.createElement('div').appendChild(empty);
                        this.el = dom.outerHTML;
                    }
                }
                this.dom.id = Math.random();
                this.height = this.dom.offsetHeight;
                this.placeholder = 18;
                this.dom.style.background = '#' + Math.ceil(Math.random() * 1000) % 10 + Math.ceil(Math.random() * 1000) % 10 + Math.ceil(Math.random() * 1000) % 10;
                this.dom.style.color = '#' + Math.ceil(Math.random() * 1000) % 10 + Math.ceil(Math.random() * 1000) % 10 + Math.ceil(Math.random() * 1000) % 10;
            },
            //重新渲染，触发 work space update layout 事件
            reRender: function () {
                this.lastH = this.height;
                this.render();
                this.height = this.dom.offsetHeight;
                var me = this;
                setTimeout(function () {
                    em.event.pub(em.type.updateLayout, me);
                }, 300)

            },
            init: function () {
            },
            destroy: function () {
                this.dom.parentNode.removeChild(this.dom);
            },
            addChild: function () {
            },
            getChild: function () {
            },
            addStore: function (o, close) {
                new popup({
                    target: o,
                    onClose: close == undefined ? function () {
                    } : close
                });
            }
        }
        return base;
    })
