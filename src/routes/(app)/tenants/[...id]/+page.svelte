<script lang="ts">
  import Clickable from "$lib/components/atoms/Clickable.svelte";
  import TenantForm from "../tenantForm.svelte";
  import { ROUTES } from "$lib/constants/routes.js";
  import { enhance } from "$app/forms";
  import { addToast } from "$lib/components/atoms/notification/createNotification.store.js";
  import { goto } from "$app/navigation";
  let { data, form } = $props();

  $effect(() => {
    if (form) {
      if (form.success) {
        addToast.success(form.message);
        goto(ROUTES.tenants);
      } else {
        addToast.alert(form.message);
      }
    }
  });
</script>

<section class="flex items-center justify-center w-full mt-10">
  <div class="flex flex-col max-w-xl bg-white shadow-lg rounded-xl">
    <div class="p-5 space-y-5 bg-indigo-500 rounded-t-xl">
      <h2 class="text-3xl text-white font-hind">
        Modifier le locataire:<br /> "{data.tenant.name}"
      </h2>
      <p class="text-base text-white font-hind">
        Les informations ci-dessous seront nécessaires pour la génération des
        quittances.
      </p>
    </div>
    <div class="p-5">
      <form
        id="landlord"
        method="POST"
        class="space-y-5"
        use:enhance
        action={ROUTES.tenant.replace("{id}", data.tenant.id.toString())}
      >
        <TenantForm defaultValues={data.tenant} />
        <input name="id" value={data.tenant.id} hidden />
        <div class="flex space-x-5">
          <Clickable
            variant="secondary"
            className="w-full justify-center"
            href={ROUTES.tenants}>Annuler</Clickable
          >
          <Clickable variant="primary" type="submit">Modifier</Clickable>
        </div>
      </form>
    </div>
  </div>
</section>
