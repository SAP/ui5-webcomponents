/**
 * Calculates the next fallback locale for the given locale.
 *
 * @param {string} locale Locale string in Java format (underscores) or null
 * @returns {string|null} Next fallback Locale or null if there is no more fallback
 */
const nextFallbackLocale = locale => {
	if (!locale) {
		return null;
	}

	if (locale === "zh_HK") {
		return "zh_TW";
	}

	// if there are multiple segments (separated by underscores), remove the last one
	const p = locale.lastIndexOf("_");
	if (p >= 0) {
		return locale.slice(0, p);
	}

	// for any language but 'en', fallback to 'en' first before falling back to the 'raw' language (empty string)
	return locale !== "en" ? "en" : "";
};

export default nextFallbackLocale;
