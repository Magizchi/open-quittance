<script lang="ts">
	export let form;
	import Input from '$lib/components/atoms/Input.svelte';
	import logo from '$lib/assets/image/machine_quittance.jpg';
	import Clickable from '$lib/components/atoms/Clickable.svelte';
	const setMessage = () => {
		form = { message: '', incorrect: false };
	};
</script>

<section class="relative flex items-center justify-center h-screen bg-slate-200">
	<div class="absolute inset-0 w-full h-full bg-amber-500 clip-path-diagonal" />
	<div class="z-20 flex flex-row justify-center">
		<div
			class="flex items-center justify-center w-4/12 border-t-2 border-b-2 border-l-2 border-indigo-500 shadow-md bg-slate-100 rounded-l-xl"
		>
			<div class="flex flex-col items-center w-full">
				<h1 class="my-10 text-3xl font-bold text-indigo-700 font-hind">
					OPEN <span class="text-amber-500">QUITTANCE</span>
				</h1>
				<form class="w-1/2" method="post">
					<div class="space-y-5">
						<Input id="username" name="username" placeholder="Email ou identifiant" label="Email" />
						<Input
							id="password"
							name="password"
							type="password"
							placeholder="Mots de passe"
							on:change={() => setMessage()}
							label="Mot de passe"
						/>
						<p class="">
							{#if form}{form.message}{/if}
						</p>

						<div class="flex justify-end">
							<Clickable primary type="submit">Connection</Clickable>
						</div>
					</div>
				</form>
			</div>
		</div>
		<div class="w-4/12 border-t-2 border-b-2 border-r-2 border-indigo-500 rounded-r-xl">
			<img alt="logo" src={logo} class="flex flex-grow bg-cover rounded-r-xl" />
		</div>
	</div>
</section>

<style>
	.clip-path-diagonal {
		clip-path: polygon(0% 100%, 100% 0%, 100% 100%);
	}
</style>
