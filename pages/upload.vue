<script setup lang="ts">
import type { RealtimeChannel } from '@supabase/supabase-js'
import { Database } from 'supabase/schema';

definePageMeta({
  middleware: 'auth'
})

const fileInput: Ref<HTMLInputElement | null> = ref(null) // ref="fileInput"のHTMLエレメントとバインドできる
const supabase = useSupabaseClient<Database>()
const user = useSupabaseUser()
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
    const fileExt = file.name.split('.').pop()
    const fileName = `${user.value?.id}-${new Date().getDate()}.${fileExt}`
    const { error: uploadError, data: uploadedFile } = await supabase.storage.from(`images`).upload(fileName, file)
    if (uploadError || user.value === null) {
        alert(`error`)
        return
    }
    const { error } = await supabase.from('images').insert({ user_uid: user.value.id, image_path: uploadedFile.path })
    console.log(error)
    if (!error) refresh()
}

// Fetch collaborators and get the refresh method provided by useAsyncData
const { data: images, refresh, pending } = await useAsyncData('images', async () => {
    const { data } = await supabase.from('images').select()
    return data
})

const downloadImage = async (path: string) => {
  try {
    const { data, error } = await supabase.storage.from('images').download(path)
    if (error) throw error
    return URL.createObjectURL(data)
  } catch (error) {
    console.error('Error downloading image: ', error)
  }
  return ""
}
</script>

<template>
    <form @submit.prevent="submit">
        <input ref="fileInput" type="file" class="file-input" />
        <button class="btn">aaa</button>
    </form>
    <div v-if="!pending" class="flex" @click="refresh()">
        <template v-for="image in images">
            
        </template>
    </div>
</template>