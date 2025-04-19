import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "use-case-diagram";
const pathData = "M160 136q29 0 55 7.5t46 20.5l61-60q-2-6-2-8V32q0-14 9-23t23-9h64q14 0 23 9t9 23v64q0 14-9 23t-23 9h-64q-2 0-8-2l-57 58q25 25 31 56h66v-16q0-14 9-23t23-9h64q14 0 23 9t9 23v64q0 14-9 23t-23 9h-64q-14 0-23-9t-9-23v-16h-66q-6 31-31 56l57 58q6-2 8-2h64q14 0 23 9t9 23v64q0 14-9 23t-23 9h-64q-14 0-23-9t-9-23v-64q0-2 2-8l-61-60q-20 13-46 20.5t-55 7.5q-33 0-62-9.5t-51-26-34.5-38T0 256t12.5-46.5 34.5-38 51-26 62-9.5zM352 32v64h64V32h-64zM32 256q0 18 10.5 34t28 28 40.5 19 49 7 49-7 40.5-19 28-28 10.5-34-10.5-34-28-28-40.5-19-49-7-49 7-40.5 19-28 28T32 256zm448-32h-64v64h64v-64zM352 480h64v-64h-64v64z";
const ltr = false;
const accData = null;
const collection = "tnt-v2";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v2/use-case-diagram";
export { pathData, ltr, accData };