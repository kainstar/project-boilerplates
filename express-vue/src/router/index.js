import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 路由懒加载
const RouteComponents = {
  HelloWorld: () => import('pages/HelloWorld'),
  Hello2: () => import('pages/Hello2')
}

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: RouteComponents.HelloWorld
    },
    {
      path: '/hello2',
      name: 'Hello2',
      component: RouteComponents.Hello2
    }
  ]
})
