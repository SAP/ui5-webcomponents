import { getFormatSettings } from "../InitialConfiguration.js";
let formatSettings;
/**
 * Get the first day of the week from the configured format settings or based on the current locale
 * @returns {Number} 0 (Sunday) through 6 (Saturday)
 */
const getFirstDayOfWeek = () => {
    if (formatSettings === undefined) {
        formatSettings = getFormatSettings(); // TODO remove after converting InitialConfiguration to .ts
    }
    return formatSettings.firstDayOfWeek;
};
export { getFirstDayOfWeek }; // eslint-disable-line
//# sourceMappingURL=FormatSettings.js.map