// SPDX-FileCopyrightText: SAP SE <https://sap.com>
//
// SPDX-License-Identifier: Apache-2.0

import { getCustomCSS, attachCustomCSSChange } from "./CustomStyle.js";
import getStylesString from "./getStylesString.js";

const effectiveStyleMap = new Map();

attachCustomCSSChange(tag => {
	effectiveStyleMap.delete(tag);
});

const getEffectiveStyle = ElementClass => {
	const tag = ElementClass.getMetadata().getTag();

	if (!effectiveStyleMap.has(tag)) {
		const customStyle = getCustomCSS(tag) || "";
		const builtInStyles = getStylesString(ElementClass.styles);
		const effectiveStyle = `${builtInStyles} ${customStyle}`;
		effectiveStyleMap.set(tag, effectiveStyle);
	}

	return effectiveStyleMap.get(tag);
};

export default getEffectiveStyle;
