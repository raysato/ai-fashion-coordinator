<script lang="ts" setup>
const isLoggedIn = ref(false)
const locationGranted = ref(false)
const showModal = ref(false)
const outfits = [
  {id: 1, image: '../assets/img/white.jpg', description: 'White dress'},
  {id: 2, image: '../assets/img/white.jpg', description: 'Blue jeans'},
  {id: 3, image: '../assets/img/white.jpg', description: 'Green shirt'},
  {id: 4, image: '../assets/img/white.jpg', description: 'Red shoes'}
]
const fileInput: Ref<HTMLInputElement | null> = ref(null)
// これをAPIからの実際のデータに置き換える
const weather = {
  condition: 'Sunny',
  icon: '../assets/img/sun.png',
  temperature: 24,
  humidity: 65,
}
const closetItems = outfits

const regenerate = () => {
  // Show the modal
  showModal.value = true;
}
const login = () => {
  // Add your login logic here
  // After successful login, set isLoggedIn to true
  isLoggedIn.value = true;
}
const triggerFileSelection = () => {
  fileInput.value?.click();
}
const uploadClothes = () => {
  if (fileInput.value instanceof HTMLInputElement) {

    const file = fileInput.value.files?.[0];
    if (file) {
      // Upload the file here.
      // For now, we just print its name to the console.
      console.log(`Uploading file: ${file.name}`);
    }
  }
}
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
</script>

<template>
  <div v-if="isLoggedIn" class="m-4">
    <div v-if="!locationGranted">
      <!-- Alert for location permission -->
      <div class="alert alert-info">
        <div class="flex-1">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-6 h-6 mx-2 stroke-current">

          </svg>
          <label>位置情報を取得してもよろしいですか？</label>
          <button class="btn btn-primary" @click="grantLocation">OK</button>
        </div>
      </div>
    </div>

    <div v-if="locationGranted">
      <h1 class="text-4xl font-bold text-center">Today's outfit</h1>

      <hr style="border-color: #60A5FA;" class="border-t-2 mt-2 mb-4">
      <div class="grid grid-cols-2 gap-4 mb-4">
        <div v-for="outfit in outfits" :key="outfit.id">
          <img :src="outfit.image" alt="Outfit image" class="w-full h-32 object-cover">
          <p class="text-center mt-2">{{ outfit.description }}</p>
        </div>
      </div>
      <button class="btn btn-info" @click="regenerate">Regenerate</button>

      <!-- "Today's weather" section -->
      <h2 class="text-4xl font-bold mt-6 text-center">Today's weather</h2>
      <hr style="border-color: #60A5FA;" class="border-t-2 mt-2 mb-4">
      <div class="flex items-center space-x-4">
        <img :src="weather.icon" alt="Weather icon" class="w-24 h-24 object-contain">
        <div>
          <p class="text-2xl">{{ weather.condition }}</p>
          <p class="text-2xl">Temperature: {{ weather.temperature }}°C</p>
          <p class="text-2xl">Humidity: {{ weather.humidity }}%</p>
        </div>
      </div>

      <h2 class="text-4xl font-bold mt-6 text-center">Your Closet</h2>
      <hr style="border-color: #60A5FA;" class="border-t-2 mt-2 mb-4">

      <div class="grid grid-cols-4 gap-4 mb-4">
        <div v-for="clothingItem in closetItems" :key="clothingItem.id">
          <img :src="clothingItem.image" alt="Clothing item image" class="w-full h-32 object-cover">
          <p class="text-center mt-2">{{ clothingItem.description }}</p>
        </div>
      </div>
      <div class="grid gap-4 mb-4">
        <div v-for="clothes in closetItems" :key="clothes.id">
          <img :src="clothes.image" alt="Clothes image" class="w-full h-32 object-cover">
          <p class="text-center mt-2">{{ clothes.description }}</p>
        </div>
        <div class="border-2 border-dashed rounded-md p-4 text-center">
          <div class="border-4 border-blue-500 rounded-full p-2 inline-flex items-center justify-center">
            <input type="file" accept="image/*" @change="uploadClothes" style="display: none" ref="fileInput">
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-full h-12 w-12 flex items-center justify-center" @click="triggerFileSelection">
              +
            </button>
          </div>
          <p class="mt-2 text-center">Add clothes...</p>
        </div>
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

  <div v-else class="hero min-h-screen bg-gray-200">
    <div class="hero-content flex-col"> <!-- Add flex-col here -->
      <div class="text-center lg:text-left">
        <h1 class="text-5xl font-bold">Login now!</h1>
        <p class="py-6">Style thermoを使うにはログインが必要です</p>
      </div>
      <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">

        <div class="card-body">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Email</span>
            </label>
            <input type="text" placeholder="email" class="input input-bordered" />
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Password</span>
            </label>
            <input type="password" placeholder="password" class="input input-bordered" />
            <label class="label">
              <a href="#" class="label-text-alt link link-hover">Forgot password?</a>
            </label>
          </div>
          <div class="form-control mt-6">
            <button class="btn btn-primary" @click="login">Login</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>