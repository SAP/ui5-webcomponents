import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import { ICON_RESPONSE } from "../generated/i18n/i18n-defaults.js";

const name = "response";
const pathData = "M40 160L168 32q7-7 18-7t18 7 7 18-7 18l-84 85h78q59 0 110 22.5t89.5 60.5 60.5 89.5T480 435v51q0 11-7 18.5t-18 7.5-18.5-7.5T429 486v-51q0-48-18-90t-49.5-73.5T288 222t-90-18h-78l97 97q7 7 7 18t-7 18q-8 8-18 8t-18-8L40 196q-8-8-8-18t8-18z";
const ltr = false;
const accData = ICON_RESPONSE;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, accData, collection, packageName });

export default "response";
export { pathData, ltr, accData };