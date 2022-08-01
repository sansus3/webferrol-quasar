
export const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'Home', meta: { title: 'Inicio', icon: 'home' }, component: () => import('pages/IndexPage.vue') },
      { path: 'about', name: 'About', meta: { title: 'Acerca de', icon: 'info' }, component: () => import('pages/AboutPage.vue') },
      { path: 'profile', name: 'Profile', meta: { title: 'Proyectos', icon: 'photo_library' }, component: () => import('pages/ProfilePage.vue') },
      { path: 'sitemap', name: 'SiteMap', meta: { title: 'Mapa del sitio', icon: 'travel_explore' }, component: () => import('pages/SiteMapPage.vue') },
      { path: 'register', name: 'Register', meta: { title: 'Registro', icon: 'password', authRoute: true }, component: () => import('pages/RegisterPage.vue') },
      { path: 'sign-in', name: 'Acceso', meta: { title: 'Login', icon: 'login', authRoute: true }, component: () => import('pages/SignInPage.vue') },
    ]
  },
  {
    path: '/admin(.*)*',
    component: () => import('layouts/MainLayoutAdmin.vue'),
    children: [
      { path: '/admin', name: 'Admin', meta: { title: 'Inicio', icon: '', protectedRoute: true }, component: () => import('pages/private/IndexPage.vue') },
      { path: '/admin/profile', meta: { title: 'Perfil de usuario', icon: '', protectedRoute: true }, component: () => import('pages/private/ProfilePage.vue') },
      { path: '/admin/new-room', name: 'NewRoom', meta: { title: 'Crear sala', icon: '', protectedRoute: true }, component: () => import('pages/private/rooms/NewRoomPage.vue') },
      { path: '/admin/edit-room/:idDoc', name: 'EditRoom', meta: { title: 'Modificar sala', icon: '', protectedRoute: true }, component: () => import('pages/private/rooms/EditRoomPage.vue') },
      { path: '/admin/room/:idDoc', name: 'Room', meta: { title: 'Sala', icon: '', protectedRoute: true }, component: () => import('pages/private/rooms/RoomPage.vue') },
      { path: '/admin/rooms', name: 'Rooms', meta: { title: 'Salas', icon: '', protectedRoute: true }, component: () => import('pages/private/rooms/RoomsListPage.vue') },

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
