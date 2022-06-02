import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "media-pause";
const pathData = "M384.5 32q14 0 23 9t9 23v384q0 14-9 23t-23 9h-32q-14 0-23-9t-9-23V64q0-14 9-23t23-9h32zm-224 0q14 0 23 9t9 23v384q0 14-9 23t-23 9h-32q-14 0-23-9t-9-23V64q0-14 9-23t23-9h32z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "media-pause";
export { pathData, ltr, accData };