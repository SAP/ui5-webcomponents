import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "opportunity";
const pathData = "M25 160q-11 0-18-7.5T0 134V64q0-26 19-45T64 0h166q11 0 18.5 7t7.5 18-7.5 18.5T230 51H64q-13 0-13 13v71q0 11-7.5 18T25 160zm461 224q11 0 18.5 7.5T512 410v37q0 27-19 46t-45 19H65q-26 0-45.5-18.5T0 448v-38q0-11 7-18.5t18-7.5 18.5 7 7.5 18v39q0 13 14 13h383q13 0 13-14v-37q0-11 7-18.5t18-7.5zm-22-160q20 0 34 14t14 34-14 34-34 14q-15 0-26-8l-98 55q0 20-14 34.5T292 416t-34-14-14-34q0-11 3-18l-75-94h-7q-8 0-16-3l-53 46v5q1 20-13.5 34T48 352t-34-14-14-34 14-34 34-14q9 0 16 3l54-46-1-5q-1-20 13.5-34t34.5-14 34 14 14 34q0 10-2 14l78 98h3q11 0 19 4l106-59q2-17 15.5-29t31.5-12zM324 86q-4-4-4-11 0-14 14-16l48-7 19-42q4-10 15-10t15 10l19 42 48 7q14 2 14 16 0 7-4 11l-35 38 8 54q0 6-5 10t-11 4q-2 0-8-2l-41-23-41 23q-6 2-8 2-6 0-11-4t-5-10l8-54z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/opportunity";
export { pathData, ltr, accData };