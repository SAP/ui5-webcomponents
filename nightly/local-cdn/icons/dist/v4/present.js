import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "present";
const pathData = "M0 272q0-43 14.5-82T55 120t61-52.5T192 38v32q-34 8-63.5 27t-51 45.5T44 202t-12 70q0 43 16.5 81t45 66 66 44.5T240 480q37 0 70-12t59.5-33.5 45.5-51 27-63.5h33q-8 41-29.5 76.5t-52.5 61-70 40-83 14.5q-49 0-93-19t-76.5-51.5T19 365 0 272zM377 96l26-79 26 79h83l-68 49 26 79-67-49-68 49 26-79-67-49h83zM224 288V144q0-7 5-11.5t12-4.5q15 0 15 16v112h144q16 0 16 16t-16 16H224z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v4/present";
export { pathData, ltr, accData };