/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck

import EventProvider from "./EventProvider.js";

// ESM bundle targets browsers with native support
import "./features/OpenUI5Support.js";

// Test components

// Test themes - CSS Vars for the sap_fiori_3, sap_fiori_3_dark themes

// used in test pages
import { renderFinished } from "./Render.js";

// used for tests - to register a custom theme

// i18n
import { registerI18nLoader, getI18nBundle } from "./i18nBundle.js";
import parseProperties from "./PropertiesFileFormat.js";
import { forceInitConfiguration } from "./InitialConfiguration.js";

// Note: keep in sync with rollup.config value for IIFE
import { getAnimationMode } from "./config/AnimationMode.js";
import { getLanguage, setLanguage } from "./config/Language.js";
import { getCalendarType } from "./config/CalendarType.js";
import { getTheme, setTheme } from "./config/Theme.js";
import { getThemeRoot, setThemeRoot } from "./config/ThemeRoot.js";
import { getNoConflict, setNoConflict } from "./config/NoConflict.js";
import { getFirstDayOfWeek, getLegacyDateCalendarCustomizing } from "./config/FormatSettings.js";
import { _getRegisteredNames as getIconNames } from "./asset-registries/Icons.js";
import applyDirection from "./locale/applyDirection.js";
import { getCurrentRuntimeIndex } from "./Runtimes.js";
import LegacyDateFormats from "./features/LegacyDateFormats.js";
import { boot, attachBoot } from "./Boot.js";
import { registerThemePropertiesLoader } from "./AssetRegistry.js";
import { hasStyle } from "./ManagedStyles.js";

// attachBoot (no longer triggers "boot")
attachBoot(() => {
	// eslint-disable-next-line no-console
	console.log("Listener1: after framework booted!");
});

window["sap-ui-webcomponents-bundle"] = {
	forceInitConfiguration,
	configuration: {
		getAnimationMode,
		getLanguage,
		setLanguage,
		getTheme,
		getThemeRoot,
		setThemeRoot,
		setTheme,
		getNoConflict,
		setNoConflict,
		getCalendarType,
		getFirstDayOfWeek,
		getLegacyDateCalendarCustomizing,
	},
	getCurrentRuntimeIndex,
	getIconNames,
	parseProperties,
	registerI18nLoader,
	getI18nBundle,
	renderFinished,
	applyDirection,
	EventProvider,
	boot,
	hasStyle,
	registerThemePropertiesLoader,
	registerThemeProps: () => {
		registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_horizon", () => {
			return {
				content: `:root{ --customCol: #fff; --customBg: #000; }`,
				packageName: "",
				fileName: "",
			};
		});
	},
};
