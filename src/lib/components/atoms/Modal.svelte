<script lang="ts">
  interface ModalProps {
    showModal?: boolean;
    children?: import("svelte").Snippet;
  }

  let {
    showModal = $bindable(false),
    children,
    ...rest
  }: ModalProps = $props();
  let dialog: HTMLDialogElement;

  $effect(() => {
    if (dialog && showModal) dialog.showModal();
  });
  $effect(() => {
    if (dialog && !showModal) dialog.close();
  });
</script>

<dialog
  bind:this={dialog}
  onclose={() => (showModal = false)}
  class="shadow-md rounded-2xl scroll-m-10 min-w-[476px]"
  {...rest}
>
  <div class="relative">
    {@render children?.()}
  </div>
</dialog>
