import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Templates from '../views/Templates.vue';
import MesTemplates from '../views/MesTemplates.vue';
import Categories from '../views/Categories.vue';
import Detail from '../views/Detail.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/templates', name: 'Templates', component: Templates },
  { path: '/details', name: 'Details', component: Detail },
  { path: '/mestemplates', name: 'MesTemplates', component: MesTemplates },
  { path: '/categories', name: 'Categories', component: Categories },
  { path: '/detail/:id', name: 'detail', component: Detail },
  { path: '/profile', name: 'profile', component: () => import('../views/Profile.vue'), }

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
