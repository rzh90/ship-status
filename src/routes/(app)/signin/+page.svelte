<script>
    import { applyAction, enhance } from "$app/forms"
    import { invalidate } from "$app/navigation"

    export let form
    let loading = false

    const handleSubmit = () => {
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

<section class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 class="h2">Sign in</h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {#if form?.error}
            <div class="block notification is-danger">{form.error}</div>
        {/if}
        <form class="space-y-6" method="post" use:enhance={handleSubmit}>
            <label class="label">
                <span>Email</span>
                <input id="email" name="email" value={form?.values?.email ?? ''} type="email" class="input" required />
            </label>

            <label class="label">
                <span>Password</span>
                <input id="password" name="password" class="input" type="password" required />
            </label>

            <div>
                <button disabled={loading} class="btn variant-filled">Sign in</button>
            </div>
        </form>

        <div class="mt-6">
            <p>Don't have an account? <a href="/signup" class="anchor">Sign up</a></p>
        </div>
    </div>
</section>
