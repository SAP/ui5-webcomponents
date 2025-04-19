import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "aggregation";
const pathData = "M464 32q16 0 16 16v160q0 16-16 16t-16-16V86L255 280q1 4 1.5 6.5t.5 3.5q0 3-1 6l-23 133q-3 25-28 28-51 9-78.5 13.5t-41 6.5-16 2.5-3.5.5q-15 0-24.5-11T32 445v-5l23-133q3-24 28-29l133-22h8q6 0 8 1L425 64H304q-16 0-16-16t16-16h160zM224 290q0-2-3-2L88 310q-2 0-2 2L64 445q0 3 2 3l134-22q2 0 2-2z";
const ltr = false;
const accData = null;
const collection = "tnt-v2";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v2/aggregation";
export { pathData, ltr, accData };