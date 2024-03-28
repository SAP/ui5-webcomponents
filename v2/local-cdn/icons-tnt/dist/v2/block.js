import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "block";
const pathData = "M435 378V158l-154 69v220zm-358 0l153 69V227L77 158v220zm37-260l142 64 142-64-142-64zm372 0v276q0 16-15 24l-204 92q-3 1-5.5 1.5t-5.5.5q-4 0-10-2L41 418q-15-8-15-24V118q0-4 2-10 0-1 1-2 0-1 2.5-4t3.5-3q1-2 6-4L246 3q10-5 21 0l204 92q4 2 6 4 1 0 3.5 3t2.5 4 .5 1 .5 2q2 4 2 9z";
const ltr = false;
const accData = null;
const collection = "tnt-v2";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v2/block";
export { pathData, ltr, accData };