import { registerThemePropertiesLoader } from "./dist/AssetRegistry.js";
import EventProvider from "./dist/EventProvider.js";

// ESM bundle targets browsers with native support
import "./dist/features/OpenUI5Support.js";

// Test components
import "./test/elements/Generic.js";
import "./test/elements/NoShadowDOM.js";
import "./test/elements/Parent.js";
import "./test/elements/Child.js";
import "./test/elements/WithStaticArea.js";
import "./test/elements/WithComplexTemplate.js";
import "./test/elements/GenericExt.js";

// Test themes - CSS Vars for the sap_fiori_3, sap_fiori_3_dark, sap_belize and sap_belize_hcb themes
import "./test/assets/Themes.js";

// used in test pages
import { renderFinished } from "./dist/Render.js";

// used for tests - to register a custom theme
window.registerThemePropertiesLoader = registerThemePropertiesLoader;

// i18n
import { registerI18nLoader, getI18nBundle } from "./dist/i18nBundle.js";

// Note: keep in sync with rollup.config value for IIFE
import { getAnimationMode } from "./dist/config/AnimationMode.js";
import { getLanguage } from "./dist/config/Language.js";
import { getCalendarType } from "./dist/config/CalendarType.js";
import { getTheme, setTheme } from "./dist/config/Theme.js";
import { getNoConflict, setNoConflict } from "./dist/config/NoConflict.js";
import { getRTL } from "./dist/config/RTL.js";
import { getFirstDayOfWeek } from "./dist/config/FormatSettings.js";
import { _getRegisteredNames as getIconNames } from  "./dist/asset-registries/Icons.js"
import applyDirection from "./dist/locale/applyDirection.js";

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
	getI18nBundle,
	renderFinished,
	applyDirection,
	EventProvider,
};
