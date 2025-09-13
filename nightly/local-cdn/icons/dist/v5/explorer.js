import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "explorer";
const pathData = "M256 0q53 0 100 20t81.5 54.5T492 156t20 100-20 100-54.5 81.5T356 492t-100 20-100-20-81.5-54.5T20 356 0 256t20-100 54.5-81.5T156 20 256 0zm0 461q43 0 80.5-16t65-44 43.5-65 16-80-16-80.5-43.5-65-65-43.5T256 51t-80 16-65 43.5-44 65T51 256t16 80 44 65 65 44 80 16zm0-301q-14 0-23-9t-9-23 9-23 23-9 23 9 9 23-9 23-23 9zm89-28q5-4 13-4 11 0 18.5 7.5T384 154q0 8-4 13l-76 128-9 9-128 76q-5 4-13 4-11 0-18.5-7.5T128 358q0-8 4-13l76-128 9-9z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/explorer";
export { pathData, ltr, accData };