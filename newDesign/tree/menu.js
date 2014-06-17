/**
 * Created by a2014 on 14-6-10.
 */



    //构造函数
function Menu(cfg) {
    this.data = cfg.data || [];
    this.parent = cfg.parent || document.body;
    this.el = this.createBase();
    this.itemClick = cfg.itemClick;
    this.init();
}

//增加原型方法
Menu.prototype = {
    createBase: function () {
        var el = document.createElement('div');
        el.className = 'j-menu';
        this.el = el;
        this.setCss();
        return el;
    },
    setCss: function () {
        var s = this.el.style;
        s.position = 'absolute';
        s.zIndex = 0;
        s.background = '#b837d6';
        s.color = 'white';
        s.display = 'none';
        s.padding = '10px';
        s.border = '1px solid black';
        s.borderRadius = '5px';

    },
    createItem: function (type) {
        var item = document.createElement('div');
        item.className = 'menu-item';
        item.setAttribute('data-type', type);
        item.innerText = type;
        return item;
    },
    addEvent: function () {
        var me = this;
        this.el.onclick = function (e) {
            var dom = e.target;
            var fileType = dom.dataset['type'];
            if (dom.className.indexOf('menu-item') != -1) {
                if (!me.window) {
                    me.addWindow(fileType, function (fileName) {
                        //this is popup window
                        if (this.type != 'folder') {
                            fileName += ('.' + this.type);
                        }
                        if (me.itemClick) {
                            me.itemClick.call(me, e, this.type, fileName, fileName);
                        }
                    });
                } else {
                    me.window.type = fileType;
                    me.window.show();
                }
            }
        }
    },
    show: function (position) {
        this.el.style.top = position.y + 'px';
        this.el.style.left = position.x + 'px';
        this.el.zIndex = 999;
        this.el.style.display = 'block';
    },
    hide: function () {
        this.el.style.zIndex = 0;
        this.el.style.display = 'none';
    },
    destroy: function () {
        this.parent.removeChild(this.el);
    },
    addWindow: function (fileType, fn) {
        this.window = new windows({
            type: fileType,
            onClose: function (name) {
                fn && fn.call(this, name);
            }
        });
        this.window.show();
    },
    init: function (cfg) {
        //添加点击事件
        this.addEvent();
        //渲染到dom
        this.render();

    },
    render: function () {
        var me = this;
        Array.prototype.forEach.call(this.data, function (item) {
            me.el.appendChild(me.createItem(item.type));
        })
        this.parent.appendChild(this.el);
    }
}
