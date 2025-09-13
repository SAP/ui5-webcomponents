import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "machine";
const pathData = "M0 128L192 0h96v96l128 68v60H288v128H32v-64H0V128zm32 17v111h32v64h192V192h128v-9l-128-68V32h-55zM0 384h448q26 0 45 19t19 45-19 45-45 19H0v-32h448q13 0 22.5-9.5T480 448q0-14-9.5-23t-22.5-9H0v-32zm320-128h96v96h-96v-96z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v4/machine";
export { pathData, ltr, accData };