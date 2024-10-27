<script lang="ts">
	export let name: string;
	export let label: string | null = null;
	export let icon: boolean = false;
</script>

<div class="flex flex-col">
	{#if label}
		<label class="text-slate-700 font-hind" for={name}>{label}</label>
	{/if}
	<div class="relative rounded-md shadow-sm">
		{#if icon}
			<div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
				<span class="text-gray-500 sm:text-sm">€</span>
			</div>
		{/if}
		<input
			type="text"
			id={name}
			class="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none py-1.5 placeholder:font-hind font-hind border text-sm rounded-lg focus:placeholder:text-indigo-500 focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
			class:pl-6={icon}
			{name}
			{...$$restProps}
		/>
	</div>
</div>
