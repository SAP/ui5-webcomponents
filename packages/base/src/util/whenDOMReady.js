// SPDX-FileCopyrightText: SAP SE <https://sap.com>
//
// SPDX-License-Identifier: Apache-2.0

const whenDOMReady = () => {
	return new Promise(resolve => {
		if (document.body) {
			resolve();
		} else {
			document.addEventListener("DOMContentLoaded", () => {
				resolve();
			});
		}
	});
};

export default whenDOMReady;
