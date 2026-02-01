import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
// export const auth = reactive({
//   isAuthenticated: false,
//   login() { this.isAuthenticated = true },
//   logout() { this.isAuthenticated = false }
// })
const router = useRouter()
export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = computed(() => !!token.value)
  const token = ref(localStorage.getItem('token') || null)
  function login() {
    try {
      // const { data } = await axios.post('/api/login', credentials)

      // token.value = data.token
      // user.value = data.user

      // ব্রাউজারে টোকেন সেভ করা
      // Simulating an API delay

      this.token = 'fake-token'; // Update state
      localStorage.setItem('token', 'fake-token');


      //axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`
    } catch (error) {
      throw new Error("Login failed")
    }
  }
  function logout() {
    try {
      // token.value = null
      // user.value = null

      token.value = null
      localStorage.removeItem('token')
      // delete axios.defaults.headers.common['Authorization']

    } catch (error) {
      throw new Error("Logout failed:", error)
    }
  }
  return { token, isAuthenticated, login, logout }

  {
    persist: true
  }
})
