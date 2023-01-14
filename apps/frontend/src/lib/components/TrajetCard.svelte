<script>
	import PocketBase from 'pocketbase';
	import { createEventDispatcher } from 'svelte';
	import { enhance } from '$app/forms';


	const dispatch = createEventDispatcher();

	const pb = new PocketBase('https://bikestatsapi.etiennebouteille.com');

	export let user;
	export let traj;
	export let form;
	export let isDefault = false;

	let expanded = false;

	function getCookie(name) {
		const value = `; ${document.cookie}`;
		const parts = value.split(`; ${name}=`);
		if (parts.length === 2) return parts.pop().split(';').shift();
	}

	//TODO : move to form action
	const deleteTraj = async (id) => {
		pb.authStore.loadFromCookie(`pb_auth=${getCookie('pb_auth')}`);
		console.log("deleting : ", id)
		const del = await pb.collection('trajets').delete(id);
		if (del) {
			dispatch('delete', {
				id: id
			});
		}
	};

	const setDefault = async () => {
		pb.authStore.loadFromCookie(`pb_auth=${getCookie('pb_auth')}`);
		const dflt = await pb.collection('users').update(user.id, {default_trajet : traj.id})
		if(dflt){
			dispatch('newdefault',{default:traj.id})
		}
	}
</script>

<div
	class="relative block rounded py-3 px-4 shadow bg-gray-50 mt-3 w-full {expanded
		? ''
		: 'cursor-pointer'}"
>
	<div
		class="flex justify-between items-center flex-wrap"
		on:click={() => (expanded = !expanded)}
		on:keypress={(event) => {
			expanded = event.key === 'Enter' ? !expanded : expanded;
		}}
	>
	<div class="flex justify-start items-center w-1/2 gap-2">
		<button 
		on:click|stopPropagation={setDefault}
		>
			{#if isDefault}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 576 512"
					style="max-width: 15px; width:100%"
					class="fill-indigo-600 "
					><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path
						d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
					/></svg
				>
			{:else}
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" style="max-width: 15px; width:100%"
					><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path
						d="M287.9 0C297.1 0 305.5 5.25 309.5 13.52L378.1 154.8L531.4 177.5C540.4 178.8 547.8 185.1 550.7 193.7C553.5 202.4 551.2 211.9 544.8 218.2L433.6 328.4L459.9 483.9C461.4 492.9 457.7 502.1 450.2 507.4C442.8 512.7 432.1 513.4 424.9 509.1L287.9 435.9L150.1 509.1C142.9 513.4 133.1 512.7 125.6 507.4C118.2 502.1 114.5 492.9 115.1 483.9L142.2 328.4L31.11 218.2C24.65 211.9 22.36 202.4 25.2 193.7C28.03 185.1 35.5 178.8 44.49 177.5L197.7 154.8L266.3 13.52C270.4 5.249 278.7 0 287.9 0L287.9 0zM287.9 78.95L235.4 187.2C231.9 194.3 225.1 199.3 217.3 200.5L98.98 217.9L184.9 303C190.4 308.5 192.9 316.4 191.6 324.1L171.4 443.7L276.6 387.5C283.7 383.7 292.2 383.7 299.2 387.5L404.4 443.7L384.2 324.1C382.9 316.4 385.5 308.5 391 303L476.9 217.9L358.6 200.5C350.7 199.3 343.9 194.3 340.5 187.2L287.9 78.95z"
					/></svg
				>
			{/if}
		</button>
		<p>
			{traj.name}
		</p>
		</div>
		<div class="flex justify-end items-center w-1/2 gap-3">
			<p>{traj.distance} km</p>
			{#if expanded}
				<button
					class="inline-block w-3"
					on:click={() => {
						expanded = false;
					}}
				>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="max-width: 14px"
						><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path
							d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"
						/></svg
					>
				</button>
			{:else}
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" style="max-width: 10px"
					><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path
						d="M342.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L274.7 256 105.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"
					/></svg
				>
			{/if}
		</div>
		{#if expanded}
			<div class="pt-2">
				<form method="POST" action={`/settings?/update&id=${traj.id}`} use:enhance>
					<label
						for="trajname"
						class="block text-xs font-medium text-gray-700 dark:text-gray-200 text-left"
					>
						Nom
					</label>

					<input
						type="text"
						name="name"
						id="trajname"
						placeholder={traj.name}
						class="mt-1 w-full rounded-md border-gray-200 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white sm:text-sm pl-2 mb-2"
						on:click|stopPropagation={() => {
							console.log('input click');
						}}
					/>
					<label
						for="trajdist"
						class="block text-xs font-medium text-gray-700 dark:text-gray-200 text-left"
					>
						Distance
					</label>

					<input
						type="number"
						step="0.1"
						name="distance"
						id="trajdist"
						placeholder={traj.distance}
						class="mt-1 w-full rounded-md border-gray-200 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white sm:text-sm pl-2"
						on:click|stopPropagation={() => {
							console.log('input click');
						}}
					/>

					<div class="flex justify-around items-center gap-3 w-full mt-5">
						<button
							class="inline-flex items-center rounded border border-red-400 bg-red-400 px-8 py-2 text-white hover:bg-transparent hover:text-red-400 focus:outline-none focus:ring active:text-indigo-500 hover:fill-red-400"
							on:click|stopPropagation|preventDefault={() => {
								deleteTraj(traj.id);
							}}
						>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="h-5 fill-white"
								><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path
									d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"
								/></svg
							>
						</button>

						<button
							on:click|stopPropagation={() => {}}
							type="submit"
							class="inline-flex items-center rounded border border-indigo-600 bg-indigo-600 px-8 py-2 text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
						>
							<span class="text-sm font-medium"> Enregistrer </span>

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
						</button>
					</div>
					{#if form?.res}
						<p>Success!</p>
					{/if}
				</form>
			</div>
		{/if}
	</div>
</div>

<style>
	input[type='number'] {
		-moz-appearance: textfield;
	}
</style>
