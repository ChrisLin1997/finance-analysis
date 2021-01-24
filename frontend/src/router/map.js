export const routes = [
  {
    path: '/',
    component: () => import(/* webpackChunkName: "pages" */ '@/views/layout'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import(/* webpackChunkName: "home" */ '@/views/home'),
      },
      {
        path: 'stock-market',
        name: 'stock-market',
        component: () => import(/* webpackChunkName: "stock-market" */ '@/views/stock-market'),
      },
      {
        path: 'currency',
        name: 'currency',
        component: () => import(/* webpackChunkName: "currency" */ '@/views/currency'),
      },
      {
        path: 'virtual',
        name: 'virtual',
        component: () => import(/* webpackChunkName: "virtual" */ '@/views/virtual'),
      },
      {
        path: 'goods',
        name: 'goods',
        component: () => import(/* webpackChunkName: "goods" */ '@/views/goods'),
      },
      {
        path: 'stock',
        name: 'stock',
        component: () => import(/* webpackChunkName: "stock" */ '@/views/stock'),
      },
      {
        path: 'test',
        name: 'test',
        component: () => import(/* webpackChunkName: "test" */ '@/views/test'),
      },
    ],
  },
]
