import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "review-demands";
const pathData = "M284 420c-37-39-37-99 0-136 20-19 44-28 68-28s49 9 68 28c26 29 28 63 28 71 0 13-3 32-14 48l78 78-31 31-78-78c-15 9-31 14-49 14-24 0-50-9-70-28zM0 64h64v32H32v320h192v32H0V64zm306 238c-24 24-24 76 0 100 13 9 28 14 46 14 19 0 34-4 46-13 23-23 26-78-3-102-9-9-26-13-43-13s-34 3-46 14zM96 96V64h32c0-15-4-32 12-49 11-10 23-15 35-15 14 0 26 5 37 15 16 17 12 34 12 49h32v32H96zm64 64h64v-32l65 64-65 64v-32h-64v-64zM64 320l64-64v32h64v64h-64v32zM320 96h-32V64h64v160h-32V96zM176 32c-11 0-16 5-16 16s5 16 16 16 16-5 16-16-5-16-16-16z";
const ltr = false;
const accData = null;
const collection = "business-suite-v1";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v1/review-demands";
export { pathData, ltr, accData };