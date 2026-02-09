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
          <!--begin::Start Navbar Links-->
          <ul class="navbar-nav">
            <li class="nav-item d-none d-md-block"><a href="#" class="nav-link">Home</a></li>
            <li class="nav-item d-none d-md-block"><a href="#" class="nav-link">Contact</a></li>
          </ul>
     
        </div>
        <!--end::Container-->
       
      </nav>
      <!--end::Header-->
</template>
