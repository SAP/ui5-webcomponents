import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "sidepanel";
const pathData = "M0 512V0h512v512H0zM32 32v448h320V32H32zm448 448V32h-96v448h96z";
const ltr = false;
const accData = null;
const collection = "business-suite";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "sidepanel";
export { pathData, ltr, accData };