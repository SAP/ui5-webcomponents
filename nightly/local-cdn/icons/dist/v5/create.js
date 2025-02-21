import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "create";
const pathData = "M374 256q11 0 18.5 7.5T400 282v204q0 11-7.5 18.5T374 512H42q-11 0-18.5-7.5T16 486V192q0-10 6-17L165 9q6-9 19-9h62q11 0 18.5 7.5T272 26t-7.5 18-18.5 7h-50l-20 24v66q0 21-15 36t-36 15H75l-8 9v260h282V282q0-11 7-18.5t18-7.5zM482 59q14 2 14 16 0 7-4 11l-35 38 8 54q0 6-5 10t-11 4q-2 0-8-2l-41-23-41 23q-6 2-8 2-6 0-11-4t-5-10l8-54-35-38q-4-4-4-11 0-14 14-16l48-7 19-42q4-10 15-10t15 10l19 42z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/create";
export { pathData, ltr, accData };