/**
 * Returns a timestamp with only the year, month and day (with zero hours, minutes and seconds) and without 000 for milliseconds
 * @param { number } millisecondsUTC
 * @returns { number }
 */
const getRoundedTimestamp = (millisecondsUTC: number) => {
	if (!millisecondsUTC) {
		millisecondsUTC = new Date().getTime();
	}
	const rounded = millisecondsUTC - (millisecondsUTC % (24 * 60 * 60 * 1000));
	return rounded / 1000;
};

export default getRoundedTimestamp;
