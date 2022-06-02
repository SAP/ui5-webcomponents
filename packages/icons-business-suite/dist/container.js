import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "container";
const pathData = "M0 448V80h512v368H0zm32-32h448V112H32v304zm288-32V144h32v240h-32zm80 0V144h32v240h-32zm-160 0V144h32v240h-32zm-80 0V144h32v240h-32zM80 144h32v240H80V144z";
const ltr = false;
const accData = null;
const collection = "business-suite";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "container";
export { pathData, ltr, accData };