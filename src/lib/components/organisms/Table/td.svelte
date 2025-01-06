<script lang="ts">
  interface Props {
    children?: import("svelte").Snippet;
  }

  let { children }: Props = $props();
</script>

<td class="p-2 text-slate-700 font-hind w-96 text-end">
  {@render children?.()}
</td>
