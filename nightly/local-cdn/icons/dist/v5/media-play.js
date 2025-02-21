import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "media-play";
const pathData = "M147 108v296l200-148zm-25 372q-11 0-18.5-7.5T96 454V58q0-11 7.5-18.5T122 32q7 0 15 5l269 198q10 8 10 21t-10 21L137 475q-8 5-15 5z";
const ltr = true;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/media-play";
export { pathData, ltr, accData };