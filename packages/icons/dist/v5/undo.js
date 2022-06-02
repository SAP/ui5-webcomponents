import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import { ICON_UNDO } from "../generated/i18n/i18n-defaults.js";

const name = "undo";
const pathData = "M180.5 308q-7 8-18 8t-18-8l-101-101q-11-7-11-21 0-8 3.5-12t7.5-9l101-101q8-8 18-8t18 8q8 7 8 18t-8 19l-59 59h228q27 0 51 10t41.5 27.5 27.5 41.5 10 51-10 51-27.5 41.5-41.5 27.5-51 10h-98q-11 0-18.5-7t-7.5-19q0-11 7.5-18.5t18.5-7.5h98q33 0 55.5-22.5t22.5-55.5-22.5-55.5-55.5-22.5h-228l59 60q8 7 8 18t-8 18z";
const ltr = false;
const accData = ICON_UNDO;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, accData, collection, packageName });

export default "undo";
export { pathData, ltr, accData };