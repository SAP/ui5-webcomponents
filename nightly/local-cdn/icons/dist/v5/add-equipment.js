import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "add-equipment";
const pathData = "M486 86q11 0 18.5 7.5T512 112t-7.5 18.5T486 138h-60v60q0 11-7.5 18.5T400 224t-18.5-7.5T374 198v-60h-60q-11 0-18.5-7.5T288 112t7.5-18.5T314 86h60V26q0-11 7.5-18.5T400 0t18.5 7.5T426 26v60h60zm-45 320q7 7 7 18t-7 18l-63 63q-9 7-18 7-11 0-18-7L158 321q-13 3-28 3-27 0-50.5-10T38 286t-28-41.5T0 194q0-8 1-19.5t5-22 10.5-18T34 127q12 0 18 7l45 45 18-18-45-45q-7-7-7-18t7.5-17.5 18-10.5 22-5 19.5-1q27 0 50.5 10t41.5 28 28 41.5 10 50.5q0 14-3 28zM52 206q5 29 27 48t51 19q33 0 56-23.5t23-55.5q0-29-19-51t-48-27l27 27q8 8 8 18t-8 18l-54 54q-7 7-18 7t-18-7zm334 218L234 272q-11 15-26 26l152 152z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/add-equipment";
export { pathData, ltr, accData };