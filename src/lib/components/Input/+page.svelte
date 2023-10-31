<script lang="ts">
	export let label: string;
	export let name: string;
</script>

<div>
	{#if label}
		<label for={name} class="block mb-2 text-sm font-medium">{label}</label>
	{/if}
	<input
		type="text"
		id={name}
		class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
		{...$$restProps}
	/>
</div>
