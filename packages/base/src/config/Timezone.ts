import { getTimezone as getConfiguredTimezone } from "../InitialConfiguration.js";
import { reRenderAllUI5Elements } from "../Render.js";

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
const setTimezone = async (timezone: string): Promise<void> => {
	if (currTimezone === timezone) {
		return;
	}

	currTimezone = timezone;

	await reRenderAllUI5Elements({ timezoneAware: true });
};

export {
	getTimezone,
	setTimezone,
};
