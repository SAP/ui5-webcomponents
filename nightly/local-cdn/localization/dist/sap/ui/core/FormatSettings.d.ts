/**
 * OpenUI5 FormatSettings shim
 */
declare const FormatSettings: {
    getFormatLocale: (lang?: string) => import("@ui5/webcomponents-base/dist/locale/Locale.js").default;
    getLegacyDateFormat: () => void;
    getCustomLocaleData: () => void;
    getLegacyDateCalendarCustomizing: typeof import("@ui5/webcomponents-base/dist/features/LegacyDateFormats.js").default.getLegacyDateCalendarCustomizing;
};
export default FormatSettings;
