/**
 * Created by a2014 on 14-5-29.
 * event manager
 * pub
 * sub
 * fire
 */
require.define('newDesign/workSpace', ['newDesign/eventManager'], function (require, exports) {
    var em = require('newDesign/eventManager');
    var workSpace = function () {
        this.el = this.createBase();

        this.childs = [];
        this.init();
    }
    workSpace.prototype = {
        createBase: function () {
            var div = document.createElement('div');
            div.className = 'win-work-space';
            div.style.height = '100%';
            return div;
        },
        init: function () {
            this.createBase();
            //add drop event
            this.addEvent();
            //sub save event
            this.subEvent();
        },
        subEvent: function () {
            em.event.sub(em.type.saveProperty, this.saveProperty);
            em.event.sub(em.type.updateLayout, this.update);
        },
        addEvent: function () {
            function isUp(x1, x2) {
                if (x2 > x1) {
                    return false;
                } else {
                    return true;
                }

            }

            var me = this;
            //拖拽判断所需条件
            var o = {};
            this.el.ondrop = function (e) {
                //从tree 拖过来组件，创建对象
                if (!me.isInnerDrag) {
                    e.preventDefault();
                    var alias = e.dataTransfer.getData("alias");
                    var ctl = me.createCtlByType(alias);
//                    ctl.element.style.position = 'absolute';
                    me.addChild(ctl.element);
                    em.event.pub(em.type.showProperty, ctl);
                } else {
                    //内部拖拽排序
                    me.isInnerDrag = false;
                    //drop后调整child顺序
                    var next = me.getNextChild(o.el);
                    me.el.removeChild(o.el);
                    if (next) {
                        me.el.insertBefore(o.el, next.dom);
                    } else {//最后一个
                        //改变位置
                        me.el.appendChild(o.el);
                    }
                }
            }
            this.el.ondragover = function (e) {
                e.preventDefault();
            }
            this.el.ondragstart = function (e) {
                //防止从tree拖物体进入，触发 dragenter
                //在拖拽过程中显示痕迹
                e.dataTransfer.setData('o', 1);
                me.isDrag = true;
                //防止内部拖拽排序时候触发创建对象(走tree 拖进来的步骤)
                me.isInnerDrag = true;
                o.el = e.target;//.className.indexOf('win-list') == -1 ? e.target.offsetParent : e.target;

                o.p = me.getDis(e.target);
                o.height = e.target.offsetHeight;
                o.y = e.y;
                //清空enterel。防止第二次反向拖拽，不能正确排序
                o.enterEl = null;
            }
            this.el.ondragenter = function (e) {
                //enter 进入的 dom 是 元素内的所有子元素
                if (me.isDrag) {
                    var time = 200;
                    var target = e.target.offsetParent;
                    if (target != o.el && target.className.indexOf('win-list') != -1) {
                        var a = o.p;
                        //防止在动画过程中，同一个元素多次触发enter事件
                        if (o.enterEl != target) {
                            o.enterEl = target;
                            var targetDistance = 0;
                            //判断拖拽方向
                            if (isUp(o.y, e.y)) {
                                targetDistance = (a + (o.height - target.offsetHeight));
                                o.p = me.getDis(target);
                            } else {
                                targetDistance = a;
                                o.p = me.getDis(target) + (target.offsetHeight - o.height);
                            }
                            //移动元素
                            me.animate(target, targetDistance);
                            //防止多次触发事件
                            setTimeout(function () {
                                me.animate(o.el, o.p)
                            }, time)
                        }
                    }
                }
            }
        },
        getDis: function (element) {
            return  parseInt(element.style.webkitTransform.split(',')[1])
        },
        update: function () {
            var dom = this.element;
            var base = dom.offsetHeight;
            var getDis = function (element) {
                return  parseInt(element.style.webkitTransform.split(',')[1])
            }
            var animate = function (el, distance) {
                var s = 'translate3d(0,' + distance + 'px,0) ';
                el.style.webkitTransform = s;
                el.style.mozTransform = s;
                el.style.transform = s;
            }
            var setNextEl = function (dom, dis) {
                var next = dom.nextElementSibling;
                if (next) {
                    animate(dom, getDis(dom) + dis);
                    setNextEl(next, dis);
                } else {
                    animate(dom, getDis(dom) + dis);
                }
            };
            var nextEl = dom.nextElementSibling;
            nextEl && setNextEl(nextEl, getDis(dom) + base - getDis(nextEl));
        },
        //根据 transform 坐标获取下一个元素
        getNextChild: function (child) {
            var me = this;
            var els = this.childs;
            var dis = this.getDis(child);
            return els.filter(function (item) {
                return  me.getDis(item.element) > dis;
            }).sort(function (item1, item2) {
                return me.getDis(item1.element) > me.getDis(item2.element);
            })[0];

        },
        animate: function (el, distance) {
            var s = 'translate3d(0,' + distance + 'px,0) ';
            el.style.webkitTransform = s;
            el.style.mozTransform = s;
            el.style.transform = s;
        },
        addChild: function (html) {
            html.setAttribute('draggable', true);
            this.el.appendChild(html);
            this.setPosition(html);
        },
        setPosition: function (dom) {
            var y = 0;
            Array.prototype.forEach.call(this.el.querySelectorAll('.win-list'), function (item) {
                if (item != dom) {
                    y += item.offsetHeight;
                }
            })
            this.animate(dom, y);
        },
        saveProperty: function (cfg) {
            //’this‘ is the control that you edit
            alert('save success');
            for (var i in cfg) {
                this[i] = cfg[i];
            }
            this.render();
        },
        createCtlByType: function (alias, o) {
            var me = this;

            var obj = jex.create(alias);


            me.childs.push(obj);
            obj.element.onclick = function () {
                em.event.pub(em.type.showProperty, obj);
            };
            //todo::
            return obj;
        },
        clear: function () {
        },
        sendToServer: function () {
            var data = [];
            this.child.forEach(function (item) {
                data.push({
                    type: item.type,
                    data: item.data
                })
            })
            var s = JSON.stringify(data);
            localStorage.setItem('data', s);
        },
        save: function () {

        },
        clear: function () {
            this.el.innerHTML = '';
        },
        recover: function () {
            var me = this;
            this.clear();
            this.child = [];
            var data = localStorage.getItem('data');
            JSON.parse(data).forEach(function (item) {
                //控件有个状态标示
                if (item.data.list.length > 0) {
                    item.initialized = true;
                } else {
                    item.initialized = false;
                }
                var ctl = me.createCtlByType(item.type, item);
                me.addChild(ctl.element);
            })
        }
    }
    return workSpace;
})