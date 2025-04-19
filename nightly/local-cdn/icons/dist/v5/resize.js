import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import { ICON_RESIZE } from "../generated/i18n/i18n-defaults.js";

const name = "resize";
const pathData = "M486 0q11 0 18.5 7.5T512 26v108q0 11-7.5 18.5T486 160t-18-7.5-7-18.5V88L87 461h47q11 0 18.5 7t7.5 18-7.5 18.5T134 512H26q-11 0-18.5-7.5T0 486V378q0-11 7.5-18.5T26 352t18 7.5 7 18.5v47L426 51h-48q-11 0-18.5-7T352 26t7.5-18.5T378 0h108zM58 256q-11 0-18.5-7.5T32 230V90q0-24 17-41t41-17h140q11 0 18.5 7.5T256 58t-7.5 18-18.5 7H90q-7 0-7 7v140q0 11-7 18.5T58 256zm396 0q11 0 18.5 7.5T480 282v140q0 24-17 41t-41 17H282q-11 0-18.5-7.5T256 454t7.5-18 18.5-7h140q7 0 7-7V282q0-11 7-18.5t18-7.5z";
const ltr = false;
const accData = ICON_RESIZE;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, accData, collection, packageName });

export default "SAP-icons-v5/resize";
export { pathData, ltr, accData };