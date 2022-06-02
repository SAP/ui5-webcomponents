import { DEFAULT_LOCALE } from "../generated/AssetParameters.js";

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

export default nextFallbackLocale;
