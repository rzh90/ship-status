<!--
    From https://github.com/supabase/auth-helpers/blob/main/examples/sveltekit/src/routes/(app)/dashboard/%2Bpage.svelte
    Also from https://supabase.com/docs/guides/auth/auth-helpers/sveltekit#server-side-data-fetching-with-rls
-->
<script>
    export let data
    
    $: ({ testTable, user } = data)
</script>

<p>Hi {user.email}</p>

<a href="/account/add" class="btn variant-filled-primary">Add order</a>

{#if testTable.length}
    <div class="table-container mt-6">
        <table class="table table-hover">
            <thead>
                <tr>
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