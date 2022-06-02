import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "top-panel-layout";
const pathData = "M0 512V0h512v512H0zM32 32v96h448V32H32zm0 448h448V160H32v320z";
const ltr = false;
const accData = null;
const collection = "business-suite";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "top-panel-layout";
export { pathData, ltr, accData };