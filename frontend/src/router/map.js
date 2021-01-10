export const routes = [
  {
    path: '/',
    component: () => import(/* webpackChunkName: "pages" */ '@/views/pages'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import(/* webpackChunkName: "home" */ '@/views/pages/home'),
      },
      {
        path: 'stock-market',
        name: 'stock-market',
        component: () => import(/* webpackChunkName: "stock-market" */ '@/views/pages/stock-market'),
      },
      {
        path: 'currency',
        name: 'currency',
        component: () => import(/* webpackChunkName: "currency" */ '@/views/pages/currency'),
      },
      {
        path: 'virtual',
        name: 'virtual',
        component: () => import(/* webpackChunkName: "virtual" */ '@/views/pages/virtual'),
      },
      {
        path: 'goods',
        name: 'goods',
        component: () => import(/* webpackChunkName: "goods" */ '@/views/pages/goods'),
      },
      {
        path: 'stock',
        name: 'stock',
        component: () => import(/* webpackChunkName: "stock" */ '@/views/pages/stock'),
      },
      {
        path: 'test',
        name: 'test',
        component: () => import(/* webpackChunkName: "test" */ '@/views/pages/test'),
      },
    ],
  },
]
