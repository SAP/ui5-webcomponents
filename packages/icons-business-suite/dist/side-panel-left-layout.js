import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "side-panel-left-layout";
const pathData = "M0 512V0h512v512H0zm480-32V32H160v448h320zM32 32v448h96V32H32z";
const ltr = false;
const accData = null;
const collection = "business-suite";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "side-panel-left-layout";
export { pathData, ltr, accData };