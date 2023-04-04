import { getTimezone as getConfiguredTimezone } from "../InitialConfiguration.js";

let currTimezone: string | undefined;

/**
 * Returns the configured IANA timezone ID.
 *
 * @private
 * @returns {string}
 */
const getTimezone = (): string | undefined => {
	if (currTimezone === undefined) {
		currTimezone = getConfiguredTimezone();
	}
	return currTimezone;
};

/**
 * Sets the timezone ID.
 *
 * @param {string} timezone
 * @private
 */
const setTimezone = (timezone: string) => {
	if (currTimezone === timezone) {
		return;
	}

	currTimezone = timezone;

	// Think of adding timezoneAware option to components metadata to re-render date/time components
};

export {
	getTimezone,
	setTimezone,
};
