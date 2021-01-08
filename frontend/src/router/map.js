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
        path: 'twstock',
        name: 'twstock',
        component: () => import(/* webpackChunkName: "twstock" */ '@/views/pages/twstock'),
      },
      {
        path: 'usstock',
        name: 'usstock',
        component: () => import(/* webpackChunkName: "usstock" */ '@/views/pages/usstock'),
      },
      {
        path: 'stock',
        name: 'stock',
        component: () => import(/* webpackChunkName: "stock" */ '@/views/pages/stock'),
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
        path: 'test',
        name: 'test',
        component: () => import(/* webpackChunkName: "test" */ '@/views/pages/test'),
      },
    ],
  },
]
