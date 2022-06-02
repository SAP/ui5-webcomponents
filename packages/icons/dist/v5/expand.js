import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import { ICON_EXPAND } from "../generated/i18n/i18n-defaults.js";

const name = "expand";
const pathData = "M361.5 335q11-9 22-9 13 0 22 9t9 22q0 12-9 21l-124 124q-10 10-22 10-10 0-22-10l-123-124q-10-9-10-21 0-13 10-22 9-9 21-9 13 0 22 9l102 102zm-205-157q-9 10-22 10-12 0-21-10-10-10-10-21 0-12 10-22l124-124q9-9 21-9 13 0 22 9l124 124q9 9 9 22 0 12-9 21-9 10-22 10-12 0-21-10l-103-102z";
const ltr = false;
const accData = ICON_EXPAND;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, accData, collection, packageName });

export default "expand";
export { pathData, ltr, accData };