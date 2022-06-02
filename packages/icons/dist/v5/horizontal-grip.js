import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "horizontal-grip";
const pathData = "M460.5 138q21 0 36 15t15 36-15 36-36 15-36-15-15-36 15-36 36-15zm-136 0q21 0 36 15t15 36-15 36-36 15-36-15-15-36 15-36 36-15zm-136 0q21 0 36 15t15 36-15 36-36 15q-22 0-37-15t-15-36 15-36 37-15zm-137 0q22 0 36.5 15t14.5 36T88 225t-36.5 15q-21 0-36-15t-15-36 15-36 36-15zm409 136q21 0 36 15t15 37q0 21-15 36t-36 15-36-15-15-36q0-22 15-37t36-15zm-136 0q21 0 36 15t15 37q0 21-15 36t-36 15-36-15-15-36q0-22 15-37t36-15zm-136 0q21 0 36 15t15 37q0 21-15 36t-36 15q-22 0-37-15t-15-36q0-22 15-37t37-15zm-137 0q22 0 36.5 15t14.5 37q0 21-14.5 36t-36.5 15q-21 0-36-15t-15-36q0-22 15-37t36-15z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "horizontal-grip";
export { pathData, ltr, accData };