import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import NotFound from '@/components/404'

Vue.use(Router)

/**
 * Vue-Router
 */
export const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '*',
      name: 'NotFound',
      component: NotFound
    }
  ]
})

/**
 * AJAX URL集合
 */
export const AJAX_URL = {
  user: '/api/user/zsk'
}
