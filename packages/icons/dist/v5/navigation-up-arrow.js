import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "navigation-up-arrow";
const pathData = "M156.5 340q-9 9-22 9-11 0-22-9-9-11-9-22 0-13 9-22l124-124q11-9 22-9 13 0 22 9l124 124q9 9 9 22 0 11-9 22-9 9-22 9-11 0-22-9l-102-103z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "navigation-up-arrow";
export { pathData, ltr, accData };