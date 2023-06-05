<!-- 
    From https://github.com/supabase/auth-helpers/blob/main/examples/sveltekit/src/routes/%2Blayout.svelte
    Also from https://supabase.com/docs/guides/auth/auth-helpers/sveltekit#setting-up-the-event-listener-on-the-client-side
    We need to create an event listener in the root +layout.svelte file in order catch supabase events being triggered.
-->
<script>
    import { invalidate } from "$app/navigation"
    import { onMount } from "svelte"
    import "../app.css"

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
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Alumni+Sans:ital,wght@1,700&family=Inter:wght@400;700&display=swap" rel="stylesheet">
</svelte:head>

<slot />