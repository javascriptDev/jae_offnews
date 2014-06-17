/**
 * Created by a2014 on 14-6-10.
 */
function windows(cfg) {
    this.el = this.createBase();
    this.onClose = cfg.onClose;
    this.type = cfg.type;
    this.init();

}

windows.prototype = {
    createBase: function () {
        var div = document.createElement('div');
        div.className = 'popup-window';
        div.innerHTML = '<div id="title" style="background: #000000;color: white;"></div><input type="text" id="name"><div class="btns"><button id="ok">确定</button><button id="cancel">取消</button></div>'
        return div;
    },
    setCss: function () {
        var s = this.el.style;
        s.position = 'absolute';
        s.top = '200px';
        s.left = '400px';
        s.width = '300px';
        s.height = '300px';
        s.display = 'none';
        s.background = '#e5b6f0';
        s.color = 'white';

    },
    addEvent: function () {
        me = this;
        this.ok.onclick = function (e) {
            me.name = me.val.value;
            me.close();
        }
        this.cancel.onclick = function (e) {
            me.close();
        }
    },
    show: function () {
        this.el.style.zIndex = 999;
        this.val.value = '';
        this.title.innerText = 'add    a    ' + this.type;
        this.el.style.display = 'block';
    },
    hide: function () {
        this.el.style.zIndex = 0;
        this.el.style.display = 'none';
    },
    close: function () {
        this.name = this.name || 'unName';
        this.hide();
        this.onClose && this.onClose.call(this, this.name);
    },
    init: function () {
        this.setCss();
        this.ok = this.el.querySelector('#ok');
        this.cancel = this.el.querySelector('#cancel');
        this.val = this.el.querySelector('#name');
        this.title = this.el.querySelector('#title');
        this.addEvent();
        this.render();

    },
    render: function () {
        document.body.appendChild(this.el);
    }

}