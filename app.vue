<template>
  <NuxtLayout>
      <NuxtPage />
  </NuxtLayout>
  <div class="fixed bottom-5 w-full p-5 alert-box">
      <template v-for="(alert, i) in alerts">
          <Alert v-if="alert !== null" :alert="alert" :index="i" />
      </template>
  </div>
  </template>
  
  <script setup lang="ts">
  
  
  const { alerts } = useAlert();
  
  </script>