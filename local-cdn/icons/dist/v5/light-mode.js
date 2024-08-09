import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "light-mode";
const pathData = "M256 179q-32 0-54.5 22.5T179 256t22.5 54.5T256 333t54.5-22.5T333 256t-22.5-54.5T256 179zm0 205q-27 0-50-10t-40.5-27.5T138 306t-10-50 10-50 27.5-40.5T206 138t50-10 50 10 40.5 27.5T374 206t10 50-10 50-27.5 40.5T306 374t-50 10zM71 275H26q-11 0-18.5-7.5T0 249t7.5-18 18.5-7h45q11 0 18 7t7 18-7 18.5-18 7.5zm416 0h-45q-11 0-18.5-7.5T416 249t7.5-18 18.5-7h45q11 0 18 7t7 18-7 18.5-18 7.5zM256 96q-11 0-18.5-7.5T230 70V25q0-11 7.5-18T256 0t18 7 7 18v45q0 11-7 18.5T256 96zm0 416q-11 0-18.5-7t-7.5-18v-46q0-11 7.5-18t18.5-7 18 7 7 18v46q0 11-7 18t-18 7zM101 128q-12 0-19-7L50 89q-7-7-7-19 0-10 7.5-17.5T69 45t18 7l32 32q7 7 7 19 0 10-7.5 17.5T101 128zm341 339q-12 0-19-7l-32-32q-7-7-7-18t7.5-18.5T410 384t18 7l32 32q7 7 7 19 0 10-7.5 17.5T442 467zm-32-339q-11 0-18.5-7.5T384 102t7-18l32-32q7-7 19-7 10 0 17.5 7.5T467 71t-7 18l-32 32q-7 7-18 7zM71 467q-11 0-18.5-7.5T45 441t7-18l32-32q7-7 19-7 10 0 17.5 7.5T128 410t-7 18l-32 32q-7 7-18 7z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/light-mode";
export { pathData, ltr, accData };