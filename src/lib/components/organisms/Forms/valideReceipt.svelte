<script lang="ts">
  import { getMonth } from "$lib/utils/date";
  let { selectedReceipts } = $props();
</script>

<div class="flex items-center w-full h-24 px-10 mb-5 bg-indigo-500 rounded-t">
  <h3 class="text-2xl font-bold text-white">Confirmer le paiement</h3>
</div>
<div class="px-10 mb-5 space-y-5 font-hind text-slate-700">
  <p class="underline">Le locataire :</p>
  <span class="font-bold">{selectedReceipts.tenant_fullName}</span>
  <p class="underline">Période de :</p>
  <span class="font-bold">{getMonth(selectedReceipts.startDate)}</span>
  <p>Veuillez saisir la date de paiement.</p>
  <input name="receiptID" value={selectedReceipts.id} hidden />
  <input name="paymentDate" type="date" />
  <label for="checkbox" class="flex items-center justify-start">
    <input
      id="checkbox"
      class="mr-2"
      name="changeCreateDate"
      type="checkbox"
      checked
    />
    Modifier la date de création de la quittance
  </label>
</div>
