// animations/
import scroll from "./dist/animations/scroll.js";
import slideDown from "./dist/animations/slideDown.js";
import slideUp from "./dist/animations/slideUp.js";

// config/
import { getAnimationMode, setAnimationMode } from "./dist/config/AnimationMode.js";
import { getCalendarType } from "./dist/config/CalendarType.js";
import { getFirstDayOfWeek, getLegacyDateCalendarCustomizing } from "./dist/config/FormatSettings.js";
import {
	setDefaultIconCollection,
	getDefaultIconCollection,
} from "./dist/config/Icons.js";
import { RegisteredIconCollection } from "./dist/asset-registries/util/IconCollectionsByTheme.js";
import getEffectiveIconCollection from "./dist/asset-registries/util/getIconCollectionByTheme.js";
import {
	getLanguage,
	setLanguage,
	getDefaultLanguage,
	setFetchDefaultLanguage,
	getFetchDefaultLanguage,
} from "./dist/config/Language.js";
import { getNoConflict, setNoConflict } from "./dist/config/NoConflict.js";
import {
	getTheme,
	setTheme,
	getDefaultTheme,
} from "./dist/config/Theme.js";

// decorators/
import customElement from "./dist/decorators/customElement.js";
import event from "./dist/decorators/event.js";
import property from "./dist/decorators/property.js";
import slot from "./dist/decorators/slot.js";

// delegate/
import ItemNavigation from "./dist/delegate/ItemNavigation.js";
import ResizeHandler from "./dist/delegate/ResizeHandler.js";
import ScrollEnablement from "./dist/delegate/ScrollEnablement.js";

// locale/
import applyDirection from "./dist/locale/applyDirection.js";
import { attachDirectionChange, detachDirectionChange } from "./dist/locale/directionChange.js";
import getEffectiveDir from "./dist/locale/getEffectiveDir.js";
import { attachLanguageChange, detachLanguageChange } from "./dist/locale/languageChange.js";

// util/
import { URLListValidator, sanitizeHTML } from "./dist/util/HTMLSanitizer.js";

// Assets.ts
import { registerI18nLoader } from "./dist/asset-registries/i18n.js";
import { registerLocaleDataLoader } from "./dist/asset-registries/LocaleData.js";
import { registerThemePropertiesLoader } from "./dist/asset-registries/Themes.js";
import { registerIconLoader } from "./dist/asset-registries/Icons.js";

// Boot.ts
import { attachBoot } from "./dist/Boot.js";

// CSP.ts
import {
	setPackageCSSRoot,
	setUseLinks,
	setPreloadLinks,
} from "./dist/CSP.js";

// CustomElementsScope.ts
import {
	setCustomElementsScopingSuffix,
	getCustomElementsScopingSuffix,
	setCustomElementsScopingRules,
	getCustomElementsScopingRules,
	getEffectiveScopingSuffixForTag,
} from "./dist/CustomElementsScope.js";

// Device.ts
import {
	supportsTouch,
	isIE,
	isSafari,
	isChrome,
	isFirefox,
	isPhone,
	isTablet,
	isDesktop,
	isCombi,
	isIOS,
	isAndroid,
} from "./dist/Device.js";

// EventProvider.ts
import EventProvider from "./dist/EventProvider.js";

// i18nBundle.ts
import I18nBundle, { getI18nBundle, registerCustomI18nBundleGetter } from "./dist/i18nBundle.js";

// MediaRange.ts
import MediaRange from "./dist/MediaRange.js";

// PropertiesFileFormat.ts
import parseProperties from "./dist/PropertiesFileFormat.js";

// Render.ts
import {
	renderDeferred,
	renderImmediately,
	cancelRender,
	renderFinished,
} from "./dist/Render.js";

// Theming.ts
import { addCustomCSS, attachThemeLoaded, detachThemeLoaded } from "./dist/Theming.js";

// UI5Element.ts
import UI5Element from "./dist/UI5Element.js";

export default UI5Element;
export {
	// animations/
	scroll,
	slideDown,
	slideUp,

	// config/
	getAnimationMode,
	setAnimationMode,
	getCalendarType,
	getFirstDayOfWeek,
	getLegacyDateCalendarCustomizing,
	setDefaultIconCollection,
	getDefaultIconCollection,
	getEffectiveIconCollection,
	RegisteredIconCollection,
	getLanguage,
	setLanguage,
	getDefaultLanguage,
	setFetchDefaultLanguage,
	getFetchDefaultLanguage,
	getNoConflict,
	setNoConflict,
	getTheme,
	setTheme,
	getDefaultTheme,

	// decorators/
	customElement,
	event,
	property,
	slot,

	// delegate/
	ItemNavigation,
	ResizeHandler,
	ScrollEnablement,

	// locale/
	applyDirection,
	attachDirectionChange,
	detachDirectionChange,
	getEffectiveDir,
	attachLanguageChange,
	detachLanguageChange,

	// util/
	URLListValidator,
	sanitizeHTML,

	// Assets.ts
	registerI18nLoader,
	registerLocaleDataLoader,
	registerThemePropertiesLoader,
	registerIconLoader,

	// Boot.ts
	attachBoot,

	// CSP.ts
	setPackageCSSRoot,
	setUseLinks,
	setPreloadLinks,

	// CustomElementsScope.ts
	setCustomElementsScopingSuffix,
	getCustomElementsScopingSuffix,
	setCustomElementsScopingRules,
	getCustomElementsScopingRules,
	getEffectiveScopingSuffixForTag,

	// Device.ts
	supportsTouch,
	isIE,
	isSafari,
	isChrome,
	isFirefox,
	isPhone,
	isTablet,
	isDesktop,
	isCombi,
	isIOS,
	isAndroid,

	// EventProvider.ts
	EventProvider,

	// i18nBundle.ts
	I18nBundle,
	getI18nBundle,
	registerCustomI18nBundleGetter,

	// MediaRange.ts
	MediaRange,

	// PropertiesFileFormat.ts
	parseProperties,

	// Render.ts
	renderDeferred,
	renderImmediately,
	cancelRender,
	renderFinished,

	// Theming.ts
	addCustomCSS,
	attachThemeLoaded,
	detachThemeLoaded,

	// UI5Element.ts
	UI5Element,
};
