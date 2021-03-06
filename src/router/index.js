import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in subMenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    name: 'Dashboard',
    // hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard', noCache: true, affix: true }
    }]
  },
  { path: '*', component: () => import('@/views/404'), hidden: true }// 刷新页
]

export const asyncRouterMap = [
  {
    path: '/table',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'tableIndex',
        component: () => import('@/views/table/index'),
        meta: { title: '基本表格', icon: 'table' }
      }
    ]
  },
  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'formIndex',
        component: () => import('@/views/form/index'),
        meta: { title: '表单提交', icon: 'form' }
      }
    ]
  },

  {
    path: '/excel',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'excelIndex',
        component: () => import('@/views/excel/index'),
        meta: { title: 'excel导出', icon: 'excel' }
      }
    ]
  },
  {
    path: '/upload',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'uploadIndex',
        component: () => import('@/views/upload/index'),
        meta: { title: '上传', icon: 'upload' }
      }
    ]
  },
  {
    path: '/role',
    component: Layout,
    redirect: 'noredirect',
    name: 'role',
    alwaysShow: true,
    meta: { title: '系统权限', icon: 'authority' },
    children: [
      {
        path: 'roleUser',
        name: 'roleUser',
        component: () => import('@/views/role/user'),
        meta: { title: '用户管理', icon: 'user' }
      },
      {
        path: 'roleAuth',
        name: 'roleAuth',
        component: () => import('@/views/role/auth'),
        meta: { title: '角色管理', icon: 'role' }
      },
      {
        path: 'roleIndex',
        name: 'roleIndex',
        component: () => import('@/views/role/index'),
        meta: { title: '权限管理', icon: 'key' }
      }
    ]
  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const roleMap = []
asyncRouterMap.forEach((element, index) => {
  if (element.meta) {
    roleMap.push({
      resourceType: element.meta.title,
      subResourceInfoList: []
    })
  } else {
    roleMap.push({
      subResourceInfoList: []
    })
  }
  element.children.forEach((item, childrenIndex) => {
    roleMap[index].subResourceInfoList.push({
      resourceName: item.meta.title,
      resourceCode: `${index + 1}${childrenIndex + 1}`
    })
    if (!roleMap[index].resourceType) {
      roleMap[index].resourceType = item.meta.title
    }
  })
})

