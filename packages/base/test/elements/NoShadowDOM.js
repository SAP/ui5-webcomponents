// SPDX-FileCopyrightText: SAP SE <https://sap.com>
//
// SPDX-License-Identifier: Apache-2.0

import UI5Element from "../../UI5Element.js";

const metadata = {
	tag: "ui5-test-no-shadow",
};

class NoShadow extends UI5Element {
	static get metadata() {
		return metadata;
	}
}

NoShadow.define();
