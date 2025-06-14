import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "communication-path";
const pathData = "M28.75 509c-6 0-13-2-18-7-9-10-9-27 0-36l456-456c5-5 12-8 18-8 7 0 14 3 18 8 10 10 10 26 0 35l-456 457c-5 5-11 7-18 7z";
const ltr = false;
const accData = null;
const collection = "tnt-v3";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v3/communication-path";
export { pathData, ltr, accData };