<script lang="ts">
  import Input from "$lib/components/atoms/Input.svelte";
  import logo from "$lib/assets/image/machine_quittance.jpg";
  import Clickable from "$lib/components/atoms/Clickable.svelte";

  const setMessage = () => {
    form = { message: "", incorrect: false };
  };

  export let form;
  export let data;
  console.log("data", data);
</script>

<section
  class="relative flex items-center justify-center h-screen bg-slate-200"
>
  <div
    class="absolute inset-0 w-full h-full bg-amber-500 clip-path-diagonal"
  ></div>
  <div
    class="z-20 w-full flex flex-row justify-center max-w-[1280px] min-h-[620px] border-2 shadow-sm border-indigo-500 rounded-xl m-10"
  >
    <div
      class="flex items-center justify-center w-full md:w-1/2 bg-slate-100 rounded-xl md:rounded-none md:rounded-l-xl"
    >
      <div class="flex flex-col items-center w-full gap gap-8">
        <div class="flex flex-col items-center space-y-1">
          <h1 class="text-2xl font-bold text-indigo-500 md:text-3xl font-hind">
            OPEN <span class="text-amber-500">QUITTANCE</span>
          </h1>
          <p class="text-sm text-center text-slate-700 md:text-base">
            Simplifiez la gestion et la génération de vos quittances de loyer en
            quelques clics.
          </p>
        </div>
        {#if data.webDemo}
          <form class="w-1/2" method="post">
            <div class="space-y-5">
              <Input
                id="username"
                name="username"
                placeholder="Email ou identifiant"
                value="lesVisiteurs@visiteur.fr"
                label="Email Demo"
              />
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Mots de passe"
                value="password"
                on:change={() => setMessage()}
                label="Mot de passe"
              />
              <p class="text-sm font-hind text-rose-500 md:text-base">
                {#if form}{form.message}{/if}
              </p>

              <div class="w-full md:flex md:justify-end">
                <Clickable variant="primary" type="submit">Connection</Clickable
                >
              </div>
            </div>
          </form>
        {:else}
          <form class="w-1/2" method="post">
            <div class="space-y-5">
              <Input
                id="username"
                name="username"
                placeholder="Email ou identifiant"
                label="Email"
              />
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Mots de passe"
                on:change={() => setMessage()}
                label="Mot de passe"
              />
              <p class="text-sm font-hind text-rose-500 md:text-base">
                {#if form}{form.message}{/if}
              </p>
              <div class="w-full md:flex md:justify-end">
                <Clickable variant="primary" type="submit">Connection</Clickable
                >
              </div>
            </div>
          </form>
        {/if}
      </div>
    </div>
    <div class="hidden w-1/2 rounded-r-xl md:block">
      <img
        alt="logo"
        src={logo}
        class="w-full h-full bg-contain rounded-r-xl"
      />
    </div>
  </div>
</section>

<style>
  .clip-path-diagonal {
    clip-path: polygon(0% 100%, 100% 0%, 100% 100%);
  }
</style>
