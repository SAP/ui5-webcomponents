import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "draw-freehand";
const pathData = "M507 0v72h-72V0h72zm-69 100L101 447l-32-36L405 64zM77 440v72H5v-72h72z";
const ltr = false;
const accData = null;
const collection = "business-suite";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "draw-freehand";
export { pathData, ltr, accData };