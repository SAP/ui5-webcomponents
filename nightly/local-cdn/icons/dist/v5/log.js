import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "log";
const pathData = "M256 256q-11 0-18.5-7.5T230 230V26q0-11 7.5-18.5T256 0t18.5 7.5T282 26v204q0 11-7.5 18.5T256 256zm0 256q-53 0-100-20t-81.5-54.5T20 356 0 256q0-67 31-125t82-90q9-6 13.5-7.5T134 32q11 0 18.5 7.5T160 58q0 13-12 21-46 29-71.5 76T51 256q0 43 16 80t44 65 65 44 80 16 80.5-16 65-44 43.5-65 16-80q0-54-26-101t-71-76q-12-8-12-21 0-11 7.5-18.5T378 32q3 0 7.5 1.5T399 41q51 32 82 90t31 126q0 53-20 99.5t-54.5 81T356 492t-100 20z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/log";
export { pathData, ltr, accData };