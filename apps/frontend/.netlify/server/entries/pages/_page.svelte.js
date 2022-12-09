import { c as create_ssr_component, e as escape, d as each } from "../../chunks/index.js";
import { isEmpty } from "lodash";
import PocketBase from "pocketbase";
import startOfWeek from "date-fns/startOfWeek";
import endOfWeek from "date-fns/endOfWeek";
import addDays from "date-fns/addDays";
import differenceInBusinessDays from "date-fns/differenceInBusinessDays";
import startOfMonth from "date-fns/startOfMonth";
Date.prototype.getWeek = function() {
  var target = new Date(this.valueOf());
  var dayNr = (this.getDay() + 6) % 7;
  target.setDate(target.getDate() - dayNr + 3);
  var firstThursday = target.valueOf();
  target.setMonth(0, 1);
  if (target.getDay() != 4) {
    target.setMonth(0, 1 + (4 - target.getDay() + 7) % 7);
  }
  return 1 + Math.ceil((firstThursday - target) / 6048e5);
};
function getWeek(date) {
  return new Date(date).getWeek();
}
function getFirstAndLastDayOfMonth(year, month) {
  let first = new Date(year, month, 1);
  let last = new Date(year, month + 1, 0);
  return {
    first,
    last
  };
}
function getBusinessDatesCount(startDate, endDate) {
  let count = 0;
  const curDate = new Date(startDate.getTime());
  while (curDate <= endDate) {
    const dayOfWeek = curDate.getDay();
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      count++;
    }
    curDate.setDate(curDate.getDate() + 1);
  }
  return count;
}
const getWorkedDaysInMonth = (date, month) => {
  let days = getFirstAndLastDayOfMonth(date.getFullYear(), month);
  return getBusinessDatesCount(days.first, days.last);
};
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: "@import url('https://fonts.googleapis.com/css2?family=Anton&family=Rubik:wght@400;600&display=swap');#container.svelte-1onc9gs.svelte-1onc9gs{font-family:'Rubik', sans-serif}h1.svelte-1onc9gs.svelte-1onc9gs{font-family:'Anton', sans-serif;font-size:5em}h1.svelte-1onc9gs span.svelte-1onc9gs{font-size:1.6em}#weektitle.svelte-1onc9gs svg.svelte-1onc9gs{max-height:20px}",
  map: null
};
let commuteLength = 23.6;
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let businessDaysSinceStartOfMonth;
  let trend;
  let commutes;
  let currentWeek;
  let currentMonth;
  let firstDayOfWeek;
  let weekdays;
  let selectedWeek;
  let selectedMonth;
  let workedDaysInMonth;
  let currentMonthStat;
  let totalDistance;
  new PocketBase("http://bikestatsapi.etiennebouteille.com");
  let { data } = $$props;
  let currentDay = new Date();
  const shortDaysString = ["Lun", "Mar", "Mer", "Jeu", "Ven"];
  const daysOfTheWeek = ["lundi", "mardi", "mercredi", "jeudi", "vendredi"];
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$result.css.add(css);
  businessDaysSinceStartOfMonth = Math.abs(differenceInBusinessDays(startOfMonth(currentDay), currentDay)) + 1;
  {
    console.log(currentDay.getDay());
  }
  {
    console.log(businessDaysSinceStartOfMonth);
  }
  commutes = data.commutes;
  currentMonth = new Date(currentDay).getMonth();
  selectedMonth = commutes.filter((d) => {
    let month = new Date(d.date).getMonth();
    if (month == currentMonth) {
      return true;
    }
    return false;
  });
  trend = Math.round(selectedMonth.length * 100 / businessDaysSinceStartOfMonth);
  currentWeek = getWeek(new Date(currentDay));
  firstDayOfWeek = startOfWeek(currentDay, { weekStartsOn: 1 });
  selectedWeek = commutes.filter((d) => {
    let wk = getWeek(d.date);
    if (wk == currentWeek) {
      return true;
    }
    return false;
  });
  weekdays = daysOfTheWeek.map((d) => {
    let day = {};
    selectedWeek.forEach((c) => {
      day = new Date(c.date).toLocaleDateString("fr-FR", { weekday: "long" }) === d ? c : day;
    });
    return day;
  });
  workedDaysInMonth = getWorkedDaysInMonth(currentDay, currentMonth);
  currentMonthStat = Math.round(selectedMonth.length * 100 / workedDaysInMonth);
  totalDistance = commutes.length * commuteLength;
  Math.round(selectedWeek.length * commuteLength);
  return `<div id="${"container"}" class="${"w-80 m-auto pt-5 svelte-1onc9gs"}"><h2 class="${"text-slate-500 text-xl"}">Depuis le d\xE9but</h2>
	<h1 class="${"mt-0 leading-none text-slate-900 svelte-1onc9gs"}"><span class="${"svelte-1onc9gs"}">${escape(Math.round(totalDistance))}</span>km</h1>

	<div class="${"bg-slate-100 rounded-xl mt-5 pb-3 pt-3 flex justify-evenly items-center"}"><div class="${"text-center"}"><p class="${"font-semibold text-slate-700"}">${escape(currentMonthStat)}%</p>
			<p class="${"text-emerald-400 font-light text-sm capitalize"}">${escape(new Date(currentDay).toLocaleDateString("fr-FR", { month: "long" }))}</p></div>
		<div style="${"border-left:1px solid #cbd5e1; height:30px; "}"></div>
		<div class="${"text-center"}"><p class="${"font-semibold text-slate-700"}">${escape(trend)}%</p>
			<p class="${"text-pink-500 font-light text-sm"}">Tendance</p></div>
		<div style="${"border-left:1px solid #cbd5e1; height:30px; "}"></div>
		<div class="${"text-center"}"><p class="${"font-semibold text-slate-700"}">${escape(Math.round(totalDistance * 0.12))}kg</p>
			<p class="${"text-amber-400 font-light text-sm"}">C02</p></div></div>

	<div id="${"weektitle"}" class="${"flex justify-center items-center gap-10 mt-8 svelte-1onc9gs"}"><svg class="${"fill-slate-700 cursor-pointer svelte-1onc9gs"}" xmlns="${"http://www.w3.org/2000/svg"}" viewBox="${"0 0 320 512"}"><path d="${"M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"}"></path></svg>
		<h2 class="${"text-slate-700 text-xl text-center"}">${escape(startOfWeek(currentDay, { weekStartsOn: 1 }).toLocaleDateString("fr-FR", { day: "numeric", month: "short" }))}
			-
			${escape(endOfWeek(currentDay, { weekStartsOn: 1 }).toLocaleDateString("fr-FR", { day: "numeric", month: "short" }))}</h2>
		<svg class="${"fill-slate-700 cursor-pointer svelte-1onc9gs"}" xmlns="${"http://www.w3.org/2000/svg"}" viewBox="${"0 0 320 512"}"><path d="${"M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z"}"></path></svg></div>

	<div class="${"bg-slate-100 rounded-xl flex justify-evenly mt-2 py-4"}">${each(weekdays, (day, index) => {
    return `<div class="${"flex flex-col items-center gap-3"}"><p>${escape(shortDaysString[index])}</p>
				<div class="${escape(!isEmpty(day) ? "bg-emerald-400" : "bg-slate-300", true) + " aspect-square rounded-full flex justify-center items-center cursor-pointer"}" style="${"width: 42px;"}"><p class="${"text-lg font-semibold text-lime-50"}">${escape(addDays(firstDayOfWeek, index).toLocaleDateString("fr-FR", { day: "numeric" }))}
					</p></div>
			</div>`;
  })}</div></div>

`;
});
export {
  Page as default
};
