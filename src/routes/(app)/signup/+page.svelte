<script>
    import { applyAction, enhance } from "$app/forms"

    export let form
    let loading = false

    const handleSubmit = () => {
        loading = true
        return async ({ result }) => {
            await applyAction(result)
            loading = false
        }
    }
</script>

<section class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 class="h2">Sign up</h2>

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            {#if form?.error}
                <div class="block notification is-danger">{form.error}</div>
            {/if}
            {#if form?.message}
                <div class="block notification is-primary">{form.message}</div>
            {/if}

            <form class="space-y-6" method="post" use:enhance={handleSubmit}>
                <label class="label">
                    <span>Email</span>
                    <input id="email" name="email" value={form?.values?.email ?? ''} class="input" type="email" required />
                </label>

                <label class="label">
                    <span>Password</span>
                    <input id="password" name="password" class="input" type="password" required />
                </label>

                <div>
                    <button disabled={loading} class="btn variant-filled-primary">Sign up</button>
                </div>
            </form>

        <div class="mt-6">
            <p>Already have an account? <a href="/signin" class="anchor">Sign in</a></p>
        </div>
    </div>
</section>
