<script>
	export let data;
	console.log('received data : ', data);
</script>

<h1>Hello</h1>

{#each data.commutes as commute}
	<p>{commute.date}</p>
{/each}
