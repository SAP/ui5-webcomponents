import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "full-port";
const pathData = "M11.5 112q0-14 9-23t23-9h255q14 0 23.5 9t9.5 23v255q0 14-9.5 23.5t-23.5 9.5h-255q-14 0-23-9.5t-9-23.5V112zm288 256V112h-256v256h256zm64-176h137v38h-92v51h65v36h-65v83h-45V192zm-177-25q3-3 8-3 6 0 9 3l57 57q7 7 7 15 0 9-7 16l-57 57q-4 4-8 4-3 0-9-4-4-4-4-8 0-5 4-9l56-56-56-55q-4-5-4-9t4-8zm-105 57l57-57q3-4 8-4 6 0 9 4 3 3 3 8t-3 9l-56 56 56 55q5 4 5 9 0 4-5 8-3 4-9 4-5 0-8-4l-57-57q-6-6-6-15t6-16z";
const ltr = false;
const accData = null;
const collection = "tnt-v2";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v2/full-port";
export { pathData, ltr, accData };