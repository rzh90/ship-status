import { AuthApiError } from "@supabase/supabase-js"
import { fail, redirect } from "@sveltejs/kit"

export const actions = {
    delete: async ({ params, request, locals: { supabase, getSession } }) => {
        const formData = await request.formData()
        const session = await getSession()
        const id = params.id

        console.log(formData)
        console.log(id)

        // const user = session.user.id
        // const po = formData.get("po")
        // const customerpo = formData.get("customerpo")
        
        // const {data, error} = await supabase
        //                             .from("orders")
        //                             .delete()
        //                             .eq("id", id)
                                        
        throw redirect(303, "/account")
    },
}