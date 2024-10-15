<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { ArrowLeftIcon, ArrowRightIcon } from '$lib/components/atoms/Icons/icon';
	import dayjs from 'dayjs';

	interface ColumnsProps {
		header: string;
		dataIndex: string;
	}

	export let columns: ColumnsProps[];
	export let rows: any[] = [];
	export const index: number = 0;
	export let scalpe: boolean = false;

	let currentPage: number = $page.url.searchParams.get('page')
		? Number($page.url.searchParams.get('page'))
		: 1;
	let show: number = $page.url.searchParams.get('show')
		? Number($page.url.searchParams.get('show'))
		: 12;

	let pagePagination: (currentPage: number, show: number) => void = (currentPage, show) => {
		goto(`?page=${currentPage}&show=${show}`);
	};
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
			disabled={currentPage === 1}
			on:click={() => {
				if (currentPage <= 1) {
					return (currentPage = 1);
				}
				currentPage -= 1;
				pagePagination(currentPage, show);
				return currentPage;
			}}><ArrowLeftIcon width="20" /></button
		>
		<input
			name="pageNumber"
			class="text-center border rounded w-9 border-slate-300"
			class:bg-slate-200={rows.length <= show}
			bind:value={currentPage}
			disabled={rows.length <= show}
			min={1}
		/>
		<button
			class="flex items-center justify-center p-1 text-4xl border rounded bg-slate-200 border-slate-300"
			disabled={rows.length <= show}
			on:click={() => {
				currentPage += 1;
				pagePagination(currentPage, show);
			}}
		>
			<ArrowRightIcon width="20" />
		</button>
	</div>
	<select
		bind:value={show}
		on:change={() => pagePagination(currentPage, show)}
		class="bg-white border rounded border-slate-300 focus:ring-indigo-500 font-hind text-slate-700"
	>
		<option value={12} selected class="font-hind text-slate-700">12/page</option>
		<option value={24} class="font-hind text-slate-700">24/page</option>
		<option value={36} class="font-hind text-slate-700">36/page</option>
	</select>
</div>
