import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "return-delivery";
const pathData = "M0 256h288V96h51c56 0 116 46 127 107l8 53h6c17 0 32 13 32 32v96c0 19-15 32-32 32h-34c-7 37-39 64-78 64s-71-27-79-64h-67c-7 37-39 64-78 64s-71-27-79-64H32c-19 0-32-13-32-32v-96c0-5 2-11 5-16-3-5-5-11-5-16zm480 32H32v96h33c8-36 40-64 79-64s71 28 78 64h67c8-36 40-64 79-64s71 28 78 64h34v-96zM0 104L96 8v48L72 80h152v48H72l24 24v48zm320 24v128h122l-8-48c-8-47-48-80-95-80h-19zm0 272c0 26 22 48 48 48s48-22 48-48-22-48-48-48-48 22-48 48zm-224 0c0 26 22 48 48 48s48-22 48-48-22-48-48-48-48 22-48 48z";
const ltr = false;
const accData = null;
const collection = "business-suite-v1";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v1/return-delivery";
export { pathData, ltr, accData };