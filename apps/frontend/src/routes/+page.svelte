<script>
	import { isEmpty } from 'lodash';
	// import date from 'date-and-time';
	import { getWeek, getWorkedDaysInMonth } from '../helpers/getWeekOf';
	import PocketBase from 'pocketbase';
	const pb = new PocketBase('https://bikestatsapi.etiennebouteille.com');
	import startOfWeek from 'date-fns/startOfWeek';
	import endOfWeek from 'date-fns/endOfWeek';
	import addDays from 'date-fns/addDays';
	import differenceInBusinessDays from 'date-fns/differenceInBusinessDays';
	import startOfMonth from 'date-fns/startOfMonth';

	$: businessDaysSinceStartOfMonth =
		Math.abs(differenceInBusinessDays(startOfMonth(currentDay), currentDay)) + 1;

	// $: console.log(currentDay.getDay());

	// $: console.log(businessDaysSinceStartOfMonth);
	$: trend = Math.round((selectedMonth.length * 100) / businessDaysSinceStartOfMonth);

	export let data;
	$: commutes = data.commutes;

	let currentDay = new Date();
	$: currentWeek = getWeek(new Date(currentDay));
	$: currentMonth = new Date(currentDay).getMonth();
	let commuteLength = 23.6;
	$: firstDayOfWeek = startOfWeek(currentDay, { weekStartsOn: 1 });

	const shortDaysString = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven'];

	const daysOfTheWeek = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi'];
	$: weekdays = daysOfTheWeek.map((d) => {
		let day = {};
		selectedWeek.forEach((c) => {
			day = new Date(c.date).toLocaleDateString('fr-FR', { weekday: 'long' }) === d ? c : day;
		});
		return day;
	});

	const handleCheckedDate = async (dayIdx) => {
		const currentDayIdx = [...daysOfTheWeek, 'samedi', 'dimanche'].findIndex(
			(d) => d === currentDay.toLocaleDateString('fr-FR', { weekday: 'long' })
		);

		let dayDelta = dayIdx - currentDayIdx;

		const yr = new Date().getFullYear();
		const payload = {
			date: addDays(currentDay, dayDelta),
			bike: 'en2el7ymwn7bl0j',
			textfiled: 'test',
			field: 'test'
		};

		const record = await pb.collection('dates').create(payload, { expand: 'bike' });
		commutes = [...commutes, record];
	};

	const handleDeleteDate = async (day) => {
		await pb.collection('dates').delete(day.id);
		commutes = commutes.filter((c) => c.id != day.id);
	};

	$: selectedWeek = commutes.filter((d) => {
		let wk = getWeek(d.date);
		if (wk == currentWeek) {
			return true;
		}
		return false;
	});

	$: selectedMonth = commutes.filter((d) => {
		let month = new Date(d.date).getMonth();
		if (month == currentMonth) {
			return true;
		}
		return false;
	});

	$: workedDaysInMonth = getWorkedDaysInMonth(currentDay, currentMonth);
	$: currentMonthStat = Math.round((selectedMonth.length * 100) / workedDaysInMonth);
	$: totalDistance = commutes.length * commuteLength;
	$: weeklyDistance = Math.round(selectedWeek.length * commuteLength);
</script>

<div id="container" class="w-80 m-auto pt-5">
	<h2 class="text-slate-500 text-xl">Depuis le début 🚴</h2>
	<h1 class="mt-0 leading-none text-slate-900"><span>{Math.round(totalDistance)}</span>km</h1>

	<div
		class="bg-slate-50/[0.9] backdrop-blur-lg shadow-sm rounded-xl mt-5 pb-3 pt-3 flex justify-evenly items-center"
	>
		<div class="text-center">
			<p class="font-semibold text-slate-700">{currentMonthStat}%</p>
			<p class="text-emerald-400 font-light text-sm capitalize">
				{new Date(currentDay).toLocaleDateString('fr-FR', { month: 'long' })}
			</p>
		</div>
		<div style="border-left:1px solid #cbd5e1; height:30px; " />
		<div class="text-center">
			<p class="font-semibold text-slate-700">{trend}%</p>
			<p class="text-pink-500 font-light text-sm">Tendance</p>
		</div>
		<div style="border-left:1px solid #cbd5e1; height:30px; " />
		<div class="text-center">
			<p class="font-semibold text-slate-700">{Math.round(totalDistance * 0.12)}kg</p>
			<p class="text-amber-400 font-light text-sm">C02</p>
		</div>
	</div>

	<div id="weektitle" class="flex justify-center items-center gap-10 mt-8">
		<svg
			class="fill-slate-700 cursor-pointer"
			on:click={() => {
				currentDay = addDays(currentDay, -7);
			}}
			on:keydown={() => {
				currentDay = addDays(currentDay, -7);
			}}
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 320 512"
			><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path
				d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"
			/></svg
		>
		<h2 class="text-slate-700 text-xl  text-center">
			{startOfWeek(currentDay, { weekStartsOn: 1 }).toLocaleDateString('fr-FR', {
				day: 'numeric',
				month: 'short'
			})}
			-
			{endOfWeek(currentDay, { weekStartsOn: 1 }).toLocaleDateString('fr-FR', {
				day: 'numeric',
				month: 'short'
			})}
		</h2>
		<svg
			class="fill-slate-700 cursor-pointer"
			on:click={() => {
				currentDay = addDays(currentDay, +7);
			}}
			on:keydown={() => {
				currentDay = addDays(currentDay, +7);
			}}
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 320 512"
			><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path
				d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z"
			/></svg
		>
	</div>

	<div class="bg-slate-50 rounded-xl flex justify-evenly mt-2 py-4 shadow-sm">
		{#each weekdays as day, index}
			<div class="flex flex-col items-center gap-3">
				<p>{shortDaysString[index]}</p>
				<div
					class="{!isEmpty(day)
						? 'bg-emerald-400'
						: 'bg-slate-300'} aspect-square rounded-full flex justify-center items-center cursor-pointer"
					style="width: 42px;"
					on:click={(e) => {
						if (isEmpty(day)) {
							handleCheckedDate(index);
						} else {
							handleDeleteDate(day);
						}
					}}
					on:keydown={(e) => {
						handleCheckedDate(index);
					}}
				>
					<p class="text-lg font-semibold text-lime-50">
						{addDays(firstDayOfWeek, index).toLocaleDateString('fr-FR', { day: 'numeric' })}
					</p>
				</div>
			</div>
		{/each}
	</div>
</div>

<!-- <p>Distance semaine : {weeklyDistance}km</p>

<p>
	Semaine du
	{startOfWeek(currentDay, { weekStartsOn: 1 }).toLocaleDateString('fr-FR', {
		day: 'numeric',
		month: '2-digit'
	})} au
	{endOfWeek(currentDay, { weekStartsOn: 1 }).toLocaleDateString('fr-FR', {
		day: 'numeric',
		month: '2-digit'
	})}
</p>

<div style="width: 150px;">
	<div class="flex items-center border border-gray-200 divide-x divide-gray-200 rounded">
		<button
			type="button"
			class="w-10 h-10 leading-10 text-gray-600 transition hover:opacity-75"
			on:click={() => {
				currentDay = addDays(currentDay, 7);
			}}>&plus;</button
		>
		<span>
			<input
				type="number"
				id="Quantity"
				value={currentWeek}
				class="h-10 w-16 border-transparent text-center [-moz-appearance:_textfield] sm:text-sm [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none"
			/>
		</span>
		<button
			type="button"
			class="w-10 h-10 leading-10 text-gray-600 transition hover:opacity-75"
			on:click={() => {
				currentDay = addDays(currentDay, -7);
			}}>&minus;</button
		>
	</div>
</div>

{#each weekdays as day, index}
	<p>{daysOfTheWeek[index]}</p>
	{#if !isEmpty(day)}
		<p>{day.expand.bike.name}</p>
		<input type="checkbox" id="scales" name="scales" checked on:change={handleCheckedDate} />
	{:else}
		<input
			type="checkbox"
			id="scales"
			name="scales"
			on:change={(e) => {
				handleCheckedDate(index);
			}}
		/>
	{/if}
{/each}

<h2>Stats :</h2>
<p>Ce mois : {Math.floor((selectedMonth.length * 100) / workedDaysInMonth)}%</p>
<p>Cette semaine : {Math.floor((selectedWeek.length * 100) / 5)}%</p> -->
<style>
	@import url('https://fonts.googleapis.com/css2?family=Anton&family=Rubik:wght@400;600&display=swap');

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

	h1 {
		font-family: 'Anton', sans-serif;
		font-size: 5em;
	}

	h1 span {
		font-size: 1.6em;
	}

	#weektitle svg {
		max-height: 20px;
		/* fill: #64748b; */
	}
</style>
