//https://www.epochconverter.com/weeknumbers
Date.prototype.getWeek = function () {
	var target = new Date(this.valueOf());
	var dayNr = (this.getDay() + 6) % 7;
	target.setDate(target.getDate() - dayNr + 3);
	var firstThursday = target.valueOf();
	target.setMonth(0, 1);
	if (target.getDay() != 4) {
		target.setMonth(0, 1 + ((4 - target.getDay() + 7) % 7));
	}
	return 1 + Math.ceil((firstThursday - target) / 604800000);
};

export function getWeek(date) {
	// const currentDate = new Date(date);
	// const jan1 = new Date(currentDate.getFullYear(), 0, 1);
	// let days = Math.floor((currentDate - jan1) / (24 * 60 * 60 * 1000));
	// let weekNumber = Math.ceil(days / 7);
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

export const getWorkedDaysInMonth = (date, month) => {
	let days = getFirstAndLastDayOfMonth(date.getFullYear(), month);
	return getBusinessDatesCount(days.first, days.last);
};
