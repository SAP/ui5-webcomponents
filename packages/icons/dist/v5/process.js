import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "process";
const pathData = "M181 247q0 12-9 21L52 388q-9 9-21 9t-21-9-9-21 9-21l99-99-99-99q-9-9-9-21t9-21 21-9 21 9l120 120q9 9 9 21zm171 0q0 12-9 21L223 388q-9 9-21 9t-21-9-9-21 9-21l99-99-99-99q-9-9-9-21t9-21 21-9 21 9l120 120q9 9 9 21zm150-21q9 9 9 21t-9 21L382 388q-9 9-21 9t-21-9-9-21 9-21l99-99-99-99q-9-9-9-21t9-21 21-9 21 9z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "process";
export { pathData, ltr, accData };