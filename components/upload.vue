<script setup lang="ts">
const {account, uploadClothes, updateClothes} = useAccount()
const fileInput = ref<HTMLInputElement | null>(null)
const upload = () => {
    if (fileInput.value instanceof HTMLInputElement) {
        Array.from(fileInput.value.files ?? []).forEach(file => {
            uploadClothes(file)
        });
    }
}
</script>

<template>
<div class="border-2 border-dashed rounded-md p-4 text-center cursor-pointer" @click="fileInput?.click()">
    <div class="border-4 border-blue-500 rounded-full p-2 inline-flex items-center justify-center">
    <input type="file" accept="image/*" multiple @change="upload" class="hidden" ref="fileInput">
    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-full h-12 w-12 flex items-center justify-center" >
        +
    </button>
    </div>
    <p class="mt-2 text-center">Add clothes...</p>
</div>
</template>