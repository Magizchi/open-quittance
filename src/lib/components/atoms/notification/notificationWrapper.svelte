<script lang="ts">
	export let notification: any;
	let defaultClassNotification: string = 'p-5 shadow-md rounded-2xl scroll-m-10 min-w-[476px]';
	let eventNotificationClass: string;

	if (notification.success) {
		eventNotificationClass = defaultClassNotification + ' ' + 'bg-green-500';
	} else {
		eventNotificationClass = defaultClassNotification + ' ' + 'bg-red-500';
	}
</script>

<div class={eventNotificationClass}>
	{notification.message}
</div>
