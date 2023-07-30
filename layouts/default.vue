<script setup lang="ts">
const title = "AI Fashion";
const drawerOpened = ref(false);
interface navigation {
  name: string
  svg: string
  link: string
}
const user = useSupabaseUser()

onMounted(() => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(locationGranted, () => navigateTo('/sad'));
    return
  }
  navigateTo('/sad')
})

const locationGranted = async (position: GeolocationPosition) => {
  const {setLocation, setWeather} = useLocation()
  setLocation(position)
  const {data} = await useFetch(`/api/weather?latitude=${position.coords.latitude}&longitude=${position.coords.latitude}`)
  if (data.value) {
    setWeather(data.value)
  }
}
</script>


<template>
    <Html>
      <Head>
        <Title>{{ title }}</Title>
        <Meta name="description" :content="`USA 2023`" />
      </Head>
      <Body>
        <div class="drawer">
          <input v-model="drawerOpened" id="my-drawer-3" type="checkbox" class="drawer-toggle" /> 
          <div class="drawer-content flex flex-col">
            <!-- Navbar -->
            <div class="w-full navbar bg-base-300 ">
              <div class="flex-none lg:hidden">
                <label for="my-drawer-3" class="btn btn-square btn-ghost">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-6 h-6 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                </label>
              </div> 
              <div class="flex-1 px-2 mx-2">
                <NuxtLink to="/" class="btn btn-ghost normal-case text-xl">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5l-3.9 19.5m-2.1-19.5l-3.9 19.5" /></svg>
                  {{ title }}
                </NuxtLink>
              </div>
              <div class="flex-none hidden lg:block">
                <ul class="menu menu-horizontal">
                  <!-- Navbar menu content here -->
                  <li v-if="user" class="dropdown dropdown-end">
                    <label tabindex="0">{{ user.email }}</label>
                    <ul tabindex="0" class="menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52 mt-4">
                      <li><NuxtLink to="/logout">Logout</NuxtLink></li>
                    </ul>
                  </li>
                  <li v-else>
                    <NuxtLink to="/login" @click="drawerOpened = false">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" /></svg>
                      Login / Signup
                    </NuxtLink>
                  </li>
                </ul>
              </div>
            </div>
            <!-- Page content here -->
            <slot />
          </div> 
          <div class="drawer-side">
            <label for="my-drawer-3" class="drawer-overlay"></label> 
            <div class="h-full flex flex-col w-80 bg-base-200  ">
              <ul class="menu flex-auto p-4">
                <li v-if="user"><NuxtLink to="/logout">Logout</NuxtLink></li>
                <li v-else="user"><NuxtLink to="/login">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" /></svg>
                  Login / Signup
                </NuxtLink></li>
              </ul>
              <p v-if="user" class="p-4">{{ user.email }}</p>
            </div>
          </div>
        </div>
      </Body>
    </Html>
  </template>