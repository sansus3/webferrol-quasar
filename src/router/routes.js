
const routes = [
  {
    path: '/',
    component: () => import('layouts/TheMainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'about', name: 'About', component: () => import('pages/AboutPage.vue') },
      { path: 'sign-in', name: 'Acceso', meta: { authRoute: true }, component: () => import('pages/SignInPage.vue') },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
