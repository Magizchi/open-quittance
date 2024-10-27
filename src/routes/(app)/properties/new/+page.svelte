<script lang="ts">
  import Clickable from "$lib/components/atoms/Clickable.svelte";
  import PropertyForm from "../propertyForm.svelte";
  import { ROUTES } from "$lib/constants/routes";
  import { addToast } from "$lib/components/atoms/notification/createNotification.store.js";
  import { enhance } from "$app/forms";
  import { goto } from "$app/navigation";

  export let form;
  $: if (form) {
    if (form.success) {
      addToast.success(form.message, 5000);
      goto(ROUTES.properties);
    } else {
      addToast.alert(form.message, 5000);
    }
  }
</script>

<section class="flex items-center justify-center w-full mt-10">
  <div class="flex flex-col max-w-xl bg-white shadow-lg rounded-xl">
    <div class="p-5 space-y-5 bg-indigo-500 rounded-t-xl">
      <h2 class="text-3xl text-white font-hind">Création d'une propriété</h2>
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
        on:submit|preventDefault
        use:enhance
        action={ROUTES.createProperty}
      >
        <PropertyForm />
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
