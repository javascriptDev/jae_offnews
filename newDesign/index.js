/**
 * Created by a2014 on 14-5-28.
 */
fml.define('hornbill/web/script-ss/cms/index',
    [
        'hornbill/web/script-ss/cms/component/list',
        'hornbill/web/script-ss/cms/component/list2',
        'hornbill/web/script-ss/cms/component/list3',
        'hornbill/web/script-ss/cms/component/list4',
        'hornbill/web/script-ss/cms/tpl',
        'hornbill/web/script-ss/cms/tree',
        'hornbill/web/script-ss/cms/workSpace',
        'hornbill/web/script-ss/cms/propPanel',
        'hornbill/web/script-ss/cms/menu'
    ],
    function (require) {
        // var list = require('hornbill/web/script-ss/cms/component/list');
        // var tpl = require('hornbill/web/script-ss/cms/tpl');
        var tree = require('hornbill/web/script-ss/cms/tree');
        var ws = require('hornbill/web/script-ss/cms/workSpace');
        var propPanel = require('hornbill/web/script-ss/cms/propPanel');
        var menu = require('hornbill/web/script-ss/cms/menu');

        var data = [
            {
                node: 'control',
                id: '9f2b5353-c3d4-168f-6bc9-9c734aa0d345',
                items: [
                    {
                        name: 'hornbill/web/script-ss/cms/component/list',
                        text: 'list1',
                        id: '9f2b5353-c3d4-168f-6bc9-9c734aa0d23f'
                    },
                    {
                        name: 'hornbill/web/script-ss/cms/component/list2',
                        text: 'list2',
                        id: '9f2b5353-c3d4-168f-6bc9-9c734aa0d231'
                    },
                    {
                        name: 'hornbill/web/script-ss/cms/component/list3',
                        text: 'list3',
                        id: '9f2b5353-c3d4-168f-6bc9-9c734aa0d233'
                    },
                    {
                        name: 'hornbill/web/script-ss/cms/component/list4',
                        text: 'list4',
                        id: '9f2b5353-c3d4-168f-6bc9-9c734aa0d222'
                    }
                ]
            }

        ]

        var menuData = [
            {type: 'folder'},
            {type: 'js'},
            {type: 'css'},
            {type: 'html'},
            {type: 'json'}
        ];

//      //初始化控件
        window.left = new tree({
            dragStart: function (e) {
                e.dataTransfer.setData("type", e.target.dataset['name']);
                //  e.dataTransfer.setData("id", e.target.id);
            },
            data: data,
            parent: '.type-list',
            mdata: menuData
        });

        window.project = new tree({
            parent: '.project ',
            data: [
                {
                    id: '9f2b5353-c3d4-168f-6bc9-9c734aa0d234',
                    node: 'root',
                    items: [

                    ]
                }
            ],
            mdata: menuData
        });
        //初始化工作区
        window.workSpace = new ws();
        document.querySelector('.main').appendChild(workSpace.el);
        //初始化属性栏
        new propPanel();
    })