<script lang="ts">
  import { flip } from "svelte/animate";
  import { fly } from "svelte/transition";
  import { NOTIFICATIONS, notifications } from "./createNotification.store";
</script>

<div class="notifications">
  {#each $notifications as notification (notification.id)}
    <div
      animate:flip
      class="px-2 text-center border-2 rounded shadow min-w-36 toast"
      class:successClass={notification.type === NOTIFICATIONS.success}
      class:alertClass={notification.type === NOTIFICATIONS.alert}
      class:warningClass={notification.type === NOTIFICATIONS.warning}
      class:defaultClass={notification.type === NOTIFICATIONS.default}
      class:infoClass={notification.type === NOTIFICATIONS.info}
      transition:fly={{ x: 30 }}
    >
      <div class="content">{notification.message}</div>
      <!-- {#if notification.icon}<i class={notification.icon} />{/if} -->
    </div>
  {/each}
</div>

<style lang="postcss">
  .defaultClass {
    @apply bg-slate-500  border-slate-700;
  }
  .successClass {
    @apply bg-teal-500 border-teal-700;
  }
  .alertClass {
    @apply bg-rose-500 border-rose-700;
  }
  .warningClass {
    @apply bg-amber-500 border-amber-700;
  }
  .infoClass {
    @apply bg-indigo-500 border-indigo-700;
  }
  .notifications {
    position: fixed;
    top: 10px;
    left: 0;
    right: 20px;
    margin: 0 auto;
    padding: 0;
    z-index: 9999;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: end;
    pointer-events: none;
  }

  .toast {
    flex: 0 0 auto;
    margin-bottom: 10px;
  }

  .content {
    padding: 10px;
    display: block;
    color: white;
    font-weight: 500;
  }
</style>
