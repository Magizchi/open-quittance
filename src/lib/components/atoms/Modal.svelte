<script lang="ts">
	export let showModal: Boolean;
	let dialog: HTMLDialogElement;

	$: if (dialog && showModal) dialog.showModal();
	$: if (dialog && !showModal) dialog.close();
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog
	bind:this={dialog}
	on:close={() => (showModal = false)}
	on:click|self={() => dialog.close()}
	class="shadow-md rounded-2xl scroll-m-10 min-w-[476px]"
	{...$$restProps}
>
	<div class="relative">
		<slot />
	</div>
</dialog>
