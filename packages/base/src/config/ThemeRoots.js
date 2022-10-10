import createLinkInHead from "../util/createLinkInHead.js";
import validateThemeRoot from "../validateThemeRoot.js";
import { getThemeRoot as getConfiguredThemeRoot } from "../InitialConfiguration.js";

let themeRoot;

const getThemeRoot = () => {
	if (themeRoot === undefined) {
		themeRoot = getConfiguredThemeRoot();
	}

	return themeRoot;
};

const setThemeRoot = (theme, newThemeRoot) => {
	themeRoot = validateThemeRoot(newThemeRoot);

	attachCustomThemeStylesToHead(theme);
};

const formatThemeLink = theme => {
	return `${getThemeRoot()}Base/baseLib/${theme}/css_variables.css`;
};

const attachCustomThemeStylesToHead = async theme => {
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
