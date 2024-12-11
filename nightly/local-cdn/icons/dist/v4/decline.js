import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import { ICON_DECLINE } from "../generated/i18n/i18n-defaults.js";

const name = "decline";
const pathData = "M86 109l22-23q5-5 12-5 6 0 11 5l124 125L380 86q5-5 11-5 7 0 12 5l22 23q6 5 6 11t-6 12L301 256l124 125q6 5 6 11 0 5-6 11l-22 23q-8 5-12 5-3 0-11-5L255 301 131 426q-5 5-11 5-4 0-12-5l-22-23q-6-6-6-11 0-6 6-11l124-125L86 132q-6-6-6-12t6-11z";
const ltr = false;
const accData = ICON_DECLINE;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, accData, collection, packageName });

export default "SAP-icons-v4/decline";
export { pathData, ltr, accData };