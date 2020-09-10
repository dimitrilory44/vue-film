import Vue from 'vue'
import VueRouter from 'vue-router'
import Accueil from '@/Pages/Accueil.vue'
import Films from '@/Pages/Films.vue'
// import Film from '@/components/film.vue'

Vue.use(VueRouter)
export default new VueRouter({
  routes: [
    {
      path: '/',
      component: Accueil
    },{
      path: '/film',
      component: Films
    }
  ],
  mode: 'history'
})