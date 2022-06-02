import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "feeder-arrow";
const pathData = "M172 153q-9-9-9-21 0-13 9-22t22-9q12 0 21 9l124 124q10 9 10 22 0 12-10 21L215 401q-9 9-21 9-13 0-22-9t-9-22q0-12 9-21l102-102z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "feeder-arrow";
export { pathData, ltr, accData };