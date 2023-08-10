<!--
    From https://github.com/supabase/auth-helpers/blob/main/examples/sveltekit/src/routes/(app)/dashboard/%2Bpage.svelte
    Also from https://supabase.com/docs/guides/auth/auth-helpers/sveltekit#server-side-data-fetching-with-rls
-->
<script>
    import { ProgressRadial } from "@skeletonlabs/skeleton"
    import { IconAlertTriangleFilled } from "@tabler/icons-svelte"

    export let data
    $: ({ ordersTable, user, supabase, session } = data)

    let selectedOrders = []
    const today = new Date()
    let shipmentsThisWeek = 0
    let selectedSort

    // toggle checkbox for selecting multiple items
    function toggleSelected(e) {
        let ids = []
        for(let element of ordersTable) {
            ids.push(element.id)
        }
        selectedOrders = e.target.checked ? [...ids] : []
    }

    // get all orders from database and sort them if sort option is selected
    async function getOrders(sortBy) {
        if(sortBy) {
            const { data } = await supabase
                                .from("orders")
                                .select()
                                .eq("user", session.user.id)
                                .order(sortBy)
            return data
        }
        else {
            const { data } = await supabase
                                    .from("orders")
                                    .select()
                                    .eq("user", session.user.id)
            return data
        }
    }

    async function toggleDelete() {
        for(let id of selectedOrders) {
            const {data, error} = await supabase
                                         .from("orders")
                                         .delete()
                                         .eq("id", id)
        }
        ordersTable = getOrders()
        selectedOrders = []
    }

    function sortOrders() {
        ordersTable = getOrders(selectedSort)
    }

    // find shipments with ship date in less than 7 days
    for(let element of data.ordersTable) {
        let daysLeft = Math.floor((Date.parse(element.ship_date) - today) / (24 * 3600 * 1000))
        if(daysLeft >= 0 && daysLeft <= 7)
            shipmentsThisWeek++
    }
</script>

<p>Hi {user.email}</p>

<!-- if any shipments are in the next 7 days -->
{#if shipmentsThisWeek > 0}
    <aside class="mt-4 alert variant-filled-warning">
        <div><IconAlertTriangleFilled /></div>
        <div class="alert-message">
            <p>
                {shipmentsThisWeek}
                {#if shipmentsThisWeek > 1}
                    shipments in the next 7 days.
                {:else}
                    shipment in the next 7 days.
                {/if}
                Make sure the ETD/ETA is confirmed!
            </p>
        </div>
    </aside>
{/if}

<!-- add, delete, and sort options -->
<section class="mt-4 mb-4 flex items-center justify-between">
    <section class="flex items-center gap-2">
        <a href="/account/add" class="btn variant-filled-primary">Add</a>

        {#if selectedOrders.length > 0}
            <button type="submit" class="btn variant-ghost-primary" on:click={toggleDelete}>Delete</button>

            <p>{selectedOrders.length} selected</p>
        {/if}
    </section>

    <section class="flex items-center gap-2">
        <form>
            <select class="select" bind:value={selectedSort} on:change={sortOrders}>
                <option selected disabled>Sort by:</option>
                <option value="po">PO</option>
                <option value="customerpo">Customer PO</option>
                <option value="ship_date">Ship date</option>
                <option value="etd">ETD</option>
            </select>
        </form>
    </section>
</section>

<!-- load the data -->
{#await ordersTable}
<!-- if data is fetching -->
    <div class="flex justify-center">
        <ProgressRadial />
    </div>
<!-- when data has been fetched -->
{:then ordersTable}
    {#if ordersTable.length}
        <section class="table-container mt-4">
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th><input class="checkbox" type="checkbox" on:change={toggleSelected}></th>
                        <th>PO</th>
                        <th>Customer PO</th>
                        <th>Retailer</th>
                        <th>Ship Date</th>
                        <th>ETD</th>
                        <th>ETA</th>
                        <th>Ship Docs</th>
                        <th>Received</th>
                        <th>Invoiced</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {#each ordersTable as order}
                        <tr>
                            <td>
                                <form>
                                <input class="checkbox" type="checkbox" name="selectedOrders" id="selectedOrders" value={order.id} bind:group={selectedOrders}>
                                </form>
                            </td>
                            <td>{order.po}</td>
                            <td>{order.customerpo}</td>
                            <td>{order.retailer}</td>
                            <td>{#if order.ship_date} {order.ship_date} {/if}</td>
                            <td>{#if order.etd} {order.etd} {/if}</td>
                            <td>{#if order.eta} {order.eta} {/if}</td>
                            <td>{#if order.ship_docs} Received {:else} Not received {/if}</td>
                            <td>{#if order.received} Yes {:else} No {/if}</td>
                            <td>{#if order.invoiced} Yes {:else} No {/if}</td>
                            <td><a href={`/account/edit/${order.id}`} class="anchor">Edit</a></td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </section>

    <!-- if no data available -->
    {:else}
        <p>No orders yet</p>
    {/if}
{/await}