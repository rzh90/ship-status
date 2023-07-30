<script>
    export let data
    
    $: ({ testTable, user, id } = data)
</script>

<section class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 class="h2">Edit order</h2>

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            {#each testTable as order}
                {#if order.id == id}
                <form method="post" action="?/edit" class="space-y-6">
                    <label class="label">
                        <span>PO Number</span>
                        <input id="po" name="po" class="input" type="text" value={order.po} required>
                    </label>
                    <label class="label">
                        <span>Customer PO Number</span>
                        <input id="customerpo" name="customerpo" class="input" type="text" value={order.customerpo} required>
                    </label>
    
                    <div class="flex gap-2">
                        <input type="submit" value="Edit" class="btn variant-filled-primary">
                        <form method="post" action="?/delete">
                            <button type="submit" class="btn variant-ghost-primary">Delete</button>
                        </form>
                        <a href="/account" class="btn variant-ghost-secondary">Cancel</a>
                    </div>
                </form>
                {/if}
            {/each}
        </div>
    </div>
</section>