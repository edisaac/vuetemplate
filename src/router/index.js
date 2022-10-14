import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Deny from '@/views/Deny.vue'

import Crear from '@/views/examples/Crear.vue'
import Modificar from '@/views/examples/Modificar.vue'
import Eliminar from '@/views/examples/Eliminar.vue'
import EventCreate from '@/views/examples/EventCreate.vue'
import EventList from '@/views/examples/EventList.vue'
import EventShow from '@/views/examples/EventShow.vue'

import store from '../store'
import { isAuthorized } from '../util/authorization.js'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      authenticate: false,
      authorize: null,
    },
  },
  {
    path: '/deny',
    name: 'Deny',
    component: Deny,
    meta: {
      authenticate: false,
      authorize: null,
    },
  },
  {
    path: '/about',
    name: 'About',
    meta: {
      authenticate: true,
      authorize: null,
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/modificar',
    name: 'Modificar',
    component: Modificar,
    meta: {
      authenticate: false,
      authorize: 'modificar',
    },
  },
  {
    path: '/crear',
    name: 'Crear',
    component: Crear,
    meta: {
      authenticate: true,
      authorize: 'crear',
    },
  },
  {
    path: '/eliminar',
    name: 'Eliminar',
    component: Eliminar,
    meta: {
      authenticate: true,
      authorize: 'eliminar',
    },
  },
  {
    path: '/event/list',
    name: 'event-list',
    component: EventList,
  },
  {
    path: '/event/create',
    name: 'event-create',
    component: EventCreate,
  },
  {
    path: '/event/:id',
    name: 'event-show',
    component: EventShow,
    props: true,
  },
]

const router = new VueRouter({
  routes,
})

router.beforeEach((to, from, next) => {
  let user = store.state.login.user

  if (to.meta.authenticate) {
    if (user.isAuthenticated) {
      next()
    } else {
      next({ name: 'Home' })
    }
  } else {
    next()
  }
})

router.beforeEach((to, from, next) => {
  let user = store.state.login.user

  if (isAuthorized(user.roles, to.meta.authorize)) {
    next()
  } else {
    next({ name: 'Deny' })
  }
})
export default router
