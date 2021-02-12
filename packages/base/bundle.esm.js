import { registerThemePropertiesLoader } from "./dist/AssetRegistry.js";

// ESM bundle targets browsers with native support
import "./dist/features/OpenUI5Support.js";

// Test components
import "./dist/test-resources/elements/Generic.js";
import "./dist/test-resources/elements/NoShadowDOM.js";
import "./dist/test-resources/elements/Parent.js";
import "./dist/test-resources/elements/Child.js";
import "./dist/test-resources/elements/WithStaticArea.js";
import "./dist/test-resources/elements/GenericExt.js";

// Test themes - CSS Vars for the sap_fiori_3, sap_fiori_3_dark, sap_belize and sap_belize_hcb themes
import "./dist/test-resources/assets/Themes.js";

// used in test pages
import { renderFinished } from "./dist/Render.js";
import { isIE } from "./dist/Device.js";
window.isIE = isIE; // attached to the window object for testing purposes

// used for tests - to register a custom theme
window.registerThemePropertiesLoader = registerThemePropertiesLoader;

// i18n
import { registerI18nLoader, fetchI18nBundle, getI18nBundle } from "./dist/i18nBundle.js";

// Note: keep in sync with rollup.config value for IIFE
import { getAnimationMode } from "./dist/config/AnimationMode.js";
import { getLanguage } from "./dist/config/Language.js";
import { getCalendarType } from "./dist/config/CalendarType.js";
import { getTheme, setTheme } from "./dist/config/Theme.js";
import { getNoConflict, setNoConflict } from "./dist/config/NoConflict.js";
import { getRTL } from "./dist/config/RTL.js";
import { getFirstDayOfWeek } from "./dist/config/FormatSettings.js";
import { _getRegisteredNames as getIconNames } from  "./dist/asset-registries/Icons.js"
window["sap-ui-webcomponents-bundle"] = {
	configuration : {
		getAnimationMode,
		getLanguage,
		getTheme,
		setTheme,
		getNoConflict,
		setNoConflict,
		getCalendarType,
		getRTL,
		getFirstDayOfWeek,
	},
	getIconNames,
	registerI18nLoader,
	fetchI18nBundle,
	getI18nBundle,
	renderFinished,
};
