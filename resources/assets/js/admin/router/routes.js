const routes = [
  {
    path: '/',
    component: () => import(/* webpackChunkName: 'admin-dashboard' */ '../pages/dashboard.vue'),
    meta: {
      requiresAuth: false,
      title: '首页',
      topmenuVisible: true,
      sidebarVidible: true
    }
  },
  {
    path: '/order/list',
    component: () => import(/* webpackChunkName: 'admin-order-list' */ '../pages/order/lsit.vue'),
    meta: {
      requiresAuth: true,
      title: '',
      topmenuVisible: true,
      sidebarVidible: true
    }
  },
  {
    path: '/product/list',
    component: () => import(/* webpackChunkName: 'admin-product-list' */ '../pages/product/lsit.vue'),
    meta: {
      requiresAuth: true,
      title: '',
      topmenuVisible: true,
      sidebarVidible: true
    }
  },
  {
    path: '/product/edit/:id',
    component: () => import(/* webpackChunkName: 'admin-product-form' */ '../pages/product/product_form.vue'),
    meta: {
      requiresAuth: true,
      title: '',
      topmenuVisible: true,
      sidebarVidible: true
    }
  },
  {
    path: '/user/list',
    component: () => import(/* webpackChunkName: 'admin-user-list' */ '../pages/user/lsit.vue'),
    meta: {
      requiresAuth: true,
      title: '',
      topmenuVisible: true,
      sidebarVidible: true
    }
  },
  {
    path: '/login',
    component: () => import(/* webpackChunkName: 'admin-auth-login' */ '../pages/auth/login.vue'),
    meta: {
      requiresAuth: false,
      title: '',
      topmenuVisible: false,
      sidebarVidible: false
    }
  },
  {
    path: '*',
    component: () => import(/* webpackChunkName: 'admin-error404' */ '../pages/404.vue'),
    meta: {
      title: '404',
      topmenuVisible: true,
      sidebarVidible: true
    }
  }
]

export default routes
