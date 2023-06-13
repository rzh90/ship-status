import { AuthApiError } from "@supabase/supabase-js"
import { fail, redirect } from "@sveltejs/kit"

export const actions = {
    add: async ({ request, locals: { supabase } }) => {
        console.log("ADD button clicked")

        throw redirect(303, "/account/add")
    }
}