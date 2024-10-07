<script lang="ts">
	export let showModal: Boolean;
	let dialog: HTMLDialogElement;

	$: if (dialog && showModal) dialog.showModal();
	$: if (dialog && !showModal) dialog.close();

	export let success: boolean = false;
	export let message: string = '';
	let className: string;

	if (success) {
		className =
			'absolute top-0 right-0 p-5 shadow-md rounded-2xl scroll-m-10 min-w-[476px] bg-teal-500';
	} else {
		className =
			'absolute top-0 right-0 p-5 shadow-md rounded-2xl scroll-m-10 min-w-[476px] bg-rose-500';
	}

	$: if (showModal) {
		setTimeout(() => {
			showModal = false;
		}, 5000);
	}
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog
	bind:this={dialog}
	on:close={() => (showModal = false)}
	on:click|self={() => dialog.close()}
	class={className}
	{...$$restProps}
>
	<div class="relative">
		{message}
		<div class="absolute top-0 right-0">
			<button on:click={() => dialog.close()}>X</button>
		</div>
	</div>
</dialog>
