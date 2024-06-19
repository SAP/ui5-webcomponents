import EventProvider from "./dist/EventProvider.js";

// ESM bundle targets browsers with native support
import "./dist/features/OpenUI5Support.js";

// Test components
import "./test/elements/Accessor.js";
import "./test/elements/Generic.js";
import "./test/elements/NoShadowDOM.js";
import "./test/elements/Parent.js";
import "./test/elements/Child.js";
import "./test/elements/WithComplexTemplate.js";
import "./test/elements/GenericExt.js";

// Test themes - CSS Vars for the sap_fiori_3, sap_fiori_3_dark themes
import "./test/assets/Themes.js";

// used in test pages
import { renderFinished } from "./dist/Render.js";

// used for tests - to register a custom theme

// i18n
import { registerI18nLoader, getI18nBundle } from "./dist/i18nBundle.js";
import parseProperties from "./dist/PropertiesFileFormat.js";
import { forceInitConfiguration } from "./dist/InitialConfiguration.js";

// Note: keep in sync with rollup.config value for IIFE
import { getAnimationMode } from "./dist/config/AnimationMode.js";
import { getLanguage, setLanguage } from "./dist/config/Language.js";
import { getCalendarType } from "./dist/config/CalendarType.js";
import { getTheme, setTheme } from "./dist/config/Theme.js";
import { getThemeRoot, setThemeRoot } from "./dist/config/ThemeRoot.js";
import { getNoConflict, setNoConflict } from "./dist/config/NoConflict.js";
import { getFirstDayOfWeek, getLegacyDateCalendarCustomizing } from "./dist/config/FormatSettings.js";
import { _getRegisteredNames as getIconNames } from  "./dist/asset-registries/Icons.js"
import applyDirection from "./dist/locale/applyDirection.js";
import { getCurrentRuntimeIndex } from "./dist/Runtimes.js";
import LegacyDateFormats from "./dist/features/LegacyDateFormats.js";
import { boot, attachBoot } from "./dist/Boot.js";
import { registerThemePropertiesLoader } from "./dist/AssetRegistry.js";
import { hasStyle } from "./dist/ManagedStyles.js";

// attachBoot (no longer triggers "boot")
attachBoot(() => {
    console.log("Listener1: after framework booted!")
})

window["sap-ui-webcomponents-bundle"] = {
	forceInitConfiguration,
	configuration : {
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
    registerThemeProps: async () => {
        registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_horizon", () => {
            return {
                content: `:root{ --customCol: #fff; --customBg: #000; }`,
                packageName: "",
                fileName: "",
            };
        });
    },
};
