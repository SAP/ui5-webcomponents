import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "draw-freehand";
const pathData = "M99 357L367 87c9-9 27-9 36 0 10 10 10 27 0 37L135 393c-5 5-12 7-19 7-6 0-12-2-17-7-9-9-9-27 0-36zM458 0c22 0 38 16 38 38 0 21-16 39-38 39-21 0-39-18-39-39 0-22 18-38 39-38zM54 404c21 0 38 17 38 38 0 22-17 38-38 38-22 0-38-16-38-38 0-21 16-38 38-38z";
const ltr = false;
const accData = null;
const collection = "business-suite-v2";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v2/draw-freehand";
export { pathData, ltr, accData };