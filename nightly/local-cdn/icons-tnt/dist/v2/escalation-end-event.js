import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "escalation-end-event";
const pathData = "M256 0q53 0 99.5 20T437 75t55 81.5 20 99.5-20 99.5-55 81.5-81.5 55-99.5 20-99.5-20T75 437t-55-81.5T0 256t20-99.5T75 75t81.5-55T256 0zm0 448q40 0 75-15t61-41 41-61 15-75-15-75-41-61-61-41-75-15-75 15-61 41-41 61-15 75 15 75 41 61 61 41 75 15zm97-101q0 3-2 4h-4l-90-59-90 59q-1 1-2 1t-2-1q-2-1-2-4l92-185q2-2 4-2t2 .5 2 1.5z";
const ltr = false;
const accData = null;
const collection = "tnt-v2";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v2/escalation-end-event";
export { pathData, ltr, accData };