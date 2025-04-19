import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "marital-status";
const pathData = "M214 311c61 0 109-48 109-110h37c0 61-37 112-89 134-36 16-58 13-59 13-77 0-143-66-143-147S136 60 214 57c28 1 52 7 73 19v45c-19-18-42-27-70-27h-7c-54 0-104 48-104 108 0 61 48 109 108 109zm123-152c-57 0-107 51-107 106v5l-36-4v-4c0-74 66-138 143-138 1 0 22-3 58 12 17 8 32 18 45 30 25 25 42 67 43 89v20c0 73-65 135-146 138-25-2-49-8-70-19l-1-44c18 17 40 26 67 26h10c25 0 52-14 73-32 20-18 30-45 31-77 0-58-50-108-105-108h-5z";
const ltr = false;
const accData = null;
const collection = "business-suite-v1";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v1/marital-status";
export { pathData, ltr, accData };