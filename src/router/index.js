import Vue from 'vue'
import Router from 'vue-router'
const _import = file => require('@/views/' + file + '.vue').default;
//import HelloWorld from '@/components/HelloWorld'
import AppMain from '@/views/main/AppMain'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/login', component: _import('components/login') },

    {
      path: '/',
      component: AppMain,
      redirect: '/qtyy',
      name: '前台营业',
      hidden: true,
      children: [
        { name: '前台营业', path: 'qtyy', component: _import('qtyy/qtyy') },
        {
          name: '营业设置', path: 'yysz', redirect: 'yysz/food',component: _import('yysz/index'),
          children: [
            { name: '酒菜设置', path: 'food', component: _import('yysz/food') },
            { name: '房间设置', path: 'room', component: _import('yysz/roomsetting') },
            { name: '付款方式', path: 'paystyle', component: _import('yysz/paystyle') }
          ]
        },
        { name: '营业分析', path: 'yyfx', redirect: 'yyfx/yjfx', component: _import('yyfx/index'),
      children:[
        {name: '业绩分析',path: 'yjfx',component: _import('yyfx/yjfx')},
        {name: '房台分析',path: 'ftfx',component: _import('yyfx/ftfx')}
      ] },
        { name: '订单查询', path: 'ddcx', component: _import('query/query') },
        { name: '辅助管理', path: 'fzgl', component: _import('fzgl/index'), 
        children:[
          {name: '员工信息',path: 'staffinfo',component: _import('fzgl/staffinfo')},
          {name: '权限管理',path: 'roleset',component: _import('fzgl/roleset')}
        ] }
      ]
    }
  ]
})
