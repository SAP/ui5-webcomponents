import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "late";
const pathData = "M32 337h37c-2-11-3-21-4-32H16c-11 0-16-5-16-16s5-16 16-16h49c1-11 2-21 4-32H32c-11 0-16-5-16-16s5-16 16-16h47v-1c30-75 95-130 177-142V32h-64V0h192v32h-64v34c35 5 67 17 94 36l34-34 46 46-32 32c31 39 50 86 50 142 0 124-100 224-224 224-94 0-171-56-206-137l-3-6H32c-11 0-16-5-16-16s5-16 16-16zm64-49c0 105 85 192 192 192s192-87 192-192c0-107-85-192-192-192S96 181 96 288zm175 16v-96c0-11 5-16 16-16s16 5 16 16v80h97c11 0 16 5 16 16 0 8-7 16-16 16H287c-9 0-16-8-16-16z";
const ltr = false;
const accData = null;
const collection = "business-suite-v1";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v1/late";
export { pathData, ltr, accData };