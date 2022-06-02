import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "checklist";
const pathData = "M96.5 160V0h256v64h-160v96h-96zm128-64h256v192l-128 128-32-32V160h-96V96zm64 96v192l-128 128-128-128V192h256z";
const ltr = false;
const accData = null;
const collection = "business-suite";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "checklist";
export { pathData, ltr, accData };