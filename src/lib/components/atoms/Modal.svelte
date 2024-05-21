<script lang="ts">
	export let showModal: Boolean;
	let dialog: HTMLDialogElement;

	$: if (dialog && showModal) dialog.showModal();
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog
	bind:this={dialog}
	on:close={() => (showModal = false)}
	on:click|self={() => dialog.close()}
>
	<div>
		<slot name="header" />
		<hr />
		<slot />
		<hr />
		<button on:click={() => dialog.close()}>close modal</button>
	</div>
</dialog>
