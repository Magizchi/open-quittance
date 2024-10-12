<script lang="ts">
	// Link
	export let href: string | null = null;
	export let current: boolean = false;
	export let likeButton: boolean = false;
	// Button && Link
	export let primary: boolean = false;
	export let secondary: boolean = false;
	export let success: boolean = false;
	export let error: boolean = false;
	export let warning: boolean = false;
	export let border: boolean = false;
	export let valide: boolean = false;
</script>

{#if href}
	<a
		{...$$restProps}
		class="flex px-4 py-2 text-white rounded font-hind aria-[current=true]:bg-teal-500 aria-[current=true]:hover:bg-teal-600 hover:bg-teal-500"
		class:primaryClass={primary}
		class:secondaryClass={secondary}
		class:successClass={current || success}
		class:errorClass={error}
		class:warningClass={warning}
		class:borderClass={border}
		class:justify-center={likeButton}
		class:w-full={likeButton}
		{href}
	>
		<slot />
	</a>
{:else}
	<button
		{...$$restProps}
		on:click
		class="w-full px-4 py-2 text-white rounded font-hind"
		class:primaryClass={primary}
		class:secondaryClass={secondary}
		class:successClass={success}
		class:errorClass={error}
		class:warningClass={warning}
		class:borderClass={border}
		class:valideClass={valide}
	>
		<slot />
	</button>
{/if}

<style>
	.valideClass {
		@apply bg-teal-500 text-white;
	}
	.primaryClass {
		@apply bg-indigo-500;
	}
	.primaryClass:hover {
		@apply bg-indigo-600;
	}
	.secondaryClass {
		@apply bg-slate-500;
	}
	.secondaryClass:hover {
		@apply bg-slate-600;
	}
	.successClass {
		@apply bg-teal-500;
	}
	.successClass:hover {
		@apply bg-teal-600;
	}
	.warningClass {
		@apply bg-amber-500;
	}
	.warningClass:hover {
		@apply bg-amber-600;
	}
	.errorClass {
		@apply bg-rose-500;
	}
	.errorClass:hover {
		@apply bg-rose-600;
	}
	.borderClass {
		@apply text-slate-400 border-2 border-slate-400;
	}
	.borderClass:hover {
		@apply border-slate-500 text-slate-500 bg-slate-100;
	}
</style>
