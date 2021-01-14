let ponyfillTimer;

const ponyfillNeeded = () => !!window.CSSVarsPonyfill;

/**
 * Removes the "data-cssvars-group" attribute for all element styles and their respective out nodes.
 * CSSVarsPonyfill has internal counters for "group" and "job" and running several instances of the ponyfill may lead to issues, since these counters are not shared
 * Therefore we remove them for our "data-ui5-element-styles"
 *
 * @param rootElement
 */
const cleanPonyfillMetadata = (rootElement = document.head) => {
	rootElement.querySelectorAll(`style[data-ui5-element-styles][data-cssvars="src"]`).forEach(tag => {
		const group = tag.getAttribute("data-cssvars-group");
		tag.removeAttribute("data-cssvars-group");
		tag.disabled = false;
		const outNode = rootElement.querySelector(`style[data-cssvars="out"][data-cssvars-group="${group}"]`);
		if (outNode) {
			outNode.removeAttribute("data-cssvars-group");
		}
	});
};

const runPonyfill = () => {
	ponyfillTimer = undefined;

	cleanPonyfillMetadata();
	window.CSSVarsPonyfill.cssVars({
		rootElement: document.head,
		variables: isCompact() ? getCompactModeVars() : {},
		silent: true,
	});
};

const schedulePonyfill = () => {
	if (!ponyfillTimer) {
		ponyfillTimer = window.setTimeout(runPonyfill, 0);
	}
};

const isCompact = () => {
	const b = document.body;
	return b.hasAttribute("data-ui5-compact-size") || b.classList.contains("ui5-content-density-compact") || b.classList.contains("sapUiSizeCompact");
};

const getCompactModeVars = () => {
	const compactVars = {};
	[...document.querySelectorAll(`[data-ui5-theme-properties]`)].forEach(el => {
		const cssContent = el.textContent.replace("\n", "");
		let match;
		const regExp = new RegExp("data-ui5-compact-size[^{]*{(.*?)}", "g");
		while ((match = regExp.exec(cssContent)) !== null) { // eslint-disable-line
			const compactCSS = match[1];
			compactCSS.split(";").forEach(declaration => {
				const pair = declaration.split(":");
				compactVars[pair[0].trim()] = pair[1].trim();
			});
		}
	});

	return compactVars;
};

export {
	ponyfillNeeded,
	runPonyfill,
	schedulePonyfill,
};
