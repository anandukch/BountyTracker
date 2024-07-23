export function compareDates(date1: Date, date2: Date): number {
	const d1 = date1;
	const d2 = date2;

	const year1 = d1.getUTCFullYear();
	const month1 = d1.getUTCMonth();
	const day1 = d1.getUTCDate();

	const year2 = d2.getUTCFullYear();
	const month2 = d2.getUTCMonth();
	const day2 = d2.getUTCDate();

	if (year1 > year2) return 1;
	if (year1 < year2) return -1;
	if (month1 > month2) return 1;
	if (month1 < month2) return -1;
	if (day1 > day2) return 1;
	if (day1 < day2) return -1;

	return 0;
}
