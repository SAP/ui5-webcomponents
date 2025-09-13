import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "away";
const pathData = "M256 0q53 0 100 20t81.5 55 54.5 81.5 20 99.5-20 99.5-54.5 81.5-81.5 55-100 20-99.5-20T75 437t-55-81.5T0 256t20-99.5T75 75t81.5-55T256 0zm128 288q18 0 30.5-7t12.5-25q0-17-12.5-24.5T384 224h-96v-96q0-18-7-30.5T256 85q-17 0-24.5 12.5T224 128v128q0 18 7.5 25t24.5 7h128z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v4/away";
export { pathData, ltr, accData };