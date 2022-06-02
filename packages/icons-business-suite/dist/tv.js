import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "tv";
const pathData = "M512 60v324H0V60h512zM32 92v260h448V92H32zm32 228V124h384v196H64zm312 80v32h-60v-32h60zm-180 0v32h-60v-32h60zM86 480v-32h340v32H86z";
const ltr = false;
const accData = null;
const collection = "business-suite";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tv";
export { pathData, ltr, accData };