<script lang="ts" setup>
definePageMeta({
  middleware: 'auth'
})

const {userClothes, updateClothes} = useAccount()
const locationGranted = ref(false)
// これをAPIからの実際のデータに置き換える
const weather = {
  condition: 'Sunny',
  icon: '../assets/img/sun.png',
  temperature: 24,
  humidity: 65,
}
onMounted(() => {
  updateClothes()
  modalCheck()
})

const modalCheck = () => {
  if (userClothes.value.length < 1 || true) {
    modal.value?.showModal()
  }
}

const {data: gpt, refresh, pending} = await useLazyFetch('/api/ask')
const modal = ref<HTMLDialogElement | null>(null)
</script>

<template>

<dialog ref="modal" class="modal">
  <form method="dialog" class="modal-box">
    <h3 class="font-bold text-lg">TODO:</h3>
    <p class="py-4">Press ESC key or click the button below to close</p>
    <div class="modal-action">
      <!-- if there is a button in form, it will close the modal -->
      <button class="btn">Close</button>
    </div>
  </form>
</dialog>
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
  </div>
</template>