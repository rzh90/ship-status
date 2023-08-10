import { AuthApiError } from "@supabase/supabase-js"
import { fail, redirect } from "@sveltejs/kit"

export const actions = {
    add: async ({ request, locals: { supabase, getSession } }) => {
        const formData = await request.formData()
        const session = await getSession()

        // get all form data
        const user = session.user.id
        const po = formData.get("po")
        const customerpo = formData.get("customerpo")
        const retailer = formData.get("retailer")
        const ship_date = formData.get("ship_date") ? formData.get("ship_date") : null
        const etd = formData.get("etd") ? formData.get("etd") : null
        const eta = formData.get("eta") ? formData.get("eta") : null
        const ship_docs = formData.get("ship_docs") == "true"
        const received = formData.get("received") == "true"
        const invoiced = formData.get("invoiced") == "true"

        const {data, error} = await supabase
                                    .from("orders")
                                    .insert({
                                        user,
                                        po,
                                        customerpo,
                                        retailer,
                                        ship_date,
                                        etd,
                                        eta,
                                        ship_docs,
                                        received,
                                        invoiced
                                    })
                                    .select()

        throw redirect(303, "/account")
    }
}