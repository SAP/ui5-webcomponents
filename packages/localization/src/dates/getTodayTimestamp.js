/**
 * Returns a timestamp representing the current day with zeroes for hours, minutes and seconds
 * @returns {number}
 */
const getTodayTimestamp = () => {
	const millisecondsUTC = new Date().getTime();
	const rounded = millisecondsUTC - (millisecondsUTC % (24 * 60 * 60 * 1000));
	return rounded / 1000;
};

export default getTodayTimestamp;
