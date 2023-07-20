<script setup lang="ts">
import { Clothes } from 'composables/account';
import { Database } from 'supabase/schema';

interface Props {
    clothes: Clothes
}
const props = defineProps<Props>();
const supabase = useSupabaseClient<Database>()
const { data, error } = await supabase.storage.from('images').download(props.clothes?.path ?? "")
if (error) throw error
const url = URL.createObjectURL(data)
</script>

<template>
<div class="flex justify-center">
    <span v-if="!url" class="loading loading-spinner loading-lg"></span>
    <img v-else :src="url" alt="Clothing item image" class="w-full h-32 object-cover">
    <p class="text-center mt-2">{{ clothes.desc }}</p>
</div>
</template>