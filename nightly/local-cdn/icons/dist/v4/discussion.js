import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "discussion";
const pathData = "M224 256q0-17 9-32t23-23q14-9 32-9h160q26 0 45 19t19 45v96q0 27-19 45.5T448 416v76q0 9-6.5 14.5T427 512q-9 0-13-4l-78-91-48-1q-26 0-45-18.5T224 352v-96zm32 96q0 14 9 23t23 9l64 1 64 79v-80h32q13 0 22.5-9t9.5-23v-96q0-13-9.5-22.5T448 224H288q-14 0-23 9.5t-9 22.5v96zM64 0h160q26 0 45 19t19 45v96q-8 0-16 2l-16 4V64q0-13-9.5-22.5T224 32H64q-14 0-23 9.5T32 64v96q0 14 9 23t23 9h32v80l64-79 57-1q-13 13-19 33h-22l-78 91q-4 4-13 4-8 0-14.5-5.5T64 300v-76q-26 0-45-18.5T0 160V64q0-26 19-45T64 0z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v4/discussion";
export { pathData, ltr, accData };