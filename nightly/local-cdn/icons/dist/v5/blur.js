import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "blur";
const pathData = "M447.882 320q2 40-13 75t-41.5 61-62 41-75.5 15-75-15-61-41-41-60-15-73l1-18q1-35 19-76.5t44-82 55.5-77 53.5-61.5q8-8 19-8t19 8q24 25 53.5 61.5t55.5 77 44 82 19 76.5zm-192 141q29 0 55.5-11t46-30.5 30.5-45 9-54.5l-1-13q-1-27-16-60.5t-36-67-45-64-43-51.5q-19 21-43 51.5t-45 64-36 67-16 60.5l-1 15q0 28 11 53.5t30 44.5 45 30 55 11z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/blur";
export { pathData, ltr, accData };