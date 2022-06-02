import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "vertical-grip";
const pathData = "M324.5 1q21 0 36 15t15 36-15 36-36 15q-22 0-37-15t-15-36 15-36 37-15zm0 136q21 0 36 15t15 36q0 22-15 36.5t-36 14.5q-22 0-37-14.5t-15-36.5q0-21 15-36t37-15zm-137 0q21 0 36 15t15 36q0 22-15 36.5t-36 14.5-36-14.5-15-36.5q0-21 15-36t36-15zm0-136q21 0 36 15t15 36-15 36-36 15-36-15-15-36 15-36 36-15zm137 409q21 0 36 15t15 36-15 36-36 15q-22 0-37-15t-15-36 15-36 37-15zm0-137q21 0 36 15t15 37q0 21-15 36t-36 15q-22 0-37-15t-15-36q0-22 15-37t37-15zm-137 0q21 0 36 15t15 37q0 21-15 36t-36 15-36-15-15-36q0-22 15-37t36-15zm0 137q21 0 36 15t15 36-15 36-36 15-36-15-15-36 15-36 36-15z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "vertical-grip";
export { pathData, ltr, accData };