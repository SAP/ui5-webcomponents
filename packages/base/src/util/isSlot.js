// SPDX-FileCopyrightText: SAP SE <https://sap.com>
//
// SPDX-License-Identifier: Apache-2.0

const isSlot = el => el && el instanceof HTMLElement && el.localName === "slot";

export default isSlot;
