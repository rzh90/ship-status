import { AuthApiError } from "@supabase/supabase-js"
import { fail, redirect } from "@sveltejs/kit"

export const actions = {
    add: async ({ request, locals: { supabase, getSession } }) => {
        const formData = await request.formData()
        const session = await getSession()

        const po = formData.get("po")
        const customerpo = formData.get("customerpo")
        const user = session.user.id

        const {data, error} = await supabase
                                        .from("orders")
                                        .insert({po, customerpo, user})
                                        .select()

        console.log("Order added")

        throw redirect(303, "/account/add")
    }
}