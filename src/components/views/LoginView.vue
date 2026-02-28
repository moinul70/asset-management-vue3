<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../../auth'
import { useRouter } from 'vue-router'

// Define reactive state for form fields
const email = ref('')
const password = ref('')
const router = useRouter()
const auth = useAuthStore()
const errors = ref({})
const generalError = ref('')

const handleLogin = async () => {
  try {
    // Logic for form submission
    const redirectPath = localStorage.getItem('intendedRoute');
    if (redirectPath) {
      await auth.login({ email: email.value, password: password.value });

      router.push(redirectPath);
      localStorage.removeItem('intendedRoute');

    } else {
      auth.login({ email: email.value, password: password.value });
      router.push({ name: 'dashboard-front' });

    }
  } catch (err) {
    console.log(err);
    if (err.response && err.response.status === 422) {
      errors.value = err.response.data.errors || {};
    } else {
      generalError.value = err.response?.data?.message || 'An error occurred';
    }
  }
}
</script>

<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card card-outline card-primary">
          <div class="card-header">
            <a href="/" class="link-dark text-center link-offset-2 link-opacity-100 link-opacity-50-hover">
              <h1 class="mb-0"><b>Exam</b>Management</h1>
            </a>
          </div>
          <div class="card-body login-card-body">
            <p class="login-box-msg">Sign in to start your session</p>
            <p v-if="errors.message" class="error">{{ errors.message }}</p>
            <p v-if="generalError" class="text-danger">
              {{ generalError }}
            </p>
            <form @submit.prevent="handleLogin">
              <div class="input-group mb-1">
                <div class="form-floating">
                  <input id="loginEmail" v-model="email" type="email" class="form-control" placeholder="" />

                  <label for="loginEmail">Email</label>

                </div>
                <div class="input-group-text"><span class="bi bi-envelope"></span></div>
              </div>
              <p v-if="errors.email" class="text-danger">
                {{ errors.email[0] }}
              </p>
              <div class="input-group mb-1">
                <div class="form-floating">

                  <input id="loginPassword" v-model="password" type="password" class="form-control" placeholder="" />
                  <label for="loginPassword">Password</label>
                </div>
                <div class="input-group-text"><span class="bi bi-lock-fill"></span></div>
              </div>
              <p v-if="errors.password" class="text-danger">
                {{ errors.password[0] }}
              </p>
              <!--begin::Row-->
              <div class="row">
                <div class="col-8 d-inline-flex align-items-center">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                    <label class="form-check-label" for="flexCheckDefault"> Remember Me </label>
                  </div>
                </div>
                <!-- /.col -->
                <div class="col-4">
                  <div class="d-grid gap-2">
                    <button type="submit" class="btn btn-primary">Sign In</button>
                  </div>
                </div>
                <!-- /.col -->
              </div>
              <!--end::Row-->
            </form>
            <div class="social-auth-links text-center mb-3 d-grid gap-2">
              <p>- OR -</p>
              <a href="#" class="btn btn-primary">
                <i class="bi bi-facebook me-2"></i> Sign in using Facebook
              </a>
              <a href="#" class="btn btn-danger">
                <i class="bi bi-google me-2"></i> Sign in using Google+
              </a>
            </div>
            <!-- /.social-auth-links -->
            <p class="mb-1"><a href="forgot-password.html">I forgot my password</a></p>
            <p class="mb-0">
              <a href="register.html" class="text-center"> Register a new membership </a>
            </p>
          </div>
          <!-- /.login-card-body -->
        </div>
      </div>
    </div>
  </div>
</template>