﻿export default [
  {
    path: '/editor',
    component: '../layouts/editorLayout',
    authority: ['admin', 'user'],
    routes: [
      {
        name: 'article',
        path: '/editor/article',
        authority: ['admin', 'user'],
        component: './editor/article',
      },
      {
        name: 'newpage',
        path: '/editor/newpage',
        authority: ['admin', 'user'],
        component: './editor/newpage',
      },
    ],
  },
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './user/login',
      },
    ],
  },
  {
    path: '/',
    component: '../layouts/SecurityLayout',
    routes: [
      {
        path: '/',
        component: '../layouts/BasicLayout',
        authority: ['admin', 'user'],
        routes: [
          {
            path: '/',
            redirect: '/welcome',
          },
          {
            path: '/welcome',
            name: 'welcome',
            icon: 'smile',
            component: './Welcome',
          },
          {
            path: '/article',
            name: 'article',
            icon: 'ContainerOutlined',
            component: './article',
            authority: ['admin', 'user'],
            routes: [
              {
                path: '/article/manage',
                name: 'manage',
                component: './article/manage',
                authority: ['admin', 'user'],
              },
              {
                path: '/article/category',
                name: 'category',
                component: './article/category',
                authority: ['admin', 'user'],
              },
              {
                path: '/article/tag',
                name: 'tag',
                component: './article/tag',
                authority: ['admin', 'user'],
              },
            ],
          },
          {
            path: '/setting',
            name: 'setting',
            component: './setting',
            icon: 'SettingOutlined',
            authority: ['admin'],
          },
          {
            path: '/admin',
            name: 'admin',
            icon: 'crown',
            component: './Admin',
            authority: ['admin'],
            routes: [
              {
                path: '/admin/sub-page',
                name: 'sub-page',
                icon: 'smile',
                component: './Welcome',
                authority: ['admin'],
              },
            ],
          },
          {
            name: 'list.table-list',
            icon: 'table',
            path: '/list',
            component: './ListTableList',
          },
          {
            component: './404',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
  {
    component: './404',
  },
];
