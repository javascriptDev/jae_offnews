/**
 * Created by a2014 on 14-5-29.
 */
require.define('newDesign/propPanel', ['newDesign/eventManager'], function (require, exports) {

    var em = require('newDesign/eventManager');
    var prop = function () {
        this.init();
    }
    prop.prototype = {
        init: function () {
            em.event.sub(em.type.showProperty, this.render)
        },
        render: function () {
            //this is workspace list object
            var me = this;

            //生成属性面板html
            var generateHtml = function (o) {
                var save = '<div id="data" style="height: 20px;width:90px;border: 1px solid red ;">添加数据</div>' +
                    '<button id="save">保存</button>';
                return save;
            };
            //生成添加数据弹出窗html
            var generateForm = function (tpl) {
                var html = '<div style="height: 100px;width: 200px;border: 1px solid red;"></div>';
                return html;
            };

            //生成属性面板的html
            document.querySelector('.property').innerHTML = generateHtml(this);
            //添加数据按钮事件
            document.querySelector('#data').onclick = function () {
                me.addStore(me);
            }
            //添加save按钮 事件
            document.querySelector('#save').onclick = function () {

            }
            //添加删除组件事件
            document.body.onkeydown = function (e) {
                if (e.keyCode == 8) {//todo:需要同时删除 workspace child 数组内的组件
                    me.destroy();
                    document.querySelector('.property').innerHTML = '';
                }
            }
        }

    }
    return prop;
})