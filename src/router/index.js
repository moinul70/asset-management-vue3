import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../components/views/LoginView.vue'
import DashboardView from '../components/views/DashboardView.vue'
import Layout from '../components/layouts/Layout.vue'
// import { auth } from '../auth'
import { useAuthStore } from '../auth'
import LayoutFront from '../components/layouts-frontend/Layout.vue'
import FrontEndDashboardView from '../components/views/FrontEndDashboardView.vue'
import Practice from '../components/layouts-frontend/practice.vue'
import Exam from '../components/layouts-frontend/exam.vue'

const routes = [

  //   { 
  //   path: '/:pathMatch(.*)*', 
  //   name: 'NotFound', 
  //   component: NotFoundView 
  // }
  {
    path: '/',
    name: '',
    component: LayoutFront,
    children: [
      {
        path: '',
        name: 'dashboard-front',
        component: FrontEndDashboardView
      },
      {
        path: 'practice/:topic',
        name: 'practice',
        component: Practice
      },
      {
        path: 'exam/:topic',
        name: 'exam',
        meta: { requiresAuth: true },
        component: Exam
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/admin/dashboard',
    component: Layout,
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'dashboard',
        component: DashboardView
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
const isAuthenticated = authStore.isAuthenticated;
  
  // Check if the route requires authentication (e.g., using meta fields)
  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    // Store the intended path in local storage or a store (Vuex/Pinia)
  
    localStorage.setItem('intendedRoute', to.path);
    
    // Redirect to the login page
    next({ name: 'login', query: { redirect: to.fullPath } }); // assuming you have a named 'login' route
  } else {
    next(); // Continue to the intended route
  }
});

export default router
