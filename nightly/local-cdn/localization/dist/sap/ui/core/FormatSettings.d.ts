/**
 * OpenUI5 FormatSettings shim
 */
declare const FormatSettings: {
    getFormatLocale: (lang?: string | undefined) => import("@ui5/webcomponents-base/dist/locale/Locale").default;
    getLegacyDateFormat: () => void;
    getCustomLocaleData: () => void;
    getLegacyDateCalendarCustomizing: typeof import("@ui5/webcomponents-base/dist/features/LegacyDateFormats").default.getLegacyDateCalendarCustomizing;
};
export default FormatSettings;
