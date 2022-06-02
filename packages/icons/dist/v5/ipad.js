import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import { ICON_IPAD } from "../generated/i18n/i18n-defaults.js";

const name = "ipad";
const pathData = "M395.5 1q29 0 49.5 20t20.5 50v371q0 30-20.5 50t-49.5 20h-279q-29 0-49-20t-20-50V71q0-30 20-50t49-20h279zm23 441V71h-325v371h325z";
const ltr = false;
const accData = ICON_IPAD;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, accData, collection, packageName });

export default "ipad";
export { pathData, ltr, accData };