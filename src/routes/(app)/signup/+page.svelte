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
        <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign up</h2>

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            {#if form?.error}
                <div class="block notification is-danger">{form.error}</div>
            {/if}
            {#if form?.message}
                <div class="block notification is-primary">{form.message}</div>
            {/if}

            <form class="space-y-6" method="post" use:enhance={handleSubmit}>
                <div>
                    <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email</label>
                    <div class="mt-2">
                        <input id="email" name="email" value={form?.values?.email ?? ''} class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-ssgreen sm:text-sm sm:leading-6" type="email" required />
                    </div>
                </div>
                <div>
                    <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
                    <div class="mt-2">
                        <input id="password" name="password" class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-ssgreen sm:text-sm sm:leading-6" type="password" required />
                    </div>
                </div>
                <div>
                    <button disabled={loading} class="flex w-full justify-center rounded-md bg-ssgreen px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-ssdarkgreen focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign up</button>
                </div>
            </form>

        <div class="mt-6">
            <p>Already have an account? <a href="/signin" class="text-ssgreen hover:text-ssdarkgreen">Sign in</a></p>
        </div>
    </div>
</section>
