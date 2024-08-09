import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "communication-path";
const pathData = "M36.875 453l416-416c7-7 15-7 22 0s7 15 0 22l-416 416c-7 7-15 7-22 0s-7-15 0-22z";
const ltr = false;
const accData = null;
const collection = "tnt-v3";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v3/communication-path";
export { pathData, ltr, accData };