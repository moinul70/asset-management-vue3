import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import api from './services/api'
// export const auth = reactive({
//   isAuthenticated: false,
//   login() { this.isAuthenticated = true },
//   logout() { this.isAuthenticated = false }
// })
const router = useRouter()

export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = computed(() => !!token.value)
  const token = ref(localStorage.getItem('token') || null)
  function register(userData) {
    try {
      const { data } = api.post('/register', userData)

      user.value = data.user

    } catch (error) {
      throw new Error("Register failed:", error)
    }
  }
  async function login(credentials) {
    try {
      const { data } = await api.post('/login', credentials)
      token.value = data.token

      localStorage.setItem('token', token.value);

      api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`
      return data
    } catch (error) {
      throw error
    }
  }
  async function logout() {
    try {
      await api.get('/logout')
    } catch (error) {
    } finally {
      localStorage.removeItem('intendedRoute')
      token.value = null
      delete api.defaults.headers.common['Authorization']
    }
  }
  return { token, isAuthenticated, login, logout }

  {
    persist: true
  }
})
