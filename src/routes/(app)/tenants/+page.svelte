<script lang="ts">
  import { ROUTES } from "$lib/constants/routes.js";
  import Clickable from "$lib/components/atoms/Clickable.svelte";
  import { Table, Tr, Td } from "$lib/components/organisms/Table";
  import EditIcon from "$lib/components/atoms/Icons/EditIcon.svelte";
  import { addToast } from "$lib/components/atoms/notification/createNotification.store.js";
  import BenIcon from "$lib/components/atoms/Icons/BenIcon.svelte";

  export let data;

  const columns = [
    {
      header: "Locataire",
      dataIndex: "name",
    },
    {
      header: "Siret",
      dataIndex: "siret",
    },
    {
      header: "Adresse",
      dataIndex: "address",
    },
    {
      header: "",
      dataIndex: "",
    },
  ];
</script>

<section class="px-10 space-y-3">
  <div class="flex justify-between">
    <h1 class="text-2xl font-bold font-hind text-slate-700">Locataires</h1>
    <Clickable variant="primary" href={ROUTES.createTenant}>Ajouter</Clickable>
  </div>
  <Table {columns} rows={data.tenants} let:row>
    <Tr>
      <Td>
        {row.name}
      </Td>
      <Td>
        {row.siret}
      </Td>
      <Td>
        <div class="flex flex-col items-end text-justify">
          {row.address}
          <span class="flex space-x-3">
            {row.city}
            {row.postalCode}
          </span>
        </div>
      </Td>
      <Td>
        <div class="flex items-center justify-between w-full pl-10 space-x-5">
          <Clickable
            className="w-full justify-center"
            variant="border"
            href={ROUTES.tenant.replace("{id}", row.id.toString())}
          >
            <EditIcon class="mr-1 text-base" height="20" /> Modifier
          </Clickable>
          <Clickable
            variant="border"
            on:click={async () => {
              const response = await fetch(`/api/tenants/${row.id}`, {
                method: "DELETE",
              }).then((data) => data.json());
              if (!response.success) {
                return addToast.alert(response.message);
              }
              addToast.success(response.message);
              data.tenants = response.data;
            }}
          >
            <div class="flex flex-row items-center justify-center">
              <BenIcon class="mr-1 text-base" height="20" /> Supprimer
            </div>
          </Clickable>
        </div>
      </Td>
    </Tr>
  </Table>
</section>
