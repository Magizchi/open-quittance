<script lang="ts">
  import Select from "$lib/components/atoms/Select.svelte";
  import { toDay } from "$lib/utils/date";
  interface Props {
    properties: { label: string; value: number }[];
    tenants: { label: string; value: number }[];
  }

  let { properties, tenants }: Props = $props();

  let selectProperty: number = $state(0);
  let selectTenant: number = $state(0);
  let selectedDate: Date = $state(toDay());
</script>

<div class="space-y-5">
  <Select
    label="Propriété :"
    name="property"
    bind:value={selectProperty}
    options={properties}
    required
  />
  <Select
    label="Locataire :"
    name="tenant"
    bind:value={selectTenant}
    options={tenants}
    required
  />
  <div class="flex flex-col space-y-2">
    <label class="flex flex-col text-hind text-slate-700" for="dateStart"
      >Date début de location:</label
    >
    <input
      type="date"
      id="dateStart"
      name="date"
      class="text-slate-700 font-hind"
      bind:value={selectedDate}
      min="2000-01-01"
      required
    />
  </div>
</div>
