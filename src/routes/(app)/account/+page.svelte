<!--
    From https://github.com/supabase/auth-helpers/blob/main/examples/sveltekit/src/routes/(app)/dashboard/%2Bpage.svelte
    Also from https://supabase.com/docs/guides/auth/auth-helpers/sveltekit#server-side-data-fetching-with-rls
-->
<script>
    import { ProgressRadial } from "@skeletonlabs/skeleton"
    import { IconAlertTriangleFilled } from "@tabler/icons-svelte"

    export let data
    $: ({ testTable, user, supabase, session } = data)

    let selectedOrders = []
    const today = new Date()
    let shipmentsThisWeek = 0

    function toggleSelected(e) {
        let ids = []
        for(let element of testTable) {
            ids.push(element.id)
        }
        selectedOrders = e.target.checked ? [...ids] : []
    }

    async function getOrders() {
        const { data } = await supabase
                                .from("orders")
                                .select()
                                .eq("user", session.user.id)
        return data
    }

    async function toggleDelete() {
        for(let id of selectedOrders) {
            const {data, error} = await supabase
                                         .from("orders")
                                         .delete()
                                         .eq("id", id)
        }
        testTable = getOrders()
        selectedOrders = []
    }

    for(let element of data.testTable) {
        let daysLeft = Math.floor((Date.parse(element.ship_date) - today) / (24 * 3600 * 1000))
        if(daysLeft >= 0 && daysLeft <= 7)
            shipmentsThisWeek++
    }
</script>

<p>Hi {user.email}</p>

<section class="mt-4 mb-4 flex items-center gap-2">
    <a href="/account/add" class="btn variant-filled-primary">Add</a>

    {#if selectedOrders.length > 0}
        <button type="submit" class="btn variant-ghost-primary" on:click={toggleDelete}>Delete</button>

        <p>{selectedOrders.length} selected</p>
    {/if}
</section>

<section class="mt-4 mb-4">
    <p>Sort:</p>
</section>

{#await testTable}
    <ProgressRadial />
{:then testTable}
    {#if testTable.length}
        {#if shipmentsThisWeek > 0}
            <aside class="alert variant-filled-warning">
                <div><IconAlertTriangleFilled /></div>
                <div class="alert-message">
                    <p>
                        {shipmentsThisWeek}
                        {#if shipmentsThisWeek > 1}
                            shipments this week.
                        {:else}
                            shipment this week.
                        {/if}
                        Make sure the ETD/ETA is confirmed!
                    </p>
                </div>
            </aside>
        {/if}

        <section class="table-container mt-6">
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
                    {#each testTable as order}
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

    {:else}
        <p>No orders yet</p>
    {/if}
{/await}