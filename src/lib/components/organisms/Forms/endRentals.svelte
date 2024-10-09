<script lang="ts">
	import Input from '$lib/components/atoms/Input.svelte';

	export let rental;
</script>

<div class="flex items-center w-full h-24 px-10 mb-5 bg-indigo-500 rounded-t">
	<h3 class="text-2xl font-bold text-white">Fin de Locations</h3>
</div>
<div class="px-10 mb-5 space-y-5 font-hind text-slate-700">
	<p class="font-bold">Locataire : <span class="font-normal">{rental.tenant?.name}</span></p>
	<p class="font-bold">
		Propriété : <span class="font-normal">{rental.property?.name} - {rental.property?.city}</span>
	</p>
	<Input name="endDate" type="date" />
	<Input name="rentalId" value={rental.rentalId} type="hidden" />
</div>
