import Vue from 'vue';
import VueRouter from 'vue-router';
import Dashboard from '@/pages/Dashboard';
import Accueil from '@/components/dashboard/Accueil.vue';
import Films from '@/components/dashboard/Films.vue';
import Register from '@/components/form-auth/Form-Register.vue';
import Connexion from '@/components/form-auth/Form-LogIn.vue';
import NotFound from '@/NotFound.vue';
import Hello from '@/components/autres/HelloWorld.vue';
import Home from '../pages/Home.vue';

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/home',
      component: Home
    }, 
    {
      path: '/register',
      component: Register
    }, 
    {
      path: '/connexion',
      component: Connexion
    },
    {
      path: '/',
      component: Dashboard,
      children: [{
        path: '/',
        component: Accueil
      }, {
        path: "films",
        components: {
          Default : Accueil,
          film : Films,
        },
      }]
    },
    { path: '/film', component: Hello, name: 'film'},
    { path: '/404', component: NotFound },
    { path: '/*', component: NotFound },    
    { path: '*', redirect: '/404' }
  ],
  mode: 'history'
})