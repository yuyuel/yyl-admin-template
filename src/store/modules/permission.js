import { asyncRouterMap, constantRouterMap } from '@/router'

/**
 * 返回符合用户角色权限的路由表
 * @param routes asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(routes, roles) {
  const res = []
  routes.forEach((route, index) => {
    const children = []
    route.children.forEach((childRouter, childindex) => {
      if (roles.indexOf(`${index + 1}${childindex + 1}`) != -1) {
        children.push(childRouter)
      }
    })
    route.children = []
    if (children.length > 0) {
      route.children = children
      res.push(route)
    }
  })
  return res
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        const { roles } = data
        let accessedRouters
        if (roles.includes('超级管理员')) {
          accessedRouters = asyncRouterMap
        } else {
          accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
        }
        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    }
  }
}

export default permission
