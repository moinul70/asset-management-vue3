import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import api from './services/api'

const router = useRouter()

export const useAuthStore = defineStore('auth', () => {
  const user=ref(null)
  const isAuthenticated = computed(() => !!token.value)
  const token = ref(localStorage.getItem('token') || null)
  function register(userData) {
    try {
      const { data } = api.post('/register', userData)

      return data
    } catch (error) {
      throw new Error("Register failed:", error)
    }
  }
  async function login(credentials) {
    try {
      const { data } = await api.post('/login', credentials)
      token.value = data.token
      user.value=data.user_name

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
      throw error
    } finally {
      token.value = null
      localStorage.removeItem('intendedRoute')
      localStorage.removeItem('token')
      localStorage.removeItem('user_name')
      delete api.defaults.headers.common['Authorization']
    }
  }
  return { token, isAuthenticated, login, logout, user }

  {
    persist: true
  }
})
