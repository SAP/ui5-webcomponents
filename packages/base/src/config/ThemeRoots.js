import { getThemeRoots as getConfiguredThemeRoots } from "../InitialConfiguration.js";
import createLinkInHead from "../util/createLinkInHead.js";
import removeLinkFromHead from "../util/removeLinkFromHead.js";
import applyTheme from "../theming/applyTheme.js";
import { getTheme } from "./Theme.js";

// {
//     "custom_theme": "url"
//     "custom_theme2": {
//         "sap.ui.core": "url"
//     }
// }

let themeRoots;

const getThemeRoot = theme => {
	return getThemeRoots()[theme];
};

const getThemeRoots = () => {
	if (themeRoots === undefined) {
		themeRoots = getConfiguredThemeRoots();
	}

	return themeRoots;
};

const setThemeRoot = (theme, themeRoot) => {
	themeRoot += (themeRoot.slice(-1) === "/" ? "" : "/");

	themeRoots[theme] = themeRoot;

	attachStylesToHead();
};

const formatThemeLink = theme => {
	return `${themeRoots[theme]}Base/baseLib/${theme}/css_variables.css`;
};

const createThemeLink = theme => {
	createLinkInHead(formatThemeLink(theme), { "sap-ui-webcomponents-theme": theme }, () => {
		applyTheme(getTheme());
	});
};

const attachOrUpdateThemeLink = theme => {
	const link = document.querySelector(`[sap-ui-webcomponents-theme="${theme}"]`);

	if (link) {
		removeLinkFromHead(link);
	}

	createThemeLink(theme);
};

const attachStylesToHead = () => {
	const customThemeRoots = Object.keys(getThemeRoots());

	customThemeRoots.forEach(theme => {
		if (typeof theme === "string") {
			attachOrUpdateThemeLink(theme);
		}
	});
};

export {
	getThemeRoot,
	setThemeRoot,
	attachStylesToHead,
};
