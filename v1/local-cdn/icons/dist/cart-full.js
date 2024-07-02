import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav4, ltr, accData } from "./v4/cart-full.js";
import { pathData as pathDatav5 } from "./v5/cart-full.js";

const pathData = isLegacyThemeFamily() ? pathDatav4 : pathDatav5;

export default "cart-full";
export { pathData, ltr, accData };