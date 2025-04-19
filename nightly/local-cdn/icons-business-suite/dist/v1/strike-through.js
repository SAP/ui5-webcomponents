import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "strike-through";
const pathData = "M.5 253c0-17 12-28 29-28h454c17 0 28 11 28 28s-11 28-28 28h-111c17 20 26 46 26 71 0 74-68 128-142 128s-142-54-142-128c0-17 11-28 28-28s29 11 29 28c0 37 34 71 85 71s85-34 85-71-34-71-85-71h-227c-17 0-29-11-29-28zm114-114c0-72 79-113 142-113s142 42 142 113c0 17-12 29-29 29s-28-12-28-29c0-38-55-56-85-56-26 0-48 8-63 19-14 12-22 26-22 37 0 6 0 12 2 17 6 15 0 32-14 37-4 2-8 2-11 2-29 0-34-34-34-56z";
const ltr = false;
const accData = null;
const collection = "business-suite-v1";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v1/strike-through";
export { pathData, ltr, accData };