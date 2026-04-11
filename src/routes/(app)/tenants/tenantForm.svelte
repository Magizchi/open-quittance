<script lang="ts">
  import Input from "$lib/components/atoms/Input.svelte";
  interface Props {
    namespace?: string;
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
    namespace = "",
  }: Props = $props();

  const getName = (field: string) =>
    namespace ? `${namespace}[${field}]` : field;
</script>

<div class="grid gap-2 lg:grid-cols-2">
  <Input
    label="Nom du locataire*"
    placeholder="Entreprise ou particulier"
    name={getName("name")}
    required={true}
    value={defaultValues["name"]}
  />
  <Input
    label="Siret"
    placeholder="Siret"
    name={getName("siret")}
    value={defaultValues["siret"]}
  />
  <div class="col-span-2">
    <Input
      label="Addresse* "
      placeholder="address"
      name={getName("address")}
      required={true}
      value={defaultValues["address"]}
    />
  </div>
  <Input
    name={getName("postalCode")}
    label="Code Postal*"
    placeholder="postal code"
    required={true}
    type="number"
    value={defaultValues["postalCode"]}
  />
  <Input
    name={getName("city")}
    label="Ville*"
    placeholder="ville"
    required={true}
    value={defaultValues["city"]}
  />
</div>
