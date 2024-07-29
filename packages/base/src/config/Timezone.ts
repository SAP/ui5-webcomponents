import { getTimezone as getConfiguredTimezone } from "../InitialConfiguration.js";
import { attachConfigurationReset } from "./ConfigurationReset.js";

let currTimezone: string | undefined;

attachConfigurationReset(() => {
	currTimezone = undefined;
});

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
 * Sets the IANA timezone ID.
 * **For example:** "America/New_York", "Europe/London", "Australia/Sydney", "Asia/Bishkek", etc.
 *>
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
