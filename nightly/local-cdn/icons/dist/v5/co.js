import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "co";
const pathData = "M288 96q33 0 62.5 12.5t51 34 34 51T448 256t-12.5 62.5-34 51-51 34T288 416t-62.5-12.5-51-34-34-51T128 256t12.5-62.5 34-51 51-34T288 96zm0 269q23 0 43-8.5t34.5-23 23-34.5 8.5-43-8.5-43-23-34.5-34.5-23-43-8.5-43 8.5-34.5 23-23 34.5-8.5 43 8.5 43 23 34.5 34.5 23 43 8.5zm141 41q9-10 14.5-12.5T454 391q11 0 18.5 7t7.5 18-7 18q-36 38-83.5 58T288 512t-100.5-20-81-55T52 355 32 253q0-58 22-105t58-80 82.5-50.5T290 0t96.5 18.5T473 78q7 7 7 18t-7.5 18-18.5 7q-5 0-10.5-2.5T429 106q-23-25-60.5-40T288 51t-80.5 16-65 43.5-43.5 65T83 256t16 80.5 43.5 65 65 43.5 80.5 16 80.5-15 60.5-40z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/co";
export { pathData, ltr, accData };