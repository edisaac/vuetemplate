import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Keycloak from 'keycloak-js'
import BaseIcon from '@/components/examples/BaseIcon'
import getEnv from '@/util/env.js'

Vue.component('BaseIcon', BaseIcon)

Vue.config.productionTip = false
let initOptions = {
  url: getEnv('VUE_APP_KEYCLOAK_URL'),
  realm: getEnv('VUE_APP_KEYCLOAK_REALM'),
  clientId: getEnv('VUE_APP_KEYCLOAK_CLIENT_ID'),
  onLoad: 'check-sso',
}

let keycloak = Keycloak(initOptions)
keycloak
  .init({
    onLoad: initOptions.onLoad,
  })
  .then(() => {
    store.dispatch('login/setKeycloak', {
      payload: {
        login: keycloak.login,
        logout: keycloak.logout,
      },
    })

    if (isValidLogin(keycloak)) {
      let app = keycloak.resourceAccess[getEnv('VUE_APP_KEYCLOAK_CLIENT_ID')]
      let payload = {
        idToken: keycloak.idToken,
        accessToken: keycloak.token,
        name: keycloak.tokenParsed.preferred_username,
        email: keycloak.tokenParsed.email,
        roles: app ? app.roles : [],
      }
      store.dispatch('login/setUser', {
        payload: payload,
      })
    } else {
      store.dispatch('login/clearUser')
    }

    new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount('#app')

    setInterval(() => {
      keycloak
        .updateToken(70)
        .then((refreshed) => {
          if (refreshed) {
            if (isValidLogin(keycloak)) {
              let payloadRefreshedTokens = {
                idToken: keycloak.idToken,
                accessToken: keycloak.token,
              }

              store.dispatch('login/refreshToken', {
                payload: payloadRefreshedTokens,
              })
            } else {
              store.dispatch('login/clearUser')
            }
          }
        })
        .catch((error) => {
          console.log('-->log: Failed to refresh token', error)
        })
    }, 60000)
  })
  .catch((error) => {
    console.log('-->log: Failed to init keycloak', error)
  })
function isValidLogin(keycloak) {
  return (
    keycloak.token &&
    keycloak.idToken &&
    keycloak.token != '' &&
    keycloak.idToken != ''
  )
}
