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

<Nav>
    {#if $page.data.session}
        <form action="/logout" method="post" use:enhance={handleLogout}>
            <button class="text-white hover:text-ssgreen" disabled={loading} type="submit">Sign out</button>
        </form>
    {:else}
        <a href="/signin" class="text-white hover:text-ssgreen">Sign in</a>
    {/if}
</Nav>

<main>
    <slot />
</main>