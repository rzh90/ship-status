<!--
    From https://github.com/supabase/auth-helpers/blob/main/examples/sveltekit/src/routes/(app)/dashboard/%2Bpage.svelte
    Also from https://supabase.com/docs/guides/auth/auth-helpers/sveltekit#server-side-data-fetching-with-rls
-->
<script>
    export let data
    
    $: ({ testTable, user } = data)
</script>

<div class="block">
    <p>Protected content for {user.email}</p>
    <p>server-side fetched data with RLS:</p>
    <pre>{JSON.stringify(testTable, null, 2)}</pre>
</div>
<div class="block">
    <p>user:</p>
    <pre>{JSON.stringify(user, null, 2)}</pre>
</div>