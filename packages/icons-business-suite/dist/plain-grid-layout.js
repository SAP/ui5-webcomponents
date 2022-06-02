import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "plain-grid-layout";
const pathData = "M512 0v512H0V0h512zM32 32v448h448V32H32z";
const ltr = false;
const accData = null;
const collection = "business-suite";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "plain-grid-layout";
export { pathData, ltr, accData };