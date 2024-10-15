<script lang="ts">
	import Clickable from '$lib/components/atoms/Clickable.svelte';
	import Input from '$lib/components/atoms/Input.svelte';
</script>

<div class="p-3 space-y-8">
	<div class="grid gap-3 lg:grid-cols-2">
		<div class="col-span-2">
			<Input
				label="Nom du Bailleur*"
				placeholder="Nom du bailleur"
				name="landlordName"
				required="required"
			/>
			<p class="text-sm italic text-slate-600 font-hind">
				Nom et prénom si vous êtes un particulier sinon le nom de l'entreprise
			</p>
		</div>
		<div class="col-span-2 mt-2">
			<Input label="Adresse*" placeholder="Address" name="address" required="required" />
		</div>
		<Input label="Code Postal*" placeholder="Code postal" name="postalCode" required="required" />
		<Input label="Ville*" placeholder="Ville" name="city" required="required" />
	</div>
	<div class="flex justify-end">
		<Clickable primary type="submit">Enregistrer</Clickable>
	</div>
</div>
