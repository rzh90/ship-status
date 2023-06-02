/*
* From https://github.com/supabase/auth-helpers/blob/main/examples/sveltekit/src/routes/%2Blayout.server.ts
* Also from https://supabase.com/docs/guides/auth/auth-helpers/sveltekit#send-session-to-client
* In order to make the session available to the UI (pages, layouts) we need to pass the session in the root layout server load function
*/
export const load = async ({ locals: { getSession } }) => {
    return {
        session: getSession()
    }
}