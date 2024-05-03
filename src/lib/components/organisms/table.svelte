<script lang="ts">
	interface ColumnsProps {
		header: string;
		dataIndex: string;
	}

	export let columns: ColumnsProps[];
	export let rows: any[];
</script>

<section>
	<div class="m-5 overflow-hidden border border-gray-200 rounded-lg shadow-md">
		<table class="w-full text-sm text-left text-gray-500 bg-white border-collapse">
			<thead class="w-full bg-gray-100">
				<tr>
					{#each columns as column}
						<th>
							{column.header}
						</th>
					{/each}
				</tr>
			</thead>
			<tbody>
				{#each rows as row}
					<slot {row} />
				{/each}
			</tbody>
		</table>
	</div>
</section>
