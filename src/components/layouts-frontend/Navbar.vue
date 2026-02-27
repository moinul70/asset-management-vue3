<script setup>
 import { useAuthStore } from '../../auth'
import { useRouter } from 'vue-router'

const router = useRouter()
const auth = useAuthStore()
const handleLogout = () => {
  auth.logout()
  router.push('/')
}

const toggleSidebar = () => {
  document.body.classList.toggle('sidebar-collapse')
}

</script>

<template>
  <!--begin::Header-->
      <nav class="app-header navbar navbar-expand bg-body">
        <!--begin::Container-->
       <div class="container-fluid">
  <!-- Left Side Links -->
  <ul class="navbar-nav">
    <li class="nav-item d-none d-md-block"><a href="/" class="nav-link">Home</a></li>
  </ul>

  <!-- Right Side Profile Dropdown -->
  <ul class="navbar-nav ms-auto" v-if="auth.isAuthenticated==true">
    <li class="nav-item dropdown">
      <a class="nav-link dropdown-toggle d-flex align-items-center" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
        <!-- <img src="https://via.placeholder.com" class="rounded-circle me-2" alt="Profile"> -->
        <span>{{ auth.user }}</span>
      </a>
      <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
        <li><a class="dropdown-menu-item dropdown-item" href="#">Profile</a></li>
        <li><a class="dropdown-item" href="#">Settings</a></li>
        <li><hr class="dropdown-divider"></li>
        <li>
          <button @click="handleLogout" class="dropdown-item text-danger">Logout</button>
        </li>
      </ul>
    </li>
  </ul>
</div>
        <!--end::Container-->
       
      </nav>
      <!--end::Header-->
</template>
