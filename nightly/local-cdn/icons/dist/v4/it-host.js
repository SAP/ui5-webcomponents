import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "it-host";
const pathData = "M384 0q14 0 23 9t9 23v448q0 14-9 23t-23 9H128q-14 0-23-9t-9-23V32q0-14 9-23t23-9h256zm0 32H128v448h256V32zM176 448q-16 0-16-16t16-16h160q16 0 16 16t-16 16H176zm0-64q-16 0-16-16t16-16h160q16 0 16 16t-16 16H176zm128-224q-20 0-34-14t-14-34 14-34 34-14 34 14 14 34-14 34-34 14z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v4/it-host";
export { pathData, ltr, accData };