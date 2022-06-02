import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "checklist-item";
const pathData = "M0 288V0h512v288L256 512z";
const ltr = false;
const accData = null;
const collection = "business-suite";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "checklist-item";
export { pathData, ltr, accData };