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
        path: 'currency',
        name: 'currency',
        component: () => import('@/views/pages/currency'),
      },
    ],
  },
  // {
  //   path: '/',
  //   name: 'home',
  //   component: () => import('@/views/pages/home'),
  // },
  // {
  //   path: '/stock',
  //   name: 'stock',
  //   component: () => import('@/views/pages/stock'),
  // },
  // {
  //   path: '/currency',
  //   name: 'currency',
  //   component: () => import('@/views/pages/currency'),
  // },
]
