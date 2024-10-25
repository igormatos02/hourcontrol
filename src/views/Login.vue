<template>
    <div>
      <h1>Login</h1>
      <form @submit.prevent="handleLogin">
        <input v-model="email" type="email" placeholder="Email" required />
        <input v-model="password" type="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
      <p v-if="error">{{ error }}</p>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue'
  import { signIn } from '../utils/auth'
  import router from '../router/index.js'
  export default {
    name: 'Login',
    setup() {
      const email = ref('')
      const password = ref('')
      const error = ref(null)
  
      const handleLogin = async () => {
        try {
          
          await signIn(email.value, password.value)
          error.value = null
          // Redirect to home page after successful login
          router.push('/')
        } catch (err) {
          error.value = err.message
        }
      }
  
      return {
        email,
        password,
        error,
        handleLogin,
      }
    }
  }
  </script>
  