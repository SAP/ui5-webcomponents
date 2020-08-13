// SPDX-FileCopyrightText: SAP SE <https://sap.com>
//
// SPDX-License-Identifier: Apache-2.0

import Generic from "./Generic.js";

const metadata = {
	tag: "ui5-test-generic-ext",
	properties: {
		extProp: {
			type: String,
		},
		strProp: {
			defaultValue: "Ext",
		}
	},
	slots: {
		extSlot: {
			type: HTMLElement,
		},
	}
};

class GenericExt extends Generic {
	static get metadata() {
		return metadata;
	}
}

GenericExt.define();
