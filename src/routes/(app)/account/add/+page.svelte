<!--
    From https://github.com/supabase/auth-helpers/blob/main/examples/sveltekit/src/routes/(app)/dashboard/%2Bpage.svelte
    Also from https://supabase.com/docs/guides/auth/auth-helpers/sveltekit#server-side-data-fetching-with-rls
-->
<script>
    export let data
    
    $: ({ testTable, user } = data)
</script>

<div>
    <p>{user.email}</p>
    <form method="post" action="?/add">
        <input type="submit" value="Add" class="btn variant-filled-primary">
    </form>
</div>