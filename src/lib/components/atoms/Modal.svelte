<script lang="ts">
	import Clickable from './Clickable.svelte';

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
	class="shadow-md rounded-2xl scroll-m-10 min-w-[476px]"
	{...$$restProps}
>
	<div class="relative">
		<slot />
		<!-- <div class="absolute top-0 right-0">
			<Clickable on:click={() => dialog.close()}>X</Clickable>
		</div> -->
	</div>
</dialog>
