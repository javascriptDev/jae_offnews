/**
 * Created by a2014 on 14-5-29.
 */
fml.define('hornbill/web/script-ss/cms/popup', [], function () {

    var popup = function (o) {
        //target is list object
        var me = this;
        this.initialized = false;
        this.onClose = o.onClose;
        this.target = o.target;
        this.tpl = this.target.tpl;

        this.init();
    }
    popup.prototype = {
        init: function () {
            var me = this;
            //创建容器
            var div = document.createElement('div');
            div.className = 'win-popup';
            div.style.background = 'white';
            //已有数据源的展示
            var content = document.createElement('div');
            content.className = 'win-content';


            //创建功能按钮容器
            var tool = document.createElement('div');
            tool.className = 'win-tool';

            //关闭按钮
            var close = document.createElement('div');
            close.className = 'win-close btn';
            close.innerHTML = '关闭';
            div.appendChild(close);

            //多增一条数据
            var more = document.createElement('div');
            more.className = 'win-more btn';
            more.innerHTML = '+';

            //保存按钮
            var save = document.createElement('div');
            save.className = 'win-save btn';
            save.innerHTML = ' 保存';


            this.fillContent(content);
            div.appendChild(content);
            div.appendChild(this.createDom(this.getFields()));

            //添加控件
            tool.appendChild(close);
            tool.appendChild(save);
            tool.appendChild(more);

            div.appendChild(tool);


            this.el = div;
            //添加操作事件
            close.onclick = function () {
                me.destroy();
            }
            save.onclick = function () {
                me.getFormData();

            }
            more.onclick = function () {
                me.el.appendChild(me.createDom(me.getFields()));
            }


            var style = this.el.style;
            style.zIndex = 999;
            style.width = '1000px';
            style.height = '580px';
            style.position = 'absolute';
            style.top = '10px';
            style.left = '10px';
            style.border = '1px solid red';

            document.body.appendChild(this.el);

        },
        //如果第二次打开填充数据窗口，可能已经有数据，此时页面列出数据源
        fillContent: function (c) {
            var fields = this.getFields();
            var data = this.target.data.list;
            var html = '<table><tr class="t-title">';
            fields.forEach(function (field) {
                html += '<td>' + field + '</td>'
            })
            html += '<td>操作</td></tr>';

            data.forEach(function (item, index) {
                html += '<tr draggable="true" id="tr' + index + '">';
                fields.forEach(function (field) {
                    html += '<td>' + item[field] + '</td>';
                })
                html += '<td><button class="item-edit">编辑</button><button class="item-del">删除</button></td>';
                html += '</tr>'
            })
            html += '</table>';
            c.innerHTML = html;
            this.addDragEvent(c);
        },
        addDragEvent: function (c) {
            c.ondragstart = function (e) {
                var src = e.srcElement;
                if (src.nodeName.toLowerCase() == 'tr' && src.className != 't-title') {
                    e.dataTransfer.setData('id', src.id);
                }
            }
            c.ondragover = function (e) {
                e.preventDefault();
            }
            c.ondrop = function (e) {
                var el = document.querySelector('#' + e.dataTransfer.getData('id'));
            }

        },
        getFormData: function () {
            var me = this;
            var data = {list: []};
            var form = document.querySelectorAll('.form-set');
            var o = {};

            //获取所有新增的数据
            for (var i = 0, l = form.length; i < l; i++) {
                var cells = form[i].querySelectorAll('.win-val');
                var a = {};
                for (var j = 0, len = cells.length; j < len; j++) {
                    a[cells[j].dataset['type']] = cells[j].value;
                }
                data.list.push(a);
            }

            //直接更新组件数据
            if (me.target.data.list.length == 0) {
                me.target.data = data;
            } else {
                me.target.data.list = me.target.data.list.concat(data.list);
            }
            //销毁当前弹窗
            this.destroy();
        },
        //根据字段创建html form
        createDom: function (arr) {
            var html = document.createElement('div');
            html.className = 'form-set';
            arr.forEach(function (item) {
                html.innerHTML += ('<div class=win-row><label class=win-label>' + item + '</label><input data-type=' + item + ' class=win-val type=text/></div>');
            })
            return html;
        },
        //获取模板内的字段
        getFields: function () {
            var fields = [];
            Array.prototype.forEach.call(this.tpl.match(/<%=[^>]+>/g), function (item) {
                var s = item.split('.'),
                    field = s[s.length - 1].replace('%>', '');
                if (field != '' && fields != undefined) {
                    fields.push(field);
                }
            })
            return fields;
        },
        sendToServer: function () {
            var data = this.data;
        },
        destroy: function () {
            this.el.parentNode.removeChild(this.el);
            if (this.onClose) {
                this.onClose();
            }
            if (this.target.data.list.length > 0) {
                this.target.reRender();
            }

        }
    }
    return popup;
})