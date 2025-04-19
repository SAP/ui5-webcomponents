import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import { ICON_SORT } from "../generated/i18n/i18n-defaults.js";

const name = "sort";
const pathData = "M504 124q8 8 8 18 0 11-7.5 18.5T486 168t-18-7l-42-42v335q0 11-7.5 18.5T400 480t-18-7.5-7-18.5V118l-43 43q-7 7-18 7t-18.5-7.5T288 142q0-10 8-18l86-85q7-7 18-7t18 7zM180 351q7-7 18-7t18.5 7.5T224 370q0 10-8 18l-86 85q-7 7-18 7t-18-7L8 388q-8-8-8-18 0-11 7.5-18.5T26 344t18 7l43 43V58q0-11 7.5-18.5T113 32t18 7.5 7 18.5v335z";
const ltr = false;
const accData = ICON_SORT;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, accData, collection, packageName });

export default "SAP-icons-v5/sort";
export { pathData, ltr, accData };