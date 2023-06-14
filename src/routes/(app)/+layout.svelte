<script>
    import { applyAction, enhance } from "$app/forms"
    import { invalidate } from "$app/navigation"
    import { page } from "$app/stores"

    import Nav from "$lib/Nav.svelte"

    let loading = false

    const handleLogout = () => {
        loading = true
        return async ({ result }) => {
            if (result.type === "redirect") {
                await invalidate("supabase:auth")
            } else {
                await applyAction(result)
            }
            loading = false
        }
    }
</script>

<svelte:head>
    <title>Ship Status</title>
</svelte:head>

<header class="bg-ssdarkgreen p-2 mb-6">
    <div class="mx-auto max-w-screen-xl"> <!-- wrapper -->
        <Nav>
            {#if $page.data.session}
                <form action="/logout" method="post" use:enhance={handleLogout}>
                    <button class="btn btn-sm variant-filled-primary" disabled={loading} type="submit">Sign out</button>
                </form>
            {:else}
                <a href="/signin" class="btn btn-sm variant-filled-primary">Sign in</a>
            {/if}
        </Nav>
    </div>
</header>

<div class="container mx-auto max-w-screen-xl">
    <slot />
</div>
