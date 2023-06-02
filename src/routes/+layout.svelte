<!-- 
    From https://github.com/supabase/auth-helpers/blob/main/examples/sveltekit/src/routes/%2Blayout.svelte
    Also from https://supabase.com/docs/guides/auth/auth-helpers/sveltekit#setting-up-the-event-listener-on-the-client-side
    We need to create an event listener in the root +layout.svelte file in order catch supabase events being triggered.
-->
<script>
    import { invalidate } from "$app/navigation"
    import { onMount } from "svelte"

    export let data

    $: ({ supabase, session } = data)

    onMount(() => {
        const {
            data: { subscription }
        } = supabase.auth.onAuthStateChange((event, _session) => {
            if (_session?.expires_at !== session?.expires_at) {
                invalidate("supabase:auth")
            }
        })

        return () => subscription.unsubscribe()
    })
</script>

<svelte:head>
    <title>Supabase Auth Helpers Demo</title>
</svelte:head>

<slot />