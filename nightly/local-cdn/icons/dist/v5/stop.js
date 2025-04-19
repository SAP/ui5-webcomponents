import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "stop";
const pathData = "M256 0q53 0 100 20t81.5 54.5T492 156t20 100-20 100-54.5 81.5T356 492t-100 20-100-20-81.5-54.5T20 356 0 256t20-100 54.5-81.5T156 20 256 0zm0 461q43 0 80.5-16t65-44 43.5-65 16-80-16-80.5-43.5-65-65-43.5T256 51t-80 16-65 43.5-44 65T51 256t16 80 44 65 65 44 80 16zm64-301q14 0 23 9t9 23v128q0 14-9 23t-23 9H192q-14 0-23-9.5t-9-22.5V192q0-14 9-23t23-9h128z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/stop";
export { pathData, ltr, accData };