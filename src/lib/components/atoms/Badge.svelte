<script lang="ts">
	export let normal: boolean = false;
	export let valide: boolean = false;
	export let error: boolean = false;
</script>

<span
	class="p-1 px-3 border rounded-full font-hind"
	class:defaultClass={normal}
	class:valideClass={valide}
	class:errorClass={error}
>
	<slot />
</span>

<style>
	.defaultClass {
		@apply text-slate-700 bg-slate-200 border-slate-500;
	}
	.valideClass {
		@apply text-teal-700 bg-teal-200 border border-teal-500;
	}
	.errorClass {
		@apply text-rose-700 bg-rose-200 border border-rose-500;
	}
</style>
