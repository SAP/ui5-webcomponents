import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "t-layout";
const pathData = "M0 512V0h512v512H0zm32-272h448V32H32v208zm240 32v208h208V272H272zM32 480h208V272H32v208z";
const ltr = false;
const accData = null;
const collection = "business-suite";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "t-layout";
export { pathData, ltr, accData };