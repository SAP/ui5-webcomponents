import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "spike-arrest";
const pathData = "M445 133l65 65-32 32-63-65-65 65-32-32 65-65-65-63 32-32 65 64 63-64 32 32zm-2 155h1q1-1 2-1t1 1q1 1 3 4v188q0 14-9 23t-23 9H34q-14 0-23-9t-9-23V160q0-14 9-23t23-9h192v32H34v212l36-37q-4-8-4-15 0-14 9-23t23-9 23 9 9 23q0 7-4 15l53 53q8-4 15-4l46-102q-14-11-14-26 0-14 9-23t23-9 23 9 9 23q0 12-9 23l39 105q12 0 19 5zm-25 47l-68 66q4 10 4 15 0 14-9 23t-23 9-23-9-9-23q0-17 15-27l-39-103q-4 2-8 2-1 0-1.5-.5t-1.5-.5l-45 102q7 4 11.5 11t4.5 16q0 14-9 23t-23 9-23-9-9-23q0-9 5-17l-52-52q-8 5-17 5t-17-5l-47 47v86h384V335z";
const ltr = false;
const accData = null;
const collection = "tnt-v2";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v2/spike-arrest";
export { pathData, ltr, accData };