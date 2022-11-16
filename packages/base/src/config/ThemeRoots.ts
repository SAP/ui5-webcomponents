import createLinkInHead from "../util/createLinkInHead.js";
import validateThemeRoot from "../validateThemeRoot.js";
import { getThemeRoot as getConfiguredThemeRoot } from "../InitialConfiguration.js";

let themeRoot: string | undefined;

const getThemeRoot = (): string | undefined => {
	if (themeRoot === undefined) {
		themeRoot = getConfiguredThemeRoot();
	}

	return themeRoot;
};

const setThemeRoot = (theme: string, newThemeRoot: string) => {
	themeRoot = validateThemeRoot(newThemeRoot);

	if (themeRoot) {
		attachCustomThemeStylesToHead(theme);
	}
};

const formatThemeLink = (theme: string) => {
	return `${getThemeRoot()!}Base/baseLib/${theme}/css_variables.css`; // theme root is always set.
};

const attachCustomThemeStylesToHead = async (theme: string) => {
	const link = document.querySelector(`[sap-ui-webcomponents-theme="${theme}"]`);

	if (link) {
		document.head.removeChild(link);
	}

	await createLinkInHead(formatThemeLink(theme), { "sap-ui-webcomponents-theme": theme });
};

export {
	getThemeRoot,
	setThemeRoot,
	attachCustomThemeStylesToHead,
};
