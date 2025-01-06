<script lang="ts">
  interface Props {
    children?: import("svelte").Snippet;
  }

  let { children }: Props = $props();
</script>

<tr class="border-slate-300 [&:not(:last-child)]:border-b">
  {@render children?.()}
</tr>
