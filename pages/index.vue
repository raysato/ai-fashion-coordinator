<script lang="ts" setup>
definePageMeta({
  middleware: 'auth'
})

const {userClothes, updateClothes} = useAccount()
const locationGranted = ref(false)
const showModal = ref(false)
const outfits = [
  {id: 1, image: '../assets/img/white.jpg', description: 'White dress'},
  {id: 2, image: '../assets/img/white.jpg', description: 'Blue jeans'},
  {id: 3, image: '../assets/img/white.jpg', description: 'Green shirt'},
  {id: 4, image: '../assets/img/white.jpg', description: 'Red shoes'}
]

const grantLocation = () => {
  // Add your location granting logic here
  // After user's permission, set locationGranted to true
  locationGranted.value = true;

  // Hide the modal
  showModal.value = false;
}
const closeModal = () => {
  // Hide the modal
  showModal.value = false;
}
onMounted(() => {
  updateClothes()
})


const {weather} = useLocation();
const {data: gpt, refresh, pending} = await useLazyFetch('/api/ask', {
  method: 'post',
  body: weather
}) 
</script>

<template>
  <div  class="m-4">

    <div>
      <h1 class="text-4xl font-bold text-center">Today's outfit</h1>

      <div v-if="!pending">
        <hr style="border-color: #60A5FA;" class="border-t-2 mt-2 mb-4">
        <div class="grid grid-cols-2 gap-4 mb-4">
          <OutfitItem v-for="value in gpt?.clothes" :clothesProp="value" />
        </div>
        <p v-if="!pending">{{ gpt?.message }}</p>
        <button class="btn btn-info" @click="() => refresh()">Regenerate</button>
      </div>
      <div v-else class="flex justify-center">
        <span class="loading loading-spinner loading-lg"></span>
      </div>

      <!-- "Today's weather" section -->
      <h2 class="text-4xl font-bold mt-6 text-center">Today's weather</h2>
      <hr style="border-color: #60A5FA;" class="border-t-2 mt-2 mb-4">
      <div class="flex items-center space-x-4">
        <NuxtImg :src="`https://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`" alt="Weather icon" class="w-24 h-24 object-contain" />
        <div>
          <p class="text-2xl">{{ weather?.weather[0].main }}</p>
          <p class="text-2xl">Temperature: {{ weather?.main.temp }}°C</p>
          <p class="text-2xl">Humidity: {{ weather?.main.humidity }}%</p>
        </div>
      </div>

      <h2 class="text-4xl font-bold mt-6 text-center">Your Closet</h2>
      <hr style="border-color: #60A5FA;" class="border-t-2 mt-2 mb-4">

      <div class="grid grid-cols-4 gap-4 mb-4">
        <LazyClosetItem v-for="clothes in userClothes" :clothesProp="clothes"/>
      </div>
      <div class="grid gap-4 mb-4">
        <!-- <div v-for="clothes in closetItems" :key="clothes.id">
          <img :src="clothes.image" alt="Clothes image" class="w-full h-32 object-cover">
          <p class="text-center mt-2">{{ clothes.description }}</p>
        </div> -->
        <!-- /components/upload.vue -->
        <Upload />
      </div>
    </div>


    <!-- Location confirmation modal -->
    <div v-if="showModal" class="fixed z-10 inset-0 overflow-y-auto">
      <div class="flex items-center justify-center min-h-screen">
        <div class="bg-white rounded-lg px-4 pt-5 pb-4 overflow-auto shadow-xl sm:max-w-lg sm:w-full sm:p-6 lg:p-8">
          <div>
            <h3 class="text-lg leading-6 font-medium text-gray-900">
              確認してください
            </h3>
            <div class="mt-2">
              <p class="text-sm text-gray-500">
                位置情報を取得していいですか？
              </p>
            </div>
          </div>
          <div class="mt-5 sm:mt-6">
            <button type="button" class="btn btn-primary" @click="grantLocation">
              OK
            </button>
            <button type="button" class="btn" @click="closeModal">
              ✖️
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>