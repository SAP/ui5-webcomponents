import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "text-align-left";
const pathData = "M64 64h368q16 0 16 16t-16 16H64V64zm0 96h176q16 0 16 16t-16 16H64v-32zm0 96h368q16 0 16 16t-16 16H64v-32zm0 128v-32h176q16 0 16 16t-16 16H64zm368 64q16 0 16 16t-16 16H64v-32h368z";
const ltr = true;
const accData = null;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v4/text-align-left";
export { pathData, ltr, accData };