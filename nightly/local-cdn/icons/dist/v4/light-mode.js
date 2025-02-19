import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "light-mode";
const pathData = "M256 352q40 0 68-28t28-68-28-68-68-28-68 28-28 68 28 68 68 28zm-128 55l-73 73-23-23 73-73zm112 9h32v96h-32v-96zM96 272H0v-32h96v32zm160 112q-27 0-50-10t-40.5-27.5T138 306t-10-50 10-50 27.5-40.5T206 138t50-10 50 10 40.5 27.5T374 206t10 50-10 50-27.5 40.5T306 374t-50 10zm128 23l23-23 73 73-23 23zM55 32l73 73-23 23-73-73zm361 240v-32h96v32h-96zM240 0h32v96h-32V0zm167 128l-23-23 73-73 23 23z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v4/light-mode";
export { pathData, ltr, accData };