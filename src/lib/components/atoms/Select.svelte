<script lang="ts">
	export let options: any;
	export let value: any;
	export let label: string;
	export let name: string;
</script>

<div class="flex flex-col space-y-2">
	<label for={'select' + name}>{label}</label>
	<select bind:value {...$$restProps}>
		<option value="" selected> choisir... </option>
		{#each options as option}
			<option value={option.value} disabled={option.description ? true : false}>
				<div class="flex flex-col">
					<span class="bg-red-400">{option.label}</span>
					{#if option.description}
						<span>{option.description}</span>
					{/if}
				</div>
			</option>
		{/each}
	</select>
</div>
