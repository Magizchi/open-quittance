<script lang="ts">
	interface ColumnsProps {
		header: string;
		dataIndex: string;
	}

	export let columns: ColumnsProps[];
	export let rows: any[];
</script>

<div class="overflow-hidden border border-gray-200 rounded-lg shadow">
	<table class="w-full text-sm text-left text-gray-500 bg-white border-collapse">
		<thead class="w-full bg-white">
			<tr>
				{#each columns as column}
					<th class="p-3">
						{column.header}
					</th>
				{/each}
			</tr>
		</thead>
		<tbody>
			{#if rows.length > 0}
				{#each rows as row, id}
					<slot {row} {id} />
				{/each}
			{:else}
				<td colspan={columns.length} class="p-2 text-center">No Data</td>
			{/if}
		</tbody>
	</table>
</div>
