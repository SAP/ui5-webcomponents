import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "attachment-html";
const pathData = "M135 288l82-102q4-7 14-7 7 0 11 4 7 6 7 15 0 5-3 10l-64 80 64 81 2 7v4q0 6-3.5 12t-13.5 6q-7 0-14-7zM1 480V128L129 0h224q13 0 22.5 9t9.5 23v32h-32V32H161v96q0 14-9.5 23t-23.5 9H33v320h320v-32h32v32q0 14-9 23t-23 9H33q-14 0-23-9t-9-23zm267-82q0-5 1-6l73-218q3-10 11-13 1-1 7-1 8 0 12.5 6t4.5 12-1 7l-72 219q-4 13-18 13-8 0-13-6t-5-13zm128-18q0-7 4-11l64-81-64-80q-4-4-4-11 0-18 18-18 8 0 15 7l82 102-82 103q-7 7-15 7-7 0-11-4-7-4-7-14z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v4/attachment-html";
export { pathData, ltr, accData };