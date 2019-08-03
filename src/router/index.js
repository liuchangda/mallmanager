import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login/login.vue'
import Home from '@/components/Home/Home.vue'
import Users from '@/components/Users/users.vue'



Vue.use(Router)

export default new Router({
  routes: [
    {
      name: 'login',
      path: '/login',
      component: Login
    },
    {
      name: 'home',
      path: '/',
      component: Home,
      children: [
        {
          name: 'users',
          path: '/users',
          component: Users,
        }
      ]
    }

  ]
})
