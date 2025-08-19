<script lang="ts">
  import Toast from "$lib/components/atoms/notification/toast.svelte";

  let { data, children } = $props();
</script>

<!-- TODO:
  1. Fix side height
-->

<div class="relative flex min-h-screen p-2 bg-slate-800">
  <aside class="p-4 space-y-8 font-hind w-60">
    <h1 class="text-2xl font-bold text-teal-500 md:text-xl font-hind">
      <a href="/">
        OPEN <span class="text-amber-500">QUITTANCE</span>
      </a>
    </h1>
  </aside>
  <main class="flex flex-col w-full bg-slate-100 rounded-xl">
    <div class="relative mt-5">
      <Toast />
      {@render children?.()}
    </div>
  </main>
</div>
