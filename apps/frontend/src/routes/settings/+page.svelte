<script>
	export let data;
	let trajets = data.trajets;
	console.log('got data : ', data);

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

<div class="relative block rounded-xl border border-gray-100 p-8 pt-1 shadow-lg bg-gray-50 mt-3">
	<div class="mt-1 text-gray-500 sm:pr-8">
		<div class="border-b border-gray-300 pb-1">
			<h3 class="mt-4 text-lg font-bold text-slate-900">Trajets</h3>
		</div>

		{#each trajets as traj}
			<div class="py-3 px-2 flex justify-between items-center bg-indigo-50">
				<p class="text-sm">
					{traj.name}
				</p>
				<p>{traj.distance} km</p>
			</div>
		{/each}
		<button on:click={handleNewTrajet}>Nouveau trajet</button>
	</div>
</div>
