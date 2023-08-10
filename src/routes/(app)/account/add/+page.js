import { redirect } from "@sveltejs/kit"

export const load = async ({ parent }) => {
    const { session, supabase } = await parent()
    if (!session) {
        throw redirect(303, "/")
    }

    // fetch data from database
    const { data: ordersTable } = await supabase.from("orders").select().eq("user", session.user.id)
    return {
        ordersTable,
        user: session.user
    }
}