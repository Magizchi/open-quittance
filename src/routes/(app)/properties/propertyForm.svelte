<script lang="ts">
  import Input from "$lib/components/atoms/Input.svelte";
  interface Props {
    all?: boolean,
    defaultValues?: {
      name: string;
      address: string;
      city: string;
      postalCode: string;
      rent: number | null;
      condo_fees: number | null;
      taxes: number | null;
    };
  }

  let {
    defaultValues = $bindable({
      name: "",
      address: "",
      city: "",
      postalCode: "",
      rent: null,
      condo_fees: null,
      taxes: null,
    }),
    all = true
  }: Props = $props();
	let user = $state({ loggedIn: all });
  console.log(user, "props all")
</script>

<div class="grid grid-cols-2 gap-3">
  <div class="col-span-2">
    <Input
      label="Adresse*"
      name={`address`}
      value={defaultValues["address"]}
      placeholder="1, Avenue de paris"
      required
    />
  </div>

  <Input
    label="Ville*"
    name={`city`}
    value={defaultValues["city"]}
    placeholder="Ville"
    required
  />
  <Input
    label="Code postal*"
    name={`postalCode`}
    value={defaultValues["postalCode"]}
    placeholder="Code postal"
    type="number"
    required
  />
  {#if all}
    <div class="col-span-2">
      <Input
        label="Description"
        name={`name`}
        value={defaultValues["name"]}
        placeholder="Description"
      />
    </div>
  {/if}
  <div class="col-span-2">
    <Input
      label="Loyer*"
      icon
      name={`rent`}
      type="number"
      value={defaultValues["rent"]}
      placeholder="1100"
      min={0}
      required
    />
  </div>
  {#if all}
    <div class="col-span-2">
      <Input
        label="Charges*"
        icon
        name={`condo_fees`}
        value={defaultValues["condo_fees"]}
        placeholder="250"
        type="number"
        min={0}
        required
      />
    </div>
    <div class="col-span-2">
        <Input
          label="Taxes*"
          icon
          type="number"
          name={`taxes`}
          min={0}
          value={defaultValues["taxes"]}
          placeholder="100"
          required
        />
    </div>
  {/if}
</div>
