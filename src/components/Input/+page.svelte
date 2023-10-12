<script lang="ts">
	export let label: string;
	export let name: string;
	export let placeholder: string;
</script>

<div>
	<label for={name} class="block mb-2 text-sm font-medium">{label}</label>
	<input
		type="text"
		id={name}
		class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
		{placeholder}
		{name}
	/>
</div>
