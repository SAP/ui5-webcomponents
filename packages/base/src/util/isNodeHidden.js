// SPDX-FileCopyrightText: SAP SE <https://sap.com>
//
// SPDX-License-Identifier: Apache-2.0

const isNodeHidden = node => {
	if (node.nodeName === "SLOT") {
		return false;
	}

	return (node.offsetWidth <= 0 && node.offsetHeight <= 0) || node.style.visibility === "hidden";
};

export default isNodeHidden;
