import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "robot";
const pathData = "M275.5 77c-21 0-39-17-39-38s18-39 39-39 38 18 38 39-17 38-38 38zm-218 218c0-121 97-218 218-218 120 0 217 97 217 218 0 120-97 217-217 217-121 0-218-97-218-217zm218-167c-92 0-167 75-167 167 0 91 75 166 167 166 91 0 166-75 166-166 0-92-75-167-166-167zm64 77c49 0 89 40 89 90 0 49-40 89-89 89h-128c-50 0-90-40-90-89 0-50 40-90 90-90h128zm0 51h-128c-22 0-39 18-39 39s17 38 39 38h128c21 0 38-17 38-38s-17-39-38-39zm-90 39c0 14-12 26-26 26s-25-12-25-26 11-26 25-26 26 12 26 26zm102 0c0 14-11 26-25 26s-26-12-26-26 12-26 26-26 25 12 25 26z";
const ltr = false;
const accData = null;
const collection = "tnt-v3";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v3/robot";
export { pathData, ltr, accData };