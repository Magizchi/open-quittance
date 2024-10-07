<script lang="ts">
	export let name: string;
	export let className: string | null = null;
	export let label: string | null = null;
</script>

<div class="flex flex-col">
	{#if label}
		<label class="text-slate-700 font-hind" for={name}>{label}</label>
	{/if}
	<div class="flex">
		{#if $$slots.CustomIcon}
			<span
				class={'flex items-center justify-center h-10 text-2xl text-slate-700 border border-r-0 rounded-l-lg min-w-10 z-highest' +
					className}
			>
				<slot name="CustomIcon" />
			</span>
		{/if}
		<input
			type="text"
			id={name}
			class={$$slots.CustomIcon
				? 'w-full pl-1 border border-gray-200 rounded-r-lg outline-none focus:ring-1 ring-blue-400 appearance-none'
				: '[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none placeholder:font-hind font-hind border text-sm rounded-lg focus:placeholder:text-indigo-500 focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5'}
			{name}
			{...$$restProps}
		/>
	</div>
</div>
