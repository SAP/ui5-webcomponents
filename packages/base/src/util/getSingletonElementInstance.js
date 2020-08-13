// SPDX-FileCopyrightText: SAP SE <https://sap.com>
//
// SPDX-License-Identifier: Apache-2.0

const getSingletonElementInstance = (tag, parentElement = document.body) => {
	let el = document.querySelector(tag);

	if (el) {
		return el;
	}

	el = document.createElement(tag);

	return parentElement.insertBefore(el, parentElement.firstChild);
};

export default getSingletonElementInstance;
