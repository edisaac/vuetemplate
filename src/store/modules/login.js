export const namespaced = true

export const state = {
  user: {
    isAuthenticated: false,
    name: '',
    email: '',
    idToken: '',
    roles: [],
  },
  keycloak: null,
}

export const mutations = {
  CLEAR_USER(state) {
    state.user.isAuthenticated = false
    state.user.name = ''
    state.user.email = ''
    state.user.idToken = ''
    state.user.roles = []
    localStorage.removeItem('user-token')
  },
  SET_USER(state, payload) {
    state.user.isAuthenticated = true
    state.user.name = payload.name
    state.user.email = payload.email
    state.user.idToken = payload.idToken
    state.user.roles = payload.roles
    localStorage.setItem('user-token', payload.accessToken)
  },
  REFRESH_TOKEN(state, payload) {
    state.user.idToken = payload.idToken
    localStorage.setItem('user-token', payload.accessToken)
  },
  SET_KEYCLOACK(state, payload) {
    state.keycloak = payload
  },
}

export const actions = {
  setKeycloak({ commit }, { payload }) {
    commit('SET_KEYCLOACK', payload)
  },
  setUser({ commit }, { payload }) {
    commit('SET_USER', payload)
  },
  clearUser({ commit }) {
    commit('CLEAR_USER')
  },
  refreshToken({ commit }, { payload }) {
    commit('REFRESH_TOKEN', payload)
  },
}
