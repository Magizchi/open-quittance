<script lang="ts">
  import FileSaver from "file-saver";
  import { formatDate, toDay } from "$lib/utils/date.js";
  import { Table, Tr, Td } from "$lib/components/organisms/Table";
  import Modal from "$lib/components/atoms/Modal.svelte";
  import Clickable from "$lib/components/atoms/Clickable.svelte";
  import ValideReceipt from "$lib/components/organisms/Forms/valideReceipt.svelte";
  import Badge from "$lib/components/atoms/Badge.svelte";
  import type { ReceiptsModel } from "$lib/models";
  import Icon from "@iconify/svelte";

  let { data } = $props();

  const receiptsColumns: { header: string; dataIndex: string }[] = [
    {
      header: "Locataire",
      dataIndex: "tenant",
    },
    {
      header: "Adresse du local",
      dataIndex: "address",
    },
    {
      header: "Statut",
      dataIndex: "startDate",
    },
    {
      header: "Total",
      dataIndex: "total",
    },
    {
      header: "",
      dataIndex: "",
    },
  ];

  let pdfBuffer: Blob;
  let showModalPaymentDate: boolean = $state(false);
  let selectedReceipts: ReceiptsModel = $state({
    startDate: toDay(),
    id: 0,
  } as ReceiptsModel);

  let documentName: string;
  async function getPdf(receiptId: number) {
    const response = await fetch(`/api/generate-pdf?receiptId=${receiptId}`)
      .then((res) => {
        const getDocumentName = res.headers.get("document-name");
        if (getDocumentName) {
          documentName = getDocumentName;
        }
        return res;
      })
      .then((data) => data.blob());

    pdfBuffer = response;

    const blob = new Blob([pdfBuffer], { type: "application/pdf" });

    FileSaver.saveAs(blob, `quittance-${documentName}.pdf`);
  }
</script>

<section class="relative px-10 space-y-5 bg-slate-100">
  <h1 class="text-2xl font-bold font-hind text-slate-700">Tableau de bord</h1>
  <Table scalpe columns={receiptsColumns} rows={data.receiptList}>
    {#snippet children({ row })}
      <Tr>
        {#if typeof row === "string"}
          <td
            colspan={receiptsColumns.length}
            class="font-bold bg-gray-300 text-slate-700 font-hind">{row}</td
          >
        {:else}
          <Td>{row.tenant_fullName}</Td>
          <Td>
            <div class="flex flex-col items-end text-justify">
              {row.property_address}
              <span class="flex space-x-2">
                {row.property_city}
                {row.property_postalCode}
              </span>
            </div>
          </Td>
          <Td>
            {#if row.paymentDate}
              <Badge valide>Payé {formatDate(row.paymentDate)}</Badge>
            {:else}
              <Badge error>Reste à payer</Badge>
            {/if}
          </Td>
          <Td>
            {row.rent + row.condo_fees + row.taxes}
          </Td>
          <Td>
            <div
              class="flex items-center justify-between w-full pl-10 space-x-5"
            >
              <Clickable
                href="/"
                variant="secondary"
                onclick={() => {
                  getPdf(row.id);
                }}
              >
                <div class="flex flex-row items-center justify-center">
                  <Icon class="mr-1 text-xl" icon="ri:file-pdf-2-fill" />
                  <span class="text-white font-hind">PDF</span>
                </div>
              </Clickable>
              {#if !row.paymentDate}
                <Clickable
                  variant="border"
                  onclick={() => {
                    showModalPaymentDate = true;
                    selectedReceipts = row;
                  }}
                >
                  Valider
                </Clickable>
              {/if}
            </div>
          </Td>
        {/if}
      </Tr>
    {/snippet}
  </Table>
</section>

<Modal bind:showModal={showModalPaymentDate}>
  <form id="AddPaymentDate" method="POST" action="?/paymentDate">
    <ValideReceipt {selectedReceipts} />
  </form>
  <div class="flex justify-end px-10 py-3">
    <Clickable variant="primary" form="AddPaymentDate" type="submit"
      >Sauvegarder</Clickable
    >
  </div>
</Modal>
