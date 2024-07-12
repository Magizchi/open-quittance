<script lang="ts">
	import listNotification, { deleteNotification } from '$lib/stores/notification/index.ts';
	import NotificationWrapper from '$lib/components/atoms/notification/notificationWrapper.svelte';

	let className: string;

	$: if ($listNotification.length < 5) {
		className = 'mb-2';
	} else {
		className = 'absolute top-0 right-0';
	}
</script>

<div class="relative toaster">
	{#each $listNotification as not, i}
		<div class={className}>
			<NotificationWrapper notification={not} />
		</div>
	{/each}
</div>

<style>
	.toaster {
		--default-offset: 16px;
		position: fixed;
		z-index: 9999;
		top: var(--default-offset);
		right: var(--default-offset);
	}
</style>
