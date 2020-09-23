let ponyfillTimer;

const ponyfillNeeded = () => !!window.CSSVarsPonyfill;

const runPonyfill = () => {
	ponyfillTimer = undefined;

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
