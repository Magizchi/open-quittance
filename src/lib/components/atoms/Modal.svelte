<script lang="ts">
	export let showModal: boolean = false;
	let dialog: HTMLDialogElement;

	$: if (dialog && showModal) dialog.showModal();
	$: if (dialog && !showModal) dialog.close();
</script>

<dialog
	bind:this={dialog}
	on:close={() => (showModal = false)}
	class="shadow-md rounded-2xl scroll-m-10 min-w-[476px]"
	{...$$restProps}
>
	<div class="relative">
		<slot />
	</div>
</dialog>
