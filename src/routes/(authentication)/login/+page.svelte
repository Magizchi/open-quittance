<script lang="ts">
	export let form;
	console.log('form', form);
	import { UserIcon, KeyIcon } from '$lib/components/atoms/Icons/icon.js';
	import Input from '$lib/components/atoms/Input.svelte';
	const setMessage = () => {
		form = { message: '', incorrect: false };
	};
</script>

<section class="flex items-center justify-center w-full h-screen">
	<form
		class="flex flex-col items-center justify-center w-full px-6 m-auto bg-white rounded-lg shadow md:w-1/2 lg:w-1/3"
		method="post"
	>
		<h2 class="my-4 text-2xl">Connectez-vous</h2>
		<div class="flex flex-col justify-start w-full p-2 space-y-4">
			<Input id="username" name="username" placeholder="Email ou identifiant">
				<UserIcon slot="CustomIcon" class="text-gray-400" width="25" />
			</Input>
			<Input
				id="password"
				name="password"
				type="password"
				placeholder="Mots de passe"
				on:change={() => setMessage()}
			>
				<KeyIcon slot="CustomIcon" class="text-gray-400" width="25" />
			</Input>

			<p class="text-red-400">
				{#if form}{form.message}{/if}
			</p>

			<button class="w-full px-4 py-2 my-4 text-white bg-blue-400 rounded hover:bg-blue-700">
				connection
			</button>
		</div>
	</form>
</section>
