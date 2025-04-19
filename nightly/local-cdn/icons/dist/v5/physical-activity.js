import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "physical-activity";
const pathData = "M304 96q-20 0-34-14t-14-34 14-34 34-14 34 14 14 34-14 34-34 14zm110 128q17 0 25.5 7t8.5 18-7.5 18.5T422 275q-71 0-124-56l-4-3-10 48 61 63q7 9 7 18v141q0 11-7.5 18.5T326 512t-18-7.5-7-18.5V355l-36-37-33 82q-6 16-23 16-5 0-7-1L83 383q-19-5-19-25 0-10 7.5-17.5T90 333q4 0 6 1l97 26 38-96 18-81-70 9v58q0 11-7 18t-18 7-18.5-7-7.5-18v-80q0-10 6.5-17t15.5-9l132-16q15 0 26 21 6 12 17 25t25 24.5 31 18.5 33 7z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/physical-activity";
export { pathData, ltr, accData };