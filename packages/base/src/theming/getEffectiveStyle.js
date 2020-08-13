// SPDX-FileCopyrightText: SAP SE <https://sap.com>
//
// SPDX-License-Identifier: Apache-2.0

import { getCustomCSS } from "./CustomStyle.js";
import getStylesString from "./getStylesString.js";

const getEffectiveStyle = ElementClass => {
	const tag = ElementClass.getMetadata().getTag();
	const customStyle = getCustomCSS(tag) || "";

	const builtInStyles = getStylesString(ElementClass.styles);
	return `${builtInStyles} ${customStyle}`;
};

export default getEffectiveStyle;
