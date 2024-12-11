import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import { ICON_SORT_ASCENDING } from "../generated/i18n/i18n-defaults.js";

const name = "sort-ascending";
const pathData = "M353 128H161l17-32h158zm47 96H113l16-32h255zM82 288h351l15 32H65zm-48 96h446l15 32H17z";
const ltr = false;
const accData = ICON_SORT_ASCENDING;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, accData, collection, packageName });

export default "SAP-icons-v4/sort-ascending";
export { pathData, ltr, accData };