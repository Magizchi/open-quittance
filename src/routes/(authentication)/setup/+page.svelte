<script lang="ts">
  import Input from "$lib/components/atoms/Input.svelte";
  import Clickable from "$lib/components/atoms/Clickable.svelte";

  const setMessage = () => {
    form = { message: "", incorrect: false };
  };

  let { form } = $props();
</script>

<section
  class="relative flex items-center justify-center h-screen bg-slate-200"
>
  <div
    class="absolute inset-0 w-full h-full bg-amber-500 clip-path-diagonal"
  ></div>
  <div
    class="z-20 w-full flex flex-row justify-center max-w-[435px] min-h-[620px] border-2 shadow-sm border-indigo-500 rounded-xl m-10"
  >
    <div
      class="flex items-center justify-center w-full bg-slate-100 rounded-xl"
    >
      <div class="flex flex-col items-center w-full gap-8 gap">
        <div class="flex flex-col items-center space-y-1">
          <h1
            class="relative text-2xl font-bold text-indigo-500 duration-300 transform scale-90 md:scale-110 font-hind"
          >
            OPEN <span class="text-amber-500">QUITTANCE</span>
          </h1>
          <p class="text-sm text-center duration-300 transform scale-90 text-slate-700 md:scale-110">
            Créer votre empire ici.
          </p>
        </div>
        <form class="w-4/5" method="post">
          <div class="space-y-5">
            <Input
              id="username"
              name="username"
              placeholder="votre-email@exemple.fr"
              label="Email"
            />
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Mots de passe"
              onchange={() => setMessage()}
              label="Mot de passe"
            />
            {#if form}
              <p class="text-sm font-hind text-rose-500 md:text-base">
                {form.message}
              </p>
            {/if}
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Mots de passe"
              onchange={() => setMessage()}
              label="Confirmer votre mot de passe"
            />
            {#if form}
              <p class="text-sm font-hind text-rose-500 md:text-base">
                {form.message}
              </p>
            {/if}
            <div class="w-full md:flex md:justify-end">
              <Clickable variant="primary" type="submit">Créer mon compte</Clickable>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</section>

<style>
  .clip-path-diagonal {
    clip-path: polygon(0% 100%, 100% 0%, 100% 100%);
  }
</style>
