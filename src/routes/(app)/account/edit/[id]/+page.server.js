import { AuthApiError } from "@supabase/supabase-js"
import { fail, redirect } from "@sveltejs/kit"

export const actions = {
    delete: async ({ params, request, locals: { supabase, getSession } }) => {
        const formData = await request.formData()
        const session = await getSession()
        const id = params.id

        const po = formData.get("po")
        const customerpo = formData.get("customerpo")
        const user = session.user.id

        const {data, error} = await supabase
                                        .from("orders")
                                        .delete()
                                        .eq("id", id)
                                        .select()
                                        
        throw redirect(303, "/account")
    },

    edit: async ({ params, request, locals: { supabase, getSession } }) => {
        const formData = await request.formData()
        const session = await getSession()
        const id = params.id

        const po = formData.get("po")
        const customerpo = formData.get("customerpo")
        const user = session.user.id

        console.log("Order edited")
                                        
        throw redirect(303, "/account")
    },
}