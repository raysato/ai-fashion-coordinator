import { User } from "@supabase/supabase-js"
import { Database } from "supabase/schema"

export interface Clothes {
    id: number | null
    path: string | null
    desc: string | null
}
const updateClothes = (userClothes: Ref<Clothes[]>, user: Ref<User | null>) => async () => {
    const supabase = useSupabaseClient<Database>()
    const { data } = await supabase.from('images').select().eq('user_uid', user.value?.id)
    userClothes.value = data?.map((value) => ({
        id: value.id,
        path: value.image_path,
        desc: value.image_desc
    })) ?? []
}
const getClothes = async (user: Ref<User | null>) => {
    const supabase = useSupabaseClient<Database>()
    const { data } = await supabase.from('images').select().eq('user_uid', user.value?.id)
    return data?.map((value) => ({
        path: value.image_path,
        desc: value.image_desc
    })) ?? []
}
const uploadClothes = (userClothes: Ref<Clothes[]>, user: Ref<User | null>) => async (file: File) => {
    
    const supabase = useSupabaseClient<Database>()
    const fileExt = file.name.split('.').pop()
    const fileName = `${user.value?.id}-${new Date().getTime()}.${fileExt}`
    const { error: uploadError, data: uploadedFile } = await supabase.storage.from(`images`).upload(fileName, file)
    if (uploadError || user.value === null) {
        alert(`error`)
        return
    }
    const { error, data } = await supabase.from('images').insert({ user_uid: user.value.id, image_path: uploadedFile.path }).select()
    console.log(data)
    if (!error) {
        userClothes.value.push({
            id: data[0].id,
            path: fileName,
            desc: ""
        })
    }
}

export const useAccount = () => {
    const user = useState('user', () => useSupabaseUser())
    const userClothes = useState<Clothes[]>('userClothes', () => [])
    updateClothes(userClothes, user)

    return {
        account: readonly(user),
        userClothes: readonly(userClothes),
        updateClothes: updateClothes(userClothes, user),
        uploadClothes: uploadClothes(userClothes, user)
    }
}