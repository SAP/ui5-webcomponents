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
 * @returns { Promise<void> }
 */
const setTimezone = (timezone: string) => {
	if (currTimezone === timezone) {
		return;
	}

	currTimezone = timezone;
};

export {
	getTimezone,
	setTimezone,
};
