import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "media-forward";
const pathData = "M500 233q12 8 12 24 0 7-3.5 14.5T500 281L318 402q-7 5-15 5t-15-2q-15-10-15-27V136q0-17 15-27 7-5 15-4.5t15 7.5zm-70 27l-97-66v130zm-202-27q12 8 12 24 0 7-3.5 14.5T228 281L46 402q-7 5-15 5t-15-2Q1 395 1 378V136q0-17 15-27 7-5 15-4.5t15 7.5zm-70 27l-97-66v130z";
const ltr = true;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "media-forward";
export { pathData, ltr, accData };