/**
 * OpenUI5 Core shim
 */
declare const Core: {
    getConfiguration: () => {
        getLanguage: () => string | undefined;
        getCalendarType: () => import("@ui5/webcomponents-base/dist/types/CalendarType.js").default;
        getSupportedLanguages: () => string[] | null;
        getOriginInfo: () => void;
        getFormatSettings: () => {
            getFormatLocale: (lang?: string | undefined) => import("@ui5/webcomponents-base/dist/locale/Locale.js").default;
            getLegacyDateFormat: () => void;
            getCustomLocaleData: () => void;
            getLegacyDateCalendarCustomizing: typeof import("@ui5/webcomponents-base/dist/features/LegacyDateFormats.js").default.getLegacyDateCalendarCustomizing;
        };
        getTimezone: () => string;
        getCalendarWeekNumbering: () => string;
    };
    getLibraryResourceBundle: void;
    getFormatSettings: () => {
        getFormatLocale: (lang?: string | undefined) => import("@ui5/webcomponents-base/dist/locale/Locale.js").default;
        getLegacyDateFormat: () => void;
        getCustomLocaleData: () => void;
        getLegacyDateCalendarCustomizing: typeof import("@ui5/webcomponents-base/dist/features/LegacyDateFormats.js").default.getLegacyDateCalendarCustomizing;
    };
};
export default Core;
