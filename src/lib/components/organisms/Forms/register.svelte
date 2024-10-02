<script lang="ts">
	import Clickable from '$lib/components/atoms/Clickable.svelte';
	import Input from '$lib/components/atoms/Input.svelte';
</script>

<div class="p-3 space-y-8">
	<div class="grid gap-3 lg:grid-cols-2">
		<div class="col-span-2">
			<Input
				defaultValue="la-entreprise"
				label="Nom du Bailleur"
				placeholder="Nom du bailleur"
				name="landlordName"
				required="required"
			/>
			<div class="flex flex-col items-center justify-between px-2">
				<p class="text-sm text-gray-600">
					Nom et prénom si vous ête un particulier sinon le nom de l'entreprise
				</p>
			</div>
		</div>
		<div class="col-span-2">
			<Input
				defaultValue="la-address"
				label="Adresse*"
				placeholder="Address"
				name="address"
				required="required"
			/>
		</div>
		<Input defaultValue="99900" placeholder="Code postal" name="postalCode" required="required" />
		<Input defaultValue="la-city" placeholder="Ville" name="city" required="required" />
	</div>
	<div class="flex justify-end">
		<Clickable type="submit">Valider</Clickable>
	</div>
</div>
