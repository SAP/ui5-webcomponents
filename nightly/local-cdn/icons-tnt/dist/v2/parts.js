import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "parts";
const pathData = "M32 263V155q0-11 8-19t19-8h87q-8-16-8-32 0-1 .5-10.5t9-23 24-22T206 32q17 0 31 9.5t22 24 8.5 23.5.5 11q0 14-8 28h87q11 0 19 8t8 19v98q19-14 41-14 23 0 41 14.5t23 37.5q1 7 1 14 0 24-15 42-19 25-50 25-23 0-41-15v96q0 11-8 19t-19 8H59q-11 0-19-8t-8-19V328q0-5 5-7h2q6 0 7 3 15 23 42 23 23 0 39-19 11-14 11-32 0-6-1-12-4-18-17.5-29T88 244q-28 0-42 23-1 3-7 3h-2q-5-2-5-7z";
const ltr = false;
const accData = null;
const collection = "tnt-v2";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v2/parts";
export { pathData, ltr, accData };