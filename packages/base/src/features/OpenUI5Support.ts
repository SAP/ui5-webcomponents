import { registerFeature } from "../FeaturesRegistry.js";
import { setTheme } from "../config/Theme.js";
import { getCurrentZIndex } from "../util/PopupUtils.js";
import { CLDRData } from "../asset-registries/LocaleData.js";
import type { LegacyDateCalendarCustomizing } from "../features/LegacyDateFormats.js";

type OpenUI5Popup = {
	setInitialZIndex: (zIndex: number) => void,
	getNextZIndex: () => number,
};

type OpenUI5Core = {
	attachInit: (callback: () => void) => void,
	attachThemeChanged: (callback: () => Promise<void>) => void,
	getConfiguration: () => OpenUI5CoreConfiguration,
};

type OpenUI5CoreConfiguration = {
	getAnimationMode: () => string,
	getLanguage: () => string,
	getTheme: () => string,
	getThemeRoot: () => string,
	getRTL: () => string,
	getTimezone: () => string,
	getCalendarType: () => string,
	getLocale: () => string,
	getFormatSettings: () => {
		getLegacyDateCalendarCustomizing: () => LegacyDateCalendarCustomizing;
	}
};

type LocaleData = {
	getInstance: (locale: string) => Locale,
}

type Locale = {
	getFirstDayOfWeek: () => number,
	_get: () => CLDRData,
};

const getCore = () => {
	return window.sap?.ui?.getCore?.() as OpenUI5Core;
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

		return new Promise<void>(resolve => {
			core.attachInit(() => {
				window.sap.ui.require(["sap/ui/core/LocaleData", "sap/ui/core/Popup"], (LocaleData: LocaleData, Popup: OpenUI5Popup) => {
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
			timezone: config.getTimezone(),
			calendarType: config.getCalendarType(),
			formatSettings: {
				firstDayOfWeek: LocaleData ? LocaleData.getInstance(config.getLocale()).getFirstDayOfWeek() : undefined,
				legacyDateCalendarCustomizing: config.getFormatSettings().getLegacyDateCalendarCustomizing(),
			},
		};
	}

	static getLocaleDataObject() {
		const core = getCore();
		if (!core) {
			return;
		}

		const config = core.getConfiguration();
		const LocaleData = window.sap.ui.require("sap/ui/core/LocaleData") as LocaleData;
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

		const link = [...document.head.children].find(el => el.id === "sap-ui-theme-sap.ui.core") as HTMLLinkElement; // more reliable than querySelector early
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

		const Popup = window.sap.ui.require("sap/ui/core/Popup") as OpenUI5Popup;
		return Popup.getNextZIndex();
	}

	static setInitialZIndex() {
		const core = getCore();
		if (!core) {
			return;
		}

		const Popup = window.sap.ui.require("sap/ui/core/Popup") as OpenUI5Popup;
		Popup.setInitialZIndex(getCurrentZIndex());
	}
}

registerFeature("OpenUI5Support", OpenUI5Support);

export default OpenUI5Support;
