import Vue from 'vue'
import Router from 'vue-router'
import PianList from './views/PianList.vue'
import PianEdit from './views/PianEdit.vue'
import Main from './views/Main.vue'
import SiteEdit from './views/SiteEdit.vue'
import SiteList from './views/SiteList.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: Main,
      children: [
        { path: '/plans/list', component: PianList },
        { path: '/plans/edit', component: PianEdit },
        { path: '/plans/edit/:id', component: PianEdit, props: true },

        { path: '/sites/list', component: SiteList },
        { path: '/sites/edit', component: SiteEdit },
        { path: '/sites/edit/:id', component: SiteEdit, props: true },
      ]
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
