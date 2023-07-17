import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
    const files = await readMultipartFormData(event)
    if (!files || files.length === 0) {
        sendError(event, createError({statusCode: 401, statusMessage: 'No files were uploaded.'}));
        return;
    }
    const supabase = serverSupabaseClient(event)
    const data = files[0]
    const fileExt = data.filename?.split('.').pop()
    const fileName = `${Math.random()}.${fileExt}`
    const filePath = `${fileName}`
    const file = new File([data.data], fileName)
    console.log(fileName)
    let { error: uploadError } = await supabase.storage.from('images').upload(filePath, file)
    return {
        uploadError
    }
})