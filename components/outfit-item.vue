<script setup lang="ts">
import { Clothes } from 'composables/account';
import { Database } from 'supabase/schema';

interface Props {
    clothesProp: Clothes
}
const {updateClothes} = useAccount()
const props = defineProps<Props>();
const supabase = useSupabaseClient<Database>()
const clothes = ref({...props.clothesProp})
const { data, error } = await supabase.storage.from('images').download(clothes.value?.path ?? "")
if (error) throw error
const url = URL.createObjectURL(data)
</script>

<template>
<div>
    <img :src="url" alt="Outfit image" class="w-full h-32 object-cover">
    <p class="text-center mt-2">{{ clothes.desc }}</p>
</div>
</template>