<script setup lang="ts">
definePageMeta({
  middleware: 'noauth'
})
const supabase = useSupabaseClient()
const loading = ref(false)
const email = ref('');
const password = ref('');


const handleLogin = async () => {
  try {
    loading.value = true
    const { error } = await supabase.auth.signInWithPassword({ email: email.value, password: password.value })
    if (error) throw error
    navigateTo("/")
  } catch (error) {
    alert(error)
  } finally {
    loading.value = false
  }
}
</script>

<template>
<div class="hero min-h-screen bg-gray-200">
  <div class="hero-content flex-col"> <!-- Add flex-col here -->
    <div class="text-center lg:text-left">
      <h1 class="text-5xl font-bold">Login now!</h1>
      <p class="py-6">Style thermoを使うにはログインが必要です</p>
    </div>
    
    <form @submit.prevent="handleLogin"  class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <div class="card-body">
        <div class="form-control">
            <label class="label">
            <span class="label-text">Email</span>
            </label>
            <input v-model="email" type="email" placeholder="email" class="input input-bordered" />
        </div>
        <div class="form-control">
            <label class="label">
            <span class="label-text">Password</span>
            </label>
            <input v-model="password" type="password" min="6" placeholder="password" class="input input-bordered" />
            <label class="label">
            <!-- <a href="#" class="label-text-alt link link-hover">Forgot password?</a> -->
            <NuxtLink to="/signup" class="label-text-alt link link-hover link-primary">or Signup</NuxtLink>
            </label>
        </div>
        <div class="form-control mt-6">
            <button :disabled="loading" class="btn btn-primary">Login</button>
        </div>
      </div>
    </form>
  </div>
</div>
</template>