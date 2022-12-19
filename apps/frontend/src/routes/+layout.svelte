<script>
	import '../app.css';
	export let data;

	let username;
	let password;

	export const createUser = async () => {
		const data = {
			username,
			password,
			passwordConfirm: password,
			name:"hello world"
		}
		await locals.pb.collection('users').create(data)
	}

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

{#if !data.user}
 	<p>You are not logged in</p>
	<form action="/login?/register">
		<input
		placeholder="username"
		type="text"
		bind:value={username}/>
		
		<input
		placeholder="password"
		type="password"
		bind:value={password}/>
		<button type="submit">Créer un compte</button>
	</form>
{:else}
	<p>Congrats! You are logged in</p>
{/if}

<slot />
