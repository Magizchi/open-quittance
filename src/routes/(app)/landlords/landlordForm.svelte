<script lang="ts">
  import Input from "$lib/components/atoms/Input.svelte";
  export let defaultValues: {
    name: string;
    address: string;
    city: string;
    postalCode: string;
  } = {
    name: "",
    address: "",
    city: "",
    postalCode: "",
  };
</script>

<div class="grid gap-3 lg:grid-cols-2">
  <div class="col-span-2">
    <Input
      label="Nom du Bailleur*"
      placeholder="Nom du bailleur"
      name="landlordName"
      required="required"
      bind:value={defaultValues.name}
    />
    <p class="text-sm italic text-slate-600 font-hind">
      Nom et prénom si vous êtes un particulier sinon le nom de l'entreprise
    </p>
  </div>
  <div class="col-span-2 mt-2">
    <Input
      label="Adresse*"
      placeholder="Address"
      name="address"
      required="required"
      bind:value={defaultValues.address}
    />
  </div>
  <Input
    label="Code Postal*"
    placeholder="Code postal"
    name="postalCode"
    required="required"
    bind:value={defaultValues.postalCode}
  />
  <Input
    label="Ville*"
    bind:value={defaultValues.city}
    placeholder="Ville"
    name="city"
    required="required"
  />
</div>
