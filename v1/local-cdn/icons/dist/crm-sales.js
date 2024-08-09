import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav4, ltr, accData } from "./v4/crm-sales.js";
import { pathData as pathDatav5 } from "./v5/crm-sales.js";

const pathData = isLegacyThemeFamily() ? pathDatav4 : pathDatav5;

export default "crm-sales";
export { pathData, ltr, accData };