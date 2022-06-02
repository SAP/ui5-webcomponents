import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "less";
const pathData = "M444 215q16 0 26 10t10 26q0 17-10 27t-26 10H69q-17 0-27-10t-10-27q0-16 10-26t27-10h375z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "less";
export { pathData, ltr, accData };