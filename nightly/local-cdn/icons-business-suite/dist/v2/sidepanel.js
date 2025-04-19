import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "sidepanel";
const pathData = "M0 384.962V77.955C0 35.609 34.647.962 76.992.962h358.016C477.353.962 512 35.61 512 77.955v307.007c0 42.346-34.647 76.993-76.992 76.993H76.992C34.647 461.955 0 427.308 0 384.962zm76.992-332.03c-14.436 0-25.984 10.587-25.984 25.023v307.007a25.877 25.877 0 0025.984 25.985h256V52.932h-256zm307.008 0v358.015h51.008a25.877 25.877 0 0025.984-25.985V77.955c0-14.436-11.548-25.023-25.984-25.023H384z";
const ltr = false;
const accData = null;
const collection = "business-suite-v2";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v2/sidepanel";
export { pathData, ltr, accData };