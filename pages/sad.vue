<script setup lang="ts">
definePageMeta({
  layout: 'plain',
})
</script>

<template>
    <div class="flex flex-col">
        <p>{{`Enable geolocation permissions on your browser ><`}}</p>
        <NuxtLink to="/" class="link link-primary mt-5">Go back</NuxtLink>
    </div>
</template>