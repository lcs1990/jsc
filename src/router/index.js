import Vue from 'vue'
import Router from 'vue-router'
//import HelloWorld from '@/components/HelloWorld'

//开发环境不适用懒加载
const _import = require('./_import_' + process.env.NODE_ENV);

Vue.use(Router)

export default new Router({
	 //mode:'history',
	 base: '/bi/',

  routes: [
    {
      path: '/',
      name: 'LayOut',
      component: _import('components/LayOut'),
			redirect:'/yesterday/dt',
      children:[
      	{path:'/yesterday/:id',name:'yesterday',component: _import('pages/Yesterday/Yesterday')},
      	{path:'/visit/:id',name:'visit',component: _import('pages/Visit/Visit')},
      	{path:'/income/:id',name:'income',component: _import('pages/Income/Income')}
      ]
    }
  ]
})
