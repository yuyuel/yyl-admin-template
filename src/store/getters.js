const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  ststem: state => state.user.ststem,
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters,
  routers: state => state.permission.routers
}
export default getters
