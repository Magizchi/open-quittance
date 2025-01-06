<script lang="ts">
  import Input from "$lib/components/atoms/Input.svelte";
  interface LandlordFormProps {
    defaultValues?: {
      name: string;
      address: string;
      city: string;
      postalCode: string;
    };
  }

  let {
    defaultValues = $bindable({
      name: "",
      address: "",
      city: "",
      postalCode: "",
    }),
  }: LandlordFormProps = $props();
</script>

<div class="grid gap-3 lg:grid-cols-2">
  <div class="col-span-2">
    <Input
      label="Nom du Bailleur*"
      placeholder="Nom du bailleur"
      name="landlordName"
      required={true}
      value={defaultValues.name}
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
      required={true}
      value={defaultValues.address}
    />
  </div>
  <Input
    label="Code Postal*"
    placeholder="Code postal"
    name="postalCode"
    required={true}
    value={defaultValues.postalCode}
  />
  <Input
    label="Ville*"
    value={defaultValues.city}
    placeholder="Ville"
    name="city"
    required={true}
  />
</div>
