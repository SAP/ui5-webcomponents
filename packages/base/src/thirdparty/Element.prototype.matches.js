// SPDX-FileCopyrightText: SAP SE <https://sap.com>
//
// SPDX-License-Identifier: Apache-2.0

if (Element && !Element.prototype.matches) {
	var proto = Element.prototype;
	proto.matches = proto.matchesSelector ||
		proto.mozMatchesSelector || proto.msMatchesSelector ||
		proto.oMatchesSelector || proto.webkitMatchesSelector;
}
