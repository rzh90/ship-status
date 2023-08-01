<script>
    import { IconFileDescription, IconCalendar, IconCheck, IconBrandGithubFilled } from "@tabler/icons-svelte"
	const features = [
		{
			title: "Shipment documents",
			description: "Check when the commercial invoice, packing list, or FCR is received.",
			icon: IconFileDescription
		},
		{
			title: "Ship dates",
			description: "Make a note of the ETD, ETA, and invoice dates for each purchase order.",
			icon: IconCalendar
		},
		{
			title: "PO details",
			description: "Includes details for each PO, including customer PO and booking number.",
			icon: IconCheck
		}
	]
</script>

<section class="text-left p-4 md:text-center">
    <div class="relative z-[1] space-y-6 pt-28 pb-24">
        <div class="font-bold text-4xl tracking-tight">
            Track <span class="text-primary-500">Free on Board (FOB)</span> shipments from start to finish
        </div>
        <p class="max-w-lg opacity-70 md:mx-auto">
            Check the status of any FOB shipment to determine when it will arrive and when to send the invoice for payment.
        </p>
        <div class="flex flex-wrap gap-3 md:space-x-3 md:block">
            <a href="/signup" class="btn md:btn-lg w-full md:w-fit variant-ghost-primary">Get started</a>
        </div>
    </div>
</section>

<section class="mb-24" id="features">
    <div class="text-center space-y-4">
        <span class="badge variant-filled-primary uppercase">Features</span>
        <div class="text-xl md:text-3xl font-bold">Integrate effortlessly with any account</div>
        <p class="max-w-xl opacity-60 mx-auto after:mx-auto after:mt-3 after:bg-primary-500 after:w-12 after:h-0.5 after:block">
            Track shipments for Burlington, Costco, Meijer, and more.
        </p>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-16">
        {#each features as feature}
            <div class="card p-4 space-y-2">
                <svelte:component this={feature.icon} class="text-4xl text-primary-500" />
                <div class="font-bold after:mt-3 after:bg-primary-500 after:w-12 after:h-0.5 after:block">
                    {feature.title}
                </div>
                <div class="opacity-60">
                    {feature.description}
                </div>
            </div>
        {/each}
    </div>
</section>

<footer>
    <div class="flex items-center justify-between">
        <p class="text-sm">&copy; 2023 Ship Status. All rights reserved.</p>
        <a href="https://github.com/rzh90/ship-status"><IconBrandGithubFilled /></a>
    </div>
</footer>