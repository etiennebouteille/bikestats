<script>
	import '../app.css';
	export let data;
</script>

<svelte:head>
	<title>Flytta - données mobilité durable</title>
	<link rel="preconnect" href="https://fonts.googleapis.com" /><link
		rel="preconnect"
		href="https://fonts.gstatic.com"
		crossorigin
	/><link
		href="https://fonts.googleapis.com/css2?family=Anton&family=Rubik:wght@300;400;600&display=swap"
		rel="stylesheet"
	/>

	<link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
	<link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
	<link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
	<link rel="manifest" href="/favicon/site.webmanifest" />
	<link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#5bbad5" />
	<meta name="msapplication-TileColor" content="#da532c" />
	<meta name="theme-color" content="#ffffff" />
</svelte:head>

<div id="container" class="w-80 m-auto pt-5">

	{#if data.user}	
	<p class="text-lg mb-5 text-indigo-500 font-medium">Bonjour, {data.user.username} !</p>
	{/if}
	
	<slot />
	
</div>

<style>
	:global(body) {
		/* background-image: url('/bikeforetblur.jpg'); */
		/* background-size: cover; */
		background-image: linear-gradient(
			174.2deg,
			rgba(255, 244, 228, 1) 7.1%,
			rgba(240, 246, 238, 1) 67.4%
		);
	}

	#container {
		font-family: 'Rubik', sans-serif;
		height: 100vh;
	}
</style>