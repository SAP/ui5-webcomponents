import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "ad-hoc-marker";
const pathData = "M501 183q10 0 10 9v4q0 39-10 66.5t-26 44-37 24-44 7.5q-16 0-31.5-2.5T330 328t-38-14-47-21q-36-17-65.5-31T121 248q-26 0-41.5 18T61 326q-2 9-10 9H11q-10 0-10-10v-1q0-72 34.5-108t85.5-36q17 0 32 2.5t31.5 8T266 226q38 19 69 31.5t60 12.5q26 0 39.5-20t15.5-58q0-9 9-9h42z";
const ltr = false;
const accData = null;
const collection = "tnt-v2";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v2/ad-hoc-marker";
export { pathData, ltr, accData };