// SPDX-FileCopyrightText: SAP SE <https://sap.com>
//
// SPDX-License-Identifier: Apache-2.0

if (!Map.prototype.keys) {
	Map.prototype.keys = function() {
		var keys = [];
		this.forEach(function(value, key) {
			keys.push(key);
		});
		return keys;
	}
}
