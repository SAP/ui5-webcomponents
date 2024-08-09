import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav4, ltr, accData } from "./v4/business-card.js";
import { pathData as pathDatav5 } from "./v5/business-card.js";

const pathData = isLegacyThemeFamily() ? pathDatav4 : pathDatav5;

export default "business-card";
export { pathData, ltr, accData };