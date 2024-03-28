import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "approved";
const pathData = "M216.5 330l-49-48c-9-9-9-24 0-33 10-10 24-10 34 0l31 30 80-79c9-9 24-9 33 0 10 10 10 24 0 34l-96 96c-9 10-24 10-33 0zm-105 102h289V49h-289v383zM87.5 1h337c14 0 24 11 24 24v431c0 13-10 24-24 24h-337c-13 0-24-11-24-24V25c0-13 11-24 24-24z";
const ltr = false;
const accData = null;
const collection = "business-suite-v2";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v2/approved";
export { pathData, ltr, accData };