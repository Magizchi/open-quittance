<script lang="ts">
	export let name: string;
	export let label: string | null = null;
</script>

<div class="flex flex-col">
	{#if label}
		<label class="text-slate-700 font-hind" for={name}>{label}</label>
	{/if}
	<input
		type="text"
		id={name}
		class="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none placeholder:font-hind font-hind border text-sm rounded-lg focus:placeholder:text-indigo-500 focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
		{name}
		{...$$restProps}
	/>
</div>
