export const routes = [
  {
    path: '/',
    component: () => import('@/views/pages'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/pages/home'),
      },
      {
        path: 'twstock',
        name: 'twstock',
        component: () => import('@/views/pages/twstock'),
      },
      {
        path: 'usstock',
        name: 'usstock',
        component: () => import('@/views/pages/usstock'),
      },
      {
        path: 'stock/:stockNo',
        name: 'stock',
        component: () => import('@/views/pages/stock'),
      },
      {
        path: 'currency',
        name: 'currency',
        component: () => import('@/views/pages/currency'),
      },
      {
        path: 'virtualCurrency',
        name: 'virtualCurrency',
        component: () => import('@/views/pages/virtualCurrency'),
      },
      {
        path: 'goods',
        name: 'goods',
        component: () => import('@/views/pages/goods'),
      },
    ],
  },
]
