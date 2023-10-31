<script>
	export let form;

	const jean = () => {
		console.log('onchange');
		form = { message: '', incorrect: false };
	};
</script>

<!-- This is an example component -->
<section class="w-full h-screen flex justify-center items-center">
	<form
		id="whoobe-t7qyk"
		class="flex flex-col items-center justify-center w-full px-6 m-auto bg-white rounded-lg shadow md:w-1/2 lg:w-1/3"
		method="post"
	>
		<h2 class="my-4 text-2xl">Login</h2>
		<div id="whoobe-h90kl" class="flex flex-col justify-start w-full p-2">
			<div id="whoobe-7izhv" class="flex flex-row">
				<span
					id="whoobe-plfl9"
					class="flex items-center justify-center w-10 h-10 text-2xl text-gray-400 border border-r-0 rounded-l-lg z-highest"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						xmlns:xlink="http://www.w3.org/1999/xlink"
						aria-hidden="true"
						role="img"
						width="3em"
						height="1em"
						preserveAspectRatio="xMidYMid meet"
						viewBox="0 0 26 26"
						class="iconify iconify--wpf"
					>
						<path
							d="M16.563 15.9c-.159-.052-1.164-.505-.536-2.414h-.009c1.637-1.686 2.888-4.399 2.888-7.07c0-4.107-2.731-6.26-5.905-6.26c-3.176 0-5.892 2.152-5.892 6.26c0 2.682 1.244 5.406 2.891 7.088c.642 1.684-.506 2.309-.746 2.397c-3.324 1.202-7.224 3.393-7.224 5.556v.811c0 2.947 5.714 3.617 11.002 3.617c5.296 0 10.938-.67 10.938-3.617v-.811c0-2.228-3.919-4.402-7.407-5.557z"
							fill="currentColor"
						/>
					</svg>
				</span>
				<input
					value=""
					class="w-full pl-1 border border-gray-200 rounded-r-lg outline-none focus:ring-1 ring-blue-400"
					id="username"
					name="username"
					required={false}
					placeholder="username"
				/>
			</div>

			<div id="whoobe-l6k6r" class="flex flex-row my-4">
				<span
					id="whoobe-4occ6"
					class="flex items-center justify-center w-10 h-10 text-2xl text-gray-400 border border-r-0 rounded-l-lg z-highest"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						xmlns:xlink="http://www.w3.org/1999/xlink"
						aria-hidden="true"
						role="img"
						width="1em"
						height="1em"
						preserveAspectRatio="xMidYMid meet"
						viewBox="0 0 32 32"
						class="iconify iconify--carbon"
					>
						<path
							d="M21 2a8.998 8.998 0 0 0-8.612 11.612L2 24v6h6l10.388-10.388A9 9 0 1 0 21 2zm0 16a7.013 7.013 0 0 1-2.032-.302l-1.147-.348l-.847.847l-3.181 3.181L12.414 20L11 21.414l1.379 1.379l-1.586 1.586L9.414 23L8 24.414l1.379 1.379L7.172 28H4v-3.172l9.802-9.802l.848-.847l-.348-1.147A7 7 0 1 1 21 18z"
							fill="currentColor"
						/>
						<circle cx="22" cy="10" r="2" fill="currentColor" />
					</svg>
				</span>
				<div class="flex-grow">
					<input
						value=""
						type="password"
						class="w-full h-10 pl-1 border border-gray-200 rounded-r-lg outline-none focus:ring-1 ring-blue-300"
						id="password"
						name="password"
						placeholder="password"
						required={false}
						on:change={() => jean()}
					/>
					{#if form?.incorrect}
						<p class="text-red-500">{form.message}</p>
					{/if}
				</div>
			</div>
			<button
				value="button"
				class="w-full px-4 py-2 my-4 text-white bg-blue-400 rounded hover:bg-blue-700"
				id="whoobe-ibemp">Login</button
			>
		</div>
	</form>
</section>
