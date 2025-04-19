import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "requirement-diagram";
const pathData = "M0 129q0-13 9-23 9-9 22-9h19q9-26 37-31 7-13 23-24 15-9 35-9 16 0 31 9 13 9 23 24 26 4 37 31h19q13 0 23 9 9 10 9 23v10l34-35v-2l-1-4V32q0-14 9-23t23-9h64q13 0 22.5 9t9.5 23v64q0 14-9.5 23t-22.5 9h-64q-4 0-8-2l-57 58v57h97v-16q0-14 9-23t23-9h64q13 0 22.5 9t9.5 23v64q0 13-9.5 22.5T480 321h-64q-14 0-23-9.5t-9-22.5v-16h-97v56l57 57q4-2 8-2h64q13 0 22.5 9.5T448 416v64q0 14-9.5 23t-22.5 9h-64q-14 0-23-9t-9-23v-66l1-3v-2l-34-35v42q0 14-9 23-10 9-23 9H31q-14 0-22.5-9T0 416V129zm416-33V32h-64v64h64zM79 113q0 16 16 16h96q16 0 16-16 0-6-5-11t-11-5h-16q0-13-9-23-9-9-23-9t-23 9q-9 10-9 23H95q-16 0-16 16zm176 303V129h-19q-2 5-4.5 10t-5.5 10q-9 12-26 12H86q-15 0-23.5-9T50 129H31v287h224zM61 288l21-23 44 44 87-108 22 21-109 131zm355 1h64v-64h-64v64zm-64 191h64v-64h-64v64z";
const ltr = false;
const accData = null;
const collection = "tnt-v2";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v2/requirement-diagram";
export { pathData, ltr, accData };