<script>
	import lodash from 'lodash';
	const { isEmpty } = lodash;
	import { getWeek, getWorkedDaysInMonth } from '$lib/helpers/getWeekOf';
	
	import {
		startOfWeek,
		endOfWeek,
		addDays,
		differenceInBusinessDays,
		startOfMonth,
		endOfMonth
	} from 'date-fns';
	import { press } from 'svelte-gestures';
	
	$: businessDaysSinceStartOfMonth =
	Math.abs(differenceInBusinessDays(startOfMonth(today), today));
	$: trend = Math.round((selectedMonth.filter(d => !d.isDisabled).length * 100) / (businessDaysSinceStartOfMonth - selectedMonth.filter(d => d.isDisabled).length));
	
	export let data;
	$: commutes = data.commutes;

	let currentDay = new Date();
	const today = new Date();
	$: currentWeek = getWeek(new Date(currentDay));
	$: currentMonth = new Date(currentDay).getMonth();
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
			trajet: data.user.default_trajet
		};

		const res = await fetch('/api/add-day', {
			method: 'POST',
			body: JSON.stringify(payload)
		});
		const record = await res.json();
		commutes = [...commutes, record];
	};

	const handleDisableDate = async (dayIdx) => {
		console.log('sending disabled date');

		let res;

		if (isEmpty(weekdays[dayIdx])) {
			const currentDayIdx = [...daysOfTheWeek, 'samedi', 'dimanche'].findIndex(
				(d) => d === currentDay.toLocaleDateString('fr-FR', { weekday: 'long' })
			);
			let dayDelta = dayIdx - currentDayIdx;
			const yr = new Date().getFullYear();
			const payload = {
				date: addDays(currentDay, dayDelta),
				isDisabled: true
			};

			res = await fetch('/api/add-day', {
				method: 'POST',
				body: JSON.stringify(payload)
			});
			const record = await res.json();
			console.log('res : ', record);
			commutes = [...commutes, record];
		} else {
			const payload = {
				dayid: weekdays[dayIdx].id,
				isDisabled: true
			};

			res = await fetch(`/api/update-day`, {
				method: 'POST',
				body: JSON.stringify(payload)
			});
			const record = await res.json();
			commutes = commutes.map((c) => (c.id == record.id ? record : c));
		}
	};

	const handleDeleteDate = async (day) => {
		const res = await fetch(`/api/remove-day?day=${day.id}`, {
			method: 'DELETE'
		});
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

	$: totalDistance = commutes.reduce((accumulator, commute) => {
		if (commute.isDisabled) {
			return accumulator + 0;
		}
		const dist = commute?.expand?.trajet?.distance * 2 || 0;
		return accumulator + dist;
	}, 0);

	const getColorFromDayStatus = (day) => {
		if (isEmpty(day)) {
			return 'bg-slate-300';
		} else if (day.isDisabled) {
			return 'bg-indigo-900';
		} else {
			return 'bg-emerald-400';
		}
	};


	const getMonthStats = (m) => {
		const totalEnabledDays = Math.abs(differenceInBusinessDays(startOfMonth(today), endOfMonth(today))) - m.filter(d => d.isDisabled).length
		const workedDaysThisMonth = m.filter(d => !d.isDisabled).length
		return Math.round(workedDaysThisMonth * 100 / totalEnabledDays)
	}

	$: currentMonthStat = getMonthStats(selectedMonth);
</script>

<h2 class="text-slate-500 text-xl">Depuis le début</h2>
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
			<button
				class="{getColorFromDayStatus(
					day
				)} aspect-square rounded-full flex justify-center items-center cursor-pointer"
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
				use:press={{ timeframe: 300, triggerBeforeFinished: false }}
				on:press={() => {
					handleDisableDate(index);
				}}
			>
				<p class="text-lg font-semibold text-lime-50">
					{addDays(firstDayOfWeek, index).toLocaleDateString('fr-FR', { day: 'numeric' })}
				</p>
			</button>
		</div>
	{/each}
</div>

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

	.prevent-select {
		-webkit-user-select: none; /* Safari */
		-ms-user-select: none; /* IE 10 and IE 11 */
		user-select: none; /* Standard syntax */
	}
</style>
