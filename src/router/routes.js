
export const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', meta: { title: 'Inicio', icon: 'home' }, component: () => import('pages/IndexPage.vue') },
      { path: 'about', name: 'About', meta: { title: 'Acerca de', icon: 'info' }, component: () => import('pages/AboutPage.vue') },
      { path: 'profile', name: 'Profile', meta: { title: 'Proyectos', icon: 'photo_library' }, component: () => import('pages/ProfilePage.vue') },
      { path: 'sitemap', name: 'SiteMap', meta: { title: 'Mapa del sitio', icon: 'travel_explore' }, component: () => import('pages/SiteMapPage.vue') },
      { path: 'sign-in', name: 'Acceso', meta: { title: 'Login', icon: 'login', authRoute: true }, component: () => import('pages/SignInPage.vue') },
    ]
  },
  {
    path: '/:admin(.*)*',
    component: () => import('layouts/TheMainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/private/IndexPage.vue') },
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
