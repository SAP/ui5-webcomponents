import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import { ICON_IPAD } from "../generated/i18n/i18n-defaults.js";

const name = "ipad";
const pathData = "M416 0q14 0 23 9.5t9 22.5v448q0 14-9 23t-23 9H96q-14 0-23-9t-9-23V32q0-13 9-22.5T96 0h320zM256 480q10 0 17-6.5t7-17.5q0-10-7-17t-17-7-17 7-7 17q0 11 7 17.5t17 6.5zM416 64H96v352h320V64z";
const ltr = false;
const accData = ICON_IPAD;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, accData, collection, packageName });

export default "SAP-icons-v4/ipad";
export { pathData, ltr, accData };