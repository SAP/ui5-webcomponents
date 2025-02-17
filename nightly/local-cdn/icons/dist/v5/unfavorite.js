import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "unfavorite";
const pathData = "M256 379q7 0 13 3l97 54-20-114q0-7 1-12t6-10l81-85-112-16q-13-1-20-14L256 85l-46 100q-7 13-19 14L78 215l81 85q5 5 6 10t1 12l-20 114 97-54q6-3 13-3zm144 131q-7 0-13-3l-131-73-131 73q-6 3-13 3-11 0-18.5-7T86 485q0-2 .5-2.5t.5-2.5l26-154L7 214q-7-6-7-17 0-10 6.5-17t15.5-9l147-21 64-137q7-15 23-15t23 15l64 137 147 21q9 2 15.5 9t6.5 17q0 11-7 17L399 326l26 154q0 2 .5 2.5t.5 2.5q0 11-7.5 18t-18.5 7z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/unfavorite";
export { pathData, ltr, accData };