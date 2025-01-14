<script lang="ts">
  interface Props {
    children?: import("svelte").Snippet;
    className?: string;
  }

  let { children, className }: Props = $props();
</script>

<td class="p-3 text-slate-700 font-hind w-96 {className}">
  {@render children?.()}
</td>
