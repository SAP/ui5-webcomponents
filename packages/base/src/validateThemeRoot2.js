const getMetaTagValue = metaTagName => {
	const metaTag = document.querySelector(`META[name="${metaTagName}"]`),
		metaTagContent = metaTag && metaTag.getAttribute("content");

	return metaTagContent;
};

const validateThemeOrigin = origin => {
	const allowedOrigins = getMetaTagValue("sap-allowedThemeOrigins");

	return allowedOrigins && allowedOrigins.split(",").some(allowedOrigin => {
		return allowedOrigin === "*" || origin === allowedOrigin.trim();
	});
};

const buildCorrectUrl = (oldUrl, newOrigin) => {
	const oldUrlPath = new URL(oldUrl).pathname;

	return new URL(oldUrlPath, newOrigin).toString();
};

const validateThemeRoot = themeRoot => {
	let themeRootURL,
		resultUrl;

	try {
		themeRootURL = new URL(themeRoot);

		const origin = themeRootURL.origin;

		themeRootURL = themeRootURL.toString();

		if (themeRootURL.startsWith(".") || themeRootURL.startsWith("/")) {
			// Handle relative url
			// new URL("/newExmPath", "http://example.com/exmPath") => http://example.com/newExmPath
			// new URL("./newExmPath", "http://example.com/exmPath") => http://example.com/exmPath/newExmPath
			// new URL("../newExmPath", "http://example.com/exmPath") => http://example.com/newExmPath
			resultUrl = new URL(themeRootURL, window.location.href).toString();
		} else if (origin && validateThemeOrigin(origin)) {
			// If origin is allowed, use it
			resultUrl = themeRootURL.toString();
		} else {
			// If origin is not allow and the URL is not relative, we have to replace the origin
			// with current location
			resultUrl = buildCorrectUrl(themeRootURL, window.location.href);
		}

		if (!resultUrl.endsWith("/")) {
			resultUrl = `${resultUrl}/`;
		}

		return `${resultUrl}UI5/`;
	} catch (e) {
		// Catch if URL is not correct
	}
};

export default validateThemeRoot;
