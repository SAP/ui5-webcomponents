import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "italic-text";
const pathData = "M160 448L288 64h-64V32h192v32h-64L224 448h64v32H96v-32h64z";
const ltr = true;
const accData = null;
const collection = "SAP-icons";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "italic-text";
export { pathData, ltr, accData };