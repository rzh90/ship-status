<!--
    From https://github.com/supabase/auth-helpers/blob/main/examples/sveltekit/src/routes/(app)/dashboard/%2Bpage.svelte
    Also from https://supabase.com/docs/guides/auth/auth-helpers/sveltekit#server-side-data-fetching-with-rls
-->
<script>
    export let data
    
    $: ({ testTable, user } = data)
</script>

<section class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 class="h2">Add an order</h2>

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form method="post" action="?/add" class="space-y-6">
                <label class="label">
                    <span>PO Number</span>
                    <input id="po" name="po" class="input" type="text" required>
                </label>
                <label class="label">
                    <span>Customer PO Number</span>
                    <input id="customerpo" name="customerpo" class="input" type="text" required>
                </label>

                <div class="flex gap-2">
                    <input type="submit" value="Add" class="btn variant-filled-primary">
                    <a href="/account" class="btn variant-ghost-secondary">Cancel</a>
                </div>
            </form>
        </div>
    </div>
</section>