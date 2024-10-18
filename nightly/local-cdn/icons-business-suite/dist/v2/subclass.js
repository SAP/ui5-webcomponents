import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "subclass";
const pathData = "M65 50v48h239V50H65zm95 215h-47v119h47c0-27 21-47 48-47h239c26 0 48 20 48 47v48c0 27-22 48-48 48H208c-27 0-48-21-48-48H89c-13 0-24-11-24-24V145c-27 0-48-20-48-47V50C17 24 38 2 65 2h239c27 0 48 22 48 48v48c0 27-21 47-48 47H113v72h47c0-27 21-48 48-48h239c26 0 48 21 48 48v48c0 27-22 48-48 48H208c-27 0-48-21-48-48z";
const ltr = false;
const accData = null;
const collection = "business-suite-v2";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v2/subclass";
export { pathData, ltr, accData };