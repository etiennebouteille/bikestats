<script>
	import { isEmpty } from 'lodash';
	import date from 'date-and-time';
	import { getWeek, getWorkedDaysInMonth } from '../helpers/getWeekOf';
	import PocketBase from 'pocketbase';
	const pb = new PocketBase('http://127.0.0.1:8090');
	import startOfWeek from 'date-fns/startOfWeek';
	import endOfWeek from 'date-fns/endOfWeek';

	export let data;
	$: commutes = data.commutes;

	let currentDay = new Date();
	$: currentWeek = getWeek(new Date(currentDay));
	$: currentMonth = new Date(currentDay).getMonth();
	let commuteLength = 23.6;

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
			date: date.addDays(currentDay, dayDelta),
			bike: 'en2el7ymwn7bl0j',
			textfiled: 'test',
			field: 'test'
		};

		const record = await pb.collection('dates').create(payload, { expand: 'bike' });
		commutes = [...commutes, record];
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
	$: totalDistance = commutes.length * commuteLength;
	$: weeklyDistance = Math.round(selectedWeek.length * commuteLength);
</script>

<p>Distance total : {totalDistance}km</p>
<p>Distance semaine : {weeklyDistance}km</p>

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
				currentDay = date.addDays(currentDay, 7);
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
				currentDay = date.addDays(currentDay, -7);
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
<p>Cette semaine : {Math.floor((selectedWeek.length * 100) / 5)}%</p>
