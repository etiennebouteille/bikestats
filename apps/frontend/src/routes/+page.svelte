<script>
	import Mainpage from '$lib/components/mainpage.svelte';
	export let data;
</script>

{#if data.user}
	<Mainpage {data} />
{:else}
	<div id="hero-container" class="flex items-center h-full">
		<div>
			<h1 class="text-6xl text-slate-900 text-center">
				Bienvenue sur<img src="/logo.svg" style="max-width:80px" class="inline-block" />
			</h1>
			<p class="mx-auto mt-3 max-w-md text-center text-gray-500 text-lg">
				Une micro application pour suivre vos déplacements à vélo.
			</p>
			<a
				href="/register"
				class="group mt-5 flex w-full items-center justify-center rounded-md bg-indigo-600 px-5 py-3 text-white transition focus:outline-none focus:ring focus:ring-yellow-400 sm:mt-0 sm:w-auto"
			>
				<span class="text-lg font-medium"> Créer un compte </span>

				<svg
					class="ml-3 h-5 w-5"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M17 8l4 4m0 0l-4 4m4-4H3"
					/>
				</svg>
			</a>
			<a href="/login" class="text-center text-sm underline mt-3 text-gray-500 block">
				J'ai déjà un compte
			</a>
		</div>
	</div>
{/if}

<style>
	@import url('https://fonts.googleapis.com/css2?family=Anton&family=Rubik:wght@400;600&display=swap');

	h1 {
		font-family: 'Anton', sans-serif;
	}
</style>
