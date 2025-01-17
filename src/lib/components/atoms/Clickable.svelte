<script lang="ts">
  import type {
    HTMLButtonAttributes,
    HTMLAnchorAttributes,
  } from "svelte/elements";

  interface ClickableBaseProps {
    href?: string | null;
    variant?:
      | "default"
      | "menu"
      | "primary"
      | "secondary"
      | "success"
      | "warning"
      | "border"
      | "error";
    className?: string | null;
    disabled?: boolean;
    children?: import("svelte").Snippet;
  }

  type ButtonClickableBaseProps = ClickableBaseProps & HTMLButtonAttributes;

  type LinkClickableBaseProps = ClickableBaseProps & HTMLAnchorAttributes;

  type ClickableProps = LinkClickableBaseProps | ButtonClickableBaseProps;

  let {
    href = null,
    variant = "default",
    className = null,
    disabled = false,
    children,
    ...rest
  }: ClickableProps = $props();
</script>

{#if href}
  <a
    {...rest as LinkClickableBaseProps}
    class="flex px-4 py-2 rounded font-hind {className}"
    class:defaultClass={variant === "default"}
    class:menuClass={variant === "menu"}
    class:primaryClass={variant === "primary"}
    class:secondaryClass={variant === "secondary"}
    class:successClass={variant === "success"}
    class:warningClass={variant === "warning"}
    class:errorClass={variant === "error"}
    class:borderClass={variant === "border"}
    {href}
  >
    {@render children?.()}
  </a>
{:else}
  <button
    {...rest as ButtonClickableBaseProps}
    {disabled}
    class="px-4 py-2 rounded font-hind w-full cursor-pointer
    {disabled ? '!bg-gray-400 !cursor-not-allowed' : ''}
      {className}"
    class:defaultClass={variant === "default"}
    class:menuClass={variant === "menu"}
    class:primaryClass={variant === "primary"}
    class:secondaryClass={variant === "secondary"}
    class:successClass={variant === "success"}
    class:warningClass={variant === "warning"}
    class:errorClass={variant === "error"}
    class:borderClass={variant === "border"}
  >
    {@render children?.()}
  </button>
{/if}

<style lang="postcss">
  .defaultClass {
    @apply text-slate-400 border-slate-400 hover:border-slate-500 hover:text-slate-500 hover:bg-slate-100;
  }
  .menuClass {
    @apply text-white aria-[current=true]:bg-teal-500 aria-[current=true]:hover:bg-teal-600 hover:bg-teal-500;
  }
  .primaryClass {
    @apply text-white bg-indigo-500 hover:bg-indigo-600;
  }
  .secondaryClass {
    @apply text-white bg-slate-500 hover:bg-slate-600;
  }
  .successClass {
    @apply text-white bg-teal-500 hover:bg-teal-600;
  }
  .warningClass {
    @apply text-teal-500 bg-amber-500 hover:bg-amber-600;
  }
  .errorClass {
    @apply text-white bg-rose-500 hover:bg-rose-600;
  }
  .borderClass {
    @apply text-slate-500 border-2 border-slate-500 hover:bg-slate-500 hover:text-white;
  }
</style>
