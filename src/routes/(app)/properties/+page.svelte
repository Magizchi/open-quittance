<script lang="ts">
  import Clickable from "$lib/components/atoms/Clickable.svelte";
  import { Table, Tr, Td } from "$lib/components/organisms/Table";
  import { ROUTES } from "$lib/constants/routes.js";
  import { addToast } from "$lib/components/atoms/notification/createNotification.store";
  import Icon from "@iconify/svelte";

  let { data = $bindable() } = $props();

  export const columns = [
    {
      header: "Adresse",
      dataIndex: "address",
    },
    {
      header: "Description",
      dataIndex: "name",
    },
    {
      header: "Loyer",
      dataIndex: "rent",
    },
    {
      header: "Charges",
      dataIndex: "condo_fees",
    },
    {
      header: "Taxe",
      dataIndex: "taxes",
    },
    {
      header: "",
      dataIndex: "",
    },
  ];
</script>

<section class="px-10 space-y-3">
  <div class="flex justify-between">
    <h1 class="text-2xl font-bold font-hind text-slate-700">
      Liste des Propriétés
    </h1>
    <Clickable variant="primary" href={ROUTES.createProperty}
      >Créer une propriété</Clickable
    >
  </div>
  <Table {columns} rows={data.properties}>
    {#snippet children({ row })}
      <Tr>
        <Td>
          <div class="flex flex-col text-justify">
            {row.address}
            <span class="flex space-x-3">
              {row.city}
              {row.postalCode}
            </span>
          </div>
        </Td>
        <Td>
          {row.name}
        </Td>
        <Td className="text-end">
          {row.rent}
        </Td>
        <Td className="text-end">
          {row.condo_fees}
        </Td>
        <Td className="text-end">
          {row.taxes}
        </Td>
        <Td>
          <div class="flex items-center justify-between w-full pl-10 space-x-5">
            <Clickable
              variant="border"
              className="w-full justify-center"
              href={ROUTES.property.replace("{id}", row.id.toString())}
            >
              <div class="flex flex-row items-center justify-center">
                <Icon class="mr-1 text-xl" icon="ri:edit-box-fill" /> Modifier
              </div>
            </Clickable>
            <Clickable
              variant="border"
              onclick={async () => {
                const response = await fetch(`/api/properties/${row.id}`, {
                  method: "DELETE",
                }).then((data) => data.json());
                if (!response.success) {
                  return addToast.alert(response.message);
                }
                addToast.success(response.message);
                data.properties = response.data;
              }}
            >
              <div class="flex flex-row items-center justify-center">
                <Icon class="mr-1 text-xl" icon="ri:delete-bin-2-fill" /> Supprimer
              </div>
            </Clickable>
          </div>
        </Td>
      </Tr>
    {/snippet}
  </Table>
</section>
