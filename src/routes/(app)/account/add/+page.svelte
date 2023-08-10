<!--
    From https://github.com/supabase/auth-helpers/blob/main/examples/sveltekit/src/routes/(app)/dashboard/%2Bpage.svelte
    Also from https://supabase.com/docs/guides/auth/auth-helpers/sveltekit#server-side-data-fetching-with-rls
-->
<script>
    export let data
    
    $: ({ ordersTable, user } = data)
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

                <label class="label">
                    <span>Retailer</span>
                    <select name="retailer" id="retailer" class="select">
                        <option value="Burlington">Burlington</option>
                        <option value="Cabelas">Cabela's</option>
                        <option value="Costco US">Costco US</option>
                        <option value="Costco Canada">Costco Canada</option>
                        <option value="Meijer">Meijer</option>
                    </select>
                </label>

                <label class="label">
                    <span>Ship Date</span>
                    <input id="ship_date" name="ship_date" class="input" type="date">
                </label>

                <label class="label">
                    <span>ETD</span>
                    <input id="etd" name="etd" class="input" type="date">
                </label>

                <label class="label">
                    <span>ETA</span>
                    <input id="eta" name="eta" class="input" type="date">
                </label>

                <label class="label">
                    <span>Shipping documents</span>
                    <select name="ship_docs" id="ship_docs" class="select">
                        <option value="false">Not received</option>
                        <option value="true">Received</option>
                    </select>
                </label>

                <label class="label">
                    <span>Received</span>
                    <select name="received" id="received" class="select">
                        <option value="false">No</option>
                        <option value="true">Yes</option>
                    </select>
                </label>

                <label class="label">
                    <span>Invoiced</span>
                    <select name="invoiced" id="invoiced" class="select">
                        <option value="false">No</option>
                        <option value="true">Yes</option>
                    </select>
                </label>

                <div class="flex gap-2">
                    <input type="submit" value="Add" class="btn variant-filled-primary cursor-pointer">
                    <a href="/account" class="btn variant-ghost-secondary">Cancel</a>
                </div>
            </form>
        </div>
    </div>
</section>