<script>
	import TrajetCard from '../../lib/components/TrajetCard.svelte';
	export let data;
	let trajets = data.trajets;

	console.log(data.trajets);

	const handleNewTrajet = async () => {
		console.log('posting new trajet');
		const res = await fetch('/api/trajets', {
			method: 'POST',
			body: JSON.stringify({})
		});
		const newTraj = await res.json();
		trajets = [...trajets, newTraj];
	};
</script>

<h3 class="mt-4 text-lg font-bold text-slate-900">Mes trajets</h3>

{#each trajets as traj}
	<TrajetCard {traj} user={data.user} />
{/each}
<button
	class="relative inline-block w-full rounded-lg py-3 px-4 border-dashed border-2 border-slate-300 mt-3 w-100"
	on:click={handleNewTrajet}
>
	<div class="flex justify-start items-center gap-2">
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" style="max-width: 15px;"
			><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path
				d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zM200 344V280H136c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H248v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"
			/></svg
		>
		<p>Nouveau trajet</p>
	</div>
</button>
