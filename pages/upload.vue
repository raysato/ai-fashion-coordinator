<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})
const fileInput: Ref<HTMLInputElement | null> = ref(null)
const supabase = useSupabaseClient()
const submit = async (event: Event) => {
    if (!(event.target instanceof HTMLFormElement)) {
        console.log(1)
        return
    }
    const file = fileInput.value?.files?.[0]
    if (!file) {
        console.log(event.target)
        return
    }
    const formData = new FormData();
    formData.append('file', file);
    const response = await useFetch('/api/add', {
        method: 'post',
        body: formData,
    });
    console.log(response.data.value)
}
</script>

<template>
    <form @submit.prevent="submit">
        <input ref="fileInput" type="file" class="file-input" />
        <button class="btn">aaa</button>
    </form>
</template>