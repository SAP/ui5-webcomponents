import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "favorite";
const pathData = "M0 198q0-9 6-16t16-9l147-21 64-137q7-15 23-15t23 15l64 137 147 21q10 2 16 9t6 16q0 11-7 18L399 328l26 154q0 2 .5 2.5t.5 1.5q0 11-7.5 18.5T400 512q-7 0-12-3l-132-74-132 74q-4 3-12 3-11 0-18.5-7.5T86 486q0-1 .5-1.5t.5-2.5l26-154L7 216q-7-7-7-18z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/favorite";
export { pathData, ltr, accData };