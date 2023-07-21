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
const editing = ref(false)
const {addAlert} = useAlert()
const save = async () => {
    console.log(clothes.value)
    const { data, error } = await supabase
        .from('images')
        .update({ image_desc: clothes.value.desc })
        .eq('id', clothes.value.id)
        .select()
    console.log(data)
    if (!error) {
        updateClothes()
        addAlert({
            type: 'alert-success',
            message: 'Successfully updated image.'
        })
    }
}
</script>

<template>
<div class="justify-center">
    <span v-if="!url" class="loading loading-spinner loading-lg"></span>
    <img v-else :src="url" alt="Clothing item image" class="w-full h-32 object-cover">
    <div class="mt-2 flex flex-row-reverse">
        <input v-model="clothes.desc" type="text" placeholder="Type here" class="w-full">
        <button @click="save" class="btn btn-xs btn-ghost">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
            <path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z" />
            <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z" />
            </svg>
        </button>
    </div>
</div>
</template>