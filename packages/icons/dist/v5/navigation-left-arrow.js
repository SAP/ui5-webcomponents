import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "navigation-left-arrow";
const pathData = "M340 358q9 9 9 22 0 11-9 22-10 9-22 9-13 0-22-9L172 278q-9-11-9-22 0-13 9-22l124-124q9-9 22-9 12 0 22 9 9 9 9 22 0 11-9 22L237 256z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "navigation-left-arrow";
export { pathData, ltr, accData };