<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})
const supabase = useSupabaseClient()


onMounted(async () => {
    try {
        const { error } = await supabase.auth.signOut()
        if (error) throw error
        reloadNuxtApp({
            path: "/",
            ttl: 1000, // default 10000
        });
    } catch (error) {
        alert(error)
    } finally {
        navigateTo("/")
    }
})
</script>

<template>
</template>