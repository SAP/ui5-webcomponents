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
	ready: () => Promise<void>,
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

type ControlBehavior = {
	getAnimationMode: () => string,
}

type Localization = {
	getLanguage: () => string,
	getLanguageTag: () => string,
	getRTL: () => string,
	getTimezone: () => string,
}

type LocaleData = {
	getInstance: (locale: string) => Locale,
}

type Theming = {
	getThemeRoot: () => string,
	getTheme: () => string,
	attachApplied: (callback: () => Promise<void>) => void,
}

type Formatting = {
	getCalendarType: () => string,
	getLegacyDateCalendarCustomizing: () => LegacyDateCalendarCustomizing,
}

type CalendarUtils = {
	getWeekConfigurationValues: () => {
		firstDayOfWeek: number | undefined,
	},
}

type Locale = {
	getFirstDayOfWeek: () => number,
	_get: () => CLDRData,
};

class OpenUI5Support {
	static isModularCore() {
		const version = window.sap.ui!.version as string;
		const parts = version.split(".");
		return parts && parts[1] && parseInt(parts[1]) >= 116;
	}

	static isLoaded() {
		return typeof window.sap?.ui?.require === "function";
	}

	static init() {
		if (!OpenUI5Support.isLoaded()) {
			return Promise.resolve();
		}

		return new Promise<void>(resolve => {
			window.sap.ui.require(["sap/ui/core/Core"], async (Core: OpenUI5Core) => {
				const callback = () => {
					let deps: Array<string> = ["sap/ui/core/Popup", "sap/ui/core/LocaleData"];
					if (OpenUI5Support.isModularCore()) { // for versions since 1.116.0 and onward, use the modular core
						deps = [
							...deps,
							"sap/base/i18n/Formatting",
							"sap/base/i18n/Localization",
							"sap/ui/core/ControlBehavior",
							"sap/ui/core/Theming",
							"sap/ui/core/date/CalendarUtils",
						];
					}
					window.sap.ui.require(deps, (Popup: OpenUI5Popup) => {
						Popup.setInitialZIndex(getCurrentZIndex());
						resolve();
					});
				};
				if (OpenUI5Support.isModularCore()) {
					await Core.ready();
					callback();
				} else {
					Core.attachInit(callback);
				}
			});
		});
	}

	static getConfigurationSettingsObject() {
		if (!OpenUI5Support.isLoaded()) {
			return;
		}

		if (OpenUI5Support.isModularCore()) {
			const ControlBehavior = window.sap.ui.require("sap/ui/core/ControlBehavior") as ControlBehavior;
			const Localization = window.sap.ui.require("sap/base/i18n/Localization") as Localization;
			const Theming = window.sap.ui.require("sap/ui/core/Theming") as Theming;
			const Formatting = window.sap.ui.require("sap/base/i18n/Formatting") as Formatting;
			const CalendarUtils = window.sap.ui.require("sap/ui/core/date/CalendarUtils") as CalendarUtils;

			return {
				animationMode: ControlBehavior.getAnimationMode(),
				language: Localization.getLanguage(),
				theme: Theming.getTheme(),
				themeRoot: Theming.getThemeRoot(),
				rtl: Localization.getRTL(),
				timezone: Localization.getTimezone(),
				calendarType: Formatting.getCalendarType(),
				formatSettings: {
					firstDayOfWeek: CalendarUtils.getWeekConfigurationValues().firstDayOfWeek,
					legacyDateCalendarCustomizing: Formatting.getLegacyDateCalendarCustomizing(),
				},
			};
		}

		const Core = window.sap.ui.require("sap/ui/core/Core") as OpenUI5Core;
		const config = Core.getConfiguration();
		const LocaleData = window.sap.ui.require("sap/ui/core/LocaleData") as LocaleData;

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
		if (!OpenUI5Support.isLoaded()) {
			return;
		}

		const LocaleData = window.sap.ui.require("sap/ui/core/LocaleData") as LocaleData;

		if (OpenUI5Support.isModularCore()) {
			const Localization = window.sap.ui.require("sap/base/i18n/Localization") as Localization;
			return LocaleData.getInstance(Localization.getLanguageTag())._get();
		}

		const Core = window.sap.ui.require("sap/ui/core/Core") as OpenUI5Core;
		const config = Core.getConfiguration();
		return LocaleData.getInstance(config.getLocale())._get();
	}

	static _listenForThemeChange() {
		if (OpenUI5Support.isModularCore()) {
			const Theming: Theming = window.sap.ui.require("sap/ui/core/Theming");
			Theming.attachApplied(async () => {
				await setTheme(Theming.getTheme());
			});
		} else {
			const Core = window.sap.ui.require("sap/ui/core/Core") as OpenUI5Core;
			const config = Core.getConfiguration();
			Core.attachThemeChanged(async () => {
				await setTheme(config.getTheme());
			});
		}
	}

	static attachListeners() {
		if (!OpenUI5Support.isLoaded()) {
			return;
		}

		OpenUI5Support._listenForThemeChange();
	}

	static cssVariablesLoaded() {
		if (!OpenUI5Support.isLoaded()) {
			return;
		}

		const link = [...document.head.children].find(el => el.id === "sap-ui-theme-sap.ui.core") as HTMLLinkElement; // more reliable than querySelector early
		if (!link) {
			return;
		}

		return !!link.href.match(/\/css(-|_)variables\.css/);
	}

	static getNextZIndex() {
		if (!OpenUI5Support.isLoaded()) {
			return;
		}

		const Popup = window.sap.ui.require("sap/ui/core/Popup") as OpenUI5Popup;
		return Popup.getNextZIndex();
	}

	static setInitialZIndex() {
		if (!OpenUI5Support.isLoaded()) {
			return;
		}

		const Popup = window.sap.ui.require("sap/ui/core/Popup") as OpenUI5Popup;
		Popup.setInitialZIndex(getCurrentZIndex());
	}
}

registerFeature("OpenUI5Support", OpenUI5Support);

export default OpenUI5Support;
