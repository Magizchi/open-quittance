<script lang="ts">
  import Input from "$lib/components/atoms/Input.svelte";
  interface Props {
    defaultValues?: {
      name: string;
      address: string;
      city: string;
      siret: string | null;
      postalCode: string;
    };
  }

  let {
    defaultValues = $bindable({
      name: "",
      address: "",
      city: "",
      siret: "",
      postalCode: "",
    }),
  }: Props = $props();
</script>

<div class="grid gap-2 lg:grid-cols-2">
  <Input
    label="Nom du locataire*"
    placeholder="Entreprise ou particulier"
    name="name"
    required={true}
    value={defaultValues["name"]}
  />
  <Input
    label="Siret"
    placeholder="Siret"
    name="siret"
    value={defaultValues["siret"]}
  />
  <div class="col-span-2">
    <Input
      label="Addresse* "
      placeholder="address"
      name="address"
      required={true}
      value={defaultValues["address"]}
    />
  </div>
  <Input
    name="postalCode"
    label="Code Postal*"
    placeholder="postal code"
    required={true}
    type="number"
    value={defaultValues["postalCode"]}
  />
  <Input
    name="city"
    label="Ville*"
    placeholder="ville"
    required={true}
    value={defaultValues["city"]}
  />
</div>
