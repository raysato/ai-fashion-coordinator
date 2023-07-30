import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'
import { Clothes } from '../../composables/account'
import { Database } from '../../supabase/schema'
import { Weather } from './weather'

export default defineEventHandler(async (event) => {
    const client = serverSupabaseClient<Database>(event)
    const user = await serverSupabaseUser(event)
    const { data: userClothes } = await client.from('images').select().eq('user_uid', user?.id)
    const clothes = userClothes?.map(value => value.image_desc) ?? []
    const text = clothes.reduce((prev, val) => `${prev},${val}`, "You have the following clothes: ")
    const config = useRuntimeConfig();
    const weather: Weather = await readBody(event)
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${config.gptKey}`
        },
        body: JSON.stringify({
            messages: [
                {"role": "system", "content": "You are a helpful fashion coordinator."},
                {"role": "system", "content": text},
                {"role": "system", "content": `Today's weather is ${weather?.weather[0].main}, ${weather?.main.temp} degrees celsius, ${weather?.main.humidity}% humidity`},
                {"role": "user", "content": "Coordinate a comfortable and good looking fashion with the clothes. You do not have to use all of them."}
            ],
            model: "gpt-3.5-turbo",
            max_tokens: 500,
            temperature: 1,
            n: 1,
            stop: '###'
        })
    });
    const message: string = (await response.json()).choices[0].message.content
    const chosenClothes: Clothes[] = userClothes?.filter(value => value.image_desc && message.toLowerCase().includes(value.image_desc.toLowerCase())).map((value) => ({
        id: value.id,
        path: value.image_path,
        desc: value.image_desc
    })) ?? []
    return {
        clothes: chosenClothes,
        message,
    }
})