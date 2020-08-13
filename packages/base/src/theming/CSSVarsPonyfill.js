// SPDX-FileCopyrightText: SAP SE <https://sap.com>
//
// SPDX-License-Identifier: Apache-2.0

let ponyfillTimer;

const ponyfillNeeded = () => !!window.CSSVarsPonyfill;

const runPonyfill = () => {
	ponyfillTimer = undefined;

	window.CSSVarsPonyfill.cssVars({
		rootElement: document.head,
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
