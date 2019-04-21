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

  {
    path: '/student',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'studentIndex',
        component: () => import('@/views/table/index'),
        meta: { title: '学员管理', icon: 'student' }
      }
    ]
  },

  {
    path: '/teacher',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'teacherIndex',
        component: () => import('@/views/form/index'),
        meta: { title: '教师管理', icon: 'teacher' }
      }
    ]
  },

  {
    path: '/class',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'classIndex',
        component: () => import('@/views/form/index'),
        meta: { title: '分班管理', icon: 'class' }
      }
    ]
  },

  {
    path: '/attendance',
    component: Layout,
    name: 'attendance',
    redirect: 'noredirect',
    meta: { title: '考勤管理', icon: 'class' },
    children: [
      {
        path: 'student',
        name: 'studentAttendance',
        component: () => import('@/views/form/index'),
        meta: { title: '学生考勤', icon: 'student' }
      },
      {
        path: 'teacher',
        name: 'teacherAttendance',
        component: () => import('@/views/form/index'),
        meta: { title: '教师考勤', icon: 'teacher' }
      }
    ]
  },

  {
    path: '/stock',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'stockIndex',
        component: () => import('@/views/form/index'),
        meta: { title: '库存管理', icon: 'stock' }
      }
    ]
  },

  {
    path: '/finance',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'financeIndex',
        component: () => import('@/views/form/index'),
        meta: { title: '财务管理', icon: 'finance' }
      }
    ]
  },

  {
    path: '/authority',
    component: Layout,
    redirect: 'noredirect',
    name: 'authority',
    alwaysShow: true,
    meta: { title: '系统权限', icon: 'authority', roles: ['用户管理', '角色管理', '权限管理'] },
    children: [
      {
        path: 'user',
        name: 'authorityUser',
        component: () => import('@/views/form/index'),
        meta: { title: '用户管理', icon: 'user', roles: ['用户管理'] }
      },
      {
        path: 'role',
        name: 'authorityRole',
        component: () => import('@/views/form/index'),
        meta: { title: '角色管理', icon: 'role', roles: ['角色管理'] }
      },
      {
        path: 'key',
        name: 'authorityKey',
        component: () => import('@/views/form/index'),
        meta: { title: '权限管理', icon: 'key', roles: ['权限管理'] }
      }
    ]
  },

  {
    path: '/campus',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'campusIndex',
        component: () => import('@/views/form/index'),
        meta: { title: '校区管理', icon: 'campus' }
      }
    ]
  },

  {
    path: '/item',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'itemIndex',
        component: () => import('@/views/form/index'),
        meta: { title: '项目管理', icon: 'component' }
      }
    ]
  },

  {
    path: '/school',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'schoolIndex',
        component: () => import('@/views/form/index'),
        meta: { title: '学校管理', icon: 'school' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
