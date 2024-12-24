import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import { ICON_LAPTOP } from "../generated/i18n/i18n-defaults.js";

const name = "laptop";
const pathData = "M486 396q11 0 18.5 7t7.5 18-7.5 19-18.5 8H26q-11 0-18.5-8T0 421t7.5-18 18.5-7h8q-2-10-2-17V132q0-29 19.5-48.5T99 64h313q28 0 48 19.5t20 48.5v247q0 7-2 17h8zM99 115q-6 0-11 5t-5 12v247q0 7 5 12t12 5h313q6 0 11-5t5-12V132q0-7-5-12t-12-5H99z";
const ltr = false;
const accData = ICON_LAPTOP;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, accData, collection, packageName });

export default "SAP-icons-v5/laptop";
export { pathData, ltr, accData };