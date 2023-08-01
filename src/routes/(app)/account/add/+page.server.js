import { AuthApiError } from "@supabase/supabase-js"
import { fail, redirect } from "@sveltejs/kit"

export const actions = {
    add: async ({ request, locals: { supabase, getSession } }) => {
        const formData = await request.formData()
        const session = await getSession()

        const po = formData.get("po")
        const customerpo = formData.get("customerpo")
        const retailer = formData.get("retailer")
        const ship_date = formData.get("ship_date")
        const etd = formData.get("etd")
        const eta = formData.get("eta")
        const ship_docs = formData.get("ship_docs")
        const received = formData.get("received")
        const invoiced = formData.get("invoiced")
        const user = session.user.id

        const {data, error} = await supabase
                                    .from("orders")
                                    .insert({
                                        user,
                                        po,
                                        customerpo,
                                        retailer,
                                    })
                                    .select()

        throw redirect(303, "/account")
    }
}