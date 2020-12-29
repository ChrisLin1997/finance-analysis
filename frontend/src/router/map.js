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
        path: 'virtualCurrency',
        name: 'virtualCurrency',
        component: () => import(/* webpackChunkName: "virtualCurrency" */ '@/views/pages/virtualCurrency'),
      },
      {
        path: 'goods',
        name: 'goods',
        component: () => import(/* webpackChunkName: "goods" */ '@/views/pages/goods'),
      },
    ],
  },
]
