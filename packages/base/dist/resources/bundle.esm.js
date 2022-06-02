const assetParameters = {"themes":{"default":"sap_horizon","all":["sap_fiori_3","sap_fiori_3_dark","sap_belize","sap_belize_hcb","sap_belize_hcw","sap_fiori_3_hcb","sap_fiori_3_hcw","sap_horizon","sap_horizon_dark","sap_horizon_hcb","sap_horizon_hcw","sap_horizon_exp"]},"languages":{"default":"en","all":["ar","bg","ca","cs","cy","da","de","el","en","en_GB","en_US_sappsd","en_US_saprigi","en_US_saptrc","es","es_MX","et","fi","fr","fr_CA","hi","hr","hu","in","it","iw","ja","kk","ko","lt","lv","ms","nl","no","pl","pt_PT","pt","ro","ru","sh","sk","sl","sv","th","tr","uk","vi","zh_CN","zh_TW"]},"locales":{"default":"en","all":["ar","ar_EG","ar_SA","bg","ca","cs","da","de","de_AT","de_CH","el","el_CY","en","en_AU","en_GB","en_HK","en_IE","en_IN","en_NZ","en_PG","en_SG","en_ZA","es","es_AR","es_BO","es_CL","es_CO","es_MX","es_PE","es_UY","es_VE","et","fa","fi","fr","fr_BE","fr_CA","fr_CH","fr_LU","he","hi","hr","hu","id","it","it_CH","ja","kk","ko","lt","lv","ms","nb","nl","nl_BE","pl","pt","pt_PT","ro","ru","ru_UA","sk","sl","sr","sr_Latn","sv","th","tr","uk","vi","zh_CN","zh_HK","zh_SG","zh_TW"]}};

const DEFAULT_THEME = assetParameters.themes.default;
const DEFAULT_LANGUAGE = assetParameters.languages.default;
const DEFAULT_LOCALE = assetParameters.locales.default;
const SUPPORTED_LOCALES = assetParameters.locales.all;

var detectNavigatorLanguage = () => {
	const browserLanguages = navigator.languages;

	const navigatorLanguage = () => {
		return navigator.language;
	};

	const rawLocale = (browserLanguages && browserLanguages[0]) || navigatorLanguage() || navigator.userLanguage || navigator.browserLanguage;

	return rawLocale || DEFAULT_LANGUAGE;
};

var class2type = {};
var hasOwn = class2type.hasOwnProperty;
var toString = class2type.toString;
var fnToString = hasOwn.toString;
var ObjectFunctionString = fnToString.call(Object);
var fnIsPlainObject = function (obj) {
  var proto, Ctor;
  if (!obj || toString.call(obj) !== "[object Object]") {
    return false;
  }
  proto = Object.getPrototypeOf(obj);
  if (!proto) {
    return true;
  }
  Ctor = hasOwn.call(proto, "constructor") && proto.constructor;
  return typeof Ctor === "function" && fnToString.call(Ctor) === ObjectFunctionString;
};

var oToken = Object.create(null);
var fnMerge$1 = function () {
    var src, copyIsArray, copy, name, options, clone, target = arguments[2] || {}, i = 3, length = arguments.length, deep = arguments[0] || false, skipToken = arguments[1] ? undefined : oToken;
    if (typeof target !== 'object' && typeof target !== 'function') {
        target = {};
    }
    for (; i < length; i++) {
        if ((options = arguments[i]) != null) {
            for (name in options) {
                src = target[name];
                copy = options[name];
                if (name === '__proto__' || target === copy) {
                    continue;
                }
                if (deep && copy && (fnIsPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {
                    if (copyIsArray) {
                        copyIsArray = false;
                        clone = src && Array.isArray(src) ? src : [];
                    } else {
                        clone = src && fnIsPlainObject(src) ? src : {};
                    }
                    target[name] = fnMerge$1(deep, arguments[1], clone, copy);
                } else if (copy !== skipToken) {
                    target[name] = copy;
                }
            }
        }
    }
    return target;
};

var fnMerge = function () {
    var args = [
        true,
        false
    ];
    args.push.apply(args, arguments);
    return fnMerge$1.apply(null, args);
};

const features = new Map();

const registerFeature = (name, feature) => {
	features.set(name, feature);
};

const getFeature = name => {
	return features.get(name);
};

let initialized = false;

let initialConfig = {
	animationMode: "full",
	theme: DEFAULT_THEME,
	rtl: null,
	language: null,
	calendarType: null,
	noConflict: false, // no URL
	formatSettings: {},
	fetchDefaultLanguage: false,
};

/* General settings */
const getAnimationMode$1 = () => {
	initConfiguration();
	return initialConfig.animationMode;
};

const getTheme$1 = () => {
	initConfiguration();
	return initialConfig.theme;
};

const getRTL$1 = () => {
	initConfiguration();
	return initialConfig.rtl;
};

const getLanguage$1 = () => {
	initConfiguration();
	return initialConfig.language;
};

/**
 * Returns if the default language, that is inlined at build time,
 * should be fetched over the network instead.
 * @returns {Boolean}
 */
const getFetchDefaultLanguage$1 = () => {
	initConfiguration();
	return initialConfig.fetchDefaultLanguage;
};

const getNoConflict$1 = () => {
	initConfiguration();
	return initialConfig.noConflict;
};

const getCalendarType$1 = () => {
	initConfiguration();
	return initialConfig.calendarType;
};

const getFormatSettings = () => {
	initConfiguration();
	return initialConfig.formatSettings;
};

const booleanMapping = new Map();
booleanMapping.set("true", true);
booleanMapping.set("false", false);

const parseConfigurationScript = () => {
	const configScript = document.querySelector("[data-ui5-config]") || document.querySelector("[data-id='sap-ui-config']"); // for backward compatibility

	let configJSON;

	if (configScript) {
		try {
			configJSON = JSON.parse(configScript.innerHTML);
		} catch (err) {
			console.warn("Incorrect data-sap-ui-config format. Please use JSON"); /* eslint-disable-line */
		}

		if (configJSON) {
			initialConfig = fnMerge(initialConfig, configJSON);
		}
	}
};

const parseURLParameters = () => {
	const params = new URLSearchParams(window.location.search);

	// Process "sap-*" params first
	params.forEach((value, key) => {
		const parts = key.split("sap-").length;
		if (parts === 0 || parts === key.split("sap-ui-").length) {
			return;
		}

		applyURLParam(key, value, "sap");
	});

	// Process "sap-ui-*" params
	params.forEach((value, key) => {
		if (!key.startsWith("sap-ui")) {
			return;
		}

		applyURLParam(key, value, "sap-ui");
	});
};

const normalizeParamValue = (param, value) => {
	if (param === "theme" && value.includes("@")) { // the theme parameter might have @<URL-TO-THEME> in the value - strip this
		return value.split("@")[0];
	}

	return value;
};

const applyURLParam = (key, value, paramType) => {
	const lowerCaseValue = value.toLowerCase();
	const param = key.split(`${paramType}-`)[1];

	if (booleanMapping.has(value)) {
		value = booleanMapping.get(lowerCaseValue);
	}

	value = normalizeParamValue(param, value);

	initialConfig[param] = value;
};

const applyOpenUI5Configuration = () => {
	const OpenUI5Support = getFeature("OpenUI5Support");
	if (!OpenUI5Support || !OpenUI5Support.isLoaded()) {
		return;
	}

	const OpenUI5Config = OpenUI5Support.getConfigurationSettingsObject();
	initialConfig = fnMerge(initialConfig, OpenUI5Config);
};

const initConfiguration = () => {
	if (initialized) {
		return;
	}

	// 1. Lowest priority - configuration script
	parseConfigurationScript();

	// 2. URL parameters overwrite configuration script parameters
	parseURLParameters();

	// 3. If OpenUI5 is detected, it has the highest priority
	applyOpenUI5Configuration();

	initialized = true;
};

class EventProvider {
	constructor() {
		this._eventRegistry = new Map();
	}

	attachEvent(eventName, fnFunction) {
		const eventRegistry = this._eventRegistry;
		const eventListeners = eventRegistry.get(eventName);

		if (!Array.isArray(eventListeners)) {
			eventRegistry.set(eventName, [fnFunction]);
			return;
		}

		if (!eventListeners.includes(fnFunction)) {
			eventListeners.push(fnFunction);
		}
	}

	detachEvent(eventName, fnFunction) {
		const eventRegistry = this._eventRegistry;
		const eventListeners = eventRegistry.get(eventName);

		if (!eventListeners) {
			return;
		}
		const indexOfFnToDetach = eventListeners.indexOf(fnFunction);

		if (indexOfFnToDetach !== -1) {
			eventListeners.splice(indexOfFnToDetach, 1);
		}

		if (eventListeners.length === 0) {
			eventRegistry.delete(eventName);
		}
	}

	/**
	 * Fires an event and returns the results of all event listeners as an array.
	 *
	 * @param eventName the event to fire
	 * @param data optional data to pass to each event listener
	 * @returns {Array} an array with the results of all event listeners
	 */
	fireEvent(eventName, data) {
		const eventRegistry = this._eventRegistry;
		const eventListeners = eventRegistry.get(eventName);

		if (!eventListeners) {
			return [];
		}

		return eventListeners.map(fn => {
			return fn.call(this, data); // eslint-disable-line
		});
	}

	/**
	 * Fires an event and returns a promise that will resolve once all listeners have resolved.
	 *
	 * @param eventName the event to fire
	 * @param data optional data to pass to each event listener
	 * @returns {Promise} a promise that will resolve when all listeners have resolved
	 */
	fireEventAsync(eventName, data) {
		return Promise.all(this.fireEvent(eventName, data));
	}

	isHandlerAttached(eventName, fnFunction) {
		const eventRegistry = this._eventRegistry;
		const eventListeners = eventRegistry.get(eventName);

		if (!eventListeners) {
			return false;
		}

		return eventListeners.includes(fnFunction);
	}

	hasListeners(eventName) {
		return !!this._eventRegistry.get(eventName);
	}
}

const eventProvider$4 = new EventProvider();
const LANG_CHANGE = "languageChange";

const attachLanguageChange = listener => {
	eventProvider$4.attachEvent(LANG_CHANGE, listener);
};

const MAX_PROCESS_COUNT = 10;

class RenderQueue {
	constructor() {
		this.list = []; // Used to store the web components in order
		this.lookup = new Set(); // Used for faster search
	}

	add(webComponent) {
		if (this.lookup.has(webComponent)) {
			return;
		}

		this.list.push(webComponent);
		this.lookup.add(webComponent);
	}

	remove(webComponent) {
		if (!this.lookup.has(webComponent)) {
			return;
		}

		this.list = this.list.filter(item => item !== webComponent);
		this.lookup.delete(webComponent);
	}

	shift() {
		const webComponent = this.list.shift();
		if (webComponent) {
			this.lookup.delete(webComponent);
			return webComponent;
		}
	}

	isEmpty() {
		return this.list.length === 0;
	}

	isAdded(webComponent) {
		return this.lookup.has(webComponent);
	}

	/**
	 * Processes the whole queue by executing the callback on each component,
	 * while also imposing restrictions on how many times a component may be processed.
	 *
	 * @param callback - function with one argument (the web component to be processed)
	 */
	process(callback) {
		let webComponent;
		const stats = new Map();

		webComponent = this.shift();
		while (webComponent) {
			const timesProcessed = stats.get(webComponent) || 0;
			if (timesProcessed > MAX_PROCESS_COUNT) {
				throw new Error(`Web component processed too many times this task, max allowed is: ${MAX_PROCESS_COUNT}`);
			}
			callback(webComponent);
			stats.set(webComponent, timesProcessed + 1);
			webComponent = this.shift();
		}
	}
}

// This is needed as IE11 doesn't have Set.prototype.keys/values/entries, so [...mySet.values()] is not an option
const setToArray = s => {
	const arr = [];
	s.forEach(item => {
		arr.push(item);
	});
	return arr;
};

const getSingletonElementInstance = (tag, parentElement = document.body) => {
	let el = document.querySelector(tag);

	if (el) {
		return el;
	}

	el = document.createElement(tag);

	return parentElement.insertBefore(el, parentElement.firstChild);
};

const getSharedResourcesInstance = () => getSingletonElementInstance("ui5-shared-resources", document.head);

/**
 * Use this method to initialize/get resources that you would like to be shared among UI5 Web Components runtime instances.
 * The data will be accessed via a singleton "ui5-shared-resources" HTML element in the "head" element of the page.
 *
 * @public
 * @param namespace Unique ID of the resource, may contain "." to denote hierarchy
 * @param initialValue Object or primitive that will be used as an initial value if the resource does not exist
 * @returns {*}
 */
const getSharedResource = (namespace, initialValue) => {
	const parts = namespace.split(".");
	let current = getSharedResourcesInstance();

	for (let i = 0; i < parts.length; i++) {
		const part = parts[i];
		const lastPart = i === parts.length - 1;
		if (!Object.prototype.hasOwnProperty.call(current, part)) {
			current[part] = lastPart ? initialValue : {};
		}
		current = current[part];
	}

	return current;
};

const VersionInfo = {
	version: "1.4.0",
	major: 1,
	minor: 4,
	patch: 0,
	suffix: "",
	isNext: false,
	buildTime: 1654105466,
};

let currentRuntimeIndex;
let currentRuntimeAlias = "";

const compareCache = new Map();

/**
 * Central registry where all runtimes register themselves by pushing an object.
 * The index in the registry servers as an ID for the runtime.
 * @type {*}
 */
const Runtimes = getSharedResource("Runtimes", []);

/**
 * Registers the current runtime in the shared runtimes resource registry
 */
const registerCurrentRuntime = () => {
	if (currentRuntimeIndex === undefined) {
		currentRuntimeIndex = Runtimes.length;
		Runtimes.push({
			...VersionInfo,
			alias: currentRuntimeAlias,
			description: `Runtime ${currentRuntimeIndex} - ver ${VersionInfo.version}${""}`,
		});
	}
};

/**
 * Returns the index of the current runtime's object in the shared runtimes resource registry
 * @returns {*}
 */
const getCurrentRuntimeIndex = () => {
	return currentRuntimeIndex;
};

/**
 * Compares two runtimes and returns 1 if the first is of a bigger version, -1 if the second is of a bigger version, and 0 if equal
 * @param index1 The index of the first runtime to compare
 * @param index2 The index of the second runtime to compare
 * @returns {number}
 */
const compareRuntimes = (index1, index2) => {
	const cacheIndex = `${index1},${index2}`;
	if (compareCache.has(cacheIndex)) {
		return compareCache.get(cacheIndex);
	}

	const runtime1 = Runtimes[index1];
	const runtime2 = Runtimes[index2];

	if (!runtime1 || !runtime2) {
		throw new Error("Invalid runtime index supplied");
	}

	// If any of the two is a next version, bigger buildTime wins
	if (runtime1.isNext || runtime2.isNext) {
		return runtime1.buildTime - runtime2.buildTime;
	}

	// If major versions differ, bigger one wins
	const majorDiff = runtime1.major - runtime2.major;
	if (majorDiff) {
		return majorDiff;
	}

	// If minor versions differ, bigger one wins
	const minorDiff = runtime1.minor - runtime2.minor;
	if (minorDiff) {
		return minorDiff;
	}

	// If patch versions differ, bigger one wins
	const patchDiff = runtime1.patch - runtime2.patch;
	if (patchDiff) {
		return patchDiff;
	}

	// Bigger suffix wins, f.e. rc10 > rc9
	// Important: suffix is alphanumeric, must use natural compare
	const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: "base" });
	const result = collator.compare(runtime1.suffix, runtime2.suffix);

	compareCache.set(cacheIndex, result);
	return result;
};

const getAllRuntimes = () => {
	return Runtimes;
};

const Tags = getSharedResource("Tags", new Map());

const Definitions = new Set();
let Failures = {};
let failureTimeout;

const UNKNOWN_RUNTIME = "unknown";

const registerTag = tag => {
	Definitions.add(tag);
	Tags.set(tag, getCurrentRuntimeIndex());
};

const isTagRegistered = tag => {
	return Definitions.has(tag);
};

const getAllRegisteredTags = () => {
	return setToArray(Definitions);
};

const recordTagRegistrationFailure = tag => {
	let tagRegRuntimeIndex = Tags.get(tag);
	if (tagRegRuntimeIndex === undefined) {
		tagRegRuntimeIndex = UNKNOWN_RUNTIME; // If the tag is taken, but not registered in Tags, then a version before 1.1.0 defined it => use the "unknown" key
	}
	Failures[tagRegRuntimeIndex] = Failures[tagRegRuntimeIndex] || new Set();
	Failures[tagRegRuntimeIndex].add(tag);

	if (!failureTimeout) {
		failureTimeout = setTimeout(() => {
			displayFailedRegistrations();
			Failures = {};
			failureTimeout = undefined;
		}, 1000);
	}
};

const displayFailedRegistrations = () => {
	const allRuntimes = getAllRuntimes();
	const currentRuntimeIndex = getCurrentRuntimeIndex();
	const currentRuntime = allRuntimes[currentRuntimeIndex];

	let message = `Multiple UI5 Web Components instances detected.`;

	if (allRuntimes.length > 1) {
		message = `${message}\nLoading order (versions before 1.1.0 not listed): ${allRuntimes.map(runtime => `\n${runtime.description}`).join("")}`;
	}

	Object.keys(Failures).forEach(otherRuntimeIndex => {
		let comparison;
		let otherRuntime;

		if (otherRuntimeIndex === UNKNOWN_RUNTIME) { // version < 1.1.0 defined the tag
			comparison = 1; // the current runtime is considered newer
			otherRuntime = {
				description: `Older unknown runtime`,
			};
		} else {
			comparison = compareRuntimes(currentRuntimeIndex, otherRuntimeIndex);
			otherRuntime = allRuntimes[otherRuntimeIndex];
		}

		let compareWord;
		if (comparison > 0) {
			compareWord = "an older";
		} else if (comparison < 0) {
			compareWord = "a newer";
		} else {
			compareWord = "the same";
		}
		message = `${message}\n\n"${currentRuntime.description}" failed to define ${Failures[otherRuntimeIndex].size} tag(s) as they were defined by a runtime of ${compareWord} version "${otherRuntime.description}": ${setToArray(Failures[otherRuntimeIndex]).sort().join(", ")}.`;

		if (comparison > 0) {
			message = `${message}\nWARNING! If your code uses features of the above web components, unavailable in ${otherRuntime.description}, it might not work as expected!`;
		} else {
			message = `${message}\nSince the above web components were defined by the same or newer version runtime, they should be compatible with your code.`;
		}
	});

	message = `${message}\n\nTo prevent other runtimes from defining tags that you use, consider using scoping or have third-party libraries use scoping: https://github.com/SAP/ui5-webcomponents/blob/master/docs/2-advanced/03-scoping.md.`;

	console.warn(message); // eslint-disable-line
};

const rtlAwareSet = new Set();

const markAsRtlAware = klass => {
	rtlAwareSet.add(klass);
};

const isRtlAware = klass => {
	return rtlAwareSet.has(klass);
};

const registeredElements = new Set();
const eventProvider$3 = new EventProvider();

const invalidatedWebComponents = new RenderQueue(); // Queue for invalidated web components

let renderTaskPromise,
	renderTaskPromiseResolve;

let mutationObserverTimer;

let queuePromise;

/**
 * Schedules a render task (if not already scheduled) to render the component
 *
 * @param webComponent
 * @returns {Promise}
 */
const renderDeferred = async webComponent => {
	// Enqueue the web component
	invalidatedWebComponents.add(webComponent);

	// Schedule a rendering task
	await scheduleRenderTask();
};

/**
 * Renders a component synchronously and adds it to the registry of rendered components
 *
 * @param webComponent
 */
const renderImmediately = webComponent => {
	eventProvider$3.fireEvent("beforeComponentRender", webComponent);
	registeredElements.add(webComponent);
	webComponent._render();
};

/**
 * Cancels the rendering of a component, if awaiting to be rendered, and removes it from the registry of rendered components
 *
 * @param webComponent
 */
const cancelRender = webComponent => {
	invalidatedWebComponents.remove(webComponent);
	registeredElements.delete(webComponent);
};

/**
 * Schedules a rendering task, if not scheduled already
 */
const scheduleRenderTask = async () => {
	if (!queuePromise) {
		queuePromise = new Promise(resolve => {
			window.requestAnimationFrame(() => {
				// Render all components in the queue

				// console.log(`--------------------RENDER TASK START------------------------------`); // eslint-disable-line
				invalidatedWebComponents.process(renderImmediately);
				// console.log(`--------------------RENDER TASK END------------------------------`); // eslint-disable-line

				// Resolve the promise so that callers of renderDeferred can continue
				queuePromise = null;
				resolve();

				// Wait for Mutation observer before the render task is considered finished
				if (!mutationObserverTimer) {
					mutationObserverTimer = setTimeout(() => {
						mutationObserverTimer = undefined;
						if (invalidatedWebComponents.isEmpty()) {
							_resolveTaskPromise();
						}
					}, 200);
				}
			});
		});
	}

	await queuePromise;
};

/**
 * return a promise that will be resolved once all invalidated web components are rendered
 */
const whenDOMUpdated = () => {
	if (renderTaskPromise) {
		return renderTaskPromise;
	}

	renderTaskPromise = new Promise(resolve => {
		renderTaskPromiseResolve = resolve;
		window.requestAnimationFrame(() => {
			if (invalidatedWebComponents.isEmpty()) {
				renderTaskPromise = undefined;
				resolve();
			}
		});
	});

	return renderTaskPromise;
};

const whenAllCustomElementsAreDefined = () => {
	const definedPromises = getAllRegisteredTags().map(tag => customElements.whenDefined(tag));
	return Promise.all(definedPromises);
};

const renderFinished = async () => {
	await whenAllCustomElementsAreDefined();
	await whenDOMUpdated();
};

const _resolveTaskPromise = () => {
	if (!invalidatedWebComponents.isEmpty()) {
		// More updates are pending. Resolve will be called again
		return;
	}

	if (renderTaskPromiseResolve) {
		renderTaskPromiseResolve();
		renderTaskPromiseResolve = undefined;
		renderTaskPromise = undefined;
	}
};

/**
 * Re-renders all UI5 Elements on the page, with the option to specify filters to rerender only some components.
 *
 * Usage:
 * reRenderAllUI5Elements() -> re-renders all components
 * reRenderAllUI5Elements({tag: "ui5-button"}) -> re-renders only instances of ui5-button
 * reRenderAllUI5Elements({rtlAware: true}) -> re-renders only rtlAware components
 * reRenderAllUI5Elements({languageAware: true}) -> re-renders only languageAware components
 * reRenderAllUI5Elements({themeAware: true}) -> re-renders only themeAware components
 * reRenderAllUI5Elements({rtlAware: true, languageAware: true}) -> re-renders components that are rtlAware or languageAware
 * etc...
 *
 * @public
 * @param {Object|undefined} filters - Object with keys that can be "rtlAware" or "languageAware"
 * @returns {Promise<void>}
 */
const reRenderAllUI5Elements = async filters => {
	registeredElements.forEach(element => {
		const tag = element.constructor.getMetadata().getTag();
		const rtlAware = isRtlAware(element.constructor);
		const languageAware = element.constructor.getMetadata().isLanguageAware();
		const themeAware = element.constructor.getMetadata().isThemeAware();
		if (!filters || (filters.tag === tag) || (filters.rtlAware && rtlAware) || (filters.languageAware && languageAware) || (filters.themeAware && themeAware)) {
			renderDeferred(element);
		}
	});
	await renderFinished();
};

let language;
let fetchDefaultLanguage;

/**
 * Returns the currently configured language, or the browser language as a fallback
 * @returns {String}
 */
const getLanguage = () => {
	if (language === undefined) {
		language = getLanguage$1();
	}
	return language;
};

/**
 * Defines if the default language, that is inlined, should be
 * fetched over the network instead of using the inlined one.
 * <b>Note:</b> By default the language will not be fetched.
 *
 * @param {Boolean} fetchDefaultLanguage
 */
const setFetchDefaultLanguage = fetchDefaultLang => {
	fetchDefaultLanguage = fetchDefaultLang;
};

/**
 * Returns if the default language, that is inlined, should be fetched over the network.
 * @returns {Boolean}
 */
const getFetchDefaultLanguage = () => {
	if (fetchDefaultLanguage === undefined) {
		setFetchDefaultLanguage(getFetchDefaultLanguage$1());
	}

	return fetchDefaultLanguage;
};

const rLocale = /^((?:[A-Z]{2,3}(?:-[A-Z]{3}){0,3})|[A-Z]{4}|[A-Z]{5,8})(?:-([A-Z]{4}))?(?:-([A-Z]{2}|[0-9]{3}))?((?:-[0-9A-Z]{5,8}|-[0-9][0-9A-Z]{3})*)((?:-[0-9A-WYZ](?:-[0-9A-Z]{2,8})+)*)(?:-(X(?:-[0-9A-Z]{1,8})+))?$/i;

class Locale {
	constructor(sLocaleId) {
		const aResult = rLocale.exec(sLocaleId.replace(/_/g, "-"));
		if (aResult === null) {
			throw new Error(`The given language ${sLocaleId} does not adhere to BCP-47.`);
		}
		this.sLocaleId = sLocaleId;
		this.sLanguage = aResult[1] || null;
		this.sScript = aResult[2] || null;
		this.sRegion = aResult[3] || null;
		this.sVariant = (aResult[4] && aResult[4].slice(1)) || null;
		this.sExtension = (aResult[5] && aResult[5].slice(1)) || null;
		this.sPrivateUse = aResult[6] || null;
		if (this.sLanguage) {
			this.sLanguage = this.sLanguage.toLowerCase();
		}
		if (this.sScript) {
			this.sScript = this.sScript.toLowerCase().replace(/^[a-z]/, s => {
				return s.toUpperCase();
			});
		}
		if (this.sRegion) {
			this.sRegion = this.sRegion.toUpperCase();
		}
	}

	getLanguage() {
		return this.sLanguage;
	}

	getScript() {
		return this.sScript;
	}

	getRegion() {
		return this.sRegion;
	}

	getVariant() {
		return this.sVariant;
	}

	getVariantSubtags() {
		return this.sVariant ? this.sVariant.split("-") : [];
	}

	getExtension() {
		return this.sExtension;
	}

	getExtensionSubtags() {
		return this.sExtension ? this.sExtension.slice(2).split("-") : [];
	}

	getPrivateUse() {
		return this.sPrivateUse;
	}

	getPrivateUseSubtags() {
		return this.sPrivateUse ? this.sPrivateUse.slice(2).split("-") : [];
	}

	hasPrivateUseSubtag(sSubtag) {
		return this.getPrivateUseSubtags().indexOf(sSubtag) >= 0;
	}

	toString() {
		const r = [this.sLanguage];

		if (this.sScript) {
			r.push(this.sScript);
		}
		if (this.sRegion) {
			r.push(this.sRegion);
		}
		if (this.sVariant) {
			r.push(this.sVariant);
		}
		if (this.sExtension) {
			r.push(this.sExtension);
		}
		if (this.sPrivateUse) {
			r.push(this.sPrivateUse);
		}
		return r.join("-");
	}
}

const cache = new Map();

const getLocaleInstance = lang => {
	if (!cache.has(lang)) {
		cache.set(lang, new Locale(lang));
	}

	return cache.get(lang);
};

const convertToLocaleOrNull = lang => {
	try {
		if (lang && typeof lang === "string") {
			return getLocaleInstance(lang);
		}
	} catch (e) {
		// ignore
	}
};

/**
 * Returns the locale based on the parameter or configured language Configuration#getLanguage
 * If no language has been configured - a new locale based on browser language is returned
 */
const getLocale = lang => {
	if (lang) {
		return convertToLocaleOrNull(lang);
	}

	if (getLanguage()) {
		return getLocaleInstance(getLanguage());
	}

	return convertToLocaleOrNull(detectNavigatorLanguage());
};

const localeRegEX = /^((?:[A-Z]{2,3}(?:-[A-Z]{3}){0,3})|[A-Z]{4}|[A-Z]{5,8})(?:-([A-Z]{4}))?(?:-([A-Z]{2}|[0-9]{3}))?((?:-[0-9A-Z]{5,8}|-[0-9][0-9A-Z]{3})*)((?:-[0-9A-WYZ](?:-[0-9A-Z]{2,8})+)*)(?:-(X(?:-[0-9A-Z]{1,8})+))?$/i;
const SAPSupportabilityLocales = /(?:^|-)(saptrc|sappsd)(?:-|$)/i;

/* Map for old language names for a few ISO639 codes. */
const M_ISO639_NEW_TO_OLD = {
	"he": "iw",
	"yi": "ji",
	"id": "in",
	"sr": "sh",
};

/**
 * Normalizes the given locale in BCP-47 syntax.
 * @param {string} locale locale to normalize
 * @returns {string} Normalized locale, "undefined" if the locale can't be normalized or the default locale, if no locale provided.
 */
const normalizeLocale = locale => {
	let m;

	if (!locale) {
		return DEFAULT_LOCALE;
	}

	if (typeof locale === "string" && (m = localeRegEX.exec(locale.replace(/_/g, "-")))) {/* eslint-disable-line */
		let language = m[1].toLowerCase();
		let region = m[3] ? m[3].toUpperCase() : undefined;
		const script = m[2] ? m[2].toLowerCase() : undefined;
		const variants = m[4] ? m[4].slice(1) : undefined;
		const isPrivate = m[6];

		language = M_ISO639_NEW_TO_OLD[language] || language;

		// recognize and convert special SAP supportability locales (overwrites m[]!)
		if ((isPrivate && (m = SAPSupportabilityLocales.exec(isPrivate))) /* eslint-disable-line */ ||
			(variants && (m = SAPSupportabilityLocales.exec(variants)))) {/* eslint-disable-line */
			return `en_US_${m[1].toLowerCase()}`; // for now enforce en_US (agreed with SAP SLS)
		}

		// Chinese: when no region but a script is specified, use default region for each script
		if (language === "zh" && !region) {
			if (script === "hans") {
				region = "CN";
			} else if (script === "hant") {
				region = "TW";
			}
		}

		return language + (region ? "_" + region + (variants ? "_" + variants.replace("-", "_") : "") : ""); /* eslint-disable-line */
	}
};

/**
 * Calculates the next fallback locale for the given locale.
 *
 * @param {string} locale Locale string in Java format (underscores) or null
 * @returns {string} Next fallback Locale or "en" if no fallbacks found.
 */
const nextFallbackLocale = locale => {
	if (!locale) {
		return DEFAULT_LOCALE;
	}

	if (locale === "zh_HK") {
		return "zh_TW";
	}

	// if there are multiple segments (separated by underscores), remove the last one
	const p = locale.lastIndexOf("_");
	if (p >= 0) {
		return locale.slice(0, p);
	}

	// for any language but the default, fallback to the default first before falling back to the 'raw' language (empty string)
	return locale !== DEFAULT_LOCALE ? DEFAULT_LOCALE : "";
};

// contains package names for which the warning has been shown
const warningShown$1 = new Set();
const reportedErrors$1 = new Set();

const bundleData = new Map();
const bundlePromises = new Map();
const loaders$3 = new Map();

/**
 *
 * @param {string} packageName for which package this loader can fetch data
 * @param {function} loader async function that will be passed a localeId and should return a JSON object
 * @param {Array} localeIds Array of locale IDs that this loader can handle
 */
const registerI18nLoader = (packageName, localeId, loader) => {
	// register loader by key
	const bundleKey = `${packageName}/${localeId}`;
	loaders$3.set(bundleKey, loader);
};

const _setI18nBundleData = (packageName, data) => {
	bundleData.set(packageName, data);
};

const getI18nBundleData = packageName => {
	return bundleData.get(packageName);
};

const _hasLoader = (packageName, localeId) => {
	const bundleKey = `${packageName}/${localeId}`;
	return loaders$3.has(bundleKey);
};

// load bundle over the network once
const _loadMessageBundleOnce = (packageName, localeId) => {
	const bundleKey = `${packageName}/${localeId}`;
	const loadMessageBundle = loaders$3.get(bundleKey);

	if (!bundlePromises.get(bundleKey)) {
		bundlePromises.set(bundleKey, loadMessageBundle(localeId));
	}

	return bundlePromises.get(bundleKey);
};

const _showAssetsWarningOnce$1 = packageName => {
	if (!warningShown$1.has(packageName)) {
		console.warn(`[${packageName}]: Message bundle assets are not configured. Falling back to English texts.`, /* eslint-disable-line */
		` Add \`import "${packageName}/dist/Assets.js"\` in your bundle and make sure your build tool supports dynamic imports and JSON imports. See section "Assets" in the documentation for more information.`); /* eslint-disable-line */
		warningShown$1.add(packageName);
	}
};

/**
 * This method preforms the asynchronous task of fetching the actual text resources. It will fetch
 * each text resource over the network once (even for multiple calls to the same method).
 * It should be fully finished before the i18nBundle class is created in the webcomponents.
 * This method uses the bundle URLs that are populated by the <code>registerI18nBundle</code> method.
 * To simplify the usage, the synchronization of both methods happens internally for the same <code>bundleId</code>
 * @param {packageName} packageName the NPM package name
 * @public
 */
const fetchI18nBundle = async packageName => {
	const language = getLocale().getLanguage();
	const region = getLocale().getRegion();
	let localeId = normalizeLocale(language + (region ? `-${region}` : ``));

	while (localeId !== DEFAULT_LANGUAGE && !_hasLoader(packageName, localeId)) {
		localeId = nextFallbackLocale(localeId);
	}

	// use default language unless configured to always fetch it from the network
	const fetchDefaultLanguage = getFetchDefaultLanguage();
	if (localeId === DEFAULT_LANGUAGE && !fetchDefaultLanguage) {
		_setI18nBundleData(packageName, null); // reset for the default language (if data was set for a previous language)
		return;
	}

	if (!_hasLoader(packageName, localeId)) {
		_showAssetsWarningOnce$1(packageName);
		return;
	}

	try {
		const data = await _loadMessageBundleOnce(packageName, localeId);
		_setI18nBundleData(packageName, data);
	} catch (e) {
		if (!reportedErrors$1.has(e.message)) {
			reportedErrors$1.add(e.message);
			console.error(e.message); /* eslint-disable-line */
		}
	}
};

// When the language changes dynamically (the user calls setLanguage), re-fetch all previously fetched bundles
attachLanguageChange(() => {
	const allPackages = [...bundleData.keys()];
	return Promise.all(allPackages.map(fetchI18nBundle));
});

const localeDataMap = new Map();
const loaders$2 = new Map();
const cldrPromises = new Map();
const reportedErrors = new Set();
let warningShown = false;

const M_ISO639_OLD_TO_NEW$1 = {
	"iw": "he",
	"ji": "yi",
	"in": "id",
};

const _showAssetsWarningOnce = localeId => {
	if (warningShown) {
		return;
	}

	{
		console.warn(`[LocaleData] Note: in dev mode, CLDR assets might be disabled for performance reasons. Try running "ENABLE_CLDR=1 yarn start" to test CLDR assets.`); /* eslint-disable-line */
	}

	warningShown = true;
};

const calcLocale = (language, region, script) => {
	// normalize language and handle special cases
	language = (language && M_ISO639_OLD_TO_NEW$1[language]) || language;
	// Special case 1: in an SAP context, the inclusive language code "no" always means Norwegian Bokmal ("nb")
	if (language === "no") {
		language = "nb";
	}
	// Special case 2: for Chinese, derive a default region from the script (this behavior is inherited from Java)
	if (language === "zh" && !region) {
		if (script === "Hans") {
			region = "CN";
		} else if (script === "Hant") {
			region = "TW";
		}
	}

	// Special case 3: for Serbian, there are cyrillic and latin scripts, "sh" and "sr-latn" map to "latin", "sr" maps to cyrillic.
	if (language === "sh" || (language === "sr" && script === "Latn")) {
		language = "sr";
		region = "Latn";
	}

	// try language + region
	let localeId = `${language}_${region}`;
	if (SUPPORTED_LOCALES.includes(localeId)) {
		if (loaders$2.has(localeId)) {
			// supported and has loader
			return localeId;
		}

		// supported, no loader - fallback to default and warn
		_showAssetsWarningOnce();
		return DEFAULT_LOCALE;
	}

	// not supported, try language only
	localeId = language;
	if (SUPPORTED_LOCALES.includes(localeId)) {
		if (loaders$2.has(localeId)) {
			// supported and has loader
			return localeId;
		}

		// supported, no loader - fallback to default and warn
		_showAssetsWarningOnce();
		return DEFAULT_LOCALE;
	}

	// not supported - fallback to default locale
	return DEFAULT_LOCALE;
};

// internal set data
const setLocaleData = (localeId, content) => {
	localeDataMap.set(localeId, content);
};

// load bundle over the network once
const _loadCldrOnce = localeId => {
	const loadCldr = loaders$2.get(localeId);

	if (!cldrPromises.get(localeId)) {
		cldrPromises.set(localeId, loadCldr(localeId));
	}

	return cldrPromises.get(localeId);
};

// external getAsync
const fetchCldr = async (language, region, script) => {
	const localeId = calcLocale(language, region, script);

	// reuse OpenUI5 CLDR if present
	const OpenUI5Support = getFeature("OpenUI5Support");
	if (OpenUI5Support) {
		const cldrContent = OpenUI5Support.getLocaleDataObject();
		if (cldrContent) {
			// only if openui5 actually returned valid content
			setLocaleData(localeId, cldrContent);
			return;
		}
	}

	// fetch it
	try {
		const cldrContent = await _loadCldrOnce(localeId);
		setLocaleData(localeId, cldrContent);
	} catch (e) {
		if (!reportedErrors.has(e.message)) {
			reportedErrors.add(e.message);
			console.error(e.message); /* eslint-disable-line */
		}
	}
};

const registerLocaleDataLoader = (localeId, loader) => {
	loaders$2.set(localeId, loader);
};

// register default loader for "en" from ui5 CDN (dev workflow without assets)
registerLocaleDataLoader("en", async runtimeLocaleId => {
	return (await fetch(`https://ui5.sap.com/1.60.2/resources/sap/ui/core/cldr/en.json`)).json();
});

// When the language changes dynamically (the user calls setLanguage),
// re-fetch the required CDRD data.
attachLanguageChange(() => {
	const locale = getLocale();
	return fetchCldr(locale.getLanguage(), locale.getRegion(), locale.getScript());
});

const themeStyles = new Map();
const loaders$1 = new Map();
const registeredPackages = new Set();
const registeredThemes = new Set();

const registerThemePropertiesLoader = (packageName, themeName, loader) => {
	loaders$1.set(`${packageName}/${themeName}`, loader);
	registeredPackages.add(packageName);
	registeredThemes.add(themeName);
};

const getThemeProperties = async (packageName, themeName) => {
	const style = themeStyles.get(`${packageName}_${themeName}`);
	if (style !== undefined) { // it's valid for style to be an empty string
		return style;
	}

	if (!registeredThemes.has(themeName)) {
		const regThemesStr = [...registeredThemes.values()].join(", ");
		console.warn(`You have requested a non-registered theme ${themeName} - falling back to ${DEFAULT_THEME}. Registered themes are: ${regThemesStr}`); /* eslint-disable-line */
		return _getThemeProperties(packageName, DEFAULT_THEME);
	}

	return _getThemeProperties(packageName, themeName);
};

const _getThemeProperties = async (packageName, themeName) => {
	const loader = loaders$1.get(`${packageName}/${themeName}`);
	if (!loader) {
		// no themes for package
		console.error(`Theme [${themeName}] not registered for package [${packageName}]`); /* eslint-disable-line */
		return;
	}
	let data;
	try {
		data = await loader(themeName);
	} catch (e) {
		console.error(packageName, e.message); /* eslint-disable-line */
		return;
	}
	const themeProps = data._ || data;

	themeStyles.set(`${packageName}_${themeName}`, themeProps);
	return themeProps;
};

const getRegisteredPackages = () => {
	return registeredPackages;
};

const isThemeRegistered = theme => {
	return registeredThemes.has(theme);
};

/**
 * Supported icon collection names and aliases.
 *
 * Users might specify a collection, using both the key and the value in the following key-value pairs,
 * e.g the following pairs are completely exchangeable:
 * "SAP-icons-TNT/actor" and "tnt/actor", "BusinessSuiteInAppSymbols/3d" and "business-suite/3d",
 * "SAP-icons-v5/accept" and "horizon/accept".
 *
 * Note: technically, in the code we maintain the collections under the "value" name - "tnt", "business-suite",
 * SAP-icons-v5" and "SAP-icons"(which does not have an alias).
 */
const IconCollectionsAlias = {
	"SAP-icons-TNT": "tnt",
	"BusinessSuiteInAppSymbols": "business-suite",
	"horizon": "SAP-icons-v5",
};

/**
 * Creates a <style> tag in the <head> tag
 * @param cssText - the CSS
 * @param attributes - optional attributes to add to the tag
 * @returns {HTMLElement}
 */
const createStyleInHead = (cssText, attributes = {}) => {
	const style = document.createElement("style");
	style.type = "text/css";

	Object.entries(attributes).forEach(pair => style.setAttribute(...pair));

	style.textContent = cssText;
	document.head.appendChild(style);
	return style;
};

const getStyleId = (name, value) => {
	return value ? `${name}|${value}` : name;
};

const createStyle = (data, name, value = "") => {
	const content = typeof data === "string" ? data : data.content;

	if (document.adoptedStyleSheets) {
		const stylesheet = new CSSStyleSheet();
		stylesheet.replaceSync(content);
		stylesheet._ui5StyleId = getStyleId(name, value); // set an id so that we can find the style later
		document.adoptedStyleSheets = [...document.adoptedStyleSheets, stylesheet];
	} else {
		const attributes = {};
		attributes[name] = value;
		createStyleInHead(content, attributes);
	}
};

const updateStyle = (data, name, value = "") => {
	const content = typeof data === "string" ? data : data.content;

	if (document.adoptedStyleSheets) {
		document.adoptedStyleSheets.find(sh => sh._ui5StyleId === getStyleId(name, value)).replaceSync(content || "");
	} else {
		document.querySelector(`head>style[${name}="${value}"]`).textContent = content || "";
	}
};

const hasStyle = (name, value = "") => {

	if (document.adoptedStyleSheets) {
		return !!document.adoptedStyleSheets.find(sh => sh._ui5StyleId === getStyleId(name, value));
	}

	return !!document.querySelector(`head>style[${name}="${value}"]`);
};

const removeStyle = (name, value = "") => {
	if (document.adoptedStyleSheets) {
		document.adoptedStyleSheets = document.adoptedStyleSheets.filter(sh => sh._ui5StyleId !== getStyleId(name, value));
	} else {
		const styleElement = document.querySelector(`head > style[${name}="${value}"]`);
		if (styleElement) {
			styleElement.parentElement.removeChild(styleElement);
		}
	}
};

const createOrUpdateStyle = (data, name, value = "") => {
	if (hasStyle(name, value)) {
		updateStyle(data, name, value);
	} else {
		createStyle(data, name, value);
	}
};

const warnings = new Set();

const getThemeMetadata = () => {
	// Check if the class was already applied, most commonly to the link/style tag with the CSS Variables
	let el = document.querySelector(".sapThemeMetaData-Base-baseLib") || document.querySelector(".sapThemeMetaData-UI5-sap-ui-core");
	if (el) {
		return getComputedStyle(el).backgroundImage;
	}

	el = document.createElement("span");
	el.style.display = "none";

	// Try with sapThemeMetaData-Base-baseLib first
	el.classList.add("sapThemeMetaData-Base-baseLib");
	document.body.appendChild(el);
	let metadata = getComputedStyle(el).backgroundImage;

	// Try with sapThemeMetaData-UI5-sap-ui-core only if the previous selector was not found
	if (metadata === "none") {
		el.classList.add("sapThemeMetaData-UI5-sap-ui-core");
		metadata = getComputedStyle(el).backgroundImage;
	}

	document.body.removeChild(el);

	return metadata;
};

const parseThemeMetadata = metadataString => {
	const params = /\(["']?data:text\/plain;utf-8,(.*?)['"]?\)$/i.exec(metadataString);
	if (params && params.length >= 2) {
		let paramsString = params[1];
		paramsString = paramsString.replace(/\\"/g, `"`);
		if (paramsString.charAt(0) !== "{" && paramsString.charAt(paramsString.length - 1) !== "}") {
			try {
				paramsString = decodeURIComponent(paramsString);
			} catch (ex) {
				if (!warnings.has("decode")) {
					console.warn("Malformed theme metadata string, unable to decodeURIComponent"); // eslint-disable-line
					warnings.add("decode");
				}
				return;
			}
		}
		try {
			return JSON.parse(paramsString);
		} catch (ex) {
			if (!warnings.has("parse")) {
				console.warn("Malformed theme metadata string, unable to parse JSON"); // eslint-disable-line
				warnings.add("parse");
			}
		}
	}
};

const processThemeMetadata = metadata => {
	let themeName;
	let baseThemeName;

	try {
		themeName = metadata.Path.match(/\.([^.]+)\.css_variables$/)[1];
		baseThemeName = metadata.Extends[0];
	} catch (ex) {
		if (!warnings.has("object")) {
			console.warn("Malformed theme metadata Object", metadata); // eslint-disable-line
			warnings.add("object");
		}
		return;
	}

	return {
		themeName,
		baseThemeName,
	};
};

const getThemeDesignerTheme = () => {
	const metadataString = getThemeMetadata();
	if (!metadataString || metadataString === "none") {
		return;
	}

	const metadata = parseThemeMetadata(metadataString);
	return processThemeMetadata(metadata);
};

const eventProvider$2 = new EventProvider();
const THEME_LOADED = "themeLoaded";

const fireThemeLoaded = theme => {
	return eventProvider$2.fireEvent(THEME_LOADED, theme);
};

const BASE_THEME_PACKAGE = "@ui5/webcomponents-theming";

const isThemeBaseRegistered = () => {
	const registeredPackages = getRegisteredPackages();
	return registeredPackages.has(BASE_THEME_PACKAGE);
};

const loadThemeBase = async theme => {
	if (!isThemeBaseRegistered()) {
		return;
	}

	const cssData = await getThemeProperties(BASE_THEME_PACKAGE, theme);
	if (cssData) {
		createOrUpdateStyle(cssData, "data-ui5-theme-properties", BASE_THEME_PACKAGE);
	}
};

const deleteThemeBase = () => {
	removeStyle("data-ui5-theme-properties", BASE_THEME_PACKAGE);
};

const loadComponentPackages = async theme => {
	const registeredPackages = getRegisteredPackages();
	registeredPackages.forEach(async packageName => {
		if (packageName === BASE_THEME_PACKAGE) {
			return;
		}

		const cssData = await getThemeProperties(packageName, theme);
		if (cssData) {
			createOrUpdateStyle(cssData, "data-ui5-theme-properties", packageName);
		}
	});
};

const detectExternalTheme = () => {
	// If theme designer theme is detected, use this
	const extTheme = getThemeDesignerTheme();
	if (extTheme) {
		return extTheme;
	}

	// If OpenUI5Support is enabled, try to find out if it loaded variables
	const OpenUI5Support = getFeature("OpenUI5Support");
	if (OpenUI5Support) {
		const varsLoaded = OpenUI5Support.cssVariablesLoaded();
		if (varsLoaded) {
			return {
				themeName: OpenUI5Support.getConfigurationSettingsObject().theme, // just themeName, baseThemeName is only relevant for custom themes
			};
		}
	}
};

const applyTheme = async theme => {
	const extTheme = detectExternalTheme();

	// Only load theme_base properties if there is no externally loaded theme, or there is, but it is not being loaded
	if (!extTheme || theme !== extTheme.themeName) {
		await loadThemeBase(theme);
	} else {
		deleteThemeBase();
	}

	// Always load component packages properties. For non-registered themes, try with the base theme, if any
	const packagesTheme = isThemeRegistered(theme) ? theme : extTheme && extTheme.baseThemeName;
	await loadComponentPackages(packagesTheme);

	fireThemeLoaded(theme);
};

let theme;

const getTheme = () => {
	if (theme === undefined) {
		theme = getTheme$1();
	}

	return theme;
};

const setTheme = async newTheme => {
	if (theme === newTheme) {
		return;
	}

	theme = newTheme;

	// Update CSS Custom Properties
	await applyTheme(theme);
	await reRenderAllUI5Elements({ themeAware: true });
};

/**
 * Returns if the current theme is part of given theme family
 * @private
 * @param {String} the theme family
 * @returns {boolean}
 */
const isThemeFamily = _theme => {
	return getTheme().startsWith(_theme);
};

const IconCollectionConfiguration = new Map();

/**
 * Returns the effective icon collection that will be applied for icon web components
 * whenever namespace is not specified.
 * @returns {String}
 */
const getEffectiveDefaultIconCollection = () => {
	const currentTheme = getTheme();
	const currentThemeConfiguration = IconCollectionConfiguration.get(currentTheme);

	if (currentThemeConfiguration) {
		return currentThemeConfiguration;
	}

	return isThemeFamily("sap_horizon") ? "SAP-icons-v5" : "SAP-icons";
};

const loaders = new Map();
const registry = getSharedResource("SVGIcons.registry", new Map());
const iconCollectionPromises = getSharedResource("SVGIcons.promises", new Map());

const ICON_NOT_FOUND = "ICON_NOT_FOUND";

const _loadIconCollectionOnce = async collectionName => {
	if (!iconCollectionPromises.has(collectionName)) {
		if (!loaders.has(collectionName)) {
			throw new Error(`No loader registered for the ${collectionName} icons collection. Probably you forgot to import the "AllIcons.js" module for the respective package.`);
		}
		const loadIcons = loaders.get(collectionName);
		iconCollectionPromises.set(collectionName, loadIcons(collectionName));
	}

	return iconCollectionPromises.get(collectionName);
};

const _fillRegistry = bundleData => {
	Object.keys(bundleData.data).forEach(iconName => {
		const iconData = bundleData.data[iconName];

		registerIcon(iconName, {
			pathData: iconData.path,
			ltr: iconData.ltr,
			accData: iconData.acc,
			collection: bundleData.collection,
			packageName: bundleData.packageName,
		 });
	});
};

// set
const registerIcon = (name, { pathData, ltr, accData, collection, packageName } = {}) => { // eslint-disable-line
	if (!collection) {
		collection = getEffectiveDefaultIconCollection();
	}

	const key = `${collection}/${name}`;
	registry.set(key, {
		pathData,
		ltr,
		accData,
		packageName,
	});
};

const _parseName = name => {
	// silently support ui5-compatible URIs
	if (name.startsWith("sap-icon://")) {
		name = name.replace("sap-icon://", "");
	}

	let collection;
	[name, collection] = name.split("/").reverse();
	collection = collection || getEffectiveDefaultIconCollection();

	// Normalize collection name.
	// - resolve `SAP-icons-TNT` to `tnt`.
	// - resolve `BusinessSuiteInAppSymbols` to `business-suite`.
	// - resolve `horizon` to `SAP-icons-v5`,
	// Note: aliases can be made as a feature, if more collections need it or more aliases are needed.
	collection = _normalizeCollection(collection);
	name = name.replace("icon-", "");

	const registryKey = `${collection}/${name}`;
	return { name, collection, registryKey };
};

const getIconData = async nameProp => {
	const { collection, registryKey } = _parseName(nameProp);

	let iconData = ICON_NOT_FOUND;
	try {
		iconData = await _loadIconCollectionOnce(collection);
	} catch (e) {
		console.error(e.message); /* eslint-disable-line */
	}

	if (iconData === ICON_NOT_FOUND) {
		return iconData;
	}

	if (!registry.has(registryKey)) {
		// not filled by another await. many getters will await on the same loader, but fill only once
		_fillRegistry(iconData);
	}
	return registry.get(registryKey);
};

// test page usage only
const _getRegisteredNames = async () => {
	// fetch one icon of each collection to trigger the bundle load
	await getIconData("edit");
	await getIconData("tnt/arrow");
	await getIconData("business-suite/3d");
	return Array.from(registry.keys());
};

const _normalizeCollection = collectionName => {
	if (IconCollectionsAlias[collectionName]) {
		return IconCollectionsAlias[collectionName];
	}

	return collectionName;
};

const PopupUtilsData = getSharedResource("PopupUtilsData", {});
PopupUtilsData.currentZIndex = PopupUtilsData.currentZIndex || 100;

const getCurrentZIndex = () => {
	return PopupUtilsData.currentZIndex;
};

const getCore = () => {
	const sap = window.sap;
	const core = sap && sap.ui && typeof sap.ui.getCore === "function" && sap.ui.getCore();
	return core;
};

const isLoaded = () => {
	return !!getCore();
};

const init = () => {
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
};

const getConfigurationSettingsObject = () => {
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
		rtl: config.getRTL(),
		calendarType: config.getCalendarType(),
		formatSettings: {
			firstDayOfWeek: LocaleData ? LocaleData.getInstance(config.getLocale()).getFirstDayOfWeek() : undefined,
		},
	};
};

const getLocaleDataObject = () => {
	const core = getCore();
	if (!core) {
		return;
	}

	const config = core.getConfiguration();
	const LocaleData = window.sap.ui.require("sap/ui/core/LocaleData");
	return LocaleData.getInstance(config.getLocale())._get();
};

const listenForThemeChange = () => {
	const core = getCore();
	const config = core.getConfiguration();
	core.attachThemeChanged(async () => {
		await setTheme(config.getTheme());
	});
};

const attachListeners = () => {
	const core = getCore();
	if (!core) {
		return;
	}

	listenForThemeChange();
};

const cssVariablesLoaded = () => {
	const core = getCore();
	if (!core) {
		return;
	}

	const link = [...document.head.children].find(el => el.id === "sap-ui-theme-sap.ui.core"); // more reliable than querySelector early
	if (!link) {
		return;
	}

	return !!link.href.match(/\/css(-|_)variables\.css/);
};

const getNextZIndex = () => {
	const core = getCore();
	if (!core) {
		return;
	}

	const Popup = window.sap.ui.require("sap/ui/core/Popup");
	return Popup.getNextZIndex();
};

const setInitialZIndex = () => {
	const core = getCore();
	if (!core) {
		return;
	}

	const Popup = window.sap.ui.require("sap/ui/core/Popup");
	Popup.setInitialZIndex(getCurrentZIndex());
};

const OpenUI5Support = {
	isLoaded,
	init,
	getConfigurationSettingsObject,
	getLocaleDataObject,
	attachListeners,
	cssVariablesLoaded,
	getNextZIndex,
	setInitialZIndex,
};

registerFeature("OpenUI5Support", OpenUI5Support);

const whenDOMReady = () => {
	return new Promise(resolve => {
		if (document.body) {
			resolve();
		} else {
			document.addEventListener("DOMContentLoaded", () => {
				resolve();
			});
		}
	});
};

var fontFaceCSS = {
	packageName: "@ui5/webcomponents-base",
	fileName: "FontFace.css",
	content: `@font-face{font-family:"72";font-style:normal;font-weight:400;src:local("72"),url(https://ui5.sap.com/resources/sap/ui/core/themes/sap_fiori_3/fonts/72-Regular.woff2?ui5-webcomponents) format("woff2"),url(https://ui5.sap.com/resources/sap/ui/core/themes/sap_fiori_3/fonts/72-Regular.woff?ui5-webcomponents) format("woff")}@font-face{font-family:"72full";font-style:normal;font-weight:400;src:local('72-full'),url(https://ui5.sap.com/resources/sap/ui/core/themes/sap_fiori_3/fonts/72-Regular-full.woff2?ui5-webcomponents) format("woff2"),url(https://ui5.sap.com/resources/sap/ui/core/themes/sap_fiori_3/fonts/72-Regular-full.woff?ui5-webcomponents) format("woff")}@font-face{font-family:"72";font-style:normal;font-weight:700;src:local('72-Bold'),url(https://ui5.sap.com/resources/sap/ui/core/themes/sap_fiori_3/fonts/72-Bold.woff2?ui5-webcomponents) format("woff2"),url(https://ui5.sap.com/resources/sap/ui/core/themes/sap_fiori_3/fonts/72-Bold.woff?ui5-webcomponents) format("woff")}@font-face{font-family:"72full";font-style:normal;font-weight:700;src:local('72-Bold-full'),url(https://ui5.sap.com/resources/sap/ui/core/themes/sap_fiori_3/fonts/72-Bold-full.woff2?ui5-webcomponents) format("woff2"),url(https://ui5.sap.com/resources/sap/ui/core/themes/sap_fiori_3/fonts/72-Bold-full.woff?ui5-webcomponents) format("woff")}@font-face{font-family:'72-Bold';font-style:normal;src:local('72-Bold'),url(https://ui5.sap.com/resources/sap/ui/core/themes/sap_fiori_3/fonts/72-Bold.woff2?ui5-webcomponents) format("woff2"),url(https://ui5.sap.com/resources/sap/ui/core/themes/sap_fiori_3/fonts/72-Bold.woff?ui5-webcomponents) format("woff")}@font-face{font-family:'72-Boldfull';font-style:normal;src:url(https://ui5.sap.com/resources/sap/ui/core/themes/sap_fiori_3/fonts/72-Bold-full.woff2?ui5-webcomponents) format("woff2"),url(https://ui5.sap.com/resources/sap/ui/core/themes/sap_fiori_3/fonts/72-Bold-full.woff?ui5-webcomponents) format("woff")}@font-face{font-family:'72-Light';font-style:normal;src:local('72-Light'),url(https://ui5.sap.com/resources/sap/ui/core/themes/sap_fiori_3/fonts/72-Light.woff2?ui5-webcomponents) format("woff2"),url(https://ui5.sap.com/resources/sap/ui/core/themes/sap_fiori_3/fonts/72-Light.woff?ui5-webcomponents) format("woff")}@font-face{font-family:'72-Lightfull';font-style:normal;src:url(https://ui5.sap.com/resources/sap/ui/core/themes/sap_fiori_3/fonts/72-Light-full.woff2?ui5-webcomponents) format("woff2"),url(https://ui5.sap.com/resources/sap/ui/core/themes/sap_fiori_3/fonts/72-Light-full.woff?ui5-webcomponents) format("woff")}@font-face{font-family:"72Black";font-style:bold;font-weight:900;src:local('72Black'),url(https://openui5nightly.hana.ondemand.com/resources/sap/ui/core/themes/sap_horizon/fonts/72-Black.woff2?ui5-webcomponents) format("woff2"),url(https://openui5nightly.hana.ondemand.com/resources/sap/ui/core/themes/sap_horizon/fonts/72-Black.woff?ui5-webcomponents) format("woff")}`
};

var overrideFontFaceCSS = {
	packageName: "@ui5/webcomponents-base",
	fileName: "OverrideFontFace.css",
	content: `@font-face{font-family:'72override';unicode-range:U+0102-0103,U+01A0-01A1,U+01AF-01B0,U+1EA0-1EB7,U+1EB8-1EC7,U+1EC8-1ECB,U+1ECC-1EE3,U+1EE4-1EF1,U+1EF4-1EF7;src:local('Arial'),local('Helvetica'),local('sans-serif')}`
};

const insertFontFace = () => {
	const OpenUI5Support = getFeature("OpenUI5Support");

	// Only set the main font if there is no OpenUI5 support, or there is, but OpenUI5 is not loaded
	if (!OpenUI5Support || !OpenUI5Support.isLoaded()) {
		insertMainFontFace();
	}

	// Always set the override font - OpenUI5 in CSS Vars mode does not set it, unlike the main font
	insertOverrideFontFace();
};

const insertMainFontFace = () => {
	if (!hasStyle("data-ui5-font-face")) {
		createStyle(fontFaceCSS, "data-ui5-font-face");
	}
};

const insertOverrideFontFace = () => {
	if (!hasStyle("data-ui5-font-face-override")) {
		createStyle(overrideFontFaceCSS, "data-ui5-font-face-override");
	}
};

var systemCSSVars = {
	packageName: "@ui5/webcomponents-base",
	fileName: "SystemCSSVars.css",
	content: `:root{--_ui5_content_density:cozy}.sapUiSizeCompact,.ui5-content-density-compact,[data-ui5-compact-size]{--_ui5_content_density:compact}[dir=rtl]{--_ui5_dir:rtl}[dir=ltr]{--_ui5_dir:ltr}`
};

const insertSystemCSSVars = () => {
	if (!hasStyle("data-ui5-system-css-vars")) {
		createStyle(systemCSSVars, "data-ui5-system-css-vars");
	}
};

let bootPromise;

const boot = async () => {
	if (bootPromise) {
		return bootPromise;
	}

	/* eslint-disable no-alert, no-async-promise-executor */
	/*
		Note(since we disable eslint rule):
		If an async executor function throws an error, the error will be lost and won't cause the newly-constructed Promise to reject.
		This could make it difficult to debug and handle some errors.
	*/
	bootPromise = new Promise(async resolve => {
		registerCurrentRuntime();

		const OpenUI5Support = getFeature("OpenUI5Support");
		const F6Navigation = getFeature("F6Navigation");
		if (OpenUI5Support) {
			await OpenUI5Support.init();
		} else if (F6Navigation) {
			F6Navigation.init();
		}

		await whenDOMReady();
		await applyTheme(getTheme());
		OpenUI5Support && OpenUI5Support.attachListeners();
		insertFontFace();
		insertSystemCSSVars();

		resolve();
	});
	/* eslint-enable no-alert, no-async-promise-executor */

	return bootPromise;
};

/**
 * Base class for all data types.
 *
 * @class
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.base.types.DataType
 * @public
 */
class DataType {
	static isValid(value) {
	}

	static attributeToProperty(attributeValue) {
		return attributeValue;
	}

	static propertyToAttribute(propertyValue) {
		return `${propertyValue}`;
	}

	static valuesAreEqual(value1, value2) {
		return value1 === value2;
	}

	static generateTypeAccessors(types) {
		Object.keys(types).forEach(type => {
			Object.defineProperty(this, type, {
				get() {
					return types[type];
				},
			});
		});
	}
}

const isDescendantOf = (klass, baseKlass, inclusive = false) => {
	if (typeof klass !== "function" || typeof baseKlass !== "function") {
		return false;
	}
	if (inclusive && klass === baseKlass) {
		return true;
	}
	let parent = klass;
	do {
		parent = Object.getPrototypeOf(parent);
	} while (parent !== null && parent !== baseKlass);
	return parent === baseKlass;
};

const kebabToCamelMap = new Map();
const camelToKebabMap = new Map();

const kebabToCamelCase = string => {
	if (!kebabToCamelMap.has(string)) {
		const result = toCamelCase(string.split("-"));
		kebabToCamelMap.set(string, result);
	}
	return kebabToCamelMap.get(string);
};

const camelToKebabCase = string => {
	if (!camelToKebabMap.has(string)) {
		const result = string.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
		camelToKebabMap.set(string, result);
	}
	return camelToKebabMap.get(string);
};

const toCamelCase = parts => {
	return parts.map((string, index) => {
		return index === 0 ? string.toLowerCase() : string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
	}).join("");
};

/**
 * Determines the slot to which a node should be assigned
 * @param node Text node or HTML element
 * @returns {string}
 */
const getSlotName = node => {
	// Text nodes can only go to the default slot
	if (!(node instanceof HTMLElement)) {
		return "default";
	}

	// Discover the slot based on the real slot name (f.e. footer => footer, or content-32 => content)
	const slot = node.getAttribute("slot");
	if (slot) {
		const match = slot.match(/^(.+?)-\d+$/);
		return match ? match[1] : slot;
	}

	// Use default slot as a fallback
	return "default";
};

const isSlot = el => el && el instanceof HTMLElement && el.localName === "slot";

const getSlottedElements = el => {
	if (isSlot(el)) {
		return el.assignedNodes({ flatten: true }).filter(item => item instanceof HTMLElement);
	}

	return [el];
};

const getSlottedElementsList = elList => {
	const reducer = (acc, curr) => acc.concat(getSlottedElements(curr));
	return elList.reduce(reducer, []);
};

let suf;
let rulesObj = {
	include: [/^ui5-/],
	exclude: [],
};
const tagsCache = new Map(); // true/false means the tag should/should not be cached, undefined means not known yet.

/**
 * Returns the currently set scoping suffix, or undefined if not set.
 *
 * @public
 * @returns {String|undefined}
 */
const getCustomElementsScopingSuffix = () => {
	return suf;
};

/**
 * Determines whether custom elements with the given tag should be scoped or not.
 * The tag is first matched against the "include" rules and then against the "exclude" rules and the
 * result is cached until new rules are set.
 *
 * @public
 * @param tag
 */
const shouldScopeCustomElement = tag => {
	if (!tagsCache.has(tag)) {
		const result = rulesObj.include.some(rule => tag.match(rule)) && !rulesObj.exclude.some(rule => tag.match(rule));
		tagsCache.set(tag, result);
	}

	return tagsCache.get(tag);
};

/**
 * Returns the currently set scoping suffix, if any and if the tag should be scoped, or undefined otherwise.
 *
 * @public
 * @param tag
 * @returns {String}
 */
const getEffectiveScopingSuffixForTag = tag => {
	if (shouldScopeCustomElement(tag)) {
		return getCustomElementsScopingSuffix();
	}
};

/**
 *
 * @class
 * @public
 */
class UI5ElementMetadata {
	constructor(metadata) {
		this.metadata = metadata;
	}

	getInitialState() {
		if (Object.prototype.hasOwnProperty.call(this, "_initialState")) {
			return this._initialState;
		}

		const initialState = {};
		const slotsAreManaged = this.slotsAreManaged();

		// Initialize properties
		const props = this.getProperties();
		for (const propName in props) { // eslint-disable-line
			const propType = props[propName].type;
			const propDefaultValue = props[propName].defaultValue;

			if (propType === Boolean) {
				initialState[propName] = false;

				if (propDefaultValue !== undefined) {
					console.warn("The 'defaultValue' metadata key is ignored for all booleans properties, they would be initialized with 'false' by default"); // eslint-disable-line
				}
			} else if (props[propName].multiple) {
				initialState[propName] = [];
			} else if (propType === Object) {
				initialState[propName] = "defaultValue" in props[propName] ? props[propName].defaultValue : {};
			} else if (propType === String) {
				initialState[propName] = "defaultValue" in props[propName] ? props[propName].defaultValue : "";
			} else {
				initialState[propName] = propDefaultValue;
			}
		}

		// Initialize slots
		if (slotsAreManaged) {
			const slots = this.getSlots();
			for (const [slotName, slotData] of Object.entries(slots)) { // eslint-disable-line
				const propertyName = slotData.propertyName || slotName;
				initialState[propertyName] = [];
			}
		}

		this._initialState = initialState;
		return initialState;
	}

	/**
	 * Only intended for use by UI5Element.js
	 * @protected
	 */
	static validatePropertyValue(value, propData) {
		const isMultiple = propData.multiple;
		if (isMultiple) {
			return value.map(propValue => validateSingleProperty(propValue, propData));
		}
		return validateSingleProperty(value, propData);
	}

	/**
	 * Only intended for use by UI5Element.js
	 * @protected
	 */
	static validateSlotValue(value, slotData) {
		return validateSingleSlot(value, slotData);
	}

	/**
	 * Returns the tag of the UI5 Element without the scope
	 * @public
	 */
	getPureTag() {
		return this.metadata.tag;
	}

	/**
	 * Returns the tag of the UI5 Element
	 * @public
	 */
	getTag() {
		const pureTag = this.metadata.tag;
		const suffix = getEffectiveScopingSuffixForTag(pureTag);
		if (!suffix) {
			return pureTag;
		}

		return `${pureTag}-${suffix}`;
	}

	/**
	 * Used to get the tag we need to register for backwards compatibility
	 * @public
	 */
	getAltTag() {
		const pureAltTag = this.metadata.altTag;
		if (!pureAltTag) {
			return;
		}

		const suffix = getEffectiveScopingSuffixForTag(pureAltTag);
		if (!suffix) {
			return pureAltTag;
		}

		return `${pureAltTag}-${suffix}`;
	}

	/**
	 * Determines whether a property should have an attribute counterpart
	 * @public
	 * @param propName
	 * @returns {boolean}
	 */
	hasAttribute(propName) {
		const propData = this.getProperties()[propName];
		return propData.type !== Object && !propData.noAttribute && !propData.multiple;
	}

	/**
	 * Returns an array with the properties of the UI5 Element (in camelCase)
	 * @public
	 * @returns {string[]}
	 */
	getPropertiesList() {
		return Object.keys(this.getProperties());
	}

	/**
	 * Returns an array with the attributes of the UI5 Element (in kebab-case)
	 * @public
	 * @returns {string[]}
	 */
	getAttributesList() {
		return this.getPropertiesList().filter(this.hasAttribute, this).map(camelToKebabCase);
	}

	/**
	 * Returns an object with key-value pairs of slots and their metadata definitions
	 * @public
	 */
	getSlots() {
		return this.metadata.slots || {};
	}

	/**
	 * Determines whether this UI5 Element has a default slot of type Node, therefore can slot text
	 * @returns {boolean}
	 */
	canSlotText() {
		const defaultSlot = this.getSlots().default;
		return defaultSlot && defaultSlot.type === Node;
	}

	/**
	 * Determines whether this UI5 Element supports any slots
	 * @public
	 */
	hasSlots() {
		return !!Object.entries(this.getSlots()).length;
	}

	/**
	 * Determines whether this UI5 Element supports any slots with "individualSlots: true"
	 * @public
	 */
	hasIndividualSlots() {
		return this.slotsAreManaged() && Object.entries(this.getSlots()).some(([_slotName, slotData]) => slotData.individualSlots);
	}

	/**
	 * Determines whether this UI5 Element needs to invalidate if children are added/removed/changed
	 * @public
	 */
	slotsAreManaged() {
		return !!this.metadata.managedSlots;
	}

	/**
	 * Determines whether this control supports F6 fast navigation
	 * @public
	 */
	supportsF6FastNavigation() {
		return !!this.metadata.fastNavigation;
	}

	/**
	 * Returns an object with key-value pairs of properties and their metadata definitions
	 * @public
	 */
	getProperties() {
		return this.metadata.properties || {};
	}

	/**
	 * Returns an object with key-value pairs of events and their metadata definitions
	 * @public
	 */
	getEvents() {
		return this.metadata.events || {};
	}

	/**
	 * Determines whether this UI5 Element has any translatable texts (needs to be invalidated upon language change)
	 * @returns {boolean}
	 */
	isLanguageAware() {
		return !!this.metadata.languageAware;
	}

	/**
	 * Determines whether this UI5 Element has any theme dependant carachteristics.
	 * @returns {boolean}
	 */
	 isThemeAware() {
		return !!this.metadata.themeAware;
	}

	/**
	 * Matches a changed entity (property/slot) with the given name against the "invalidateOnChildChange" configuration
	 * and determines whether this should cause and invalidation
	 *
	 * @param slotName the name of the slot in which a child was changed
	 * @param type the type of change in the child: "property" or "slot"
	 * @param name the name of the property/slot that changed
	 * @returns {boolean}
	 */
	shouldInvalidateOnChildChange(slotName, type, name) {
		const config = this.getSlots()[slotName].invalidateOnChildChange;

		// invalidateOnChildChange was not set in the slot metadata - by default child changes do not affect the component
		if (config === undefined) {
			return false;
		}

		// The simple format was used: invalidateOnChildChange: true/false;
		if (typeof config === "boolean") {
			return config;
		}

		// The complex format was used: invalidateOnChildChange: { properties, slots }
		if (typeof config === "object") {
			// A property was changed
			if (type === "property") {
				// The config object does not have a properties field
				if (config.properties === undefined) {
					return false;
				}

				// The config object has the short format: properties: true/false
				if (typeof config.properties === "boolean") {
					return config.properties;
				}

				// The config object has the complex format: properties: [...]
				if (Array.isArray(config.properties)) {
					return config.properties.includes(name);
				}

				throw new Error("Wrong format for invalidateOnChildChange.properties: boolean or array is expected");
			}

			// A slot was changed
			if (type === "slot") {
				// The config object does not have a slots field
				if (config.slots === undefined) {
					return false;
				}

				// The config object has the short format: slots: true/false
				if (typeof config.slots === "boolean") {
					return config.slots;
				}

				// The config object has the complex format: slots: [...]
				if (Array.isArray(config.slots)) {
					return config.slots.includes(name);
				}

				throw new Error("Wrong format for invalidateOnChildChange.slots: boolean or array is expected");
			}
		}

		throw new Error("Wrong format for invalidateOnChildChange: boolean or object is expected");
	}
}

const validateSingleProperty = (value, propData) => {
	const propertyType = propData.type;

	if (propertyType === Boolean) {
		return typeof value === "boolean" ? value : false;
	}
	if (propertyType === String) {
		return (typeof value === "string" || typeof value === "undefined" || value === null) ? value : value.toString();
	}
	if (propertyType === Object) {
		return typeof value === "object" ? value : propData.defaultValue;
	}
	if (isDescendantOf(propertyType, DataType)) {
		return propertyType.isValid(value) ? value : propData.defaultValue;
	}
};

const validateSingleSlot = (value, slotData) => {
	value && getSlottedElements(value).forEach(el => {
		if (!(el instanceof slotData.type)) {
			throw new Error(`${el} is not of type ${slotData.type}`);
		}
	});

	return value;
};

if (!customElements.get("ui5-static-area")) {
	customElements.define("ui5-static-area", class extends HTMLElement {});
}

/**
 * Runs a component's template with the component's current state, while also scoping HTML
 *
 * @param template - the template to execute
 * @param component - the component
 * @public
 * @returns {*}
 */
const executeTemplate = (template, component) => {
	const tagsToScope = getTagsToScope(component);
	const scope = getCustomElementsScopingSuffix();
	return template(component, tagsToScope, scope);
};

/**
 * Returns all tags, used inside component's template subject to scoping.
 * @param component - the component
 * @returns {Array[]}
 * @private
 */
const getTagsToScope = component => {
	const componentTag = component.constructor.getMetadata().getPureTag();
	const tagsToScope = component.constructor.getUniqueDependencies().map(dep => dep.getMetadata().getPureTag()).filter(shouldScopeCustomElement);

	if (shouldScopeCustomElement(componentTag)) {
		tagsToScope.push(componentTag);
	}

	return tagsToScope;
};

const eventProvider$1 = getSharedResource("CustomStyle.eventProvider", new EventProvider());
const CUSTOM_CSS_CHANGE = "CustomCSSChange";

const attachCustomCSSChange = listener => {
	eventProvider$1.attachEvent(CUSTOM_CSS_CHANGE, listener);
};

const customCSSFor = getSharedResource("CustomStyle.customCSSFor", {});
attachCustomCSSChange(tag => {
	{
		reRenderAllUI5Elements({ tag });
	}
});

const getCustomCSS = tag => {
	return customCSSFor[tag] ? customCSSFor[tag].join("") : "";
};

const getStylesString = styles => {
	if (Array.isArray(styles)) {
		return flatten(styles.filter(style => !!style)).map(style => {
			return typeof style === "string" ? style : style.content;
		}).join(" ");
	}

	return typeof styles === "string" ? styles : styles.content;
};

const flatten = arr => {
	return arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flatten(val) : val), []);
};

const effectiveStyleMap = new Map();

attachCustomCSSChange(tag => {
	effectiveStyleMap.delete(`${tag}_normal`); // there is custom CSS only for the component itself, not for its static area part
});

const getEffectiveStyle = (ElementClass, forStaticArea = false) => {
	const tag = ElementClass.getMetadata().getTag();
	const key = `${tag}_${forStaticArea ? "static" : "normal"}`;
	const OpenUI5Enablement = getFeature("OpenUI5Enablement");

	if (!effectiveStyleMap.has(key)) {
		let effectiveStyle;
		let busyIndicatorStyles = "";

		if (OpenUI5Enablement) {
			busyIndicatorStyles = getStylesString(OpenUI5Enablement.getBusyIndicatorStyles());
		}

		if (forStaticArea) {
			effectiveStyle = getStylesString(ElementClass.staticAreaStyles);
		} else {
			const customStyle = getCustomCSS(tag) || "";
			const builtInStyles = getStylesString(ElementClass.styles);
			effectiveStyle = `${builtInStyles} ${customStyle}`;
		}

		effectiveStyle = `${effectiveStyle} ${busyIndicatorStyles}`;
		effectiveStyleMap.set(key, effectiveStyle);
	}

	return effectiveStyleMap.get(key);
};

const constructableStyleMap = new Map();

attachCustomCSSChange(tag => {
	constructableStyleMap.delete(`${tag}_normal`); // there is custom CSS only for the component itself, not for its static area part
});

/**
 * Returns (and caches) a constructable style sheet for a web component class
 * Note: Chrome
 * @param ElementClass
 * @returns {*}
 */
const getConstructableStyle = (ElementClass, forStaticArea = false) => {
	const tag = ElementClass.getMetadata().getTag();
	const key = `${tag}_${forStaticArea ? "static" : "normal"}`;

	if (!constructableStyleMap.has(key)) {
		const styleContent = getEffectiveStyle(ElementClass, forStaticArea);
		const style = new CSSStyleSheet();
		style.replaceSync(styleContent);
		constructableStyleMap.set(key, [style]);
	}

	return constructableStyleMap.get(key);
};

const isLegacyBrowser = () => !!window.ShadyDOM;

/**
 * Updates the shadow root of a UI5Element or its static area item
 * @param element
 * @param forStaticArea
 */
const updateShadowRoot = (element, forStaticArea = false) => {
	let styleStrOrHrefsArr;
	const template = forStaticArea ? "staticAreaTemplate" : "template";
	const shadowRoot = forStaticArea ? element.staticAreaItem.shadowRoot : element.shadowRoot;
	const renderResult = executeTemplate(element.constructor[template], element);

	if (document.adoptedStyleSheets) { // Chrome
		shadowRoot.adoptedStyleSheets = getConstructableStyle(element.constructor, forStaticArea);
	} else if (!isLegacyBrowser()) { // FF, Safari
		styleStrOrHrefsArr = getEffectiveStyle(element.constructor, forStaticArea);
	}

	element.constructor.render(renderResult, shadowRoot, styleStrOrHrefsArr, forStaticArea, { host: element });
};

const GLOBAL_CONTENT_DENSITY_CSS_VAR = "--_ui5_content_density";

const getEffectiveContentDensity = el => getComputedStyle(el).getPropertyValue(GLOBAL_CONTENT_DENSITY_CSS_VAR);

var getDesigntimePropertyAsArray = value => {
	const m = /\$([-a-z0-9A-Z._]+)(?::([^$]*))?\$/.exec(value);
	return m && m[2] ? m[2].split(/,/) : null;
};

const M_ISO639_OLD_TO_NEW = {
	"iw": "he",
	"ji": "yi",
	"in": "id",
	"sh": "sr",
};

const A_RTL_LOCALES = getDesigntimePropertyAsArray("$cldr-rtl-locales:ar,fa,he$") || [];

const impliesRTL = language => {
	language = (language && M_ISO639_OLD_TO_NEW[language]) || language;

	return A_RTL_LOCALES.indexOf(language) >= 0;
};

const getRTL = () => {
	const configurationRTL = getRTL$1();

	if (configurationRTL !== null) {
		return !!configurationRTL;
	}

	return impliesRTL(getLanguage() || detectNavigatorLanguage());
};

const GLOBAL_DIR_CSS_VAR = "--_ui5_dir";

const getEffectiveDir = element => {
	const doc = window.document;
	const dirValues = ["ltr", "rtl"]; // exclude "auto" and "" from all calculations
	const locallyAppliedDir = getComputedStyle(element).getPropertyValue(GLOBAL_DIR_CSS_VAR);

	// In that order, inspect the CSS Var (for modern browsers), the element itself, html and body (for IE fallback)
	if (dirValues.includes(locallyAppliedDir)) {
		return locallyAppliedDir;
	}
	if (dirValues.includes(element.dir)) {
		return element.dir;
	}
	if (dirValues.includes(doc.documentElement.dir)) {
		return doc.documentElement.dir;
	}
	if (dirValues.includes(doc.body.dir)) {
		return doc.body.dir;
	}

	// Finally, check the configuration for explicitly set RTL or language-implied RTL
	return getRTL() ? "rtl" : undefined;
};

/**
 *
 * @class
 * @author SAP SE
 * @private
 */
class StaticAreaItem extends HTMLElement {
	constructor() {
		super();
		this._rendered = false;
		this.attachShadow({ mode: "open" });
	}

	/**
	 * @protected
	 * @param ownerElement The UI5Element instance that owns this static area item
	 */
	setOwnerElement(ownerElement) {
		this.ownerElement = ownerElement;
		this.classList.add(this.ownerElement._id); // used for getting the popover in the tests
		if (this.ownerElement.hasAttribute("data-ui5-static-stable")) {
			this.setAttribute("data-ui5-stable", this.ownerElement.getAttribute("data-ui5-static-stable")); // stable selector
		}
	}

	/**
	 * Updates the shadow root of the static area item with the latest state, if rendered
	 * @protected
	 */
	update() {
		if (this._rendered) {
			this._updateContentDensity();
			this._updateDirection();
			updateShadowRoot(this.ownerElement, true);
		}
	}

	/**
	 * Sets the correct content density based on the owner element's state
	 * @private
	 */
	_updateContentDensity() {
		if (getEffectiveContentDensity(this.ownerElement) === "compact") {
			this.classList.add("sapUiSizeCompact");
			this.classList.add("ui5-content-density-compact");
		} else {
			this.classList.remove("sapUiSizeCompact");
			this.classList.remove("ui5-content-density-compact");
		}
	}

	_updateDirection() {
		const dir = getEffectiveDir(this.ownerElement);
		if (dir) {
			this.setAttribute("dir", dir);
		} else {
			this.removeAttribute("dir");
		}
	}

	/**
	 * @protected
	 * Returns reference to the DOM element where the current fragment is added.
	 */
	async getDomRef() {
		this._updateContentDensity();
		if (!this._rendered) {
			this._rendered = true;
			updateShadowRoot(this.ownerElement, true);
		}
		await renderFinished(); // Wait for the content of the ui5-static-area-item to be rendered
		return this.shadowRoot;
	}

	static getTag() {
		const pureTag = "ui5-static-area-item";
		const suffix = getEffectiveScopingSuffixForTag(pureTag);
		if (!suffix) {
			return pureTag;
		}

		return `${pureTag}-${suffix}`;
	}

	static createInstance() {
		if (!customElements.get(StaticAreaItem.getTag())) {
			customElements.define(StaticAreaItem.getTag(), StaticAreaItem);
		}

		return document.createElement(this.getTag());
	}
}

const observers = new WeakMap(); // We want just one observer per node, store them here -> DOM nodes are keys

/**
 * Default implementation with MutationObserver for browsers with native support
 */
let _createObserver = (node, callback, options) => {
	const observer = new MutationObserver(callback);
	observer.observe(node, options);
	return observer;
};

/**
 * Default implementation with MutationObserver for browsers with native support
 */
let _destroyObserver = observer => {
	observer.disconnect();
};

/**
 * @param node
 * @param callback
 * @param options
 */
const observeDOMNode = (node, callback, options) => {
	const observer = _createObserver(node, callback, options);
	observers.set(node, observer);
};

/**
 * @param node
 */
const unobserveDOMNode = node => {
	const observer = observers.get(node);
	if (observer) {
		_destroyObserver(observer);
		observers.delete(node);
	}
};

// Fire these events even with noConflict: true
const excludeList = [
	"value-changed",
];

const shouldFireOriginalEvent = eventName => {
	return excludeList.includes(eventName);
};

let noConflict;

const shouldNotFireOriginalEvent = eventName => {
	const nc = getNoConflict();
	return !(nc.events && nc.events.includes && nc.events.includes(eventName));
};

const getNoConflict = () => {
	if (noConflict === undefined) {
		noConflict = getNoConflict$1();
	}

	return noConflict;
};

const skipOriginalEvent = eventName => {
	const nc = getNoConflict();

	// Always fire these events
	if (shouldFireOriginalEvent(eventName)) {
		return false;
	}

	// Read from the configuration
	if (nc === true) {
		return true;
	}

	return !shouldNotFireOriginalEvent(eventName);
};

const setNoConflict = noConflictData => {
	noConflict = noConflictData;
};

// Note: disabled is present in IE so we explicitly allow it here.
// Others, such as title/hidden, we explicitly override, so valid too
const allowList = [
	"disabled",
	"title",
	"hidden",
	"role",
	"draggable",
];

/**
 * Checks whether a property name is valid (does not collide with existing DOM API properties)
 *
 * @param name
 * @returns {boolean}
 */
const isValidPropertyName = name => {
	if (allowList.includes(name) || name.startsWith("aria")) {
		return true;
	}
	const classes = [
		HTMLElement,
		Element,
		Node,
	];
	return !classes.some(klass => klass.prototype.hasOwnProperty(name)); // eslint-disable-line
};

const arraysAreEqual = (arr1, arr2) => {
	if (arr1.length !== arr2.length) {
		return false;
	}

	for (let i = 0; i < arr1.length; i++) {
		if (arr1[i] !== arr2[i]) {
			return false;
		}
	}

	return true;
};

const getClassCopy = (klass, constructorCallback) => {
	return class classCopy extends klass {
		constructor() {
			super();
			constructorCallback && constructorCallback();
		}
	};
};

let autoId = 0;

const elementTimeouts = new Map();
const uniqueDependenciesCache = new Map();

/**
 * Triggers re-rendering of a UI5Element instance due to state change.
 *
 * @param  changeInfo An object with information about the change that caused invalidation.
 * @private
 */
function _invalidate(changeInfo) {
	// Invalidation should be suppressed: 1) before the component is rendered for the first time 2) and during the execution of onBeforeRendering
	// This is necessary not only as an optimization, but also to avoid infinite loops on invalidation between children and parents (when invalidateOnChildChange is used)
	if (this._suppressInvalidation) {
		return;
	}

	// Call the onInvalidation hook
	this.onInvalidation(changeInfo);

	this._changedState.push(changeInfo);
	renderDeferred(this);
	this._eventProvider.fireEvent("invalidate", { ...changeInfo, target: this });
}

let metadata$6 = {};

/**
 * Base class for all UI5 Web Components
 *
 * @class
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.base.UI5Element
 * @extends HTMLElement
 * @public
 */
class UI5Element extends HTMLElement {
	constructor() {
		super();

		this._changedState = []; // Filled on each invalidation, cleared on re-render (used for debugging)
		this._suppressInvalidation = true; // A flag telling whether all invalidations should be ignored. Initialized with "true" because a UI5Element can not be invalidated until it is rendered for the first time
		this._inDOM = false; // A flag telling whether the UI5Element is currently in the DOM tree of the document or not
		this._fullyConnected = false; // A flag telling whether the UI5Element's onEnterDOM hook was called (since it's possible to have the element removed from DOM before that)
		this._childChangeListeners = new Map(); // used to store lazy listeners per slot for the child change event of every child inside that slot
		this._slotChangeListeners = new Map(); // used to store lazy listeners per slot for the slotchange event of all slot children inside that slot
		this._eventProvider = new EventProvider(); // used by parent components for listening to changes to child components
		let deferredResolve;
		this._domRefReadyPromise = new Promise(resolve => {
			deferredResolve = resolve;
		});
		this._domRefReadyPromise._deferredResolve = deferredResolve;

		this._initializeState();
		this._upgradeAllProperties();

		if (this.constructor._needsShadowDOM()) {
			this.attachShadow({ mode: "open" });
		}
	}

	/**
	 * Returns a unique ID for this UI5 Element
	 *
	 * @deprecated - This property is not guaranteed in future releases
	 * @protected
	 */
	get _id() {
		if (!this.__id) {
			this.__id = `ui5wc_${++autoId}`;
		}

		return this.__id;
	}

	/**
	 * Do not call this method from derivatives of UI5Element, use "onEnterDOM" only
	 * @private
	 */
	async connectedCallback() {
		this.setAttribute(this.constructor.getMetadata().getPureTag(), "");
		if (this.constructor.getMetadata().supportsF6FastNavigation()) {
			this.setAttribute("data-sap-ui-fastnavgroup", "true");
		}

		const slotsAreManaged = this.constructor.getMetadata().slotsAreManaged();

		this._inDOM = true;

		if (slotsAreManaged) {
			// always register the observer before yielding control to the main thread (await)
			this._startObservingDOMChildren();
			await this._processChildren();
		}

		if (!this._inDOM) { // Component removed from DOM while _processChildren was running
			return;
		}

		renderImmediately(this);
		this._domRefReadyPromise._deferredResolve();
		this._fullyConnected = true;
		if (typeof this.onEnterDOM === "function") {
			this.onEnterDOM();
		}
	}

	/**
	 * Do not call this method from derivatives of UI5Element, use "onExitDOM" only
	 * @private
	 */
	disconnectedCallback() {
		const slotsAreManaged = this.constructor.getMetadata().slotsAreManaged();

		this._inDOM = false;

		if (slotsAreManaged) {
			this._stopObservingDOMChildren();
		}

		if (this._fullyConnected) {
			if (typeof this.onExitDOM === "function") {
				this.onExitDOM();
			}
			this._fullyConnected = false;
		}

		if (this.staticAreaItem && this.staticAreaItem.parentElement) {
			this.staticAreaItem.parentElement.removeChild(this.staticAreaItem);
		}

		cancelRender(this);
	}

	/**
	 * @private
	 */
	_startObservingDOMChildren() {
		const shouldObserveChildren = this.constructor.getMetadata().hasSlots();
		if (!shouldObserveChildren) {
			return;
		}

		const canSlotText = this.constructor.getMetadata().canSlotText();
		const mutationObserverOptions = {
			childList: true,
			subtree: canSlotText,
			characterData: canSlotText,
		};
		observeDOMNode(this, this._processChildren.bind(this), mutationObserverOptions);
	}

	/**
	 * @private
	 */
	_stopObservingDOMChildren() {
		unobserveDOMNode(this);
	}

	/**
	 * Note: this method is also manually called by "compatibility/patchNodeValue.js"
	 * @private
	 */
	async _processChildren() {
		const hasSlots = this.constructor.getMetadata().hasSlots();
		if (hasSlots) {
			await this._updateSlots();
		}
	}

	/**
	 * @private
	 */
	async _updateSlots() {
		const slotsMap = this.constructor.getMetadata().getSlots();
		const canSlotText = this.constructor.getMetadata().canSlotText();
		const domChildren = Array.from(canSlotText ? this.childNodes : this.children);

		const slotsCachedContentMap = new Map(); // Store here the content of each slot before the mutation occurred
		const propertyNameToSlotMap = new Map(); // Used for reverse lookup to determine to which slot the property name corresponds

		// Init the _state object based on the supported slots and store the previous values
		for (const [slotName, slotData] of Object.entries(slotsMap)) { // eslint-disable-line
			const propertyName = slotData.propertyName || slotName;
			propertyNameToSlotMap.set(propertyName, slotName);
			slotsCachedContentMap.set(propertyName, [...this._state[propertyName]]);
			this._clearSlot(slotName, slotData);
		}

		const autoIncrementMap = new Map();
		const slottedChildrenMap = new Map();

		const allChildrenUpgraded = domChildren.map(async (child, idx) => {
			// Determine the type of the child (mainly by the slot attribute)
			const slotName = getSlotName(child);
			const slotData = slotsMap[slotName];

			// Check if the slotName is supported
			if (slotData === undefined) {
				const validValues = Object.keys(slotsMap).join(", ");
				console.warn(`Unknown slotName: ${slotName}, ignoring`, child, `Valid values are: ${validValues}`); // eslint-disable-line
				return;
			}

			// For children that need individual slots, calculate them
			if (slotData.individualSlots) {
				const nextIndex = (autoIncrementMap.get(slotName) || 0) + 1;
				autoIncrementMap.set(slotName, nextIndex);
				child._individualSlot = `${slotName}-${nextIndex}`;
			}

			// Await for not-yet-defined custom elements
			if (child instanceof HTMLElement) {
				const localName = child.localName;
				const isCustomElement = localName.includes("-");
				if (isCustomElement) {
					const isDefined = window.customElements.get(localName);
					if (!isDefined) {
						const whenDefinedPromise = window.customElements.whenDefined(localName); // Class registered, but instances not upgraded yet
						let timeoutPromise = elementTimeouts.get(localName);
						if (!timeoutPromise) {
							timeoutPromise = new Promise(resolve => setTimeout(resolve, 1000));
							elementTimeouts.set(localName, timeoutPromise);
						}
						await Promise.race([whenDefinedPromise, timeoutPromise]);
					}
					window.customElements.upgrade(child);
				}
			}

			child = this.constructor.getMetadata().constructor.validateSlotValue(child, slotData);

			// Listen for any invalidation on the child if invalidateOnChildChange is true or an object (ignore when false or not set)
			if (child.isUI5Element && slotData.invalidateOnChildChange) {
				const method = (child.attachInvalidate || child._attachChange).bind(child);
				method(this._getChildChangeListener(slotName));
			}

			// Listen for the slotchange event if the child is a slot itself
			if (isSlot(child)) {
				this._attachSlotChange(child, slotName);
			}

			const propertyName = slotData.propertyName || slotName;

			if (slottedChildrenMap.has(propertyName)) {
				slottedChildrenMap.get(propertyName).push({ child, idx });
			} else {
				slottedChildrenMap.set(propertyName, [{ child, idx }]);
			}
		});

		await Promise.all(allChildrenUpgraded);

		// Distribute the child in the _state object, keeping the Light DOM order,
		// not the order elements are defined.
		slottedChildrenMap.forEach((children, propertyName) => {
			this._state[propertyName] = children.sort((a, b) => a.idx - b.idx).map(_ => _.child);
		});

		// Compare the content of each slot with the cached values and invalidate for the ones that changed
		let invalidated = false;
		for (const [slotName, slotData] of Object.entries(slotsMap)) { // eslint-disable-line
			const propertyName = slotData.propertyName || slotName;
			if (!arraysAreEqual(slotsCachedContentMap.get(propertyName), this._state[propertyName])) {
				_invalidate.call(this, {
					type: "slot",
					name: propertyNameToSlotMap.get(propertyName),
					reason: "children",
				});
				invalidated = true;
			}
		}

		// If none of the slots had an invalidation due to changes to immediate children,
		// the change is considered to be text content of the default slot
		if (!invalidated) {
			_invalidate.call(this, {
				type: "slot",
				name: "default",
				reason: "textcontent",
			});
		}
	}

	/**
	 * Removes all children from the slot and detaches listeners, if any
	 * @private
	 */
	_clearSlot(slotName, slotData) {
		const propertyName = slotData.propertyName || slotName;
		const children = this._state[propertyName];

		children.forEach(child => {
			if (child && child.isUI5Element) {
				const method = (child.detachInvalidate || child._detachChange).bind(child);
				method(this._getChildChangeListener(slotName));
			}

			if (isSlot(child)) {
				this._detachSlotChange(child, slotName);
			}
		});

		this._state[propertyName] = [];
	}

	/**
	 * Attach a callback that will be executed whenever the component is invalidated
	 *
	 * @param callback
	 * @public
	 */
	attachInvalidate(callback) {
		this._eventProvider.attachEvent("invalidate", callback);
	}

	/**
	 * Detach the callback that is executed whenever the component is invalidated
	 *
	 * @param callback
	 * @public
	 */
	detachInvalidate(callback) {
		this._eventProvider.detachEvent("invalidate", callback);
	}

	/**
	 * Callback that is executed whenever a monitored child changes its state
	 *
	 * @param slotName the slot in which a child was invalidated
	 * @param childChangeInfo the changeInfo object for the child in the given slot
	 * @private
	 */
	_onChildChange(slotName, childChangeInfo) {
		if (!this.constructor.getMetadata().shouldInvalidateOnChildChange(slotName, childChangeInfo.type, childChangeInfo.name)) {
			return;
		}

		// The component should be invalidated as this type of change on the child is listened for
		// However, no matter what changed on the child (property/slot), the invalidation is registered as "type=slot" for the component itself
		_invalidate.call(this, {
			type: "slot",
			name: slotName,
			reason: "childchange",
			child: childChangeInfo.target,
		});
	}

	/**
	 * Do not override this method in derivatives of UI5Element
	 * @private
	 */
	attributeChangedCallback(name, oldValue, newValue) {
		const properties = this.constructor.getMetadata().getProperties();
		const realName = name.replace(/^ui5-/, "");
		const nameInCamelCase = kebabToCamelCase(realName);
		if (properties.hasOwnProperty(nameInCamelCase)) { // eslint-disable-line
			const propertyTypeClass = properties[nameInCamelCase].type;
			if (propertyTypeClass === Boolean) {
				newValue = newValue !== null;
			} else if (isDescendantOf(propertyTypeClass, DataType)) {
				newValue = propertyTypeClass.attributeToProperty(newValue);
			}
			this[nameInCamelCase] = newValue;
		}
	}

	/**
	 * @private
	 */
	_updateAttribute(name, newValue) {
		if (!this.constructor.getMetadata().hasAttribute(name)) {
			return;
		}
		const properties = this.constructor.getMetadata().getProperties();
		const propertyTypeClass = properties[name].type;
		const attrName = camelToKebabCase(name);
		const attrValue = this.getAttribute(attrName);

		if (propertyTypeClass === Boolean) {
			if (newValue === true && attrValue === null) {
				this.setAttribute(attrName, "");
			} else if (newValue === false && attrValue !== null) {
				this.removeAttribute(attrName);
			}
		} else if (isDescendantOf(propertyTypeClass, DataType)) {
			this.setAttribute(attrName, propertyTypeClass.propertyToAttribute(newValue));
		} else if (typeof newValue !== "object") {
			if (attrValue !== newValue) {
				this.setAttribute(attrName, newValue);
			}
		} // else { return; } // old object handling
	}

	/**
	 * @private
	 */
	_upgradeProperty(prop) {
		if (this.hasOwnProperty(prop)) { // eslint-disable-line
			const value = this[prop];
			delete this[prop];
			this[prop] = value;
		}
	}

	/**
	 * @private
	 */
	_upgradeAllProperties() {
		const allProps = this.constructor.getMetadata().getPropertiesList();
		allProps.forEach(this._upgradeProperty, this);
	}

	/**
	 * @private
	 */
	_initializeState() {
		this._state = { ...this.constructor.getMetadata().getInitialState() };
	}

	/**
	 * Returns a singleton event listener for the "change" event of a child in a given slot
	 *
	 * @param slotName the name of the slot, where the child is
	 * @returns {any}
	 * @private
	 */
	_getChildChangeListener(slotName) {
		if (!this._childChangeListeners.has(slotName)) {
			this._childChangeListeners.set(slotName, this._onChildChange.bind(this, slotName));
		}
		return this._childChangeListeners.get(slotName);
	}

	/**
	 * Returns a singleton slotchange event listener that invalidates the component due to changes in the given slot
	 *
	 * @param slotName the name of the slot, where the slot element (whose slotchange event we're listening to) is
	 * @returns {any}
	 * @private
	 */
	_getSlotChangeListener(slotName) {
		if (!this._slotChangeListeners.has(slotName)) {
			this._slotChangeListeners.set(slotName, this._onSlotChange.bind(this, slotName));
		}
		return this._slotChangeListeners.get(slotName);
	}

	/**
	 * @private
	 */
	_attachSlotChange(child, slotName) {
		child.addEventListener("slotchange", this._getSlotChangeListener(slotName));
	}

	/**
	 * @private
	 */
	_detachSlotChange(child, slotName) {
		child.removeEventListener("slotchange", this._getSlotChangeListener(slotName));
	}

	/**
	 * Whenever a slot element is slotted inside a UI5 Web Component, its slotchange event invalidates the component
	 *
	 * @param slotName the name of the slot, where the slot element (whose slotchange event we're listening to) is
	 * @private
	 */
	_onSlotChange(slotName) {
		_invalidate.call(this, {
			type: "slot",
			name: slotName,
			reason: "slotchange",
		});
	}

	/**
	 * A callback that is executed each time an already rendered component is invalidated (scheduled for re-rendering)
	 *
	 * @param  changeInfo An object with information about the change that caused invalidation.
	 * The object can have the following properties:
	 *  - type: (property|slot) tells what caused the invalidation
	 *   1) property: a property value was changed either directly or as a result of changing the corresponding attribute
	 *   2) slot: a slotted node(nodes) changed in one of several ways (see "reason")
	 *
	 *  - name: the name of the property or slot that caused the invalidation
	 *
	 *  - reason: (children|textcontent|childchange|slotchange) relevant only for type="slot" only and tells exactly what changed in the slot
	 *   1) children: immediate children (HTML elements or text nodes) were added, removed or reordered in the slot
	 *   2) textcontent: text nodes in the slot changed value (or nested text nodes were added or changed value). Can only trigger for slots of "type: Node"
	 *   3) slotchange: a slot element, slotted inside that slot had its "slotchange" event listener called. This practically means that transitively slotted children changed.
	 *      Can only trigger if the child of a slot is a slot element itself.
	 *   4) childchange: indicates that a UI5Element child in that slot was invalidated and in turn invalidated the component.
	 *      Can only trigger for slots with "invalidateOnChildChange" metadata descriptor
	 *
	 *  - newValue: the new value of the property (for type="property" only)
	 *
	 *  - oldValue: the old value of the property (for type="property" only)
	 *
	 *  - child the child that was changed (for type="slot" and reason="childchange" only)
	 *
	 * @public
	 */
	onInvalidation(changeInfo) {}

	/**
	 * Do not call this method directly, only intended to be called by js
	 * @protected
	 */
	_render() {
		const hasIndividualSlots = this.constructor.getMetadata().hasIndividualSlots();

		// suppress invalidation to prevent state changes scheduling another rendering
		this._suppressInvalidation = true;

		if (typeof this.onBeforeRendering === "function") {
			this.onBeforeRendering();
		}

		// Intended for framework usage only. Currently ItemNavigation updates tab indexes after the component has updated its state but before the template is rendered
		if (this._onComponentStateFinalized) {
			this._onComponentStateFinalized();
		}

		// resume normal invalidation handling
		this._suppressInvalidation = false;

		// Update the shadow root with the render result
		/*
		if (this._changedState.length) {
			let element = this.localName;
			if (this.id) {
				element = `${element}#${this.id}`;
			}
			console.log("Re-rendering:", element, this._changedState.map(x => { // eslint-disable-line
				let res = `${x.type}`;
				if (x.reason) {
					res = `${res}(${x.reason})`;
				}
				res = `${res}: ${x.name}`;
				if (x.type === "property") {
					res = `${res} ${x.oldValue} => ${x.newValue}`;
				}

				return res;
			}));
		}
		*/
		this._changedState = [];

		// Update shadow root and static area item
		if (this.constructor._needsShadowDOM()) {
			updateShadowRoot(this);
		}
		if (this.staticAreaItem) {
			this.staticAreaItem.update();
		}

		// Safari requires that children get the slot attribute only after the slot tags have been rendered in the shadow DOM
		if (hasIndividualSlots) {
			this._assignIndividualSlotsToChildren();
		}

		// Call the onAfterRendering hook
		if (typeof this.onAfterRendering === "function") {
			this.onAfterRendering();
		}
	}

	/**
	 * @private
	 */
	_assignIndividualSlotsToChildren() {
		const domChildren = Array.from(this.children);

		domChildren.forEach(child => {
			if (child._individualSlot) {
				child.setAttribute("slot", child._individualSlot);
			}
		});
	}

	/**
	 * @private
	 */
	_waitForDomRef() {
		return this._domRefReadyPromise;
	}

	/**
	 * Returns the DOM Element inside the Shadow Root that corresponds to the opening tag in the UI5 Web Component's template
	 * *Note:* For logical (abstract) elements (items, options, etc...), returns the part of the parent's DOM that represents this option
	 * Use this method instead of "this.shadowRoot" to read the Shadow DOM, if ever necessary
	 *
	 * @public
	 */
	getDomRef() {
		// If a component set _getRealDomRef to its children, use the return value of this function
		if (typeof this._getRealDomRef === "function") {
			return this._getRealDomRef();
		}

		if (!this.shadowRoot || this.shadowRoot.children.length === 0) {
			return;
		}

		const children = [...this.shadowRoot.children].filter(child => !["link", "style"].includes(child.localName));
		if (children.length !== 1) {
			console.warn(`The shadow DOM for ${this.constructor.getMetadata().getTag()} does not have a top level element, the getDomRef() method might not work as expected`); // eslint-disable-line
		}

		return children[0];
	}

	/**
	 * Returns the DOM Element marked with "data-sap-focus-ref" inside the template.
	 * This is the element that will receive the focus by default.
	 * @public
	 */
	getFocusDomRef() {
		const domRef = this.getDomRef();
		if (domRef) {
			const focusRef = domRef.querySelector("[data-sap-focus-ref]");
			return focusRef || domRef;
		}
	}

	/**
	 * Waits for dom ref and then returns the DOM Element marked with "data-sap-focus-ref" inside the template.
	 * This is the element that will receive the focus by default.
	 * @public
	 */
	async getFocusDomRefAsync() {
		await this._waitForDomRef();
		return this.getFocusDomRef();
	}

	/**
	 * Set the focus to the element, returned by "getFocusDomRef()" (marked by "data-sap-focus-ref")
	 * @public
	 */
	async focus() {
		await this._waitForDomRef();

		const focusDomRef = this.getFocusDomRef();

		if (focusDomRef && typeof focusDomRef.focus === "function") {
			focusDomRef.focus();
		}
	}

	/**
	 *
	 * @public
	 * @param name - name of the event
	 * @param data - additional data for the event
	 * @param cancelable - true, if the user can call preventDefault on the event object
	 * @param bubbles - true, if the event bubbles
	 * @returns {boolean} false, if the event was cancelled (preventDefault called), true otherwise
	 */
	fireEvent(name, data, cancelable = false, bubbles = true) {
		const eventResult = this._fireEvent(name, data, cancelable, bubbles);
		const camelCaseEventName = kebabToCamelCase(name);

		if (camelCaseEventName !== name) {
			return eventResult && this._fireEvent(camelCaseEventName, data, cancelable);
		}

		return eventResult;
	}

	_fireEvent(name, data, cancelable = false, bubbles = true) {
		const noConflictEvent = new CustomEvent(`ui5-${name}`, {
			detail: data,
			composed: false,
			bubbles,
			cancelable,
		});

		// This will be false if the no-conflict event is prevented
		const noConflictEventResult = this.dispatchEvent(noConflictEvent);

		if (skipOriginalEvent(name)) {
			return noConflictEventResult;
		}

		const normalEvent = new CustomEvent(name, {
			detail: data,
			composed: false,
			bubbles,
			cancelable,
		});

		// This will be false if the normal event is prevented
		const normalEventResult = this.dispatchEvent(normalEvent);

		// Return false if any of the two events was prevented (its result was false).
		return normalEventResult && noConflictEventResult;
	}

	/**
	 * Returns the actual children, associated with a slot.
	 * Useful when there are transitive slots in nested component scenarios and you don't want to get a list of the slots, but rather of their content.
	 * @public
	 */
	getSlottedNodes(slotName) {
		return getSlottedElementsList(this[slotName]);
	}

	/**
	 * Determines whether the component should be rendered in RTL mode or not.
	 * Returns: "rtl", "ltr" or undefined
	 *
	 * @public
	 * @returns {String|undefined}
	 */
	get effectiveDir() {
		markAsRtlAware(this.constructor); // if a UI5 Element calls this method, it's considered to be rtl-aware
		return getEffectiveDir(this);
	}

	/**
	 * Used to duck-type UI5 elements without using instanceof
	 * @returns {boolean}
	 * @public
	 */
	get isUI5Element() {
		return true;
	}

	/**
	 * Do not override this method in derivatives of UI5Element, use metadata properties instead
	 * @private
	 */
	static get observedAttributes() {
		return this.getMetadata().getAttributesList();
	}

	/**
	 * @private
	 */
	static _needsShadowDOM() {
		return !!this.template;
	}

	/**
	 * @private
	 */
	static _needsStaticArea() {
		return !!this.staticAreaTemplate;
	}

	/**
	 * @public
	 */
	getStaticAreaItemDomRef() {
		if (!this.constructor._needsStaticArea()) {
			throw new Error("This component does not use the static area");
		}

		if (!this.staticAreaItem) {
			this.staticAreaItem = StaticAreaItem.createInstance();
			this.staticAreaItem.setOwnerElement(this);
		}
		if (!this.staticAreaItem.parentElement) {
			getSingletonElementInstance("ui5-static-area").appendChild(this.staticAreaItem);
		}

		return this.staticAreaItem.getDomRef();
	}

	/**
	 * @private
	 */
	static _generateAccessors() {
		const proto = this.prototype;
		const slotsAreManaged = this.getMetadata().slotsAreManaged();

		// Properties
		const properties = this.getMetadata().getProperties();
		for (const [prop, propData] of Object.entries(properties)) { // eslint-disable-line
			if (!isValidPropertyName(prop)) {
				console.warn(`"${prop}" is not a valid property name. Use a name that does not collide with DOM APIs`); /* eslint-disable-line */
			}

			if (propData.type === Boolean && propData.defaultValue) {
				throw new Error(`Cannot set a default value for property "${prop}". All booleans are false by default.`);
			}

			if (propData.type === Array) {
				throw new Error(`Wrong type for property "${prop}". Properties cannot be of type Array - use "multiple: true" and set "type" to the single value type, such as "String", "Object", etc...`);
			}

			if (propData.type === Object && propData.defaultValue) {
				throw new Error(`Cannot set a default value for property "${prop}". All properties of type "Object" are empty objects by default.`);
			}

			if (propData.multiple && propData.defaultValue) {
				throw new Error(`Cannot set a default value for property "${prop}". All multiple properties are empty arrays by default.`);
			}

			Object.defineProperty(proto, prop, {
				get() {
					if (this._state[prop] !== undefined) {
						return this._state[prop];
					}

					const propDefaultValue = propData.defaultValue;

					if (propData.type === Boolean) {
						return false;
					} else if (propData.type === String) {  // eslint-disable-line
						return propDefaultValue;
					} else if (propData.multiple) { // eslint-disable-line
						return [];
					} else {
						return propDefaultValue;
					}
				},
				set(value) {
					let isDifferent;
					value = this.constructor.getMetadata().constructor.validatePropertyValue(value, propData);

					const oldState = this._state[prop];
					if (propData.multiple && propData.compareValues) {
						isDifferent = !arraysAreEqual(oldState, value);
					} else if (isDescendantOf(propData.type, DataType)) {
						isDifferent = !propData.type.valuesAreEqual(oldState, value);
					} else {
						isDifferent = oldState !== value;
					}

					if (isDifferent) {
						this._state[prop] = value;
						_invalidate.call(this, {
							type: "property",
							name: prop,
							newValue: value,
							oldValue: oldState,
						});
						this._updateAttribute(prop, value);
					}
				},
			});
		}

		// Slots
		if (slotsAreManaged) {
			const slots = this.getMetadata().getSlots();
			for (const [slotName, slotData] of Object.entries(slots)) { // eslint-disable-line
				if (!isValidPropertyName(slotName)) {
					console.warn(`"${slotName}" is not a valid property name. Use a name that does not collide with DOM APIs`); /* eslint-disable-line */
				}

				const propertyName = slotData.propertyName || slotName;
				Object.defineProperty(proto, propertyName, {
					get() {
						if (this._state[propertyName] !== undefined) {
							return this._state[propertyName];
						}
						return [];
					},
					set() {
						throw new Error("Cannot set slot content directly, use the DOM APIs (appendChild, removeChild, etc...)");
					},
				});
			}
		}
	}

	/**
	 * Returns the metadata object for this UI5 Web Component Class
	 * @protected
	 */
	static get metadata() {
		return metadata$6;
	}

	/**
	 * Sets a new metadata object for this UI5 Web Component Class
	 * @protected
	 */
	static set metadata(newMetadata) {
		metadata$6 = newMetadata;
	}

	/**
	 * Returns the CSS for this UI5 Web Component Class
	 * @protected
	 */
	static get styles() {
		return "";
	}

	/**
	 * Returns the Static Area CSS for this UI5 Web Component Class
	 * @protected
	 */
	static get staticAreaStyles() {
		return "";
	}

	/**
	 * Returns an array with the dependencies for this UI5 Web Component, which could be:
	 *  - composed components (used in its shadow root or static area item)
	 *  - slotted components that the component may need to communicate with
	 *
	 * @protected
	 */
	static get dependencies() {
		return [];
	}

	/**
	 * Returns a list of the unique dependencies for this UI5 Web Component
	 *
	 * @public
	 */
	static getUniqueDependencies() {
		if (!uniqueDependenciesCache.has(this)) {
			const filtered = this.dependencies.filter((dep, index, deps) => deps.indexOf(dep) === index);
			uniqueDependenciesCache.set(this, filtered);
		}

		return uniqueDependenciesCache.get(this);
	}

	/**
	 * Returns a promise that resolves whenever all dependencies for this UI5 Web Component have resolved
	 *
	 * @returns {Promise<any[]>}
	 */
	static whenDependenciesDefined() {
		return Promise.all(this.getUniqueDependencies().map(dep => dep.define()));
	}

	/**
	 * Hook that will be called upon custom element definition
	 *
	 * @protected
	 * @returns {Promise<void>}
	 */
	static async onDefine() {
		return Promise.resolve();
	}

	/**
	 * Registers a UI5 Web Component in the browser window object
	 * @public
	 * @returns {Promise<UI5Element>}
	 */
	static async define() {
		await boot();

		await Promise.all([
			this.whenDependenciesDefined(),
			this.onDefine(),
		]);

		const tag = this.getMetadata().getTag();
		const altTag = this.getMetadata().getAltTag();

		const definedLocally = isTagRegistered(tag);
		const definedGlobally = customElements.get(tag);

		if (definedGlobally && !definedLocally) {
			recordTagRegistrationFailure(tag);
		} else if (!definedGlobally) {
			this._generateAccessors();
			registerTag(tag);
			window.customElements.define(tag, this);

			if (altTag && !customElements.get(altTag)) {
				registerTag(altTag);
				window.customElements.define(altTag, getClassCopy(this, () => {
					console.log(`The ${altTag} tag is deprecated and will be removed in the next release, please use ${tag} instead.`); // eslint-disable-line
				}));
			}
		}
		return this;
	}

	/**
	 * Returns an instance of UI5ElementMetadata.js representing this UI5 Web Component's full metadata (its and its parents')
	 * Note: not to be confused with the "get metadata()" method, which returns an object for this class's metadata only
	 * @public
	 * @returns {UI5ElementMetadata}
	 */
	static getMetadata() {
		if (this.hasOwnProperty("_metadata")) { // eslint-disable-line
			return this._metadata;
		}

		const metadataObjects = [this.metadata];
		let klass = this; // eslint-disable-line
		while (klass !== UI5Element) {
			klass = Object.getPrototypeOf(klass);
			metadataObjects.unshift(klass.metadata);
		}
		const mergedMetadata = fnMerge({}, ...metadataObjects);

		this._metadata = new UI5ElementMetadata(mergedMetadata);
		return this._metadata;
	}
}

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var t$1;const i$1=globalThis.trustedTypes,s=i$1?i$1.createPolicy("lit-html",{createHTML:t=>t}):void 0,e$1=`lit$${(Math.random()+"").slice(9)}$`,o="?"+e$1,n=`<${o}>`,l=document,h=(t="")=>l.createComment(t),r=t=>null===t||"object"!=typeof t&&"function"!=typeof t,d=Array.isArray,u=t=>{var i;return d(t)||"function"==typeof(null===(i=t)||void 0===i?void 0:i[Symbol.iterator])},c=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,v=/-->/g,a=/>/g,f=/>|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,_=/'/g,m=/"/g,g=/^(?:script|style|textarea|title)$/i,p=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),$=p(1),b=Symbol.for("lit-noChange"),w=Symbol.for("lit-nothing"),T=new WeakMap,x=(t,i,s)=>{var e,o;const n=null!==(e=null==s?void 0:s.renderBefore)&&void 0!==e?e:i;let l=n._$litPart$;if(void 0===l){const t=null!==(o=null==s?void 0:s.renderBefore)&&void 0!==o?o:null;n._$litPart$=l=new N(i.insertBefore(h(),t),t,void 0,null!=s?s:{});}return l._$AI(t),l},A=l.createTreeWalker(l,129,null,!1),C=(t,i)=>{const o=t.length-1,l=[];let h,r=2===i?"<svg>":"",d=c;for(let i=0;i<o;i++){const s=t[i];let o,u,p=-1,$=0;for(;$<s.length&&(d.lastIndex=$,u=d.exec(s),null!==u);)$=d.lastIndex,d===c?"!--"===u[1]?d=v:void 0!==u[1]?d=a:void 0!==u[2]?(g.test(u[2])&&(h=RegExp("</"+u[2],"g")),d=f):void 0!==u[3]&&(d=f):d===f?">"===u[0]?(d=null!=h?h:c,p=-1):void 0===u[1]?p=-2:(p=d.lastIndex-u[2].length,o=u[1],d=void 0===u[3]?f:'"'===u[3]?m:_):d===m||d===_?d=f:d===v||d===a?d=c:(d=f,h=void 0);const y=d===f&&t[i+1].startsWith("/>")?" ":"";r+=d===c?s+n:p>=0?(l.push(o),s.slice(0,p)+"$lit$"+s.slice(p)+e$1+y):s+e$1+(-2===p?(l.push(void 0),i):y);}const u=r+(t[o]||"<?>")+(2===i?"</svg>":"");if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return [void 0!==s?s.createHTML(u):u,l]};class E{constructor({strings:t,_$litType$:s},n){let l;this.parts=[];let r=0,d=0;const u=t.length-1,c=this.parts,[v,a]=C(t,s);if(this.el=E.createElement(v,n),A.currentNode=this.el.content,2===s){const t=this.el.content,i=t.firstChild;i.remove(),t.append(...i.childNodes);}for(;null!==(l=A.nextNode())&&c.length<u;){if(1===l.nodeType){if(l.hasAttributes()){const t=[];for(const i of l.getAttributeNames())if(i.endsWith("$lit$")||i.startsWith(e$1)){const s=a[d++];if(t.push(i),void 0!==s){const t=l.getAttribute(s.toLowerCase()+"$lit$").split(e$1),i=/([.?@])?(.*)/.exec(s);c.push({type:1,index:r,name:i[2],strings:t,ctor:"."===i[1]?M:"?"===i[1]?H:"@"===i[1]?I:S});}else c.push({type:6,index:r});}for(const i of t)l.removeAttribute(i);}if(g.test(l.tagName)){const t=l.textContent.split(e$1),s=t.length-1;if(s>0){l.textContent=i$1?i$1.emptyScript:"";for(let i=0;i<s;i++)l.append(t[i],h()),A.nextNode(),c.push({type:2,index:++r});l.append(t[s],h());}}}else if(8===l.nodeType)if(l.data===o)c.push({type:2,index:r});else {let t=-1;for(;-1!==(t=l.data.indexOf(e$1,t+1));)c.push({type:7,index:r}),t+=e$1.length-1;}r++;}}static createElement(t,i){const s=l.createElement("template");return s.innerHTML=t,s}}function P(t,i,s=t,e){var o,n,l,h;if(i===b)return i;let d=void 0!==e?null===(o=s._$Cl)||void 0===o?void 0:o[e]:s._$Cu;const u=r(i)?void 0:i._$litDirective$;return (null==d?void 0:d.constructor)!==u&&(null===(n=null==d?void 0:d._$AO)||void 0===n||n.call(d,!1),void 0===u?d=void 0:(d=new u(t),d._$AT(t,s,e)),void 0!==e?(null!==(l=(h=s)._$Cl)&&void 0!==l?l:h._$Cl=[])[e]=d:s._$Cu=d),void 0!==d&&(i=P(t,d._$AS(t,i.values),d,e)),i}class V{constructor(t,i){this.v=[],this._$AN=void 0,this._$AD=t,this._$AM=i;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}p(t){var i;const{el:{content:s},parts:e}=this._$AD,o=(null!==(i=null==t?void 0:t.creationScope)&&void 0!==i?i:l).importNode(s,!0);A.currentNode=o;let n=A.nextNode(),h=0,r=0,d=e[0];for(;void 0!==d;){if(h===d.index){let i;2===d.type?i=new N(n,n.nextSibling,this,t):1===d.type?i=new d.ctor(n,d.name,d.strings,this,t):6===d.type&&(i=new L(n,this,t)),this.v.push(i),d=e[++r];}h!==(null==d?void 0:d.index)&&(n=A.nextNode(),h++);}return o}m(t){let i=0;for(const s of this.v)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++;}}class N{constructor(t,i,s,e){var o;this.type=2,this._$AH=w,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cg=null===(o=null==e?void 0:e.isConnected)||void 0===o||o;}get _$AU(){var t,i;return null!==(i=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==i?i:this._$Cg}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===t.nodeType&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=P(this,t,i),r(t)?t===w||null==t||""===t?(this._$AH!==w&&this._$AR(),this._$AH=w):t!==this._$AH&&t!==b&&this.$(t):void 0!==t._$litType$?this.T(t):void 0!==t.nodeType?this.k(t):u(t)?this.S(t):this.$(t);}M(t,i=this._$AB){return this._$AA.parentNode.insertBefore(t,i)}k(t){this._$AH!==t&&(this._$AR(),this._$AH=this.M(t));}$(t){this._$AH!==w&&r(this._$AH)?this._$AA.nextSibling.data=t:this.k(l.createTextNode(t)),this._$AH=t;}T(t){var i;const{values:s,_$litType$:e}=t,o="number"==typeof e?this._$AC(t):(void 0===e.el&&(e.el=E.createElement(e.h,this.options)),e);if((null===(i=this._$AH)||void 0===i?void 0:i._$AD)===o)this._$AH.m(s);else {const t=new V(o,this),i=t.p(this.options);t.m(s),this.k(i),this._$AH=t;}}_$AC(t){let i=T.get(t.strings);return void 0===i&&T.set(t.strings,i=new E(t)),i}S(t){d(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const o of t)e===i.length?i.push(s=new N(this.M(h()),this.M(h()),this,this.options)):s=i[e],s._$AI(o),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e);}_$AR(t=this._$AA.nextSibling,i){var s;for(null===(s=this._$AP)||void 0===s||s.call(this,!1,!0,i);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i;}}setConnected(t){var i;void 0===this._$AM&&(this._$Cg=t,null===(i=this._$AP)||void 0===i||i.call(this,t));}}class S{constructor(t,i,s,e,o){this.type=1,this._$AH=w,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=o,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=w;}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,i=this,s,e){const o=this.strings;let n=!1;if(void 0===o)t=P(this,t,i,0),n=!r(t)||t!==this._$AH&&t!==b,n&&(this._$AH=t);else {const e=t;let l,h;for(t=o[0],l=0;l<o.length-1;l++)h=P(this,e[s+l],i,l),h===b&&(h=this._$AH[l]),n||(n=!r(h)||h!==this._$AH[l]),h===w?t=w:t!==w&&(t+=(null!=h?h:"")+o[l+1]),this._$AH[l]=h;}n&&!e&&this.C(t);}C(t){t===w?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"");}}class M extends S{constructor(){super(...arguments),this.type=3;}C(t){this.element[this.name]=t===w?void 0:t;}}const k=i$1?i$1.emptyScript:"";class H extends S{constructor(){super(...arguments),this.type=4;}C(t){t&&t!==w?this.element.setAttribute(this.name,k):this.element.removeAttribute(this.name);}}class I extends S{constructor(t,i,s,e,o){super(t,i,s,e,o),this.type=5;}_$AI(t,i=this){var s;if((t=null!==(s=P(this,t,i,0))&&void 0!==s?s:w)===b)return;const e=this._$AH,o=t===w&&e!==w||t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive,n=t!==w&&(e===w||o);o&&this.element.removeEventListener(this.name,this,e),n&&this.element.addEventListener(this.name,this,t),this._$AH=t;}handleEvent(t){var i,s;"function"==typeof this._$AH?this._$AH.call(null!==(s=null===(i=this.options)||void 0===i?void 0:i.host)&&void 0!==s?s:this.element,t):this._$AH.handleEvent(t);}}class L{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s;}get _$AU(){return this._$AM._$AU}_$AI(t){P(this,t);}}const z=window.litHtmlPolyfillSupport;null==z||z(E,N),(null!==(t$1=globalThis.litHtmlVersions)&&void 0!==t$1?t$1:globalThis.litHtmlVersions=[]).push("2.2.2");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6};class i{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i;}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class e extends i{constructor(i){if(super(i),this.it=w,i.type!==t.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(r){if(r===w||null==r)return this.ft=void 0,this.it=r;if(r===b)return r;if("string"!=typeof r)throw Error(this.constructor.directiveName+"() called with a non-string value");if(r===this.it)return this.ft;this.it=r;const s=[r];return s.raw=s,this.ft={_$litType$:this.constructor.resultType,strings:s,values:[]}}}e.directiveName="unsafeHTML",e.resultType=1;

const effectiveHtml = (...args) => {
	const LitStatic = getFeature("LitStatic");
	const fn = LitStatic ? LitStatic.html : $;
	return fn(...args);
};

const litRender = (templateResult, domNode, styleStrOrHrefsArr, forStaticArea, { host } = {}) => {
	const OpenUI5Enablement = getFeature("OpenUI5Enablement");
	if (OpenUI5Enablement && !forStaticArea) {
		templateResult = OpenUI5Enablement.wrapTemplateResultInBusyMarkup(effectiveHtml, host, templateResult);
	}

	if (typeof styleStrOrHrefsArr === "string") {
		templateResult = effectiveHtml`<style>${styleStrOrHrefsArr}</style>${templateResult}`;
	} else if (Array.isArray(styleStrOrHrefsArr) && styleStrOrHrefsArr.length) {
		templateResult = effectiveHtml`${styleStrOrHrefsArr.map(href => effectiveHtml`<link type="text/css" rel="stylesheet" href="${href}">`)}${templateResult}`;
	}
	x(templateResult, domNode, { host });
};

const metadata$5 = {
	tag: "ui5-test-generic",
	properties: {
		strProp: {
			type: String,
		},
		boolProp: {
			type: Boolean,
		},
		objectProp: {
			type: Object,
		},
		noAttributeProp: {
			type: String,
			noAttribute: true,
		},
		multiProp: {
			type: String,
			multiple: true,
		},
		defaultValueProp: {
			type: String,
			defaultValue: "Hello",
		}
	},
	managedSlots: true,
	slots: {
		default: {
			type: Node,
		},
		other: {
			type: HTMLElement,
		},
		individual: {
			type: HTMLElement,
			individualSlots: true,
		},
		named: {
			type: HTMLElement,
			propertyName: "items",
		}
	}
};

class Generic extends UI5Element {
	static get metadata() {
		return metadata$5;
	}

	static get render() {
		return litRender;
	}

	static get template() {
		return element => {
			return effectiveHtml`<div><p>
				<slot></slot>
				<slot name="other"></slot>
				<slot name="individual-1"></slot>
				<slot name="individual-2"></slot>
			</p></div>`;
		};
	}

	static get styles() {
		return `:host {
                    display: inline-block;
                    border: 1px solid black;
                    color: var(--var1);
                }`;
	}

	onBeforeRendering() {}
	onAfterRendering() {}
	onEnterDOM() {}
	onExitDOM() {}
}

Generic.define();

const metadata$4 = {
	tag: "ui5-test-no-shadow",
};

class NoShadow extends UI5Element {
	static get metadata() {
		return metadata$4;
	}
}

NoShadow.define();

const metadata$3 = {
	tag: "ui5-test-parent",
	managedSlots: true,
	slots: {
		default: {
			type: Node,
			invalidateOnChildChange: {
				properties: ["prop1"]
			},
		},
		items: {
			type: HTMLElement,
			invalidateOnChildChange: {
				properties: true
			},
		}
	}
};

class Parent extends UI5Element {
	static get metadata() {
		return metadata$3;
	}

	static get render() {
		return litRender;
	}

	static get template() {
		return element => {
			return effectiveHtml`<div>
				<slot></slot>
			</div>`;
		};
	}
}

Parent.define();

const metadata$2 = {
	tag: "ui5-test-child",
	properties: {
		prop1: {
			type: String,
		},
		prop2: {
			type: String,
		},
		prop3: {
			type: String,
		},
	}
};

class Child extends UI5Element {
	static get metadata() {
		return metadata$2;
	}

	static get render() {
		return litRender;
	}

	static get template() {
		return element => {
			return effectiveHtml`<div></div>`;
		};
	}
}

Child.define();

const metadata$1 = {
	tag: "ui5-with-static-area",
	properties: {
		/**
		 * Defines whether the static area item will be rendered
		 */
		staticContent: {
			type: Boolean,
		}
	},
	slots: {

	}
};

class WithStaticArea extends UI5Element {
	static get metadata() {
		return metadata$1;
	}

	static get render() {
		return litRender;
	}

	static get template() {
		return element => {
			// access effectiveDir getter to mark control as RTL-aware (test changes dir attribute and expects rerender)
			return effectiveHtml`
				<div dir=${element.effectiveDir}>
					WithStaticArea works!
				</div>`;
		};
	}

	static get staticAreaTemplate() {
		return element => {
			return effectiveHtml`
				<div class="ui5-with-static-area-content">
					Static area content.
				</div>`;
		};
	}

	static get styles() {
		return `
			:host {
				display: inline-block;
				border: 1px solid black;
				color: red;
			}`;
	}

	async addStaticArea() {
		if (!this.staticContent) {
			return;
		}

		// Require static area item
		const staticArea = await this.getStaticAreaItemDomRef();
		this.responsivePopover = staticArea.querySelector(".ui5-with-static-area-content");
		return this.responsivePopover;
	}

	onBeforeRendering() {
		this.addStaticArea();
	}
	onAfterRendering() {}
	onEnterDOM() {}
	onExitDOM() {}
}

WithStaticArea.define();

const metadata = {
	tag: "ui5-test-generic-ext",
	properties: {
		extProp: {
			type: String,
		},
		strProp: {
			defaultValue: "Ext",
		}
	},
	slots: {
		extSlot: {
			type: HTMLElement,
		},
	}
};

class GenericExt extends Generic {
	static get metadata() {
		return metadata;
	}
}

GenericExt.define();

const fiori3 = `:root{ --var1: red; }`;
const fiori3Dark = `:root{ --var1: green; }`;
const belize = `:root{ --var1: blue; }`;
const belizeHcb = `:root{ --var1: orange; }`;
const belizeHcw = `:root{ --var1: orange; }`;
const fiori3Hcb = `:root{ --var1: yellow; }`;
const fiori3Hcw = `:root{ --var1: yellow; }`;
const horizon = `:root{ --var1: red; }`;
const horizonDark = `:root{ --var1: green; }`;
const horizonHcb = `:root{ --var1: yellow; }`;
const horizonHcw = `:root{ --var1: yellow; }`;

registerThemePropertiesLoader("@ui5/webcomponents-base-test", "sap_fiori_3", () => fiori3);
registerThemePropertiesLoader("@ui5/webcomponents-base-test", "sap_fiori_3_dark", () => fiori3Dark);
registerThemePropertiesLoader("@ui5/webcomponents-base-test", "sap_belize", () => belize);
registerThemePropertiesLoader("@ui5/webcomponents-base-test", "sap_belize_hcb", () => belizeHcb);
registerThemePropertiesLoader("@ui5/webcomponents-base-test", "sap_belize_hcw", () => belizeHcw);
registerThemePropertiesLoader("@ui5/webcomponents-base-test", "sap_fiori_3_hcb", () => fiori3Hcb);
registerThemePropertiesLoader("@ui5/webcomponents-base-test", "sap_fiori_3_hcw", () => fiori3Hcw);
registerThemePropertiesLoader("@ui5/webcomponents-base-test", "sap_horizon", () => horizon);
registerThemePropertiesLoader("@ui5/webcomponents-base-test", "sap_horizon_dark", () => horizonDark);
registerThemePropertiesLoader("@ui5/webcomponents-base-test", "sap_horizon_hcb", () => horizonHcb);
registerThemePropertiesLoader("@ui5/webcomponents-base-test", "sap_horizon_hcw", () => horizonHcw);

const ua = navigator.userAgent;
const ie = /(msie|trident)/i.test(ua);
const chrome = !ie && /(Chrome|CriOS)/.test(ua);
!ie && !chrome && /(Version|PhantomJS)\/(\d+\.\d+).*Safari/.test(ua);
!ie && /webkit/.test(ua);
const windows = navigator.platform.indexOf("Win") !== -1;
navigator.platform.match(/iPhone|iPad|iPod/) || (navigator.userAgent.match(/Mac/) && "ontouchend" in document);
const android = !windows && /Android/.test(ua);
android && /(?=android)(?=.*mobile)/i.test(ua);
/ipad/i.test(ua) || (/Macintosh/i.test(ua) && "ontouchend" in document);
const isIE = () => ie;

const messageFormatRegEX = /('')|'([^']+(?:''[^']*)*)(?:'|$)|\{([0-9]+(?:\s*,[^{}]*)?)\}|[{}]/g;

const formatMessage = (text, values) => {
	values = values || [];

	return text.replace(messageFormatRegEX, ($0, $1, $2, $3, offset) => {
		if ($1) {
			return '\''; /* eslint-disable-line */
		}

		if ($2) {
			return $2.replace(/''/g, '\''); /* eslint-disable-line */
		}

		if ($3) {
			return String(values[parseInt($3)]);
		}

		throw new Error(`[i18n]: pattern syntax error at pos ${offset}`);
	});
};

const I18nBundleInstances = new Map();

/**
 * @class
 * @public
 */
class I18nBundle {
	constructor(packageName) {
		this.packageName = packageName;
	}

	/**
	 * Returns a text in the currently loaded language
	 *
	 * @public
	 * @param {Object|String} textObj key/defaultText pair or just the key
	 * @param params Values for the placeholders
	 * @returns {*}
	 */
	getText(textObj, ...params) {
		if (typeof textObj === "string") {
			textObj = { key: textObj, defaultText: textObj };
		}

		if (!textObj || !textObj.key) {
			return "";
		}

		const bundle = getI18nBundleData(this.packageName);
		if (bundle && !bundle[textObj.key]) {
			console.warn(`Key ${textObj.key} not found in the i18n bundle, the default text will be used`); // eslint-disable-line
		}
		const messageText = bundle && bundle[textObj.key] ? bundle[textObj.key] : (textObj.defaultText || textObj.key);

		return formatMessage(messageText, params);
	}
}

const getI18nBundleSync = packageName => {
	if (I18nBundleInstances.has(packageName)) {
		return I18nBundleInstances.get(packageName);
	}

	const i18nBundle = new I18nBundle(packageName);
	I18nBundleInstances.set(packageName, i18nBundle);
	return i18nBundle;
};

/**
 * Fetches and returns the I18nBundle instance for the given package
 *
 * @public
 * @param packageName
 * @returns {Promise<I18nBundle>}
 */
const getI18nBundle = async packageName => {

	await fetchI18nBundle(packageName);
	return getI18nBundleSync(packageName);
};

let animationMode;

const getAnimationMode = () => {
	if (animationMode === undefined) {
		animationMode = getAnimationMode$1();
	}

	return animationMode;
};

/**
 * Different calendar types.
 */
const CalendarTypes = {
	Gregorian: "Gregorian",
	Islamic: "Islamic",
	Japanese: "Japanese",
	Buddhist: "Buddhist",
	Persian: "Persian",
};

class CalendarType extends DataType {
	static isValid(value) {
		return !!CalendarTypes[value];
	}
}

CalendarType.generateTypeAccessors(CalendarTypes);

let calendarType;

const getCalendarType = () => {
	if (calendarType === undefined) {
		calendarType = getCalendarType$1();
	}

	if (CalendarType.isValid(calendarType)) {
		return calendarType;
	}

	return CalendarType.Gregorian;
};

let formatSettings;

const getFirstDayOfWeek = () => {
	if (formatSettings === undefined) {
		formatSettings = getFormatSettings();
	}

	return formatSettings.firstDayOfWeek;
};

const eventProvider = new EventProvider();
const DIR_CHANGE = "directionChange";

const fireDirectionChange = () => {
	return eventProvider.fireEvent(DIR_CHANGE);
};

/**
 * Re-renders all RTL-aware UI5 Elements.
 * Call this method whenever you change the "dir" property anywhere in your HTML page
 * Example: document.body.dir = "rtl"; applyDirection();
 *
 * @returns {Promise<void>}
 */
const applyDirection = async () => {
	const listenersResults = fireDirectionChange();
	await Promise.all(listenersResults);
	await reRenderAllUI5Elements({ rtlAware: true });
};

window.isIE = isIE; // attached to the window object for testing purposes

// used for tests - to register a custom theme
window.registerThemePropertiesLoader = registerThemePropertiesLoader;

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
	getIconNames: _getRegisteredNames,
	registerI18nLoader,
	getI18nBundle,
	renderFinished,
	applyDirection,
	EventProvider,
};
//# sourceMappingURL=bundle.esm.js.map
