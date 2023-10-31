<script lang="ts">
	interface Columns {
		title: string;
		dataIndex: string;
	}

	interface Infos {
		name: string;
		status: string;
		city: string;
		nbLocataire: number;
	}

	export let columns: Columns[];
	export let infos: any[];
	const columnsWithInfo = columns.slice();
	columns.push({ title: '', dataIndex: '' });
</script>

<section>
	<div class="m-5 overflow-hidden border border-gray-200 rounded-lg shadow-md">
		<table class="w-full text-sm text-left text-gray-500 bg-white border-collapse">
			<thead class="w-full bg-gray-100">
				<tr>
					{#each columns as column, i}
						<th scope="col" class="px-6 py-4 font-medium text-gray-900">{column.title}</th>
					{/each}
				</tr>
			</thead>
			<tbody class="border-t border-gray-100 divide-y divide-gray-100">
				{#each infos as info, i}
					<tr class="hover:bg-gray-50">
						{#each columnsWithInfo as columnIndex}
							<td class="px-6 py-4">
								<p class="text-sm font-medium text-gray-700">
									{info[`${columnIndex.dataIndex}`]}
								</p>
							</td>
						{/each}
						<!-- <th class="flex gap-3 px-6 py-4 font-normal text-gray-900">
							<p>{info[`${columns[0].dataIndex}`]}</p>
						</th>
						<td class="px-6 py-4">
							<p class="">
								{info[`${columns[1].dataIndex}`]}
							</p>
						</td>
						<td class="px-6 py-4"><p>{info[`${columns[2].dataIndex}`]}</p></td>
						<td class="px-6 py-4">
							<p>
								{info[`${columns[3].dataIndex}`]}
							</p>
						</td> -->
						<td class="px-6 py-4">
							<div class="flex justify-end gap-4">
								<!-- <a x-data="{ tooltip: 'Delete' }" href="/"> -->
								<a href="/">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke-width="1.5"
										stroke="currentColor"
										class="w-6 h-6"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
										/>
									</svg>
								</a>
								<!-- <a x-data="{ tooltip: 'Edite' }" href="/"> -->
								<a href="/">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke-width="1.5"
										stroke="currentColor"
										class="w-6 h-6"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
										/>
									</svg>
								</a>
							</div>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</section>
