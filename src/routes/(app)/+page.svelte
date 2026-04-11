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
  import { ROUTES } from "$lib/constants/routes";
  import LandlordForm from "./landlords/landlordForm.svelte";
  import Select from "$lib/components/atoms/Select.svelte";
  import PropertyForm from "./properties/propertyForm.svelte";
  import TenantForm from "./tenants/tenantForm.svelte";

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
  let plop: boolean = $derived(data.addLandlord);
  let plip: boolean = $derived(false);
  let addMore: boolean = $state(false);
  let selectedReceipts: ReceiptsModel = $state({
    startDate: toDay(),
    id: 0,
  } as ReceiptsModel);
  let currentStep: number = $state(1);
  let documentName: string;
  async function getPdf(receiptId: number) {
    const response = await fetch(`/api/generate-pdf?receiptId=${receiptId}`)
      .then((res) => {
        console.log("res", res);

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

  function nextStep() {
    currentStep++;
  }

  function prevStep() {
    currentStep--;
  }
</script>

<section class="flex flex-col px-10 m-auto max-w-7xl">
  <h1 class="text-2xl font-bold font-hind text-slate-700">rapport du mois</h1>
  <div class="flex">
    <div class="w-4/5">plop</div>
    <div class="flex justify-end w-1/5">
      <Clickable
        variant="primary"
        className="w-full justify-center"
        onclick={() => (addMore = true)}
      >
        <div class="flex flex-row items-center justify-center">Ajouter</div>
      </Clickable>
      <Clickable
        variant="primary"
        className="w-full justify-center"
        onclick={() => (plip = true)}
      >
        <div class="flex flex-row items-center justify-center">PLIP</div>
      </Clickable>
    </div>
  </div>
</section>
<section class="relative px-10 m-auto space-y-5 bg-slate-100 max-w-7xl">
  <h2 class="text-2xl font-bold font-hind text-slate-700">Tableau de bord</h2>
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
            <div class="flex flex-col text-justify">
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
          <Td className="text-end">
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
<Modal bind:showModal={plop}>
  <section class="flex items-center justify-center w-full">
    <div class="flex flex-col max-w-xl bg-white shadow-lg rounded-xl">
      <div class="p-5 space-y-5 bg-indigo-500 rounded-t-xl">
        <h2 class="text-3xl text-white font-hind">Création du Bailleur</h2>
        <p class="text-base text-white font-hind">
          Les informations ci-dessous seront nécessaires pour la génération des
          quittances.
        </p>
      </div>
      <div class="p-5">
        <form id="landlord" method="POST" action="?/create" class="space-y-5">
          <LandlordForm />
          <div class="flex space-x-5">
            <Clickable
              variant="secondary"
              className="w-full justify-center"
              href={ROUTES.properties}>Annuler</Clickable
            >
            <Clickable variant="primary" type="submit">Ajouter</Clickable>
          </div>
        </form>
      </div>
    </div>
  </section>
</Modal>
<Modal bind:showModal={plip}>
  <section class="flex items-center justify-center w-full">
    <div class="flex flex-col max-w-xl bg-white shadow-lg rounded-xl">
      <div class="p-5 space-y-5 bg-indigo-500 rounded-t-xl">
        <h2 class="text-3xl text-white font-hind">
          {#if currentStep === 1}
            Étape 1: Informations générales
          {:else if currentStep === 2}
            Étape 2: Localisation
          {/if}
        </h2>
        <p class="text-base text-white font-hind">
          {#if currentStep === 1}
            Renseignez le nom et l'adresse du bailleur.
          {:else if currentStep === 2}
            Complétez avec le code postal et la ville.
          {/if}
        </p>
      </div>
      <div class="p-5">
        <form id="landlord" method="POST" action="?/addAll" class="space-y-5">
          <div class={currentStep === 1 ? "" : "hidden"}>
            <PropertyForm all={false} namespace="property" />
          </div>
          <div class={currentStep === 2 ? "" : "hidden"}>
            <TenantForm namespace="tenant" />
          </div>
          <div class="flex space-x-5">
            {#if currentStep === 1}
              <Clickable
                variant="secondary"
                className="w-full justify-center"
                href={ROUTES.properties}>Annuler</Clickable
              >
              <Clickable variant="primary" type="button" onclick={nextStep}
                >Suivant</Clickable
              >
            {:else if currentStep === 2}
              <Clickable variant="secondary" type="button" onclick={prevStep}
                >Précédent</Clickable
              >
              <Clickable variant="primary" type="submit">Ajouter</Clickable>
            {/if}
          </div>
        </form>
      </div>
    </div>
  </section>
</Modal>
