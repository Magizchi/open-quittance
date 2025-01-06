<script lang="ts">
  import Clickable from "$lib/components/atoms/Clickable.svelte";
  import Input from "$lib/components/atoms/Input.svelte";
  import { ROUTES } from "$lib/constants/routes";
  let { data } = $props();
</script>

<h1 class="mb-5 ml-10 text-2xl font-bold font-hind text-slate-700">
  Paramètre
</h1>
<section class="max-w-lg mb-10 ml-10 space-y-5">
  <h2 class="text-xl font-semibold font-hind text-slate-700">Utilisateur</h2>
  <form id="user" method="POST" class="space-y-2 w-96">
    <Input
      label="Email"
      name="email"
      required
      type="text"
      placeholder="Votre email"
      disabled={data.webDemo}
    />
    <Input
      label="Mot de passe actuel"
      name="currentPassword"
      required
      type="password"
      placeholder="Votre mots de passe actuel"
      disabled={data.webDemo}
    />
    <Input
      label="Nouveau mots de passe"
      name="newPassword"
      type="password"
      placeholder="Nouveau mot de passe"
      disabled={data.webDemo}
    />
    <Input
      label="Confirmer votre mot de passe"
      name="confirmPassword"
      type="password"
      placeholder="Confirmer votre nouveau mot de passe"
      disabled={data.webDemo}
    />
    <Clickable
      className="w-96"
      type="submit"
      variant="primary"
      disabled={data.webDemo}
      >Mettre à jour
    </Clickable>
  </form>
</section>
<section class="max-w-lg mb-10 ml-10 space-y-5">
  <h2 class="text-xl font-semibold font-hind text-slate-700">Bailleur</h2>
  <div class=" font-hind text-slate-700">
    {data.landlord.name}
    {data.landlord.address}
    {data.landlord.city}
    {data.landlord.postalCode}
  </div>
  <Clickable
    href={ROUTES.landlord.replace("{id}", data.landlord.id.toString())}
    variant="primary"
    className="w-96">Modifier Bailleur</Clickable
  >
</section>
