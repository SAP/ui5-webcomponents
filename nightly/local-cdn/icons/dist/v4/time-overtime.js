import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "time-overtime";
const pathData = "M256 0q53 0 99.5 20T437 75t55 81.5 20 99.5q0 49-17.5 92.5T447 426t-71 56-88 28v-32q41-6 76-25.5t60.5-49T465 336t15-80q0-47-17.5-87.5t-48-71-71-48T256 32q-38 0-72.5 12t-63 33.5-49 50.5T41 192H8q11-41 34.5-76.5t56-61 72.5-40T256 0zM47 417q3 22 24 34v-61q-33-11-46.5-27T11 323q0-50 60-60v-14h24v14q54 11 60 52l-41 6q-2-10-6.5-15T95 296v58q38 10 52.5 25t14.5 38q0 29-19 46t-48 22v27H71v-25q-30-6-46-21T4 421zm177-273q0-16 16-16t16 16v112h144q16 0 16 16t-16 16H224V144zM95 453q15-3 19-10 8-8 8-20 0-11-6.5-17T95 395v58zM71 348v-52q-9 4-15 11t-6 15q0 15 21 26z";
const ltr = true;
const accData = null;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v4/time-overtime";
export { pathData, ltr, accData };