/**
 * Created by a2014 on 14-5-28.
 */
require.define('newDesign/index',
    [
        'newDesign/cpt/list',
        'newDesign/cpt/list2',
        'newDesign/cpt/list3',
        'newDesign/cpt/list4',
        'newDesign/tpl',
        'newDesign/tree',
        'newDesign/workSpace',
        'newDesign/propPanel',
        'newDesign/menu'
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
                        alias: 'panel',
                        text: 'panel',
                        typ: 'view',
                        id: '9f2b5353-c3d4-168f-6bc9-9c734aa0d23f'
                    },
                    {
                        alias: 'titlebar',
                        text: 'title bar',
                        type: 'view',
                        id: '9f2b5353-c3d4-168f-6bc9-9c734aa0d231'
                    },
                    {
                        alias: 'list',
                        text: 'list',
                        type: 'view',
                        id: '9f2b5353-c3d4-168f-6bc9-9c734aa0d233'
                    },
                    {
                        alias: 'tab',
                        text: 'tab',
                        type: 'view',
                        id: '9f2b5353-c3d4-168f-6bc9-9c734aa0d222'
                    },
                    {
                        alias: 'button',
                        text: 'button',
                        type: 'view',
                        id: '9f2b5353-c3d4-168f-6bc9-9c734aa0d222'
                    },
                    {
                        node: 'form',
                        text: '表单',
                        type: 'view',
                        id: '9f2b5353-c3d4-168f-6bc9-9c734aa0d222',
                        items: [
                            {
                                alias: 'fieldset',
                                text: 'fieldset',
                                type: 'view',
                                id: '9f2b5353-c3d4-168f-6bc9-9c734aa0d222'
                            },
                            {
                                alias: 'form',
                                text: 'form',
                                type: 'view',
                                id: '9f2b5353-c3d4-168f-6bc9-9c734aa0d222'
                            },
                            {
                                alias: 'text',
                                text: 'text',
                                type: 'view',
                                id: '9f2b5353-c3d4-168f-6bc9-9c734aa0d222'
                            },
                            {
                                alias: 'radio',
                                text: 'radio',
                                type: 'view',
                                id: '9f2b5353-c3d4-168f-6bc9-9c734aa0d222'
                            },
                            {
                                alias: 'select',
                                text: 'select',
                                type: 'view',
                                id: '9f2b5353-c3d4-168f-6bc9-9c734aa0d222'
                            },
                            {
                                alias: 'toggle',
                                text: 'toggle',
                                type: 'view',
                                id: '9f2b5353-c3d4-168f-6bc9-9c734aa0d222'
                            }
                        ]
                    }
                ]
            },
            {
                node: 'controller',
                id: 'asdasD',
                items: [
                    {
                        alias: 'controller',
                        text: 'controller',
                        type: 'ctl',
                        id: '9f2b5353-c3d4-168f-6bc9-9c734aa0d222'
                    }
                ]
            },
            {
                node: 'store',
                id: '123asd',
                items: [
                    {
                        alias: 'store',
                        text: 'store',
                        type: 'store',
                        id: '9f2b5353-c3d4-168f-6bc9-9c734aa0d222'
                    }
                ]
            },
            {
                node: 'model',
                id: '12easda',
                items: [
                    {
                        alias: 'model',
                        text: 'Model',
                        type: 'model',
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
                e.dataTransfer.setData("alias", e.target.dataset['alias']);
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