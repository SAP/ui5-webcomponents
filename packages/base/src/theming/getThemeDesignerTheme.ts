type ThemeDescriptor = {
	themeName: string,
	baseThemeName?: string,
};

type ThemeMetadata = {
	Path: string,
	Extends: Array<string>,
};

const warnings = new Set<string>();

const getThemeMetadata = () => {
	// Check if the class was already applied, most commonly to the link/style tag with the CSS Variables
	let el = document.querySelector(".sapThemeMetaData-Base-baseLib") || document.querySelector(".sapThemeMetaData-UI5-sap-ui-core");
	if (el) {
		return getComputedStyle(el).backgroundImage;
	}

	el = document.createElement("span");
	(el as HTMLSpanElement).style.display = "none";

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

const parseThemeMetadata = (metadataString: string) => {
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
			return JSON.parse(paramsString) as ThemeMetadata;
		} catch (ex) {
			if (!warnings.has("parse")) {
				console.warn("Malformed theme metadata string, unable to parse JSON"); // eslint-disable-line
				warnings.add("parse");
			}
		}
	}
};

const processThemeMetadata = (metadata: ThemeMetadata): ThemeDescriptor | undefined => {
	let themeName;
	let baseThemeName;

	try {
		const pathParts = metadata.Path.split(".");
		themeName = pathParts.length === 4 ? pathParts[2] : getComputedStyle(document.body).getPropertyValue("--sapSapThemeId");
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

const getThemeDesignerTheme = (): ThemeDescriptor | undefined => {
	const metadataString = getThemeMetadata();
	if (!metadataString || metadataString === "none") {
		return;
	}

	const metadata = parseThemeMetadata(metadataString);

	if (metadata) {
		return processThemeMetadata(metadata);
	}
};

export default getThemeDesignerTheme;
export type { ThemeDescriptor };
