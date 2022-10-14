export function isAuthorized(roles, authorize) {
  if (authorize) {
    return roles.filter((rol) => rol === authorize).length > 0
  } else {
    return true
  }
}
