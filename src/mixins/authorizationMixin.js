import { isAuthorized } from '@/util/authorization.js'

export const authorizationMixin = {
  methods: {
    isAuthorizedUser: function (authorize) {
      return isAuthorized(this.user.roles, authorize)
    },
  },
}
