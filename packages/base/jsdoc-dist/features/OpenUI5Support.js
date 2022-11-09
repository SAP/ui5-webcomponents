import { registerFeature } from "../FeaturesRegistry.js";
import { setTheme } from "../config/Theme.js";
import { getCurrentZIndex } from "../util/PopupUtils.js";
const getCore = () => {
    return window.sap?.ui?.getCore?.();
};
class OpenUI5Support {
    static isLoaded() {
        return !!getCore();
    }
    static init() {
        const core = getCore();
        if (!core) {
            return Promise.resolve();
        }
        return new Promise(resolve => {
            core.attachInit(() => {
                window.sap.ui.require(["sap/ui/core/LocaleData", "sap/ui/core/Popup"], (LocaleData, Popup) => {
                    Popup.setInitialZIndex(getCurrentZIndex());
                    resolve();
                });
            });
        });
    }
    static getConfigurationSettingsObject() {
        const core = getCore();
        if (!core) {
            return;
        }
        const config = core.getConfiguration();
        const LocaleData = window.sap.ui.require("sap/ui/core/LocaleData");
        return {
            animationMode: config.getAnimationMode(),
            language: config.getLanguage(),
            theme: config.getTheme(),
            themeRoot: config.getThemeRoot(),
            rtl: config.getRTL(),
            calendarType: config.getCalendarType(),
            formatSettings: {
                firstDayOfWeek: LocaleData ? LocaleData.getInstance(config.getLocale()).getFirstDayOfWeek() : undefined,
            },
        };
    }
    static getLocaleDataObject() {
        const core = getCore();
        if (!core) {
            return;
        }
        const config = core.getConfiguration();
        const LocaleData = window.sap.ui.require("sap/ui/core/LocaleData");
        return LocaleData.getInstance(config.getLocale())._get();
    }
    static _listenForThemeChange() {
        const core = getCore();
        const config = core.getConfiguration();
        core.attachThemeChanged(async () => {
            await setTheme(config.getTheme());
        });
    }
    static attachListeners() {
        const core = getCore();
        if (!core) {
            return;
        }
        OpenUI5Support._listenForThemeChange();
    }
    static cssVariablesLoaded() {
        const core = getCore();
        if (!core) {
            return;
        }
        const link = [...document.head.children].find(el => el.id === "sap-ui-theme-sap.ui.core"); // more reliable than querySelector early
        if (!link) {
            return;
        }
        return !!link.href.match(/\/css(-|_)variables\.css/);
    }
    static getNextZIndex() {
        const core = getCore();
        if (!core) {
            return;
        }
        const Popup = window.sap.ui.require("sap/ui/core/Popup");
        return Popup.getNextZIndex();
    }
    static setInitialZIndex() {
        const core = getCore();
        if (!core) {
            return;
        }
        const Popup = window.sap.ui.require("sap/ui/core/Popup");
        Popup.setInitialZIndex(getCurrentZIndex());
    }
}
registerFeature("OpenUI5Support", OpenUI5Support);
export default OpenUI5Support;
//# sourceMappingURL=OpenUI5Support.js.map