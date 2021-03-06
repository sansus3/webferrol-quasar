import { route } from 'quasar/wrappers'
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from '../router/routes'
import { useStoreUsers } from 'src/stores/users'

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(async function (/* { store, ssrContext } */) {
  const store = useStoreUsers();
  await store.onAuthState();
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE)
  })

  /**
   * @link https://quasar.dev/quasar-cli-vite/routing
   */
  Router.beforeEach((to, from, next) => {
    window.document.title = to.meta.title ? to.meta.title : 'WebFerrol';
    if (to.meta.protectedRoute === true && store.user?.uid === undefined) {
      next('/sign-in');
    } else if (to.meta.authRoute === true && store.user?.uid !== undefined) {
      next('/');
    } else {
      next();
    }
  })
  // ...

  return Router
})
