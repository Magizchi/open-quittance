<script lang="ts">
  import Input from "$lib/components/atoms/Input.svelte";
  import type { RentalModel } from "$lib/models";

  export let selectedRental: RentalModel;
</script>

<div class="flex items-center w-full h-24 px-10 mb-5 bg-indigo-500 rounded-t">
  <h3 class="text-2xl font-bold text-white">Fin de Locations</h3>
</div>
<div class="px-10 mb-5 space-y-5 font-hind text-slate-700">
  <p class="font-bold">
    Locataire : <span class="font-normal">{selectedRental.tenants?.name}</span>
  </p>
  <p class="font-bold">
    Propriété : <span class="font-normal"
      >{selectedRental.properties?.address} - {selectedRental.properties?.city}
      {selectedRental.properties?.postalCode}</span
    >
  </p>
  <Input name="endDate" type="date" />
  <Input name="rentalId" value={selectedRental.rentals?.id} type="hidden" />
</div>
