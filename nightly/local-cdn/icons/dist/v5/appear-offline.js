import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "appear-offline";
const pathData = "M217 256q-28 0-52.5 10.5T122 295t-28.5 42.5T83 390v7h115q11 0 18.5 7t7.5 18-7.5 18.5T198 448H58q-11 0-18.5-7.5T32 422v-32q0-55 29-99.5t77-67.5q-42-39-42-95 0-27 10.5-50.5t28-41 40.5-27T224 0t49.5 10 41 27.5 27.5 41 10 49.5-10.5 51-30.5 43q12 6 28 16t16 26q0 10-8 17t-18 7q-4 0-8-1.5t-12-6.5q-15-11-34.5-17.5T230 256h-13zm167 64q41 0 68.5 27.5T480 416t-27.5 68.5T384 512t-68.5-27.5T288 416t27.5-68.5T384 320zm0 141q20 0 32.5-12.5T429 416t-12.5-32.5T384 371t-32.5 12.5T339 416t12.5 32.5T384 461zM224 51q-32 0-54.5 22.5T147 128t22.5 54.5T224 205t54.5-22.5T301 128t-22.5-54.5T224 51z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/appear-offline";
export { pathData, ltr, accData };