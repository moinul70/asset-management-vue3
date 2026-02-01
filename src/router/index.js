import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../components/views/LoginView.vue'
import DashboardView from '../components/views/DashboardView.vue'
import Layout from '../components/layouts/Layout.vue'
// import { auth } from '../auth'
import { useAuthStore } from '../auth'

const routes = [

//   { 
//   path: '/:pathMatch(.*)*', 
//   name: 'NotFound', 
//   component: NotFoundView 
// }
  {
    path: '/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/dashboard',
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

  // 1. Redirect authenticated users away from public landing/login pages
  if (authStore.isAuthenticated && (to.path === '/' || to.path === '/login')) {
    return next('/dashboard');
  }

  // 2. Protect private routes
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return next('/');
  }

  // 3. Fallback: Allow the navigation to proceed
  // This covers your "to.fullPath == '/' && !isAuthenticated" case safely
  next();
});

export default router
