<script lang="ts">
  import type { HTMLSelectAttributes } from "svelte/elements";

  interface SelectProps extends HTMLSelectAttributes {
    options?: { label: string; value: number }[];
    value: number;
    label: string;
    name: string;
  }

  let {
    options = [],
    value = $bindable(),
    label,
    name,
    ...rest
  }: SelectProps = $props();
</script>

<div class="flex flex-col space-y-2">
  <label class="text-slate-700 font-hind" for={"select" + name}>{label}</label>
  <select {name} bind:value {...rest} class="text-slate-700 font-hind">
    <option value="" selected> choisir... </option>
    {#each options as option}
      <option value={option.value}>
        {option.label}
      </option>
    {/each}
  </select>
</div>
