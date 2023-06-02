/*
* From https://github.com/supabase/auth-helpers/blob/main/examples/sveltekit/src/routes/%2Blayout.ts
* Also from https://supabase.com/docs/guides/auth/auth-helpers/sveltekit#shared-load-functions-and-pages
* To be able to use Supabase in shared load functions and inside pages you need to create a Supabase client in the root layout load
*/
import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from "$env/static/public"
import { createSupabaseLoadClient } from "@supabase/auth-helpers-sveltekit"

export const load = async ({ fetch, data, depends }) => {
    depends("supabase:auth")

    const supabase = createSupabaseLoadClient({
        supabaseUrl: PUBLIC_SUPABASE_URL,
        supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
        event: { fetch },
        serverSession: data.session
    })

    const {
        data: { session }
    } = await supabase.auth.getSession()

    return { supabase, session }
}