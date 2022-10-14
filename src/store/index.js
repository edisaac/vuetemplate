import Vue from 'vue'
import Vuex from 'vuex'
import * as login from '@/store/modules/login.js'
import * as notification from '@/store/modules/notification.js'
import * as event from '@/store/modules/examples/event.js'
import * as user from '@/store/modules/examples/user.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: { login, event, notification, user },
})
