<script lang="ts">
	import { ArrowLeftIcon, ArrowRightIcon } from '$lib/components/atoms/Icons/icon';
	import dayjs from 'dayjs';

	interface ColumnsProps {
		header: string;
		dataIndex: string;
	}

	export let columns: ColumnsProps[];
	export let rows: any[] = [];
	export const index: number = 0;
	export let filterPage: (page: number, show: number) => void = () => {};
	export let scalpe: boolean = false;
	let page: number = 1;
	let show: number = 12;
</script>

<div class="overflow-hidden border border-gray-200 rounded-lg shadow">
	<table class="w-full text-sm text-left text-gray-500 bg-white border-collapse">
		<thead class="w-full bg-slate-200">
			<tr>
				{#each columns as column}
					<th class="p-3 text-slate-600 font-hind text-end">
						{column.header}
					</th>
				{/each}
			</tr>
		</thead>
		<tbody>
			{#if rows.length > 0}
				{#each rows as row, index}
					{#if scalpe}
						{#if index === 0}
							<td colspan={columns.length} class="pl-2 font-bold text-slate-700 bg-slate-300">
								{dayjs().format('MMMM')}
								{dayjs().format('YYYY')}
							</td>
							<slot {row} {index} />
						{:else if dayjs(row.startDate).format('MMMM') !== dayjs(rows[index - 1].startDate).format('MMMM')}
							<tr>
								<td colspan={columns.length} class="pl-2 font-bold text-slate-700 bg-slate-300">
									{dayjs(row.startDate).format('MMMM')}
									{dayjs(row.startDate).format('YYYY')}
								</td>
							</tr>
							<slot {row} {index} />
						{:else}
							<slot {row} {index} />
						{/if}
					{:else}
						<slot {row} {index} />
					{/if}
				{/each}
			{:else}
				<td colspan={columns.length} class="p-2 italic text-center font-hind text-slate-700"
					>No Data</td
				>
			{/if}
		</tbody>
	</table>
</div>
<div class="flex justify-end p-1 space-x-4">
	<div class="flex space-x-1">
		<button
			class="flex items-center justify-center p-1 text-4xl border rounded bg-slate-200 border-slate-300"
			disabled={page === 1}
			on:click={() => {
				if (page <= 1) {
					return (page = 1);
				}
				page -= 1;
				filterPage(page, show);
				return page;
			}}><ArrowLeftIcon width="20" /></button
		>
		<input
			name="pageNumber"
			class="text-center border rounded w-9 border-slate-300"
			class:bg-slate-200={rows.length <= show}
			bind:value={page}
			disabled={rows.length <= show}
			min={1}
		/>
		<button
			class="flex items-center justify-center p-1 text-4xl border rounded bg-slate-200 border-slate-300"
			disabled={rows.length <= show}
			on:click={() => {
				page += 1;
				filterPage(page, show);
			}}
		>
			<ArrowRightIcon width="20" />
		</button>
	</div>
	<select
		bind:value={show}
		on:change={() => filterPage(page, show)}
		class="bg-white border rounded border-slate-300 focus:ring-indigo-500 font-hind text-slate-700"
	>
		<option value={12} selected class="font-hind text-slate-700">12/pages</option>
		<option value={24} class="font-hind text-slate-700">24/pages</option>
		<option value={36} class="font-hind text-slate-700">36/pages</option>
	</select>
</div>
