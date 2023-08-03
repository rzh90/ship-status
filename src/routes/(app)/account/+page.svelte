<!--
    From https://github.com/supabase/auth-helpers/blob/main/examples/sveltekit/src/routes/(app)/dashboard/%2Bpage.svelte
    Also from https://supabase.com/docs/guides/auth/auth-helpers/sveltekit#server-side-data-fetching-with-rls
-->
<script>
    import { redirect } from "@sveltejs/kit"

    export let data
    $: ({ testTable, user, supabase } = data)

    let selectedOrders = []

    function toggleSelected(e) {
        let ids = []
        for(let element of testTable) {
            ids.push(element.id)
        }
        selectedOrders = e.target.checked ? [...ids] : []
    }

    async function toggleDelete() {
        for(let id of selectedOrders) {
            const {data, error} = await supabase
                                         .from("orders")
                                         .delete()
                                         .eq("id", id)
        }
        location.reload()
    }
</script>

<p>Hi {user.email}</p>

<div class="mt-4 mb-4 flex items-center gap-2">
    <a href="/account/add" class="btn variant-filled-primary">Add</a>

    {#if selectedOrders.length > 0}
        <form method="post" action="?/delete">
            <button type="submit" class="btn variant-ghost-primary" on:click={toggleDelete}>Delete</button>
        </form>

        <p>{selectedOrders.length} selected</p>
    {/if}
</div>

{#if testTable.length}
    <div class="table-container mt-6">
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
    </div>

{:else}
    <p>No orders yet</p>
{/if}