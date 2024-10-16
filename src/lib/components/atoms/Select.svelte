<script lang="ts">
	export let options: { label: string; value: number }[] = [];
	export let value: number;
	export let label: string;
	export let name: string;
</script>

<div class="flex flex-col space-y-2">
	<label class="text-slate-700 font-hind" for={'select' + name}>{label}</label>
	<select {name} bind:value {...$$restProps} class="text-slate-700 font-hind">
		<option value="" selected> choisir... </option>
		{#each options as option}
			<option value={option.value}>
				<div class="flex flex-col">
					<span class="bg-red-400">{option.label}</span>
				</div>
			</option>
		{/each}
	</select>
</div>
