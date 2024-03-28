import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav4, ltr, accData } from "./v4/credit-card.js";
import { pathData as pathDatav5 } from "./v5/credit-card.js";

const pathData = isLegacyThemeFamily() ? pathDatav4 : pathDatav5;

export default "credit-card";
export { pathData, ltr, accData };