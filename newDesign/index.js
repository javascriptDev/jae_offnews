/**
 * Created by a2014 on 14-5-28.
 */
require.define('index',
    [
        'cpt/list',
        'cpt/list2',
        'cpt/list3',
        'cpt/list4',
        'tpl',
        'tree',
        'workSpace',
        'propPanel',
        'menu'
    ],
    function (require) {
        // var list = require('list');
        // var tpl = require('tpl');
        var tree = require('tree');
        var ws = require('workSpace');
        var propPanel = require('propPanel');
        var menu = require('menu');

        var data = [
            {
                node: 'control',
                id: '9f2b5353-c3d4-168f-6bc9-9c734aa0d345',
                items: [
                    {
                        name: 'list',
                        text: 'list1',
                        id: '9f2b5353-c3d4-168f-6bc9-9c734aa0d23f'
                    },
                    {
                        name: 'list2',
                        text: 'list2',
                        id: '9f2b5353-c3d4-168f-6bc9-9c734aa0d231'
                    },
                    {
                        name: 'list3',
                        text: 'list3',
                        id: '9f2b5353-c3d4-168f-6bc9-9c734aa0d233'
                    },
                    {
                        name: 'list4',
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