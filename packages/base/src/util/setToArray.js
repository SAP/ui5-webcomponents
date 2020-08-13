// SPDX-FileCopyrightText: SAP SE <https://sap.com>
//
// SPDX-License-Identifier: Apache-2.0

// This is needed as IE11 doesn't have Set.prototype.keys/values/entries, so [...mySet.values()] is not an option
const setToArray = s => {
	const arr = [];
	s.forEach(item => {
		arr.push(item);
	});
	return arr;
};

export default setToArray;
