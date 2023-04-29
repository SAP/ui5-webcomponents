import createLinkInHead from "../util/createLinkInHead.js";
import validateThemeRoot from "../validateThemeRoot.js";
import { getThemeRoot as getConfiguredThemeRoot } from "../InitialConfiguration.js";
import { getTheme } from "./Theme.js";

let currThemeRoot: string | undefined;

/**
 * Returns the current theme root.
 *
 * @public
 * @since 1.13.0
 * @returns { string } the current theme root
 */
const getThemeRoot = (): string | undefined => {
	if (currThemeRoot === undefined) {
		currThemeRoot = getConfiguredThemeRoot();
	}

	return currThemeRoot;
};

/**
 * Sets theme root and loads theme styles from that location
 * for the currently used theme.
 *
 * <b>Note:</b> Certain security restrictions will apply before fetching the theme assets.
 * Absolute URLs to a different origin than the current page will result in using the current page as an origin.
 * To allow specific origins, use &lt;meta name="sap-allowedThemeOrigins" content="https://my-example-host.com/"&gt; tag inside the &lt;head&gt; of the page.
 *
 * @public
 * @since 1.13.0
 * @param { string } themeRoot the new theme root
 * @returns { Promise<void> } a promise that is resolved when &lt;link&gt; tag to the theme assets is appended to the head
 */
const setThemeRoot = (themeRoot: string): Promise<void> | undefined => {
	currThemeRoot = validateThemeRoot(themeRoot);

	if (!currThemeRoot) {
		console.warn(`The ${themeRoot} is not valid. Check the allowed origins as suggested in the "setThemeRoot" description.`); // eslint-disable-line
		return;
	}

	return attachCustomThemeStylesToHead(getTheme());
};

const formatThemeLink = (theme: string) => {
	return `${getThemeRoot()!}Base/baseLib/${theme}/css_variables.css`; // theme root is always set.
};

const attachCustomThemeStylesToHead = async (theme: string): Promise<void> => {
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
