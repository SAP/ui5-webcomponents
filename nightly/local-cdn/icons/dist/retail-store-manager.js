import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav4, ltr, accData } from "./v4/retail-store-manager.js";
import { pathData as pathDatav5 } from "./v5/retail-store-manager.js";

const pathData = isLegacyThemeFamily() ? pathDatav4 : pathDatav5;

export default "retail-store-manager";
export { pathData, ltr, accData };