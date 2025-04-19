import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "terminal";
const pathData = "M16.5 408V73c0-40 32-72 72-72h335c40 0 72 32 72 72v335c0 40-32 72-72 72h-335c-40 0-72-32-72-72zm48-310v23c5 0 8 0 11 1l240 121c5 3 9 8 10 13 0 3 3 7 3 8v37h47v-37c0-13 11-24 24-24s24 11 24 24v168c15 0 24-11 24-24V98h-383zm0 310c0 13 11 24 24 24h192v-56l-216-109v141zm264-36h47v-47h-47v47zm0 24v36h47v-36h-47zm-204-152l37 18v-43l-37-18v43zm-60-28c4 0 7 2 11 3l25 13v-43l-36-18v45zm216 63l-36-17v41l36 18v-42zm-60-29l-35-19v43l35 17v-41zm179-201v25h48v-1c0-15-9-24-24-24h-24zm-335 25h48V49h-24c-13 0-24 9-24 24v1zm95 0h34c0-1-2-1-2-4V49h-32v25zm161-4c0 3-1 3-1 4h33V49h-32v21zm-80-21v25h32V49h-32z";
const ltr = false;
const accData = null;
const collection = "business-suite-v2";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v2/terminal";
export { pathData, ltr, accData };