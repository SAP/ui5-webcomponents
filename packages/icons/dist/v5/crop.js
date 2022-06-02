import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import { ICON_CROP } from "../generated/i18n/i18n-defaults.js";

const name = "crop";
const pathData = "M210 139q-11 0-17.5-6t-6.5-17 6.5-17.5T210 92h139q29 0 49.5 20.5T419 162v140q0 10-6.5 16.5T395 325t-17-6.5-6-16.5V162q0-23-23-23H210zm278 232q11 0 17.5 6t6.5 17-6.5 17.5T488 418h-69v69q0 11-6.5 17.5T395 511t-17-6.5-6-17.5v-69H163q-29 0-49.5-20.5T93 348V139H24q-23 0-23-23 0-11 6-17.5T24 92h69V23q0-11 6.5-17T117 0q23 0 23 23v325q0 23 23 23h325z";
const ltr = false;
const accData = ICON_CROP;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, accData, collection, packageName });

export default "crop";
export { pathData, ltr, accData };