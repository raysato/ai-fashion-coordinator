export const useAccount = () => {
    const supabase = useSupabaseClient()
    const account = useState('alerts', () => useSupabaseUser())

    const signOut = async () => {
        try {
            const { error } = await supabase.auth.signOut()
            if (error) throw error
            account.value = null
        } catch (error) {
            alert(error)
        } finally {
            navigateTo("/")
        }
    }

    return {
        account: readonly(account),
    }
}