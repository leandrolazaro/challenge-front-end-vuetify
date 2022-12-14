import Vue from 'vue'
import VueRouter from 'vue-router'
// import HomeView from '../views/HomeView.vue'

import { authenticationService } from '@/services/auth.service';
import { Roles } from '@/helpers/roles';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "default" */ '../views/HomeView.vue')
  },
  {
    path: '/admin/login',
    name: 'AdminLogin',
    component: () => import(/* webpackChunkName: "login-admin" */ '../views/AdminLoginView.vue')
  },
  {
    path: '/admin',
    name: 'AdminView',
    component: () => import(/* webpackChunkName: "admin" */ '../views/AdminView.vue'),
    meta: { authorize: Roles.Admin },
    children: [
      {
        // UserProfile will be rendered inside User's <router-view>
        // when /user/:id/profile is matched
        path: '',
        name: 'AdminHomeView',
        component: () => import(/* webpackChunkName: "admin" */ '../views/AdminHomeView.vue'),
        meta: { authorize: Roles.Admin }
      }
    ],
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const { authorize } = to.meta;
  const currentUser = authenticationService.currentUserValue;

  // alert(JSON.stringify(to.matched))

  if (authorize) {
      if (!currentUser) {
          // not logged in so redirect to login page with the return url
          return next({ path: '/login', query: { returnUrl: to.path } });
      }

      // check if route is restricted by role
      if (authorize.length && !authorize.includes(currentUser.role)) {
          // role not authorised so redirect to home page
          return next({ path: '/' });
      }
  }

  next();
})

export default router
