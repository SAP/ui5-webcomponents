import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "bell";
const pathData = "M475 374q5 7 5 16 0 11-7.5 18.5T454 416H334q-5 27-27 45.5T256 480t-51-18.5-27-45.5H58q-11 0-18.5-7.5T32 390q0-10 6-16 1-1 8-9.5T61 341t14.5-35.5T82 260v-20q0-100 45-154t129-54 129 54 45 154v20q0 25 6.5 45.5t15 35.5 15.5 23.5 8 9.5zm-69-9q-11-20-19-46.5t-8-58.5v-20q0-31-5.5-59.5t-20-50-38-34.5T256 83t-59.5 13-38 34.5-20 50T133 240v20q0 32-8 58.5T106 365h300z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/bell";
export { pathData, ltr, accData };