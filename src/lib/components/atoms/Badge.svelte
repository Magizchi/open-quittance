<script lang="ts">
  interface BadgeProps {
    normal?: boolean;
    valide?: boolean;
    error?: boolean;
    children?: import("svelte").Snippet;
  }

  let {
    normal = false,
    valide = false,
    error = false,
    children,
  }: BadgeProps = $props();
</script>

<span
  class="p-1 px-3 border rounded-full font-hind"
  class:defaultClass={normal}
  class:valideClass={valide}
  class:errorClass={error}
>
  {@render children?.()}
</span>

<style lang="postcss">
  .defaultClass {
    @apply text-slate-700 bg-slate-100 border-slate-700;
  }
  .valideClass {
    @apply text-teal-700 bg-teal-100 border border-teal-700;
  }
  .errorClass {
    @apply text-rose-700 bg-rose-100 border border-rose-700;
  }
</style>
