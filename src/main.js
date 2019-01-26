// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {  Toast  ,ViewBox ,ToastPlugin, LoadingPlugin, DatetimePlugin ,Flexbox, FlexboxItem ,XImg ,Box } from 'vux'
import store from './store'

//Vue.use(require('vue-moment'));
Vue.use(ToastPlugin)
Vue.use(LoadingPlugin)
Vue.component('view-box', ViewBox)
Vue.component('toast', Toast)
Vue.use(DatetimePlugin)
Vue.component('flexbox', Flexbox)
Vue.component('flexbox-item', FlexboxItem)
Vue.component('x-img', XImg)
Vue.component('box', Box)

import VueBus from 'vue-bus'
Vue.use(VueBus)



Vue.config.productionTip = false

//const FastClick = require('fastclick')
//FastClick.attach(document.body)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
