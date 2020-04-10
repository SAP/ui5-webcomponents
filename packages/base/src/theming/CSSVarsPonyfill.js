let ponyfillTimer;

const ponyfillNeeded = () => !!window.CSSVarsPonyfill;

const runPonyfill = () => {
	ponyfillTimer = undefined;

	window.CSSVarsPonyfill.cssVars({
		rootElement: document.head,
		include: "style[data-ui5-theme-properties],link[data-ui5-theme-properties],style[data-ui5-element-styles]",
		silent: true,
	});
};

const schedulePonyfill = () => {
	if (!ponyfillTimer) {
		ponyfillTimer = window.setTimeout(runPonyfill, 0);
	}
};

export {
	ponyfillNeeded,
	runPonyfill,
	schedulePonyfill,
};
